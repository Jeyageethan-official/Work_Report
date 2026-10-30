(function () {
  const cfg = window.WR_APP_CONFIG || {};
  const AUTH_TOKEN_TYPES = ["signup", "recovery", "magiclink", "email_change", "invite"];
  const host = String(window.location.hostname || "").toLowerCase();
  const protocol = String(window.location.protocol || "").toLowerCase();
  const userAgent = String(navigator.userAgent || "");
  const isAndroidAssetHost = host === "appassets.androidplatform.net";
  const isIosNativeApp = /WorkReportiOSApp/i.test(userAgent);
  const nativeBridgePending =
    window.__wrNativeBridgePending instanceof Map ? window.__wrNativeBridgePending : new Map();
  window.__wrNativeBridgePending = nativeBridgePending;

  function normalizeRedirectTarget(raw) {
    const configuredBase = (window.WR_APP_CONFIG && window.WR_APP_CONFIG.appBaseUrl) || window.location.origin;
    const base = configuredBase.replace(/\/$/, "");
    const fallback = `${base}/app`;

    if (!raw) return fallback;

    try {
      const decoded = decodeURIComponent(raw);
      if (decoded.startsWith("/") && !decoded.startsWith("//")) {
        return `${base}${decoded}`;
      }
      const url = new URL(decoded, base);
      if (url.origin !== new URL(base).origin) return fallback;
      return url.toString();
    } catch {
      return fallback;
    }
  }

  function parseNativeBridgePayload(response) {
    if (response == null) return null;
    if (typeof response === "boolean") return { ok: response };
    if (typeof response === "object") return response;
    if (typeof response === "string") {
      const trimmed = response.trim();
      if (!trimmed) return null;
      if (trimmed === "true" || trimmed === "false") return { ok: trimmed === "true" };
      try {
        return JSON.parse(trimmed);
      } catch (_) {
        return { ok: true, value: trimmed, message: trimmed };
      }
    }
    return { ok: Boolean(response), value: String(response) };
  }

  if (typeof window.__wrNativeBridgeResolve !== "function") {
    window.__wrNativeBridgeResolve = (id, response) => {
      const key = String(id || "");
      const pending = nativeBridgePending.get(key);
      if (!pending) return;
      nativeBridgePending.delete(key);
      pending.resolve(parseNativeBridgePayload(response));
    };
  }

  const hasAndroidBridge = () => Boolean(window.AndroidBridge && typeof window.AndroidBridge.postMessage === "function");
  const hasIosBridge = () =>
    Boolean(window.webkit?.messageHandlers?.wrBridge && typeof window.webkit.messageHandlers.wrBridge.postMessage === "function");
  const isNativeBridgeRuntime = isAndroidAssetHost || isIosNativeApp || protocol === "app:" || hasAndroidBridge() || hasIosBridge();

  async function nativeBridgeRequest(action, payload = {}, timeoutMs = 2500) {
    if (!isNativeBridgeRuntime) return null;

    try {
      if (hasAndroidBridge()) {
        const requestId = `wr-native-${Date.now()}-${Math.random().toString(16).slice(2)}`;
        return await new Promise((resolve) => {
          const timeout = window.setTimeout(() => {
            nativeBridgePending.delete(requestId);
            resolve(null);
          }, timeoutMs);
          nativeBridgePending.set(requestId, {
            resolve: (value) => {
              window.clearTimeout(timeout);
              resolve(value);
            }
          });
          try {
            window.AndroidBridge.postMessage(
              requestId,
              String(action || ""),
              JSON.stringify(payload || {})
            );
          } catch (_) {
            window.clearTimeout(timeout);
            nativeBridgePending.delete(requestId);
            resolve(null);
          }
        });
      }

      if (hasIosBridge()) {
        const requestId = `wr-native-${Date.now()}-${Math.random().toString(16).slice(2)}`;
        return await new Promise((resolve) => {
          const timeout = window.setTimeout(() => {
            nativeBridgePending.delete(requestId);
            resolve(null);
          }, timeoutMs);
          nativeBridgePending.set(requestId, {
            resolve: (value) => {
              window.clearTimeout(timeout);
              resolve(value);
            }
          });
          try {
            window.webkit.messageHandlers.wrBridge.postMessage({
              id: requestId,
              action: String(action || ""),
              payload: payload || {}
            });
          } catch (_) {
            window.clearTimeout(timeout);
            nativeBridgePending.delete(requestId);
            resolve(null);
          }
        });
      }
    } catch (err) {
      console.warn("Native bridge request failed:", err);
    }

    return null;
  }

  const webStorage = {
    getItem(key) {
      try {
        return window.localStorage.getItem(String(key || ""));
      } catch (_) {
        return null;
      }
    },
    setItem(key, value) {
      try {
        window.localStorage.setItem(String(key || ""), String(value ?? ""));
        return true;
      } catch (_) {
        return false;
      }
    },
    removeItem(key) {
      try {
        window.localStorage.removeItem(String(key || ""));
        return true;
      } catch (_) {
        return false;
      }
    }
  };

  const nativeStorage = {
    isServer: false,
    async getItem(key) {
      const normalizedKey = String(key || "").trim();
      if (!normalizedKey) return null;
      const localValue = webStorage.getItem(normalizedKey);
      if (localValue != null) return localValue;
      if (!isNativeBridgeRuntime) return null;
      const response = await nativeBridgeRequest("getPersistentItem", { key: normalizedKey });
      const payload = parseNativeBridgePayload(response);
      const value =
        payload && payload.ok !== false && payload.value != null
          ? String(payload.value)
          : null;
      if (value != null) {
        webStorage.setItem(normalizedKey, value);
      }
      return value;
    },
    async setItem(key, value) {
      const normalizedKey = String(key || "").trim();
      if (!normalizedKey) return;
      const serialized = String(value ?? "");
      webStorage.setItem(normalizedKey, serialized);
      if (!isNativeBridgeRuntime) return;
      await nativeBridgeRequest("setPersistentItem", {
        key: normalizedKey,
        value: serialized
      });
    },
    async removeItem(key) {
      const normalizedKey = String(key || "").trim();
      if (!normalizedKey) return;
      webStorage.removeItem(normalizedKey);
      if (!isNativeBridgeRuntime) return;
      await nativeBridgeRequest("removePersistentItem", { key: normalizedKey });
    }
  };

  if (!window.supabase || typeof window.supabase.createClient !== "function") {
    console.warn("Supabase SDK is not available. Running in offline-limited mode.");
    window.WRSupabase = {
      client: null,
      getSession: async () => null,
      getUser: async () => null,
      getAccessToken: async () => null,
      consumeUrlSession: async () => null,
      normalizeRedirectTarget
    };
    return;
  }

  const url = String(cfg.supabaseUrl || "").trim();
  const anonKey = String(cfg.supabaseAnonKey || "").trim();

  if (!url || !anonKey || url.includes("YOUR_PROJECT_REF") || anonKey === "YOUR_SUPABASE_ANON_KEY") {
    console.warn("Supabase config is incomplete. Update frontend/auth/assets/js/config.js or set WR_APP_CONFIG.");
  }

  const client = window.supabase.createClient(url, anonKey, {
    auth: {
      // Browser-only static hosting works more reliably with implicit flow
      // across Safari private mode / strict storage policies.
      flowType: "implicit",
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: true,
      storageKey: "wr-supabase-auth",
      storage: nativeStorage
    }
  });
  const storageReadyPromise = Promise.allSettled([
    nativeStorage.getItem("wr-supabase-auth"),
    nativeStorage.getItem("wr-supabase-auth-user"),
    nativeStorage.getItem("wr-supabase-auth-code-verifier")
  ]).catch((error) => {
    console.warn("Native auth storage hydration skipped:", error);
  });

  async function consumeUrlSession() {
    await storageReadyPromise;
    const url = new URL(window.location.href);
    const code = url.searchParams.get("code");
    const tokenHash = url.searchParams.get("token_hash");
    const type = url.searchParams.get("type");

    if (code) {
      const { data, error } = await client.auth.exchangeCodeForSession(window.location.href);
      if (error) throw error;
      return data.session || null;
    }

    if (tokenHash && type && AUTH_TOKEN_TYPES.includes(type)) {
      const { data, error } = await client.auth.verifyOtp({
        type,
        token_hash: tokenHash
      });
      if (error) throw error;
      return data.session || null;
    }

    const queryAccessToken = url.searchParams.get("access_token");
    const queryRefreshToken = url.searchParams.get("refresh_token");
    if (queryAccessToken && queryRefreshToken) {
      const { data, error } = await client.auth.setSession({
        access_token: queryAccessToken,
        refresh_token: queryRefreshToken
      });
      if (error) throw error;
      return data.session || null;
    }

    const hash = new URLSearchParams(window.location.hash.replace(/^#/, ""));
    const accessToken = hash.get("access_token");
    const refreshToken = hash.get("refresh_token");
    if (accessToken && refreshToken) {
      const { data, error } = await client.auth.setSession({
        access_token: accessToken,
        refresh_token: refreshToken
      });
      if (error) throw error;
      return data.session || null;
    }

    const { data, error } = await client.auth.getSession();
    if (error) throw error;
    return data.session || null;
  }

  async function getSession() {
    await storageReadyPromise;
    const { data, error } = await client.auth.getSession();
    if (error) throw error;
    return data.session || null;
  }

  async function getUser() {
    await storageReadyPromise;
    const { data, error } = await client.auth.getUser();
    if (error) throw error;
    return data.user || null;
  }

  async function getAccessToken() {
    const session = await getSession();
    return session ? session.access_token : null;
  }

  window.WRSupabase = {
    client,
    getSession,
    getUser,
    getAccessToken,
    consumeUrlSession,
    normalizeRedirectTarget,
    waitForStorageReady: async () => storageReadyPromise
  };
})();
