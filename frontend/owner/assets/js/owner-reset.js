(function () {
  const supabase = window.WRSupabase && window.WRSupabase.client;
  const form = document.querySelector("#owner-reset-form");
  if (!form || !supabase || !window.AuthUi) return;

  const OWNER_DEFAULT_EMAIL = "mailworkreport@gmail.com";
  const cfg = window.WR_APP_CONFIG || {};
  const statusBox = document.querySelector("#owner-reset-status");
  const submitBtn = document.querySelector("#owner-reset-submit");
  const authBaseUrl = String(cfg.publicWebBaseUrl || "https://workreport.online").replace(/\/$/, "");
  const ownerLoginUrl = `${authBaseUrl}/admin-control_dashboard`;

  let resetSessionReady = false;

  window.AuthUi.wirePasswordToggle(
    document.querySelector("#toggle-owner-reset-password"),
    document.querySelector("#owner-reset-password")
  );
  window.AuthUi.wirePasswordToggle(
    document.querySelector("#toggle-owner-reset-confirm"),
    document.querySelector("#owner-reset-confirm")
  );

  initialize();

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    window.AuthUi.clearInlineStatus(statusBox);

    if (!resetSessionReady) {
      window.AuthUi.setInlineStatus(statusBox, {
        type: "error",
        message: "Reset admin password link is invalid or expired. Request a new owner reset email."
      });
      return;
    }

    const password = String(form.password.value || "");
    const confirmPassword = String(form.confirmPassword.value || "");

    if (password.length < 8) {
      window.AuthUi.setInlineStatus(statusBox, {
        type: "error",
        message: "Password must be at least 8 characters."
      });
      return;
    }

    if (password !== confirmPassword) {
      window.AuthUi.setInlineStatus(statusBox, {
        type: "error",
        message: "Passwords do not match."
      });
      return;
    }

    window.AuthUi.setBusy(submitBtn, true, "Save Admin Password");

    try {
      const { error } = await supabase.auth.updateUser({ password });
      if (error) throw error;
      await supabase.auth.signOut().catch(() => {});
      window.AuthUi.setInlineStatus(statusBox, {
        type: "success",
        message: "Reset admin password complete. Redirecting to owner login..."
      });
      window.setTimeout(() => {
        const nextUrl = new URL(ownerLoginUrl);
        nextUrl.searchParams.set("owner_reset", "success");
        window.location.href = nextUrl.toString();
      }, 1200);
    } catch (error) {
      window.AuthUi.setInlineStatus(statusBox, {
        type: "error",
        message: mapOwnerResetError(error)
      });
    } finally {
      window.AuthUi.setBusy(submitBtn, false, "Save Admin Password");
    }
  });

  async function initialize() {
    const url = new URL(window.location.href);
    const hasResetParams =
      url.searchParams.has("code") ||
      (url.searchParams.has("token_hash") && url.searchParams.has("type")) ||
      window.location.hash.includes("access_token");

    if (!hasResetParams) {
      submitBtn.disabled = true;
      window.AuthUi.setInlineStatus(statusBox, {
        type: "error",
        message: "Invalid owner reset link. Request a new reset admin password email."
      });
      return;
    }

    try {
      await window.WRSupabase.consumeUrlSession();
      const session = await window.WRSupabase.getSession();
      const sessionUser = session && session.user ? session.user : null;
      const resetEmail = String(sessionUser && sessionUser.email ? sessionUser.email : "").trim().toLowerCase();

      if (resetEmail && resetEmail !== OWNER_DEFAULT_EMAIL.toLowerCase()) {
        submitBtn.disabled = true;
        window.AuthUi.setInlineStatus(statusBox, {
          type: "error",
          message: "This reset link is not for the owner account."
        });
        return;
      }

      resetSessionReady = true;
      window.AuthUi.setInlineStatus(statusBox, {
        type: "success",
        message: "Reset admin password link verified. Enter the new password."
      });
    } catch (error) {
      submitBtn.disabled = true;
      window.AuthUi.setInlineStatus(statusBox, {
        type: "error",
        message: mapOwnerResetError(error)
      });
    }
  }

  function mapOwnerResetError(error) {
    const code = String(error && error.code ? error.code : "").toLowerCase();
    const message = String(error && error.message ? error.message : "").trim();

    if (code === "auth_session_missing" || /invalid/i.test(message) || /expired/i.test(message)) {
      return "Reset admin password link is invalid or expired. Request a new one.";
    }
    if (/password/i.test(message) && /least/i.test(message)) {
      return "Password must be at least 8 characters.";
    }
    return message || "Owner reset failed.";
  }
})();
