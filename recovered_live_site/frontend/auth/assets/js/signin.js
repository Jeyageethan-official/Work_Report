(function () {
  const form = document.querySelector("#signin-form");
  if (!form) return;

  const statusBox = document.querySelector("#form-status");
  const submitBtn = document.querySelector("#signin-submit");
  const googleBtn = document.querySelector("#google-signin-btn");
  const forgotLink = document.querySelector("#forgot-link");
  const passwordInput = document.querySelector("#signin-password");
  const resendWrap = document.querySelector("#resend-verification-wrap");
  const disabledCard = document.querySelector("#disabled-account-card");
  const disabledMessage = document.querySelector("#disabled-account-message");
  const disabledMeta = document.querySelector("#disabled-account-meta");
  const nextTarget = resolveNextTarget();
  const DISABLED_CARD_MESSAGE = "Your account is currently disabled. If you need access restored, contact your administrator and our team will review your request within 24 hours.";
  const DISABLED_CARD_STATUS = "Account status: Disabled";

  AuthUi.wirePasswordToggle(document.querySelector("#toggle-signin-password"), passwordInput);

  form.addEventListener("submit", onSubmit);
  googleBtn.addEventListener("click", onGoogleSignIn);
  forgotLink.addEventListener("click", onForgotPassword);

  bootstrap();

  function resolveNextTarget() {
    return AuthApi.normalizeNextTarget(
      AuthUi.getQueryParam("next") ||
      window.sessionStorage.getItem("wr_auth_next") ||
      AuthUi.appUrl()
    );
  }

  async function bootstrap() {
    toggleResend(false);
    hideDisabledCard();

    try {
      await AuthApi.me();
      AuthApi.markNativeAuthHandoff?.("existing_session");
      AuthApi.clearDisabledAccountNotice?.();
      window.location.replace(nextTarget);
      return;
    } catch (_) {
      // signed out
    } finally {
      document.body.classList.remove("auth-checking");
    }

    showCloudStateMessage(String(AuthUi.getQueryParam("cloud") || "").trim().toLowerCase());
  }

  function showCloudStateMessage(cloudState) {
    if (cloudState === "startup_timeout" || cloudState === "auth_required") {
      AuthUi.setInlineStatus(statusBox, { type: "error", message: "Please sign in to continue." });
      return;
    }

    if (cloudState === "session_expired") {
      AuthUi.setInlineStatus(statusBox, { type: "error", message: "Your session expired. Please sign in again." });
      return;
    }

    if (cloudState === "account_disabled") {
      showDisabledCard();
      AuthUi.setInlineStatus(statusBox, {
        type: "error",
        message: "Your account access is restricted. Contact your administrator to restore access."
      });
      return;
    }

    if (cloudState === "email_not_confirmed") {
      toggleResend(true);
      AuthUi.setInlineStatus(statusBox, {
        type: "error",
        message: "Please verify your email before signing in."
      });
    }
  }

  function onForgotPassword(event) {
    event.preventDefault();
    window.location.href = AuthUi.authRouteUrl("/forgot");
  }

  async function onSubmit(event) {
    event.preventDefault();
    AuthUi.clearInlineStatus(statusBox);
    toggleResend(false);
    hideDisabledCard();

    const email = String(form.email.value || "").trim();
    const password = String(form.password.value || "");

    if (!email || !password) {
      AuthUi.setInlineStatus(statusBox, { type: "error", message: "Email and password are required." });
      return;
    }

    AuthUi.setBusy(submitBtn, true, "Sign In");

    try {
      await AuthApi.login({ email, password });
      try {
        window.sessionStorage.removeItem("wr_auth_next");
      } catch (_) {
      }
      window.location.replace(nextTarget);
    } catch (error) {
      AuthUi.setInlineStatus(statusBox, { type: "error", message: error.message || "Sign-in failed." });
      if (isDisabledError(error)) showDisabledCard(email);
      if (shouldShowResend(error)) toggleResend(true);
    } finally {
      AuthUi.setBusy(submitBtn, false, "Sign In");
    }
  }

  async function onGoogleSignIn() {
    AuthUi.clearInlineStatus(statusBox);
    toggleResend(false);
    AuthUi.setBusy(googleBtn, true, "Continue with Google");

    try {
      await AuthApi.startGoogleRedirect(nextTarget);
    } catch (error) {
      AuthUi.setInlineStatus(statusBox, { type: "error", message: error.message || "Google sign-in failed." });
      AuthUi.setBusy(googleBtn, false, "Continue with Google");
    }
  }

  function toggleResend(show) {
    if (!resendWrap) return;
    resendWrap.hidden = !show;
  }

  function shouldShowResend(error) {
    const code = String(error && error.code ? error.code : "").toLowerCase();
    const message = String(error && error.message ? error.message : "").toLowerCase();
    return code === "email_not_confirmed" || message.includes("verify your email") || message.includes("email not confirmed");
  }

  function isDisabledError(error) {
    const code = String(error && error.code ? error.code : "").toLowerCase();
    const message = String(error && error.message ? error.message : "").toLowerCase();
    return code === "account_disabled" || message.includes("disabled by the owner");
  }

  function showDisabledCard(fallbackEmail = "") {
    if (!disabledCard) return;
    const notice = AuthApi.getDisabledAccountNotice?.() || null;
    const email = String((notice && notice.email) || fallbackEmail || "").trim().toLowerCase();
    disabledCard.hidden = false;
    if (disabledMessage) disabledMessage.textContent = DISABLED_CARD_MESSAGE;
    if (disabledMeta) {
      disabledMeta.textContent = email ? `${DISABLED_CARD_STATUS} - ${email}` : DISABLED_CARD_STATUS;
    }
  }

  function hideDisabledCard() {
    if (!disabledCard) return;
    disabledCard.hidden = true;
  }
})();
