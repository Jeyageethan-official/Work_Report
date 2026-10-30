(function () {
  function applyNativeAuthRuntimeClass() {
    const host = String(window.location.hostname || "").toLowerCase();
    const protocol = String(window.location.protocol || "").toLowerCase();
    const ua = String(navigator.userAgent || "");
    const params = new URLSearchParams(window.location.search);
    const nextHint = String(params.get("next") || "");
    const nativeHint = params.get("native") === "1" || /^workreport:\/\//i.test(nextHint);
    const isAndroidAssetHost = host === "appassets.androidplatform.net";
    const isIosNativeApp = /WorkReportiOSApp/i.test(ua);
    const isNativeScheme = protocol === "app:";
    const isFileMode = protocol === "file:";
    const isNativeRuntime = isFileMode || isAndroidAssetHost || isIosNativeApp || isNativeScheme || nativeHint;
    const isMobileViewport = window.matchMedia("(max-width: 768px)").matches;
    const useNativeMobileAuth = isNativeRuntime && (isMobileViewport || nativeHint);
    document.body.classList.toggle("native-mobile-auth", useNativeMobileAuth);
  }

  function createEyeSvg(open) {
    if (open) {
      return '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6-10-6-10-6Z"/><circle cx="12" cy="12" r="3.2"/></svg>';
    }
    return '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M3 3l18 18"/><path d="M10.7 6.4A11.6 11.6 0 0 1 12 6c6.5 0 10 6 10 6a18.3 18.3 0 0 1-3.2 3.7"/><path d="M6.2 7.7A18.4 18.4 0 0 0 2 12s3.5 6 10 6a11.5 11.5 0 0 0 4.1-.8"/><path d="M9.9 9.9A3.1 3.1 0 0 0 9 12a3.2 3.2 0 0 0 5.2 2.4"/></svg>';
  }

  function toast(message, type) {
    const stack = document.querySelector("[data-toast-stack]") || createToastStack();
    const item = document.createElement("div");
    item.className = `toast ${type || ""}`.trim();
    item.textContent = message;
    stack.appendChild(item);
    setTimeout(() => {
      item.remove();
      if (!stack.children.length) {
        stack.remove();
      }
    }, 3200);
  }

  function createToastStack() {
    const stack = document.createElement("div");
    stack.className = "toast-stack";
    stack.dataset.toastStack = "true";
    document.body.appendChild(stack);
    return stack;
  }

  function setInlineStatus(target, { type, message }) {
    if (!target) return;
    target.className = `status-box show ${type || ""}`.trim();
    target.textContent = message;
  }

  function clearInlineStatus(target) {
    if (!target) return;
    target.className = "status-box";
    target.textContent = "";
  }

  function setBusy(button, busy, defaultText) {
    if (!button) return;
    if (!button.dataset.defaultText) {
      button.dataset.defaultText = defaultText || button.textContent;
    }
    button.disabled = busy;
    button.textContent = busy ? "Please wait..." : button.dataset.defaultText;
  }

  function wirePasswordToggle(button, input) {
    if (!button || !input) return;
    const syncIcon = () => {
      const isHidden = input.type === "password";
      button.setAttribute("aria-label", isHidden ? "Show password" : "Hide password");
      button.innerHTML = createEyeSvg(!isHidden);
      button.classList.add("eye-ready");
    };
    syncIcon();
    button.addEventListener("click", () => {
      const nowPassword = input.type === "password";
      input.type = nowPassword ? "text" : "password";
      syncIcon();
    });
  }

  function getQueryParam(key) {
    return new URLSearchParams(window.location.search).get(key);
  }

  function authCleanPath(pathname) {
    const lower = String(pathname || "").toLowerCase();
    const routeMap = new Map([
      ["/signin", "/signin"],
      ["/signup", "/signup"],
      ["/forgot", "/forgot"],
      ["/reset", "/reset"],
      ["/verify", "/verify"],
      ["/resend-verification", "/resend-verification"],
      ["/callback", "/callback"],
      ["/auth-dashboard", "/auth-dashboard"],
      ["/frontend/auth/signin", "/signin"],
      ["/frontend/auth/signup", "/signup"],
      ["/frontend/auth/forgot", "/forgot"],
      ["/frontend/auth/reset", "/reset"],
      ["/frontend/auth/verify", "/verify"],
      ["/frontend/auth/resend-verification", "/resend-verification"],
      ["/frontend/auth/callback", "/callback"],
      ["/frontend/auth/dashboard", "/auth-dashboard"],
      ["/frontend/auth/signin.html", "/signin"],
      ["/frontend/auth/signup.html", "/signup"],
      ["/frontend/auth/forgot.html", "/forgot"],
      ["/frontend/auth/reset.html", "/reset"],
      ["/frontend/auth/verify.html", "/verify"],
      ["/frontend/auth/resend-verification.html", "/resend-verification"],
      ["/frontend/auth/callback.html", "/callback"],
      ["/frontend/auth/dashboard.html", "/auth-dashboard"]
    ]);
    return routeMap.get(lower) || pathname;
  }

  function canonicalizeAuthRoute() {
    const cleanPath = authCleanPath(window.location.pathname);
    if (cleanPath === window.location.pathname) return;
    const cleanUrl = `${window.location.origin}${cleanPath}${window.location.search}${window.location.hash}`;
    window.history.replaceState({}, "", cleanUrl);
  }

  function authFallbackPath() {
    const path = authCleanPath(window.location.pathname).toLowerCase();
    if (path.endsWith("/reset") && getQueryParam("owner") === "1") return "/admin-control_dashboard";
    const nativeDefault = isNativeRuntime() ? "/app" : "/";
    if (path.endsWith("/signin")) return nativeDefault;
    if (path.endsWith("/signup")) return "/signin";
    if (path.endsWith("/forgot")) return "/signin";
    if (path.endsWith("/reset")) return "/signin";
    if (path.endsWith("/verify")) return "/signin";
    if (path.endsWith("/resend-verification")) return "/signin";
    if (path.endsWith("/callback")) return "/signin";
    if (isNativeRuntime()) return "/app";
    return "/index.html";
  }

  function isSignInPage() {
    return authCleanPath(window.location.pathname).toLowerCase().endsWith("/signin");
  }

  function authBackHomeUrl() {
    if (isNativeRuntime()) {
      const url = new URL(authRouteUrl("/app"));
      url.searchParams.set("fromAuthBack", "1");
      url.hash = "";
      return url.toString();
    }
    const url = new URL(window.location.href);
    url.pathname = "/";
    url.search = "?fromAuthBack=1";
    url.hash = "";
    return url.toString();
  }

  function isNativeRuntime() {
    const host = String(window.location.hostname || "").toLowerCase();
    const protocol = String(window.location.protocol || "").toLowerCase();
    const ua = String(navigator.userAgent || "");
    return (
      protocol === "app:" ||
      protocol === "file:" ||
      host === "appassets.androidplatform.net" ||
      /WorkReportiOSApp/i.test(ua)
    );
  }

  function authRouteUrl(path) {
    if (isNativeRuntime()) {
      const route = authCleanPath(path).toLowerCase();
      const nativeMap = new Map([
        ["/signin", "/frontend/auth/signin.html"],
        ["/signup", "/frontend/auth/signup.html"],
        ["/forgot", "/frontend/auth/forgot.html"],
        ["/reset", "/frontend/auth/reset.html"],
        ["/verify", "/frontend/auth/verify.html"],
        ["/resend-verification", "/frontend/auth/resend-verification.html"],
        ["/callback", "/frontend/auth/callback.html"],
        ["/auth-dashboard", "/frontend/auth/dashboard.html"],
        ["/app", "/app.html"],
        ["/", "/app.html"]
      ]);
      const nativePath = nativeMap.get(route) || path;
      try {
        return new URL(nativePath, window.location.origin + "/").toString();
      } catch (_) {
        return nativePath;
      }
    }
    try {
      return new URL(path, window.location.href).toString();
    } catch (_) {
      return path;
    }
  }

  function appUrl() {
    return authRouteUrl("/app");
  }

  function rewriteNativeLinks() {
    if (!isNativeRuntime()) return;
    document.querySelectorAll("a[href]").forEach((link) => {
      const href = String(link.getAttribute("href") || "").trim();
      if (!href || href.startsWith("#") || href.startsWith("javascript:")) return;
      const clean = authCleanPath(href);
      const authTargets = new Set([
        "/signin",
        "/signup",
        "/forgot",
        "/reset",
        "/verify",
        "/resend-verification",
        "/callback",
        "/auth-dashboard",
        "/",
        "/app"
      ]);
      if (!authTargets.has(clean)) return;
      link.setAttribute("href", authRouteUrl(clean));
    });
  }

  function initAuthBackButton() {
    if (!document.body.classList.contains("page-auth")) return;
    if (authCleanPath(window.location.pathname).toLowerCase().endsWith("/dashboard")) return;

    const panel = document.querySelector(".auth-panel");
    if (!panel) return;

    let btn = panel.querySelector("[data-auth-back-btn]");
    if (!btn) {
      btn = document.createElement("button");
      btn.type = "button";
      btn.className = "auth-back-btn";
      btn.dataset.authBackBtn = "true";
      btn.setAttribute("aria-label", "Go back");
      btn.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M15 18L9 12L15 6"/></svg>';
      panel.prepend(btn);
    }

    if (btn.dataset.authBackBound === "1") return;
    btn.dataset.authBackBound = "1";

    btn.addEventListener("click", () => {
      if (isSignInPage()) {
        window.location.href = authBackHomeUrl();
        return;
      }
      if (isNativeRuntime()) {
        window.location.href = authRouteUrl(authFallbackPath());
        return;
      }
      const hasHistory = window.history.length > 1;
      const sameOriginReferrer = Boolean(document.referrer && document.referrer.startsWith(window.location.origin));
      if (hasHistory && sameOriginReferrer) {
        window.history.back();
        return;
      }
      window.location.href = authRouteUrl(authFallbackPath());
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener(
      "DOMContentLoaded",
      () => {
        applyNativeAuthRuntimeClass();
        canonicalizeAuthRoute();
        rewriteNativeLinks();
        initAuthBackButton();
        document.body.classList.remove("auth-checking");
      },
      { once: true }
    );
  } else {
    applyNativeAuthRuntimeClass();
    canonicalizeAuthRoute();
    rewriteNativeLinks();
    initAuthBackButton();
    document.body.classList.remove("auth-checking");
  }

  window.AuthUi = {
    toast,
    setInlineStatus,
    clearInlineStatus,
    setBusy,
    wirePasswordToggle,
    getQueryParam,
    authRouteUrl,
    appUrl,
    initAuthBackButton
  };
})();
