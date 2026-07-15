// Shared authenticated fetch helper.
//
// Wraps fetch() so that:
// 1. It automatically attaches the current access_token.
// 2. If the server rejects the token (401 / "token not valid"), it
//    tries once to refresh the token using the stored refresh_token.
// 3. If the refresh succeeds, it retries the original request with
//    the new access_token.
// 4. If the refresh also fails, it clears stored tokens and redirects
//    the user to /login instead of showing a raw backend error.
//
// Usage (replaces a normal fetch call):
//   const res = await authFetch(`${API_BASE_URL}/api/cart/add/`, {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify(payload),
//   });
//   const data = await res.json();

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";

async function refreshAccessToken() {
  const refreshToken = localStorage.getItem("refresh_token");
  if (!refreshToken) return null;

  try {
    const res = await fetch(`${API_BASE_URL}/api/accounts/token/refresh/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refresh: refreshToken }),
    });

    if (!res.ok) return null;

    const data = await res.json();
    if (!data.access) return null;

    localStorage.setItem("access_token", data.access);
    return data.access;
  } catch (err) {
    console.error("Token refresh request failed:", err);
    return null;
  }
}

function isTokenError(status, data) {
  if (status !== 401) return false;
  const message = JSON.stringify(data || "").toLowerCase();
  return (
    message.includes("token not valid") ||
    message.includes("token_not_valid") ||
    message.includes("expired")
  );
}

export async function authFetch(url, options = {}) {
  const token = localStorage.getItem("access_token");

  const buildOptions = (accessToken) => ({
    ...options,
    headers: {
      ...(options.headers || {}),
      ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
    },
  });

  let res = await fetch(url, buildOptions(token));

  // If the token was rejected, try refreshing once and retry.
  if (res.status === 401) {
    let data = null;
    try {
      data = await res.clone().json();
    } catch (_) {
      // response wasn't JSON — leave data as null
    }

    if (isTokenError(res.status, data)) {
      const newToken = await refreshAccessToken();

      if (newToken) {
        res = await fetch(url, buildOptions(newToken));
      } else {
        // Refresh failed — session is truly over. Clear stale tokens
        // and send the user to log in again instead of showing a
        // confusing raw backend error.
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");

        if (typeof window !== "undefined") {
          alert("Your session has expired. Please log in again.");
          window.location.href = "/login";
        }
      }
    }
  }

  return res;
}
