(function () {
  const form = document.querySelector("#signup-form");
  if (!form) return;

  const statusBox = document.querySelector("#form-status");
  const submitBtn = document.querySelector("#signup-submit");

  AuthUi.wirePasswordToggle(document.querySelector("#toggle-signup-password"), document.querySelector("#signup-password"));
  AuthUi.wirePasswordToggle(document.querySelector("#toggle-signup-confirm"), document.querySelector("#signup-confirm"));

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    AuthUi.clearInlineStatus(statusBox);

    const payload = {
      fullName: form.fullName.value.trim(),
      email: form.email.value.trim(),
      password: form.password.value,
      confirmPassword: form.confirmPassword.value
    };

    if (!payload.fullName || payload.fullName.length < 2) {
      AuthUi.setInlineStatus(statusBox, { type: "error", message: "Full name must be at least 2 characters." });
      return;
    }

    if (!payload.email.includes("@")) {
      AuthUi.setInlineStatus(statusBox, { type: "error", message: "Please enter a valid email." });
      return;
    }

    if (payload.password.length < 8) {
      AuthUi.setInlineStatus(statusBox, { type: "error", message: "Password must be at least 8 characters." });
      return;
    }

    if (payload.password !== payload.confirmPassword) {
      AuthUi.setInlineStatus(statusBox, { type: "error", message: "Passwords do not match." });
      return;
    }

    AuthUi.setBusy(submitBtn, true, "Create Account");
    try {
      const result = await AuthApi.register(payload);
      if (result && result.session) {
        AuthApi.markNativeAuthHandoff?.("signup_session");
        AuthUi.setInlineStatus(statusBox, {
          type: "success",
          message: "Account created. Redirecting to app..."
        });
        window.setTimeout(() => {
          window.location.href = AuthUi.appUrl();
        }, 600);
        return;
      }

      AuthUi.setInlineStatus(statusBox, {
        type: "success",
        message: "Account created. Check your email to verify your account."
      });
      form.reset();
    } catch (error) {
      AuthUi.setInlineStatus(statusBox, { type: "error", message: error.message || "Sign-up failed." });
    } finally {
      AuthUi.setBusy(submitBtn, false, "Create Account");
    }
  });
})();
