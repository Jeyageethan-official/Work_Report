(function () {
  const host = (window.location.hostname || "").toLowerCase();
  const protocol = (window.location.protocol || "").toLowerCase();
  const userAgent = String(navigator.userAgent || "");
  const isAndroidAssetHost = host === "appassets.androidplatform.net";
  const isIosNativeApp = /WorkReportiOSApp/i.test(userAgent);
  const isNativeMobileApp = isAndroidAssetHost || isIosNativeApp || protocol === "app:";
  const isLocal = host === "localhost" || host === "127.0.0.1" || isAndroidAssetHost || protocol === "app:";

  const defaults = {
    appBaseUrl: isLocal ? window.location.origin : "https://workreport.online",
    publicWebBaseUrl: "https://workreport.online",
    publicApiBaseUrl: "https://workreport.online",
    reachabilityProbeBaseUrl: isNativeMobileApp ? "https://workreport.online" : (isLocal ? window.location.origin : "https://workreport.online"),
    supabaseUrl: "https://lyactzctiscokmbuluci.supabase.co",
    supabaseAnonKey: "sb_publishable__xJsezds-4XCx0OzmQ8deQ_hTLdqNjF"
  };

  const metaValue = (name) => {
    const node = document.querySelector(`meta[name=\"${name}\"]`);
    return (node && node.content ? node.content : "").trim();
  };

  const injected = window.WR_APP_CONFIG || {};

  const appBaseUrl = String(
    injected.appBaseUrl ||
      metaValue("wr-app-base-url") ||
      localStorage.getItem("WR_APP_BASE_URL") ||
      defaults.appBaseUrl
  )
    .trim()
    .replace(/\/$/, "");

  const reachabilityProbeBaseUrl = String(
    injected.reachabilityProbeBaseUrl ||
      metaValue("wr-reachability-probe-base-url") ||
      localStorage.getItem("WR_REACHABILITY_PROBE_BASE_URL") ||
      defaults.reachabilityProbeBaseUrl
  )
    .trim()
    .replace(/\/$/, "");

  const publicWebBaseUrl = String(
    injected.publicWebBaseUrl ||
      metaValue("wr-public-web-base-url") ||
      localStorage.getItem("WR_PUBLIC_WEB_BASE_URL") ||
      defaults.publicWebBaseUrl
  )
    .trim()
    .replace(/\/$/, "");

  const publicApiBaseUrl = String(
    injected.publicApiBaseUrl ||
      metaValue("wr-public-api-base-url") ||
      localStorage.getItem("WR_PUBLIC_API_BASE_URL") ||
      defaults.publicApiBaseUrl
  )
    .trim()
    .replace(/\/$/, "");

  const supabaseUrl = String(
    injected.supabaseUrl ||
      metaValue("wr-supabase-url") ||
      localStorage.getItem("WR_SUPABASE_URL") ||
      defaults.supabaseUrl
  ).trim();

  const supabaseAnonKey = String(
    injected.supabaseAnonKey ||
      metaValue("wr-supabase-anon-key") ||
      localStorage.getItem("WR_SUPABASE_ANON_KEY") ||
      defaults.supabaseAnonKey
  ).trim();

  window.WR_APP_CONFIG = {
    ...injected,
    appBaseUrl,
    publicWebBaseUrl,
    publicApiBaseUrl,
    supabaseUrl,
    supabaseAnonKey,
    reachabilityProbeBaseUrl
  };

  if (supabaseUrl.includes("YOUR_PROJECT_REF") || supabaseAnonKey === "YOUR_SUPABASE_ANON_KEY") {
    console.warn("Work Report config: set WR_APP_CONFIG.supabaseUrl and WR_APP_CONFIG.supabaseAnonKey for production.");
  }
})();
