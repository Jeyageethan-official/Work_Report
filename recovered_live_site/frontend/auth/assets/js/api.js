(function () {
  const cfg = window.WR_APP_CONFIG || {};
  const supabaseClient = window.WRSupabase && window.WRSupabase.client;
  const isAndroidAssetHost = (window.location.hostname || "").toLowerCase() === "appassets.androidplatform.net";
  const isIosNativeApp = /WorkReportiOSApp/i.test(String(navigator.userAgent || ""));
  const appBaseUrl = String(cfg.appBaseUrl || window.location.origin).replace(/\/$/, "");
  const publicWebBaseUrl = String(cfg.publicWebBaseUrl || "https://workreport.online").replace(/\/$/, "");
  const authBaseUrl = publicWebBaseUrl || appBaseUrl;
  const verifyRedirectUrl = `${authBaseUrl}/verify`;
  const resetRedirectUrl = `${authBaseUrl}/reset`;
  const AUTH_STORAGE_KEY = "wr-supabase-auth";
  const NATIVE_AUTH_HANDOFF_KEY = "__wr_native_auth_handoff_v1";
  const readNativeAuthHandoff = () => {
    try {
      const raw = window.sessionStorage.getItem(NATIVE_AUTH_HANDOFF_KEY);
      if (!raw) return null;
      const parsed = JSON.parse(raw);
      const ts = Number(parsed && parsed.ts ? parsed.ts : 0);
      if (!ts || Date.now() - ts > 120000) {
        window.sessionStorage.removeItem(NATIVE_AUTH_HANDOFF_KEY);
        return null;
      }
      return {
        reason: String(parsed && parsed.reason ? parsed.reason : "auth_handoff"),
        ts
      };
    } catch (_) {
      return null;
    }
  };

  const markNativeAuthHandoff = (reason = "auth_handoff") => {
    try {
      window.sessionStorage.setItem(
        NATIVE_AUTH_HANDOFF_KEY,
        JSON.stringify({
          reason: String(reason || "auth_handoff"),
          ts: Date.now()
        })
      );
    } catch (_) {
    }
  };

  const clearNativeAuthHandoff = () => {
    try {
      window.sessionStorage.removeItem(NATIVE_AUTH_HANDOFF_KEY);
    } catch (_) {
    }
  };
  const normalizeNextTarget = (rawNext) => {
    const fallback = `${appBaseUrl}/app`;
    if (!rawNext) return fallback;
    try {
      const decoded = decodeURIComponent(rawNext);
      const url = new URL(decoded, appBaseUrl);
      if (url.origin !== new URL(appBaseUrl).origin) return fallback;
      const path = String(url.pathname || "").toLowerCase();
      if (
        path === "/admin-control" ||
        path.startsWith("/admin-control/") ||
        path === "/admin-control_dashboard" ||
        path.startsWith("/admin-control_dashboard/") ||
        path.startsWith("/frontend/admin/") ||
        path === "/frontend/auth/admin" ||
        path === "/frontend/auth/admin.html"
      ) {
        return fallback;
      }
      return url.toString();
    } catch {
      return fallback;
    }
  };

  if (!supabaseClient) {
    const offlineError = () => {
      const err = new Error("Offline mode: internet connection required for sign in.");
      err.code = "OFFLINE_UNAVAILABLE";
      err.status = 503;
      return err;
    };
    window.AuthApi = {
      normalizeNextTarget,
      async register() { throw offlineError(); },
      async login() { throw offlineError(); },
      async logout() { return { ok: true }; },
      async me() { throw offlineError(); },
      async refresh() { throw offlineError(); },
      async forgotPassword() { throw offlineError(); },
      async consumeAuthCodeFromUrl() { throw offlineError(); },
      async resetPassword() { throw offlineError(); },
      async verifyEmailFromUrl() { throw offlineError(); },
      async resendVerification() { throw offlineError(); },
      async startGoogleRedirect() { throw offlineError(); },
      async completeOAuthCallback() { throw offlineError(); },
      async submitAccessSupportRequest() { throw offlineError(); }
    };
    return;
  }

  const normalizeProvider = (user) => {
    if (!user) return "email";
    const p = user.app_metadata && user.app_metadata.provider;
    return p || "email";
  };

  const readStoredSessionSnapshot = () => {
    try {
      const raw = window.localStorage.getItem(AUTH_STORAGE_KEY);
      if (!raw) return null;
      const parsed = JSON.parse(raw);
      const sessionLike = parsed && (parsed.currentSession || parsed.session || parsed);
      if (!sessionLike || typeof sessionLike !== "object") return null;
      if (!sessionLike.access_token && !sessionLike.refresh_token && !(sessionLike.user && sessionLike.user.id)) {
        return null;
      }
      return sessionLike;
    } catch (_) {
      return null;
    }
  };

  async function restoreUserFromStoredSession() {
    if (!readStoredSessionSnapshot()) return null;
    try {
      const { data, error } = await supabaseClient.auth.refreshSession();
      if (error) throw error;
      return (data && data.session && data.session.user) || (data && data.user) || null;
    } catch (_) {
      return null;
    }
  }

  const getIdentityData = (user) => {
    if (!user || !Array.isArray(user.identities)) return {};
    const identity = user.identities.find((item) => item && item.identity_data);
    return (identity && identity.identity_data) || {};
  };

  const getProviderFullName = (user) => {
    const identityData = getIdentityData(user);
    return (
      identityData.full_name ||
      identityData.name ||
      (user && user.user_metadata && (user.user_metadata.full_name || user.user_metadata.name)) ||
      "User"
    );
  };

  const getProviderAvatarUrl = (user) => {
    const identityData = getIdentityData(user);
    return (
      identityData.avatar_url ||
      identityData.picture ||
      (user && user.user_metadata && user.user_metadata.avatar_url) ||
      (user && user.user_metadata && user.user_metadata.picture) ||
      ""
    );
  };

  const getAvatarUrl = (user, profile) => {
    return (
      (profile && profile.avatar_url) ||
      getProviderAvatarUrl(user) ||
      ""
    );
  };

  const getFullName = (user, profile, extras) => {
    return (
      (extras && extras.fullName) ||
      (profile && profile.full_name) ||
      getProviderFullName(user) ||
      "User"
    );
  };

  const ACCOUNT_DISABLED_NOTICE_KEY = "wr_account_disabled_notice_v1";
  const ACCOUNT_RESTRICTED_MESSAGE = "Your account has been restricted by your administrator. For further assistance, please contact your organization administrator.";

  const persistDisabledAccountNotice = (profile, user, fallbackMessage) => {
    const payload = {
      email: String((profile && profile.email) || (user && user.email) || "").trim().toLowerCase(),
      displayName: String(getFullName(user, profile) || "User").trim() || "User",
      message: String(fallbackMessage || "").trim() || ACCOUNT_RESTRICTED_MESSAGE,
      disabledAt: new Date().toISOString()
    };
    try {
      window.localStorage.setItem(ACCOUNT_DISABLED_NOTICE_KEY, JSON.stringify(payload));
    } catch (_) {
    }
    return payload;
  };

  const getDisabledAccountNotice = () => {
    try {
      const raw = window.localStorage.getItem(ACCOUNT_DISABLED_NOTICE_KEY);
      if (!raw) return null;
      const parsed = JSON.parse(raw);
      if (!parsed || typeof parsed !== "object") return null;
      return {
        email: String(parsed.email || "").trim().toLowerCase(),
        displayName: String(parsed.displayName || "User").trim() || "User",
        message: String(parsed.message || "").trim() || ACCOUNT_RESTRICTED_MESSAGE,
        disabledAt: String(parsed.disabledAt || "").trim()
      };
    } catch (_) {
      return null;
    }
  };

  const clearDisabledAccountNotice = () => {
    try {
      window.localStorage.removeItem(ACCOUNT_DISABLED_NOTICE_KEY);
    } catch (_) {
    }
  };

  const toUserShape = (user, profile) => {
    if (!user) return null;
    const fullName = getFullName(user, profile);

    return {
      id: user.id,
      uid: user.id,
      fullName,
      displayName: fullName,
      email: user.email || (profile && profile.email) || "",
      role:
        (profile && profile.role) ||
        (user && user.app_metadata && user.app_metadata.role) ||
        (user && user.user_metadata && user.user_metadata.role) ||
        "user",
      authProvider: normalizeProvider(user),
      avatarUrl: getAvatarUrl(user, profile),
      isEmailVerified: Boolean(user.email_confirmed_at || (profile && profile.email_verified)),
      isDisabled: Boolean(profile && profile.is_disabled)
    };
  };

  const isRecoverableProfileError = (error) => {
    const status = Number(error && error.status ? error.status : 0);
    const code = String(error && error.code ? error.code : "").toLowerCase();
    const message = String(error && error.message ? error.message : "").toLowerCase();
    return (
      status === 400 ||
      status === 404 ||
      code === "pgrst116" ||
      message === "bad request" ||
      message.includes("bad request") ||
      message.includes("failed to fetch") ||
      message.includes("networkerror")
    );
  };

  const friendlyAuthMessage = (error) => {
    const code = String(error && error.code ? error.code : "");
    const message = String(error && error.message ? error.message : "");

    const table = {
      invalid_credentials: "Invalid email or password.",
      email_not_confirmed: "Please verify your email before signing in.",
      user_already_exists: "An account with this email already exists.",
      weak_password: "Password must be at least 8 characters.",
      signup_disabled: "Sign-up is currently disabled.",
      over_email_send_rate_limit: "Too many requests. Please try again later.",
      ACCOUNT_DISABLED: "Your account access is restricted. Please contact your organization administrator."
    };

    if (table[code]) return table[code];

    if (/email not confirmed/i.test(message)) return table.email_not_confirmed;
    if (/invalid login credentials/i.test(message)) return table.invalid_credentials;
    if (/duplicate key value/i.test(message)) return table.user_already_exists;
    if (/password should be at least/i.test(message)) return table.weak_password;
    if (/account is disabled/i.test(message)) return table.ACCOUNT_DISABLED;

    return message || "Request failed.";
  };

  const withFriendlyError = (error) => {
    const err = new Error(friendlyAuthMessage(error));
    err.code = String(error && error.code ? error.code : "");
    err.status = error && error.status ? error.status : 400;
    err.cause = error;
    return err;
  };

  const friendlyAccessSupportMessage = (error) => {
    const code = String(error && error.code ? error.code : "").trim().toLowerCase();
    const message = String(error && error.message ? error.message : "").trim();
    const lower = message.toLowerCase();

    if (code === "42p01" || lower.includes("submit_access_support_request") || lower.includes("support_messages")) {
      return "Support request setup is not ready yet. Ask the owner to apply the latest access-support SQL patch.";
    }
    if (code === "42501" || lower.includes("permission denied") || lower.includes("row-level security")) {
      return "Support request access is temporarily restricted. Please try again shortly.";
    }
    if (lower.includes("account not found") || lower.includes("user not found")) {
      return "We could not match this email to a Work Report account. Check the email address and try again.";
    }
    if (lower.includes("full name is required")) {
      return "Enter your full name before submitting the support request.";
    }
    if (lower.includes("email is required")) {
      return "Enter your email address before submitting the support request.";
    }
    if (lower.includes("message is required")) {
      return "Briefly describe your issue before submitting the request.";
    }
    if (lower.includes("failed to fetch") || lower.includes("networkerror") || lower.includes("network")) {
      return "Internet connection required to submit the support request.";
    }
    return message || "Support request could not be submitted right now.";
  };

  const withSupportError = (error) => {
    const err = new Error(friendlyAccessSupportMessage(error));
    err.code = String(error && error.code ? error.code : "");
    err.status = error && error.status ? error.status : 400;
    err.cause = error;
    return err;
  };

  const buildGoogleRedirectTo = (nextTarget) => {
    if (isAndroidAssetHost || isIosNativeApp) {
      const callbackUrl = new URL("https://workreport.online/callback");
      callbackUrl.searchParams.set("next", "workreport://auth/callback");
      callbackUrl.searchParams.set("native", "1");
      return callbackUrl.toString();
    }
    const callbackUrl = new URL(`${authBaseUrl}/callback`);
    callbackUrl.searchParams.set("next", nextTarget || `${appBaseUrl}/app`);
    return callbackUrl.toString();
  };

  const isIosStandalonePwa = () => {
    const ua = navigator.userAgent || "";
    const isiOS = /iPad|iPhone|iPod/i.test(ua);
    const standalone =
      (window.matchMedia && window.matchMedia("(display-mode: standalone)").matches) ||
      Boolean(window.navigator && window.navigator.standalone);
    return isiOS && standalone;
  };

  async function upsertProfileFromUser(user, extras) {
    if (!user) return null;
    const fullName = getFullName(user, null, extras);
    const avatarUrl = getAvatarUrl(user, null);

    const payload = {
      id: user.id,
      email: user.email || null,
      full_name: fullName,
      auth_provider: normalizeProvider(user),
      email_verified: Boolean(user.email_confirmed_at),
      avatar_url: avatarUrl || null,
      updated_at: new Date().toISOString()
    };

    const { data, error } = await supabaseClient
      .from("profiles")
      .upsert(payload, { onConflict: "id" })
      .select("id,email,full_name,role,is_disabled,email_verified,avatar_url")
      .single();

    if (error) {
      if ((error.code || "") === "23505") return null;
      throw error;
    }
    return data || null;
  }

  async function fetchProfile(userId) {
    if (!userId) return null;
    const { data, error } = await supabaseClient
      .from("profiles")
      .select("id,email,full_name,role,is_disabled,email_verified,avatar_url")
      .eq("id", userId)
      .maybeSingle();

    if (error) throw error;
    return data || null;
  }

  async function ensureActiveUserProfile(user, extras) {
    let profile = null;
    const nextFullName = getFullName(user, null, extras);
    const nextAvatarUrl = getAvatarUrl(user, null);

    try {
      profile = await fetchProfile(user.id);
    } catch (err) {
      console.warn("Profile fetch skipped during auth bootstrap:", err);
      profile = null;
    }

    if (!profile) {
      try {
        profile = await upsertProfileFromUser(user, extras);
      } catch (err) {
        console.warn("Profile upsert skipped during auth bootstrap:", err);
        profile = null;
      }
    } else {
      const profileFullName = String(profile.full_name || "").trim();
      const profileAvatarUrl = String(profile.avatar_url || "").trim();
      const hasStableProfileName = Boolean(profileFullName && profileFullName !== "User");
      const shouldRefresh =
        (!profileAvatarUrl && !!nextAvatarUrl) ||
        (!hasStableProfileName && nextFullName !== "User");
      if (shouldRefresh) {
        try {
          profile = (await upsertProfileFromUser(user, extras)) || profile;
        } catch (err) {
          console.warn("Profile refresh skipped during auth bootstrap:", err);
        }
      }
    }

    if (profile && profile.is_disabled) {
      persistDisabledAccountNotice(profile, user);
      await supabaseClient.auth.signOut();
      const disabledError = new Error(ACCOUNT_RESTRICTED_MESSAGE);
      disabledError.code = "ACCOUNT_DISABLED";
      throw disabledError;
    }

    return profile;
  }

  async function buildMeResponse(userLike) {
    let authUser = userLike || null;
    if (!authUser) {
      try {
        const session = await window.WRSupabase.getSession();
        authUser = session && session.user ? session.user : null;
      } catch (_) {
        authUser = null;
      }
    }

    if (!authUser) {
      authUser = await restoreUserFromStoredSession();
    }

    if (!authUser) {
      const { data, error } = await supabaseClient.auth.getUser();
      if (error) throw withFriendlyError(error);
      authUser = data && data.user ? data.user : null;
    }

    if (!authUser) {
      const err = new Error("Not authenticated.");
      err.code = "AUTH_REQUIRED";
      err.status = 401;
      throw err;
    }

    let profile = null;
    try {
      profile = await ensureActiveUserProfile(authUser);
    } catch (error) {
      const message = String(error && error.message ? error.message : "").toLowerCase();
      if (message.includes("disabled")) throw error;
      console.warn("Continuing with auth-only profile fallback:", error);
      profile = null;
    }
    const shaped = toUserShape(authUser, profile);
    clearDisabledAccountNotice();

    return {
      ok: true,
      user: shaped
    };
  }

  window.AuthApi = {
    async register(payload) {
      const fullName = String(payload && payload.fullName ? payload.fullName : "").trim();
      const email = String(payload && payload.email ? payload.email : "").trim();
      const password = String(payload && payload.password ? payload.password : "");

      const { data, error } = await supabaseClient.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: verifyRedirectUrl,
          data: {
            full_name: fullName || null
          }
        }
      });

      let profile = null;
      if (error) throw withFriendlyError(error);
      if (data && data.user && data.session) {
        profile = await ensureActiveUserProfile(data.user, { fullName });
      }

      return {
        ok: true,
        user: data && data.user ? toUserShape(data.user, profile) : null,
        session: data ? data.session : null
      };
    },

    async login(payload) {
      const email = String(payload && payload.email ? payload.email : "").trim();
      const password = String(payload && payload.password ? payload.password : "");

      const { data, error } = await supabaseClient.auth.signInWithPassword({
        email,
        password
      });

      if (error) throw withFriendlyError(error);
      const response = await buildMeResponse(data.user);
      markNativeAuthHandoff("password_login");
      return response;
    },

    async logout() {
      const { error } = await supabaseClient.auth.signOut();
      if (error) throw withFriendlyError(error);
      clearNativeAuthHandoff();
      return { ok: true };
    },

    async me() {
      return buildMeResponse();
    },

    async refresh() {
      const { data, error } = await supabaseClient.auth.refreshSession();
      if (error) throw withFriendlyError(error);
      return data;
    },

    async forgotPassword(payload) {
      const email = String(payload && payload.email ? payload.email : "").trim();
      const { error } = await supabaseClient.auth.resetPasswordForEmail(email, {
        redirectTo: resetRedirectUrl
      });
      if (error) throw withFriendlyError(error);
      return { ok: true };
    },

    async consumeAuthCodeFromUrl() {
      try {
        return await window.WRSupabase.consumeUrlSession();
      } catch (error) {
        throw withFriendlyError(error);
      }
    },

    async resetPassword(payload) {
      const password = String(payload && payload.password ? payload.password : "");
      const { data, error } = await supabaseClient.auth.updateUser({ password });
      if (error) throw withFriendlyError(error);
      return data;
    },

    async verifyEmailFromUrl() {
      await this.consumeAuthCodeFromUrl();
      return { ok: true };
    },

    async resendVerification(payload) {
      const email = String(payload && payload.email ? payload.email : "").trim();
      const { error } = await supabaseClient.auth.resend({
        type: "signup",
        email,
        options: {
          emailRedirectTo: verifyRedirectUrl
        }
      });
      if (error) throw withFriendlyError(error);
      return { ok: true };
    },

    async startGoogleRedirect(nextTarget) {
      const safeNext = normalizeNextTarget(nextTarget);
      const options = {
        redirectTo: buildGoogleRedirectTo(safeNext),
        skipBrowserRedirect: true,
        queryParams: {
          prompt: "select_account"
        }
      };

      try {
        window.sessionStorage.setItem("wr_auth_next", safeNext);
      } catch (_) {
      }

      const { data, error } = await supabaseClient.auth.signInWithOAuth({
        provider: "google",
        options
      });

      if (error) throw withFriendlyError(error);

      const redirectUrl = String(data && data.url ? data.url : "").trim();
      if (!redirectUrl) {
        throw new Error("Google sign-in could not be started.");
      }

      window.location.replace(redirectUrl);
      return { ok: true };
    },

    normalizeNextTarget,
    getDisabledAccountNotice,
    clearDisabledAccountNotice,
    markNativeAuthHandoff,
    clearNativeAuthHandoff,
    hasNativeAuthHandoff: () => Boolean(readNativeAuthHandoff()),

    async submitAccessSupportRequest(payload) {
      const email = String(payload && payload.email ? payload.email : "").trim().toLowerCase();
      const fullName = String(payload && payload.fullName ? payload.fullName : "").trim();
      const issueType = String(payload && payload.issueType ? payload.issueType : "account_disabled").trim().toLowerCase();
      const accountStatus = String(payload && payload.accountStatus ? payload.accountStatus : "Disabled").trim();
      const message = String(payload && payload.message ? payload.message : "").trim();
      const { data, error } = await supabaseClient.rpc("submit_access_support_request", {
        p_email: email,
        p_full_name: fullName,
        p_issue_type: issueType,
        p_message: message,
        p_account_status: accountStatus
      });
      if (error) throw withSupportError(error);
      return {
        ok: true,
        request: Array.isArray(data) ? (data[0] || null) : data || null
      };
    },

    async completeOAuthCallback(options) {
      const lightweight = Boolean(options && options.lightweight);
      const session = await this.consumeAuthCodeFromUrl();
      markNativeAuthHandoff("oauth_callback");
      if (lightweight) return session;
      return buildMeResponse(session && session.user ? session.user : null);
    }
  };
})();
