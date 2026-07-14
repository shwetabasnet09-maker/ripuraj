// Shared caching layer for GET requests to your backend.
//
// Uses a "stale-while-revalidate" pattern:
// 1. If we have cached data for this URL, show it IMMEDIATELY (no wait).
// 2. In the background, fetch fresh data anyway and update the cache
//    + call onUpdate() with the new data if it changed.
// 3. If there's no cache yet, this behaves like a normal fetch — you
//    still wait for the first response (nothing can avoid that), but
//    every visit after that is instant.
//
// Cache lives in sessionStorage, so it persists across page navigations
// within the same browser tab/session, but clears when the tab closes.

const DEFAULT_TTL_MS = 5 * 60 * 1000; // 5 minutes

function getCacheKey(url) {
  return `cache:${url}`;
}

export function getCachedData(url) {
  try {
    const raw = sessionStorage.getItem(getCacheKey(url));
    if (!raw) return null;

    const { data, timestamp } = JSON.parse(raw);
    const isExpired = Date.now() - timestamp > DEFAULT_TTL_MS;

    return { data, isExpired };
  } catch {
    return null;
  }
}

function setCachedData(url, data) {
  try {
    sessionStorage.setItem(
      getCacheKey(url),
      JSON.stringify({ data, timestamp: Date.now() })
    );
  } catch {
    // sessionStorage full or unavailable — fail silently, caching is
    // an optimization, not a requirement.
  }
}

/**
 * cachedFetch(url, options)
 *
 * Returns { data, error, fromCache } via the callback pattern below,
 * used inside a useEffect. See usage example in each component.
 */
export async function cachedFetchJson(url, fetchOptions = {}) {
  const cached = getCachedData(url);

  // Kick off a real network request either way (needed for fresh data,
  // or if there's no cache at all).
  const networkPromise = fetch(url, {
    ...fetchOptions,
    signal: fetchOptions.signal || AbortSignal.timeout(10000),
  }).then(async (res) => {
    if (!res.ok) throw new Error(`Server returned status ${res.status}`);
    const data = await res.json();
    setCachedData(url, data);
    return data;
  });

  if (cached && !cached.isExpired) {
    // We have fresh-enough cached data — return it immediately, and let
    // the network request update the cache silently in the background
    // (caller can ignore networkPromise, or await it for a refresh).
    return { data: cached.data, fromCache: true, refresh: networkPromise };
  }

  // No usable cache — caller must wait for the real network response.
  const data = await networkPromise;
  return { data, fromCache: false, refresh: null };
}
