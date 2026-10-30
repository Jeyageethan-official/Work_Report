(function () {
  if (!document.body || !document.body.classList.contains("page-auth")) return;

  const AUTH_EMAIL_INPUT_IDS = ["signin-email", "signup-email", "forgot-email", "resend-email"];
  const AUTH_NAME_INPUT_IDS = ["signup-fullname"];
  const ACCOUNT_STATUS_DISABLED = "Disabled";
  const ACCOUNT_STATUS_SUPPORT = "Needs Review";
  const SUPPORT_SUCCESS_MESSAGE = "Your request has been submitted successfully. Our team will get back to you within 24 hours.";
  const ADMIN_CONTACT_EMAIL = String(
    (window.WR_APP_CONFIG && window.WR_APP_CONFIG.ownerContactEmail) ||
    "mailworkreport@gmail.com"
  ).trim();

  let supportSubmitting = false;
  let supportContext = "general";
  let supportHideTimer = 0;

  ensureSupportUi();

  const launcher = document.querySelector("#auth-support-launcher");
  const disabledContactBtn = document.querySelector("#disabled-account-contact");
  const supportModal = document.querySelector("#access-support-modal");
  const supportForm = document.querySelector("#access-support-form");
  const supportStatus = document.querySelector("#access-support-status");
  const supportCloseBtn = document.querySelector("#access-support-close");
  const supportCancelBtn = document.querySelector("#access-support-cancel");
  const supportSubmitBtn = document.querySelector("#access-support-submit");
  const supportFullNameInput = document.querySelector("#access-support-full-name");
  const supportEmailInput = document.querySelector("#access-support-email");
  const supportAccountStatusInput = document.querySelector("#access-support-account-status");
  const supportIssueTypeInput = document.querySelector("#access-support-issue-type");
  const supportMessageInput = document.querySelector("#access-support-message");
  const supportCount = document.querySelector("#access-support-count");
  const supportLauncherLabel = document.querySelector("#auth-support-launcher-label");

  if (!supportModal || !supportForm || !supportCancelBtn || !supportSubmitBtn) return;

  launcher && launcher.addEventListener("click", () => openSupportModal({ context: "general" }));
  disabledContactBtn && disabledContactBtn.addEventListener("click", () => openSupportModal({ context: "disabled" }));
  supportCloseBtn && supportCloseBtn.addEventListener("click", () => hideSupportModal());
  supportCancelBtn.addEventListener("click", () => hideSupportModal());
  supportForm.addEventListener("submit", onSupportSubmit);
  supportMessageInput && supportMessageInput.addEventListener("input", updateSupportCount);
  supportModal.addEventListener("click", (event) => {
    if (!supportSubmitting && event.target && event.target.dataset && event.target.dataset.supportClose === "backdrop") {
      hideSupportModal();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !supportModal.hidden && !supportSubmitting) {
      hideSupportModal();
    }
  });

  updateLauncherLabel();
  updateSupportCount();
  window.addEventListener("resize", updateLauncherLabel, { passive: true });

  function ensureSupportUi() {
    if (!document.querySelector("#access-support-modal")) {
      document.body.insertAdjacentHTML("beforeend", buildSupportModalMarkup());
    }

    if (!document.querySelector("#auth-support-launcher")) {
      const authShell = document.querySelector(".auth-shell");
      if (authShell) {
        authShell.insertAdjacentHTML("beforeend", buildSupportLauncherMarkup());
      } else {
        document.body.insertAdjacentHTML("beforeend", buildSupportLauncherMarkup());
      }
    }
  }

  function buildSupportLauncherMarkup() {
    return `
      <button
        id="auth-support-launcher"
        class="auth-support-launcher"
        type="button"
        aria-label="Open support"
        title="Contact support"
      >
        <span class="auth-support-launcher-icon" aria-hidden="true">
          <svg viewBox="0 0 24 24" focusable="false">
            <path d="M12 3a8 8 0 0 0-8 8v4.5A2.5 2.5 0 0 0 6.5 18H8v-7H6a6 6 0 1 1 12 0h-2v7h1.5A2.5 2.5 0 0 0 20 15.5V11a8 8 0 0 0-8-8Zm-3 9.25h6v4.25a1.5 1.5 0 0 1-1.5 1.5h-3A1.5 1.5 0 0 1 9 16.5Z"/>
          </svg>
        </span>
        <span id="auth-support-launcher-label" class="auth-support-launcher-label">Support</span>
      </button>
    `;
  }

  function buildSupportModalMarkup() {
    return `
      <section id="access-support-modal" class="auth-support-modal" hidden aria-hidden="true" role="dialog" aria-modal="true" aria-labelledby="access-support-title">
        <div class="auth-support-modal-backdrop" data-support-close="backdrop"></div>
        <div class="auth-support-modal-card" role="document">
          <div class="auth-support-modal-head">
            <div class="auth-support-head-copy">
              <span class="auth-support-modal-kicker">Support request</span>
              <h2 id="access-support-title">Contact Support</h2>
              <p>Share your issue and our team will review it and respond within 24 hours.</p>
            </div>
            <button id="access-support-close" class="auth-support-close" type="button" aria-label="Close support panel">
              <svg viewBox="0 0 20 20" focusable="false" aria-hidden="true">
                <path d="M5.22 5.22a.75.75 0 0 1 1.06 0L10 8.94l3.72-3.72a.75.75 0 1 1 1.06 1.06L11.06 10l3.72 3.72a.75.75 0 1 1-1.06 1.06L10 11.06l-3.72 3.72a.75.75 0 0 1-1.06-1.06L8.94 10 5.22 6.28a.75.75 0 0 1 0-1.06Z"></path>
              </svg>
            </button>
          </div>

          <form id="access-support-form" class="auth-support-form" novalidate>
            <div class="auth-support-grid">
              <div class="field">
                <label for="access-support-full-name">Full Name</label>
                <div class="input-icon-wrap">
                  <span class="input-icon">
                    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                  </span>
                  <input id="access-support-full-name" name="full_name" type="text" maxlength="80" autocomplete="name" required />
                </div>
              </div>

              <div class="field">
                <label for="access-support-email">Email Address</label>
                <div class="input-icon-wrap">
                  <span class="input-icon">
                    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                  </span>
                  <input id="access-support-email" name="email" type="email" maxlength="160" autocomplete="email" required />
                </div>
              </div>

              <div class="field">
                <label for="access-support-account-status">Account Status</label>
                <div class="input-icon-wrap">
                  <span class="input-icon">
                    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                  </span>
                  <select id="access-support-account-status" name="account_status" required>
                    <option value="Needs Review">Needs Review</option>
                    <option value="Disabled">Disabled</option>
                    <option value="Access Requested">Access Requested</option>
                    <option value="Login Review">Login Review</option>
                  </select>
                </div>
              </div>

              <div class="field">
                <label for="access-support-issue-type">Issue Type</label>
                <div class="input-icon-wrap">
                  <span class="input-icon">
                    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
                  </span>
                  <select id="access-support-issue-type" name="issue_type" required>
                    <option value="login_issue">Login Issue</option>
                    <option value="account_disabled">Account Disabled</option>
                    <option value="access_request">Access Request</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>

              <div class="field auth-support-field-span">
                <label for="access-support-message">Message / Description</label>
                <div class="input-icon-wrap textarea-wrap">
                  <span class="input-icon textarea-icon">
                    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
                  </span>
                  <textarea id="access-support-message" name="message" rows="6" maxlength="1200" placeholder="Describe your issue clearly..." required></textarea>
                </div>
                <div class="auth-support-field-meta">
                  <span>Support response time: Within 24 hours</span>
                  <span id="access-support-count" class="auth-support-count">0 / 1200</span>
                </div>
              </div>
            </div>

            <div id="access-support-status" class="status-box auth-support-status" role="status" aria-live="polite"></div>

            <div class="auth-support-actions">
              <div class="auth-support-note">
                <strong>Production support</strong>
                <span>We review every request and respond within 24 hours.</span>
              </div>
              <div class="auth-support-action-row">
                <button id="access-support-cancel" class="btn btn-secondary" type="button">Cancel</button>
                <button id="access-support-submit" class="btn btn-primary" type="submit">Submit Request</button>
              </div>
            </div>
          </form>
        </div>
      </section>
    `;
  }

  async function onSupportSubmit(event) {
    event.preventDefault();
    if (supportSubmitting) return;

    const email = String(supportEmailInput && supportEmailInput.value || "").trim().toLowerCase();
    const fullName = String(supportFullNameInput && supportFullNameInput.value || "").trim();
    const issueType = String(supportIssueTypeInput && supportIssueTypeInput.value || "login_issue").trim().toLowerCase();
    const accountStatus = String(supportAccountStatusInput && supportAccountStatusInput.value || ACCOUNT_STATUS_SUPPORT).trim();
    const message = String(supportMessageInput && supportMessageInput.value || "").trim();

    AuthUi.clearInlineStatus(supportStatus);

    if (!fullName) {
      AuthUi.setInlineStatus(supportStatus, { type: "error", message: "Enter your full name to continue." });
      supportFullNameInput && supportFullNameInput.focus();
      return;
    }

    if (!email) {
      AuthUi.setInlineStatus(supportStatus, { type: "error", message: "Enter your email address to continue." });
      supportEmailInput && supportEmailInput.focus();
      return;
    }

    if (!message) {
      AuthUi.setInlineStatus(supportStatus, { type: "error", message: "Briefly describe your issue before submitting." });
      supportMessageInput && supportMessageInput.focus();
      return;
    }

    supportSubmitting = true;
    setSupportBusy(true);

    try {
      const result = await AuthApi.submitAccessSupportRequest({
        email,
        fullName,
        issueType,
        accountStatus,
        message
      });
      const ticketId = String(result && result.request && result.request.id ? result.request.id : "").trim();
      AuthUi.setInlineStatus(supportStatus, {
        type: "success",
        message: ticketId
          ? `${SUPPORT_SUCCESS_MESSAGE} Ticket ID: ${ticketId.slice(0, 8).toUpperCase()}.`
          : SUPPORT_SUCCESS_MESSAGE
      });
      if (supportMessageInput) supportMessageInput.value = "";
      if (supportIssueTypeInput) supportIssueTypeInput.value = supportContext === "disabled" ? "account_disabled" : "login_issue";
      updateSupportCount();
    } catch (error) {
      AuthUi.setInlineStatus(supportStatus, {
        type: "error",
        message: error.message || `Support request could not be submitted right now. You can still contact ${ADMIN_CONTACT_EMAIL}.`
      });
    } finally {
      supportSubmitting = false;
      setSupportBusy(false);
    }
  }

  function openSupportModal(options = {}) {
    supportContext = options.context === "disabled" || isDisabledContext() ? "disabled" : "general";
    prefillSupportForm(options.fallbackEmail || "");
    window.clearTimeout(supportHideTimer);
    supportModal.classList.remove("is-closing");
    AuthUi.clearInlineStatus(supportStatus);
    supportModal.hidden = false;
    supportModal.setAttribute("aria-hidden", "false");
    document.body.classList.add("auth-modal-open");
    window.requestAnimationFrame(() => {
      supportModal.classList.add("is-open");
    });
    updateSupportCount();

    window.setTimeout(() => {
      if (supportFullNameInput && !supportFullNameInput.value.trim()) {
        supportFullNameInput.focus();
        return;
      }
      if (supportEmailInput && !supportEmailInput.value.trim()) {
        supportEmailInput.focus();
        return;
      }
      if (supportMessageInput) supportMessageInput.focus();
    }, 30);
  }

  function hideSupportModal() {
    if (supportSubmitting) return;
    supportModal.classList.remove("is-open");
    supportModal.classList.add("is-closing");
    document.body.classList.remove("auth-modal-open");
    if (!supportSubmitting) AuthUi.clearInlineStatus(supportStatus);
    window.clearTimeout(supportHideTimer);
    supportHideTimer = window.setTimeout(() => {
      if (supportModal.classList.contains("is-open")) return;
      supportModal.hidden = true;
      supportModal.setAttribute("aria-hidden", "true");
      supportModal.classList.remove("is-closing");
    }, 240);
  }

  function prefillSupportForm(fallbackEmail = "") {
    const notice = AuthApi.getDisabledAccountNotice?.() || null;
    const emailFromPage = getAuthPageEmail();
    const currentEmail = String(supportEmailInput && supportEmailInput.value || "").trim().toLowerCase();
    const email = currentEmail || String((notice && notice.email) || fallbackEmail || emailFromPage || "").trim().toLowerCase();
    const fullName = String(supportFullNameInput && supportFullNameInput.value || "").trim() ||
      resolveSupportFullName(notice, email);
    const issueType = supportContext === "disabled" ? "account_disabled" : "login_issue";
    const accountStatus = supportContext === "disabled" ? ACCOUNT_STATUS_DISABLED : ACCOUNT_STATUS_SUPPORT;
    const lockEmail = Boolean(supportContext === "disabled" && notice && notice.email);

    if (supportEmailInput) supportEmailInput.value = email;
    if (supportEmailInput) {
      supportEmailInput.readOnly = lockEmail;
      supportEmailInput.classList.toggle("is-readonly", lockEmail);
      supportEmailInput.setAttribute("aria-readonly", lockEmail ? "true" : "false");
    }
    if (supportFullNameInput) supportFullNameInput.value = fullName;
    if (supportAccountStatusInput) supportAccountStatusInput.value = accountStatus;
    if (supportIssueTypeInput) supportIssueTypeInput.value = issueType;
  }

  function getAuthPageEmail() {
    for (const id of AUTH_EMAIL_INPUT_IDS) {
      const input = document.querySelector(`#${id}`);
      const value = String(input && input.value || "").trim();
      if (value) return value;
    }
    return "";
  }

  function getAuthPageFullName() {
    for (const id of AUTH_NAME_INPUT_IDS) {
      const input = document.querySelector(`#${id}`);
      const value = String(input && input.value || "").trim();
      if (value) return value;
    }
    return "";
  }

  function resolveSupportFullName(notice, email) {
    const explicit = String(notice && notice.displayName ? notice.displayName : "").trim();
    if (explicit && explicit.toLowerCase() !== "user") return explicit;

    const pageName = getAuthPageFullName();
    if (pageName) return pageName;

    return guessFullNameFromEmail(email);
  }

  function guessFullNameFromEmail(email) {
    const localPart = String(email || "").split("@")[0] || "";
    const cleaned = localPart
      .replace(/[._-]+/g, " ")
      .replace(/\s+/g, " ")
      .trim();
    if (!cleaned) return "Work Report User";
    return cleaned
      .split(" ")
      .filter(Boolean)
      .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
      .join(" ");
  }

  function isDisabledContext() {
    const search = new URLSearchParams(window.location.search);
    if (search.get("cloud") === "account_disabled") return true;
    const disabledCard = document.querySelector("#disabled-account-card");
    return Boolean(disabledCard && !disabledCard.hidden);
  }

  function setSupportBusy(isBusy) {
    supportSubmitBtn.disabled = isBusy;
    supportCancelBtn.disabled = isBusy;
    if (supportCloseBtn) supportCloseBtn.disabled = isBusy;
    supportSubmitBtn.textContent = isBusy ? "Submitting request..." : "Submit Request";
  }

  function updateLauncherLabel() {
    if (!supportLauncherLabel) return;
    supportLauncherLabel.hidden = window.innerWidth < 640;
  }

  function updateSupportCount() {
    if (!supportCount || !supportMessageInput) return;
    const currentLength = String(supportMessageInput.value || "").length;
    supportCount.textContent = `${currentLength} / 1200`;
  }
})();
