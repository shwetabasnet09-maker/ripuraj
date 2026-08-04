// Shared authenticated fetch helper.
//
// Wraps fetch() so that:
// 1. It automatically attaches the current access_token.
// 2. If the server rejects the request with a 401 for ANY reason
//    (expired token, malformed token, or no token attached at all),
//    it tries once to refresh the token using the stored refresh_token.
// 3. If the refresh succeeds, it retries the original request with
//    the new access_token.
// 4. If there's no refresh_token, or the refresh also fails, it clears
//    stored tokens and redirects the user to /login instead of showing
//    a raw backend error.
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

  // NOTE: previously this only retried when the 401's error message
  // matched specific "token not valid"/"expired" strings. That missed
  // the very common case of `access_token` simply being absent from
  // localStorage — DRF returns "Authentication credentials were not
  // provided." for that, which didn't match, so no refresh was ever
  // attempted even when a valid refresh_token was available.
  // Now: any 401 triggers a refresh attempt, since a refresh is cheap
  // and harmless to try regardless of the exact rejection reason.
  if (res.status === 401) {
    const newToken = await refreshAccessToken();

    if (newToken) {
      res = await fetch(url, buildOptions(newToken));
    } else if (typeof window !== "undefined") {
      // No refresh_token, or the refresh attempt itself failed — the
      // session is genuinely over. Clear stale tokens and send the
      // user to log in again instead of showing a confusing raw
      // backend error.
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
      alert("Your session has expired. Please log in again.");
      window.location.href = "/login";
    }
  }

  return res;
}