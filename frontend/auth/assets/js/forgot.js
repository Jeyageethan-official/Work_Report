(function () {
  const form = document.querySelector("#forgot-form");
  if (!form) return;

  const statusBox = document.querySelector("#form-status");
  const submitBtn = document.querySelector("#forgot-submit");

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    AuthUi.clearInlineStatus(statusBox);

    const email = form.email.value.trim();
    if (!email.includes("@")) {
      AuthUi.setInlineStatus(statusBox, { type: "error", message: "Please enter a valid email." });
      return;
    }

    AuthUi.setBusy(submitBtn, true, "Send Reset Link");
    try {
      await AuthApi.forgotPassword({ email });
      AuthUi.setInlineStatus(statusBox, {
        type: "success",
        message: "If the email exists, a reset link has been sent."
      });
      form.reset();
    } catch (error) {
      AuthUi.setInlineStatus(statusBox, { type: "error", message: error.message || "Unable to send reset link." });
    } finally {
      AuthUi.setBusy(submitBtn, false, "Send Reset Link");
    }
  });
})();
