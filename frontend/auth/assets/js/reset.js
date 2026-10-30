(function () {
  const form = document.querySelector("#reset-form");
  if (!form) return;

  const statusBox = document.querySelector("#form-status");
  const submitBtn = document.querySelector("#reset-submit");
  const heading = document.querySelector(".auth-head h1");
  const subheading = document.querySelector(".auth-head p");
  const brandTitle = document.querySelector(".brand-title");
  const brandCopy = document.querySelector(".brand-copy");
  const ownerHint = document.querySelector("#owner-reset-hint");
  const OWNER_EMAIL = "mailworkreport@gmail.com";
  let ownerMode = new URL(window.location.href).searchParams.get("owner") === "1";
  const ownerLoginUrl = AuthUi.authRouteUrl("/admin-control_dashboard");

  AuthUi.wirePasswordToggle(document.querySelector("#toggle-reset-password"), document.querySelector("#reset-password"));
  AuthUi.wirePasswordToggle(document.querySelector("#toggle-reset-confirm"), document.querySelector("#reset-confirm"));

  let resetSessionReady = false;

  if (ownerMode) applyOwnerMode();

  initialize();

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    AuthUi.clearInlineStatus(statusBox);

    if (!resetSessionReady) {
      AuthUi.setInlineStatus(statusBox, {
        type: "error",
        message: "Reset link is invalid or expired. Request a new reset email."
      });
      return;
    }

    const password = form.password.value;
    const confirmPassword = form.confirmPassword.value;

    if (password.length < 8) {
      AuthUi.setInlineStatus(statusBox, { type: "error", message: "Password must be at least 8 characters." });
      return;
    }

    if (password !== confirmPassword) {
      AuthUi.setInlineStatus(statusBox, { type: "error", message: "Passwords do not match." });
      return;
    }

    const submitLabel = ownerMode ? "Save Owner Password" : "Reset Password";
    AuthUi.setBusy(submitBtn, true, submitLabel);
    try {
      await AuthApi.resetPassword({ password });
      AuthUi.setInlineStatus(statusBox, {
        type: "success",
        message: ownerMode
          ? "Owner password updated successfully. Redirecting to owner sign in..."
          : "Password updated successfully. Redirecting to sign in..."
      });
      window.setTimeout(() => {
        const target = new URL(ownerMode ? ownerLoginUrl : AuthUi.authRouteUrl("/signin"));
        if (ownerMode) {
          target.searchParams.set("owner_reset", "success");
        } else {
          target.searchParams.set("cloud", "session_expired");
        }
        window.location.href = target.toString();
      }, 1200);
    } catch (error) {
      AuthUi.setInlineStatus(statusBox, { type: "error", message: error.message || "Reset failed." });
    } finally {
      AuthUi.setBusy(submitBtn, false, submitLabel);
    }
  });

  async function initialize() {
    const url = new URL(window.location.href);
    const hasResetParams =
      url.searchParams.has("code") ||
      (url.searchParams.has("token_hash") && url.searchParams.has("type")) ||
      window.location.hash.includes("access_token");

    if (!hasResetParams) {
      resetSessionReady = false;
      submitBtn.disabled = true;
      AuthUi.setInlineStatus(statusBox, {
        type: "error",
        message: "Invalid reset link. Request a new password reset email."
      });
      return;
    }

    try {
      const session = await AuthApi.consumeAuthCodeFromUrl();
      await hydrateOwnerMode(session);
      resetSessionReady = true;
      AuthUi.setInlineStatus(statusBox, {
        type: "success",
        message: ownerMode
          ? "Owner reset link verified. Enter the new password."
          : "Reset link verified. Enter your new password."
      });
    } catch (error) {
      resetSessionReady = false;
      submitBtn.disabled = true;
      AuthUi.setInlineStatus(statusBox, {
        type: "error",
        message: error.message || "Invalid reset link. Request a new one."
      });
    }
  }

  function applyOwnerMode() {
    document.body.classList.add("owner-reset-mode");
    document.title = "Owner Reset | Work Report";
    if (heading) heading.textContent = "Reset owner password";
    if (subheading) subheading.textContent = "Set a new password for the Work Report owner console.";
    if (brandTitle) brandTitle.textContent = "Owner console password reset.";
    if (brandCopy) brandCopy.textContent = "This secure reset is reserved for the owner account and returns to the owner dashboard login.";
    if (submitBtn) {
      submitBtn.textContent = "Save Owner Password";
      submitBtn.dataset.defaultText = "Save Owner Password";
    }
    if (ownerHint) ownerHint.hidden = false;
  }

  async function hydrateOwnerMode(session) {
    if (ownerMode) {
      applyOwnerMode();
      return;
    }

    const sessionUser = session && session.user ? session.user : null;
    if (isOwnerEmail(sessionUser && sessionUser.email)) {
      ownerMode = true;
      applyOwnerMode();
      return;
    }

    if (!window.WRSupabase || typeof window.WRSupabase.getUser !== "function") return;

    try {
      const authUser = await window.WRSupabase.getUser();
      if (isOwnerEmail(authUser && authUser.email)) {
        ownerMode = true;
        applyOwnerMode();
      }
    } catch (_) {
      // Ignore owner auto-detect failures and keep standard reset UI.
    }
  }

  function isOwnerEmail(value) {
    return String(value || "").trim().toLowerCase() === OWNER_EMAIL;
  }
})();
