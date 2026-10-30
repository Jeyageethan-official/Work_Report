(function () {
  const form = document.querySelector("#resend-form");
  if (!form) return;

  const statusBox = document.querySelector("#form-status");
  const submitBtn = document.querySelector("#resend-submit");

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    AuthUi.clearInlineStatus(statusBox);

    const email = form.email.value.trim();
    if (!email.includes("@")) {
      AuthUi.setInlineStatus(statusBox, { type: "error", message: "Please enter a valid email." });
      return;
    }

    AuthUi.setBusy(submitBtn, true, "Resend Verification");
    try {
      await AuthApi.resendVerification({ email });
      AuthUi.setInlineStatus(statusBox, {
        type: "success",
        message: "If eligible, a new verification email has been sent."
      });
      form.reset();
    } catch (error) {
      AuthUi.setInlineStatus(statusBox, { type: "error", message: error.message || "Unable to resend." });
    } finally {
      AuthUi.setBusy(submitBtn, false, "Resend Verification");
    }
  });
})();
