(function () {
  const statusBox = document.querySelector("#verify-status");

  initialize();

  async function initialize() {
    if (!statusBox) return;

    const quickStatus = AuthUi.getQueryParam("status");
    if (quickStatus === "success") {
      AuthUi.setInlineStatus(statusBox, { type: "success", message: "Email verified successfully. You can sign in now." });
      return;
    }

    if (quickStatus === "failed") {
      AuthUi.setInlineStatus(statusBox, { type: "error", message: "Verification link is invalid or expired." });
      return;
    }

    const url = new URL(window.location.href);
    const hasAuthToken =
      url.searchParams.has("code") ||
      (url.searchParams.has("token_hash") && url.searchParams.has("type")) ||
      window.location.hash.includes("access_token");

    if (!hasAuthToken) {
      AuthUi.setInlineStatus(statusBox, {
        type: "info",
        message: "Open the verification link from your email to confirm your account."
      });
      return;
    }

    AuthUi.setInlineStatus(statusBox, { type: "success", message: "Verifying your email..." });

    try {
      await AuthApi.verifyEmailFromUrl();
      AuthUi.setInlineStatus(statusBox, {
        type: "success",
        message: "Email verified. You can sign in now."
      });
    } catch (error) {
      AuthUi.setInlineStatus(statusBox, {
        type: "error",
        message: error.message || "Verification failed."
      });
    }
  }
})();
