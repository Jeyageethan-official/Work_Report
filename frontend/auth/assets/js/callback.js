(function () {
  const statusBox = document.querySelector("#callback-status");
  const deepLinkRetryDelayMs = 220;
  const deepLinkHelpDelayMs = 1400;
  const redirectHelpDelayMs = 4500;
  let redirectHelpTimer = null;

  bootstrap();

  function setStatus(message, tone = "info") {
    if (!statusBox) return;
    statusBox.textContent = message || "";
    statusBox.className = message ? `status-box show ${tone}` : `status-box ${tone}`;
    statusBox.style.cursor = "";
    statusBox.onclick = null;
  }

  function isNativeRuntime() {
    const host = String(window.location.hostname || "").toLowerCase();
    const protocol = String(window.location.protocol || "").toLowerCase();
    return (
      protocol === "app:" ||
      host === "appassets.androidplatform.net" ||
      /WorkReportiOSApp/i.test(String(navigator.userAgent || ""))
    );
  }

  function resolveNextTarget() {
    const isNativeFlow = String(AuthUi.getQueryParam("native") || "") === "1";
    const fallbackNext = isNativeFlow ? "workreport://auth/callback" : `${window.location.origin}/app`;
    const rawNext = AuthUi.getQueryParam("next") || window.sessionStorage.getItem("wr_auth_next") || fallbackNext;
    return /^workreport:\/\/.+/i.test(String(rawNext || ""))
      ? String(rawNext)
      : AuthApi.normalizeNextTarget(rawNext);
  }

  function openDeepLinkWithRetry(url) {
    try {
      window.location.replace(url);
    } catch (_) {
    }
    window.setTimeout(() => {
      try {
        window.location.href = url;
      } catch (_) {
      }
    }, deepLinkRetryDelayMs);
    window.setTimeout(() => {
      if (!statusBox) return;
      setStatus("If app did not open, tap here to continue.");
      statusBox.style.cursor = "pointer";
      statusBox.onclick = () => {
        try {
          window.location.href = url;
        } catch (_) {
        }
      };
    }, deepLinkHelpDelayMs);
  }

  function scheduleRedirectHelp(url, message) {
    window.clearTimeout(redirectHelpTimer);
    redirectHelpTimer = window.setTimeout(() => {
      if (!statusBox) return;
      setStatus(message || "Still working. Tap here if the page does not continue.");
      statusBox.style.cursor = "pointer";
      statusBox.onclick = () => {
        try {
          window.location.replace(url);
        } catch (_) {
          window.location.href = url;
        }
      };
    }, redirectHelpDelayMs);
  }

  function buildNativeDeepLinkTarget(next) {
    const callbackUrl = new URL(window.location.href);
    const target = new URL(next);
    callbackUrl.searchParams.forEach((value, key) => {
      if (key === "next" || key === "native") return;
      target.searchParams.set(key, value);
    });
    if (callbackUrl.hash) {
      const hashParams = new URLSearchParams(callbackUrl.hash.replace(/^#/, ""));
      hashParams.forEach((value, key) => {
        if (!key) return;
        target.searchParams.set(key, value);
      });
    }
    return target.toString();
  }

  function shouldRelayNativeOAuthToApp(next, nativeRuntime) {
    return /^workreport:\/\/.+/i.test(String(next || "")) && !nativeRuntime;
  }

  async function bootstrap() {
    const next = resolveNextTarget();
    const nativeRuntime = isNativeRuntime();
    const nativeDeepLink = /^workreport:\/\/.+/i.test(String(next || ""));
    setStatus("Finishing Google sign-in...");

    try {
      if (shouldRelayNativeOAuthToApp(next, nativeRuntime)) {
        const target = buildNativeDeepLinkTarget(next);
        setStatus("Returning to app...");
        openDeepLinkWithRetry(target);
        return;
      }

      await AuthApi.completeOAuthCallback({ lightweight: true });
      AuthApi.markNativeAuthHandoff?.("oauth_handoff");

      if (nativeDeepLink) {
        const target = buildNativeDeepLinkTarget(next);
        setStatus("Opening app...");
        openDeepLinkWithRetry(target);
        return;
      }

      const finalTarget = nativeRuntime ? AuthUi.appUrl() : next;
      setStatus("Opening your workspace...");
      scheduleRedirectHelp(finalTarget, "Sign-in is complete. Tap here if your workspace does not open automatically.");
      try {
        window.sessionStorage.removeItem("wr_auth_next");
      } catch (_) {
      }
      window.location.replace(finalTarget);
    } catch (error) {
      try {
        window.sessionStorage.setItem("wr_auth_next", next);
      } catch (_) {
      }
      console.warn("OAuth callback failed:", error);
      const signinUrl = new URL(AuthUi.authRouteUrl("/signin"));
      signinUrl.searchParams.set("cloud", "auth_required");
      window.location.replace(signinUrl.toString());
    }
  }
})();
