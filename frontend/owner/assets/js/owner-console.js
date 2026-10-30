(function () {
  const supabase = window.WRSupabase && window.WRSupabase.client;
  const cfg = window.WR_APP_CONFIG || {};

  const els = {
    loginView: document.querySelector("#owner-login-view"),
    dashboardView: document.querySelector("#owner-dashboard-view"),
    loginForm: document.querySelector("#owner-login-form"),
    loginStatus: document.querySelector("#owner-login-status"),
    loginSubmit: document.querySelector("#owner-login-submit"),
    forgotPasswordBtn: document.querySelector("#owner-forgot-password"),
    emailInput: document.querySelector("#owner-email"),
    passwordInput: document.querySelector("#owner-password"),
    togglePasswordBtn: document.querySelector("#toggle-owner-password"),
    dashboardStatus: document.querySelector("#owner-dashboard-status"),
    topbarMode: document.querySelector("#owner-topbar-mode"),
    topbarSync: document.querySelector("#owner-topbar-sync"),
    refreshBtn: document.querySelector("#owner-refresh-btn"),
    backupBtn: document.querySelector("#owner-backup-btn"),
    logoutBtn: document.querySelector("#owner-logout-btn"),
    sessionName: document.querySelector("#owner-session-name"),
    sessionEmail: document.querySelector("#owner-session-email"),
    pageTitle: document.querySelector("#owner-page-title"),
    pageSubtitle: document.querySelector("#owner-page-subtitle"),
    overviewExportBtn: document.querySelector("#owner-overview-export-btn"),
    overviewQuickActions: document.querySelector("#owner-overview-quick-actions"),
    navButtons: Array.from(document.querySelectorAll("[data-owner-tab]")),
    panels: Array.from(document.querySelectorAll("[data-owner-panel]")),
    usersWorkspace: document.querySelector(".owner-users-workspace"),
    quickTabButtons: Array.from(document.querySelectorAll("[data-owner-jump-tab]")),
    searchInput: document.querySelector("#owner-user-search"),
    searchScopeInput: document.querySelector("#owner-user-search-scope"),
    statusFilter: document.querySelector("#owner-status-filter"),
    usersSortBtn: document.querySelector("#owner-users-sort-btn"),
    usersRefreshBtn: document.querySelector("#owner-users-refresh"),
    addUserOpenBtn: document.querySelector("#owner-add-user-open"),
    addUserModal: document.querySelector("#owner-add-user-modal"),
    addUserForm: document.querySelector("#owner-add-user-form"),
    addUserCloseBtn: document.querySelector("#owner-add-user-close"),
    addUserCancelBtn: document.querySelector("#owner-add-user-cancel"),
    addUserStatus: document.querySelector("#owner-add-user-status"),
    addUserSubmitBtn: document.querySelector("#owner-add-user-submit"),
    addUserNameInput: document.querySelector("#owner-add-user-name"),
    addUserEmailInput: document.querySelector("#owner-add-user-email"),
    addUserPasswordInput: document.querySelector("#owner-add-user-password"),
    addUserVerifiedInput: document.querySelector("#owner-add-user-verified"),
    addUserDisabledInput: document.querySelector("#owner-add-user-disabled"),
    addUserPasswordToggle: document.querySelector("#toggle-owner-add-user-password"),
    reportPreviewModal: document.querySelector("#owner-report-preview-modal"),
    reportPreviewClose: document.querySelector("#owner-report-preview-close"),
    reportPreviewTitle: document.querySelector("#owner-report-preview-title"),
    reportPreviewCopy: document.querySelector("#owner-report-preview-copy"),
    reportPreviewDownload: document.querySelector("#owner-report-preview-download"),
    reportPreviewFrame: document.querySelector("#owner-report-preview-frame"),
    confirmModal: document.querySelector("#owner-confirm-modal"),
    confirmCloseBtn: document.querySelector("#owner-confirm-close"),
    confirmKicker: document.querySelector("#owner-confirm-kicker"),
    confirmTitle: document.querySelector("#owner-confirm-title"),
    confirmMessage: document.querySelector("#owner-confirm-message"),
    confirmCancelBtn: document.querySelector("#owner-confirm-cancel"),
    confirmSubmitBtn: document.querySelector("#owner-confirm-submit"),
    usersCountChip: document.querySelector("#owner-users-count-chip"),
    usersBody: document.querySelector("#owner-users-body"),
    usersSummary: document.querySelector("#owner-users-summary"),
    reportSearchInput: document.querySelector("#owner-report-search"),
    reportUserFilter: document.querySelector("#owner-report-user-filter"),
    reportStatusFilter: document.querySelector("#owner-report-status-filter"),
    reportMonthInput: document.querySelector("#owner-report-month"),
    reportExportPdfBtn: document.querySelector("#owner-report-export-pdf"),
    reportExportCsvBtn: document.querySelector("#owner-report-export-csv"),
    reportsSummary: document.querySelector("#owner-reports-summary"),
    reportsList: document.querySelector("#owner-reports-list"),
    reportDetail: document.querySelector("#owner-report-detail"),
    reportDetailClose: document.querySelector("#owner-report-detail-close"),
    reportDetailTitle: document.querySelector("#owner-report-detail-title"),
    reportDetailMeta: document.querySelector("#owner-report-detail-meta"),
    reportDetailSummary: document.querySelector("#owner-report-detail-summary"),
    reportDetailFields: document.querySelector("#owner-report-detail-fields"),
    reportReviewComment: document.querySelector("#owner-report-review-comment"),
    reportVerifyBtn: document.querySelector("#owner-report-verify-btn"),
    reportRejectBtn: document.querySelector("#owner-report-reject-btn"),
    reportPendingBtn: document.querySelector("#owner-report-pending-btn"),
    reportPdfBtn: document.querySelector("#owner-report-pdf-btn"),
    reportDownloadBtn: document.querySelector("#owner-report-download-btn"),
    reportDeleteBtn: document.querySelector("#owner-report-delete-btn"),
    analyticsSummary: document.querySelector("#owner-analytics-summary"),
    analyticsGrid: document.querySelector("#owner-analytics-grid"),
    analyticsUsers: document.querySelector("#owner-analytics-users"),
    securitySummary: document.querySelector("#owner-security-summary"),
    securityQueue: document.querySelector("#owner-security-queue"),
    securityList: document.querySelector("#owner-security-list"),
    notificationsSummary: document.querySelector("#owner-notifications-summary"),
    notificationsList: document.querySelector("#owner-notifications-list"),
    auditSearchInput: document.querySelector("#owner-audit-search"),
    deletedList: document.querySelector("#owner-deleted-list"),
    deletedSummary: document.querySelector("#owner-deleted-summary"),
    deletedReportsSummary: document.querySelector("#owner-deleted-reports-summary"),
    deletedReportsList: document.querySelector("#owner-deleted-reports-list"),
    recoverySummary: document.querySelector("#owner-recovery-summary"),
    recoveryList: document.querySelector("#owner-recovery-list"),
    attentionList: document.querySelector("#owner-attention-list"),
    overviewRecentList: document.querySelector("#owner-overview-recent-list"),
    overviewKpiTotal: document.querySelector("#owner-overview-kpi-total"),
    overviewKpiTotalTrend: document.querySelector("#owner-overview-kpi-total-trend"),
    overviewKpiActive: document.querySelector("#owner-overview-kpi-active"),
    overviewKpiActiveTrend: document.querySelector("#owner-overview-kpi-active-trend"),
    overviewKpiReports: document.querySelector("#owner-overview-kpi-reports"),
    overviewKpiReportsTrend: document.querySelector("#owner-overview-kpi-reports-trend"),
    overviewKpiAttention: document.querySelector("#owner-overview-kpi-attention"),
    overviewKpiAttentionTrend: document.querySelector("#owner-overview-kpi-attention-trend"),
    overviewSnapshotActive: document.querySelector("#owner-overview-snapshot-active"),
    overviewSnapshotDisabled: document.querySelector("#owner-overview-snapshot-disabled"),
    overviewSnapshotArchived: document.querySelector("#owner-overview-snapshot-archived"),
    overviewSnapshotUnverified: document.querySelector("#owner-overview-snapshot-unverified"),
    overviewSnapshotGoogle: document.querySelector("#owner-overview-snapshot-google"),
    overviewSnapshotEmail: document.querySelector("#owner-overview-snapshot-email"),
    overviewActivityList: document.querySelector("#owner-overview-activity-list"),
    overviewInsightsList: document.querySelector("#owner-overview-insights-list"),
    overviewRecentUsersBody: document.querySelector("#owner-overview-recent-users"),
    overviewSystemStatus: document.querySelector("#owner-overview-system-status"),
    overviewWorkspaceTitle: document.querySelector("#owner-overview-workspace-title"),
    overviewWorkspaceUrl: document.querySelector("#owner-overview-workspace-url"),
    overviewCopyLinkBtn: document.querySelector("#owner-overview-copy-link"),
    overviewHealthValue: document.querySelector("#owner-overview-health"),
    overviewHealthNote: document.querySelector("#owner-overview-health-note"),
    overviewControlValue: document.querySelector("#owner-overview-control"),
    overviewControlNote: document.querySelector("#owner-overview-control-note"),
    overviewBackupValue: document.querySelector("#owner-overview-backup"),
    overviewBackupNote: document.querySelector("#owner-overview-backup-note"),
    overviewSupportValue: document.querySelector("#owner-overview-support"),
    overviewSupportNote: document.querySelector("#owner-overview-support-summary-note"),
    overviewNodeMode: document.querySelector("#owner-overview-node-mode"),
    overviewNodeUsersMeta: document.querySelector("#owner-overview-node-users-meta"),
    overviewNodeReportsMeta: document.querySelector("#owner-overview-node-reports-meta"),
    overviewNodeBackupsMeta: document.querySelector("#owner-overview-node-backups-meta"),
    overviewNodeSupportMeta: document.querySelector("#owner-overview-node-support-meta"),
    overviewNodeSecurityMeta: document.querySelector("#owner-overview-node-security-meta"),
    overviewTotalActivity: document.querySelector("#owner-overview-total-activity"),
    overviewActivityWindow: document.querySelector("#owner-overview-activity-window"),
    overviewReportsValue: document.querySelector("#owner-overview-reports-value"),
    overviewReportsBars: document.querySelector("#owner-overview-reports-bars"),
    overviewReportsNote: document.querySelector("#owner-overview-reports-note"),
    overviewUsersValue: document.querySelector("#owner-overview-users-value"),
    overviewUsersBars: document.querySelector("#owner-overview-users-bars"),
    overviewUsersNote: document.querySelector("#owner-overview-users-note"),
    overviewBackupsValue: document.querySelector("#owner-overview-backups-value"),
    overviewBackupsBars: document.querySelector("#owner-overview-backups-bars"),
    overviewBackupsNote: document.querySelector("#owner-overview-backups-note"),
    overviewSupportInsightValue: document.querySelector("#owner-overview-support-value"),
    overviewSupportBars: document.querySelector("#owner-overview-support-bars"),
    overviewSupportInsightNote: document.querySelector("#owner-overview-support-insight-note"),
    totalStat: document.querySelector("#owner-stat-total"),
    activeStat: document.querySelector("#owner-stat-active"),
    pendingReportsStat: document.querySelector("#owner-stat-pending-reports"),
    disabledStat: document.querySelector("#owner-stat-disabled"),
    verifiedStat: document.querySelector("#owner-stat-verified"),
    archivedStat: document.querySelector("#owner-stat-archived"),
    activeTodayStat: document.querySelector("#owner-stat-active-today"),
    newWeekStat: document.querySelector("#owner-stat-new-week"),
    newMonthStat: document.querySelector("#owner-stat-new-month"),
    lastBackupStat: document.querySelector("#owner-stat-last-backup"),
    riskStat: document.querySelector("#owner-stat-risk"),
    detailDrawer: document.querySelector("#owner-detail-drawer"),
    detailClose: document.querySelector("#owner-detail-close"),
    detailName: document.querySelector("#owner-detail-name"),
    detailEmail: document.querySelector("#owner-detail-email"),
    detailNameInline: document.querySelector("#owner-detail-name-inline"),
    detailEmailInline: document.querySelector("#owner-detail-email-inline"),
    detailDisplayNameInput: document.querySelector("#owner-detail-display-name"),
    detailDisplayNameSaveBtn: document.querySelector("#owner-detail-display-name-save"),
    detailTabButtons: Array.from(document.querySelectorAll("[data-owner-detail-tab]")),
    detailPanels: Array.from(document.querySelectorAll("[data-owner-detail-panel]")),
    detailUid: document.querySelector("#owner-detail-uid"),
    detailRole: document.querySelector("#owner-detail-role"),
    detailProvider: document.querySelector("#owner-detail-provider"),
    detailStatus: document.querySelector("#owner-detail-status"),
    detailVerified: document.querySelector("#owner-detail-verified"),
    detailCreated: document.querySelector("#owner-detail-created"),
    detailUpdated: document.querySelector("#owner-detail-updated"),
    detailLastSignin: document.querySelector("#owner-detail-last-signin"),
    detailProviderCard: document.querySelector("#owner-detail-provider-card"),
    detailRawJson: document.querySelector("#owner-detail-raw-json"),
    detailSummary: document.querySelector("#owner-detail-summary"),
    detailNote: document.querySelector("#owner-detail-note"),
    detailLogList: document.querySelector("#owner-detail-log-list"),
    detailNoteSaveBtn: document.querySelector("#owner-detail-note-save"),
    detailFlagBtn: document.querySelector("#owner-detail-flag-btn"),
    detailVerifyBtn: document.querySelector("#owner-detail-verify-btn"),
    detailDisableBtn: document.querySelector("#owner-detail-disable-btn"),
    detailResetBtn: document.querySelector("#owner-detail-reset-btn"),
    detailBackupBtn: document.querySelector("#owner-detail-backup-btn"),
    detailArchiveBtn: document.querySelector("#owner-detail-archive-btn"),
    backupsUsersList: document.querySelector("#owner-backups-users-list"),
    backupsSelectedCopy: document.querySelector("#owner-backups-selected-copy"),
    backupsNotice: document.querySelector("#owner-backups-notice"),
    backupsCreateBtn: document.querySelector("#owner-backups-create-btn"),
    backupsSummary: document.querySelector("#owner-backups-summary"),
    backupsList: document.querySelector("#owner-backups-list"),
    auditSummary: document.querySelector("#owner-audit-summary"),
    auditList: document.querySelector("#owner-audit-list"),
    healthSummary: document.querySelector("#owner-health-summary"),
    healthGrid: document.querySelector("#owner-health-grid"),
    dataManager: document.querySelector("#owner-data-manager"),
    filesSummary: document.querySelector("#owner-files-summary"),
    filesList: document.querySelector("#owner-files-list"),
    databaseCollections: document.querySelector("#owner-database-collections"),
    databaseDocumentsTitle: document.querySelector("#owner-database-documents-title"),
    databaseDocumentsMeta: document.querySelector("#owner-database-documents-meta"),
    databaseRecordsTitle: document.querySelector("#owner-database-records-title"),
    databaseRecordsMeta: document.querySelector("#owner-database-records-meta"),
    databaseRecordsList: document.querySelector("#owner-database-records-list"),
    storageSearchInput: document.querySelector("#owner-storage-search"),
    storageSortBtn: document.querySelector("#owner-storage-sort-btn"),
    storageSummary: document.querySelector("#owner-storage-summary"),
    storageManager: document.querySelector("#owner-storage-manager"),
    supportSummary: document.querySelector("#owner-support-summary"),
    supportList: document.querySelector("#owner-support-list"),
    settingsForm: document.querySelector("#owner-settings-form"),
    settingsSummary: document.querySelector("#owner-settings-summary"),
    retentionDaysInput: document.querySelector("#owner-retention-days"),
    autoDownloadBackupInput: document.querySelector("#owner-auto-download-backup"),
    ownerEmailValue: document.querySelector("#owner-settings-email"),
    ownerResetValue: document.querySelector("#owner-settings-reset-route"),
    settingsSaveBtn: document.querySelector("#owner-settings-save")
  };

  const OWNER_DEFAULT_EMAIL = "mailworkreport@gmail.com";
  const OWNER_AUTH_EMAIL_FUNCTION_URL = "https://us-central1-work-report-fe3da.cloudfunctions.net/sendAuthEmail";
  const OWNER_RELEASE_BUCKET = "downloads";
  const OWNER_RELEASE_CHANNEL = "production";
  const OWNER_RELEASE_DOWNLOAD_PAGE = "/download/android";
  const OWNER_RELEASE_FALLBACK_ANDROID_URL = "https://lyactzctiscokmbuluci.supabase.co/storage/v1/object/public/downloads/workreport-android.apk";
  const OWNER_RELEASE_MAX_BYTES = 1024 * 1024 * 700;
  const OWNER_UNLOCK_KEY = "wr_owner_console_unlock";
  const OWNER_LOCAL_BACKUPS_KEY = "wr_owner_console_local_backups_v2";
  const OWNER_LOCAL_AUDIT_KEY = "wr_owner_console_local_audit_v2";
  const OWNER_SETTINGS_KEY = "wr_owner_console_settings_v2";
  const OWNER_USER_META_KEY = "wr_owner_console_user_meta_v1";
  const OWNER_MAX_LOCAL_AUDIT = 60;
  const OWNER_MAX_LOCAL_BACKUPS = 30;
  const OWNER_PROBE_UUID = "00000000-0000-0000-0000-000000000000";
  const OWNER_PDF_EXPORT_TITLE_DEFAULT = "Work Data Sheet";
  const OWNER_PDF_EXPORT_SERVICE_DEFAULT = "016696";
  const OWNER_PDF_EXPORT_WIDTH_PX = 794;
  const OWNER_PDF_EXPORT_HEIGHT_PX = 1123;
  const OWNER_PDF_EXPORT_PADDING_PX = 8;
  const OWNER_PDF_EXPORT_SECTION_GAP_PX = 7;
  const OWNER_PDF_EXPORT_CONTENT_MIN_HEIGHT_PX = OWNER_PDF_EXPORT_HEIGHT_PX - (OWNER_PDF_EXPORT_PADDING_PX * 2);
  const OWNER_PDF_EXPORT_BRAND_URL = String(cfg.publicWebBaseUrl || "https://workreport.online").replace(/\/$/, "");
  const OWNER_PDF_EXPORT_BRAND_ICON_SRC = "/icons/favicon.png?v=20260328b";
  const OWNER_PDF_EXPORT_LINK_SELECTOR = "[data-pdf-link-url]";
  const OWNER_PDF_EXPORT_FIELD_OPTIONS = [
    { source: "date", label: "Day", width: 10 },
    { source: "inTime", label: "In Time", width: 7 },
    { source: "outTime", label: "Out Time", width: 7 },
    { source: "movementOut", label: "Movement Out Time", width: 9 },
    { source: "movementIn", label: "Movement In Time", width: 9 },
    { source: "teamMembers", label: "Team Members", width: 9 },
    { source: "workLocation", label: "Work Location", width: 8 },
    { source: "vehicleNumber", label: "Vehicle Number", width: 8 },
    { source: "km", label: "KM Reading", width: 6 },
    { source: "specialDays", label: "Special Days", width: 10 },
    { source: "leaveStatus", label: "Leave Status", width: 6 },
    { source: "leaveReason", label: "Leave Reason", width: 14 }
  ];
  const OWNER_PDF_EXPORT_TABLE_CONFIG = {
    borderColor: "#9ca3af",
    borderWidth: 1,
    headerFontSize: 11.1,
    rowFontSize: 11.6,
    cellPaddingX: 4,
    cellPaddingY: 8.8,
    headerPaddingX: 4,
    headerPaddingY: 7.8,
    rowLineHeight: 1.26,
    headerLineHeight: 1.1,
    tableTextColor: "#000000",
    headerTextColor: "#000000",
    headerBg: "#f3f4f6"
  };

  const authBaseUrl = String(cfg.publicWebBaseUrl || "https://workreport.online").replace(/\/$/, "");
  const ownerResetRedirectUrl = `${authBaseUrl}/admin-control_dashboard/reset`;
  const ownerDetachedSignupClient = createDetachedSignupClient();

  const state = {
    sessionUser: null,
    ownerProfile: null,
    users: [],
    deletedUsers: [],
    reports: [],
    filteredReports: [],
    deletedReports: [],
    remoteBackups: [],
    localBackups: [],
    remoteAudit: [],
    localAudit: [],
    selectedUserId: "",
    userDetailOpen: false,
    selectedDeletedUserId: "",
    selectedReportId: "",
    selectedDeletedReportId: "",
    activeTab: "overview",
    lastSyncedAt: "",
    rpcReady: false,
    rpcNotice: "",
    remoteBackupDeleteReady: false,
    remoteBackupDeleteNotice: "",
    reportRpcReady: false,
    reportError: "",
    releaseAssets: [],
    releaseCatalogReady: false,
    releaseCatalogError: "",
    storageSearchQuery: "",
    storageSortMode: "updated",
    databaseCollection: "profiles",
    databaseRecordId: "",
    supportMessages: [],
    supportReady: false,
    supportError: "",
    reportPreviewRows: [],
    reportPreviewOptions: null,
    reportPreviewUrl: "",
    reportPreviewFileName: "",
    detailTab: "overview",
    userSortMode: "uid",
    confirmDialog: null,
    userMeta: {},
    userPdfPreferences: {},
    settings: {
      retentionDays: 30,
      autoDownloadBackup: true
    }
  };

  const motionTimers = new Map();

  function createDetachedSignupClient() {
    if (!window.supabase || typeof window.supabase.createClient !== "function") return null;
    const url = String(cfg.supabaseUrl || "").trim();
    const anonKey = String(cfg.supabaseAnonKey || "").trim();
    if (!url || !anonKey) return null;
    try {
      return window.supabase.createClient(url, anonKey, {
        auth: {
          flowType: "implicit",
          autoRefreshToken: false,
          persistSession: false,
          detectSessionInUrl: false,
          storageKey: "wr-owner-console-create-user"
        }
      });
    } catch (error) {
      console.warn("Owner add-user client could not be created:", error);
      return null;
    }
  }

  if (!supabase || !els.loginView || !els.dashboardView || !window.AuthUi) return;

  window.AuthUi.wirePasswordToggle(els.togglePasswordBtn, els.passwordInput);
  window.AuthUi.wirePasswordToggle(els.addUserPasswordToggle, els.addUserPasswordInput);

  bindEvents();
  wireOwnerAuthWatcher();
  boot();

  function bindEvents() {
    els.loginForm.addEventListener("submit", handlePasswordLogin);
    els.forgotPasswordBtn.addEventListener("click", handleForgotPassword);
    if (els.addUserOpenBtn) {
      els.addUserOpenBtn.addEventListener("click", openAddUserModal);
    }
    if (els.addUserCloseBtn) {
      els.addUserCloseBtn.addEventListener("click", closeAddUserModal);
    }
    if (els.addUserCancelBtn) {
      els.addUserCancelBtn.addEventListener("click", closeAddUserModal);
    }
    if (els.addUserForm) {
      els.addUserForm.addEventListener("submit", handleAddUserSubmit);
    }
    if (els.addUserModal) {
      els.addUserModal.addEventListener("click", (event) => {
        if (event.target && event.target.hasAttribute("data-owner-add-user-close")) {
          closeAddUserModal();
        }
      });
    }
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && els.confirmModal && !els.confirmModal.hidden) {
        settleOwnerConfirm(false);
        return;
      }
      if (event.key === "Escape" && els.addUserModal && !els.addUserModal.hidden) {
        closeAddUserModal();
        return;
      }
      if (event.key === "Escape" && els.reportPreviewModal && !els.reportPreviewModal.hidden) {
        closeReportPreviewModal();
      }
    });
    els.refreshBtn.addEventListener("click", () => {
      void refreshDashboardData();
    });
    if (els.overviewExportBtn) {
      els.overviewExportBtn.addEventListener("click", exportOverviewSummary);
    }
    if (els.overviewQuickActions) {
      els.overviewQuickActions.addEventListener("change", () => {
        const targetTab = String(els.overviewQuickActions.value || "").trim();
        if (targetTab) {
          setActiveTab(targetTab);
        }
        els.overviewQuickActions.value = "";
      });
    }
    if (els.overviewCopyLinkBtn) {
      els.overviewCopyLinkBtn.addEventListener("click", () => {
        void copyOverviewWorkspaceLink();
      });
    }
    if (els.backupBtn) {
      els.backupBtn.addEventListener("click", () => {
        void createManualBackup();
      });
    }
    els.logoutBtn.addEventListener("click", handleLogout);
    els.searchInput.addEventListener("input", renderUsers);
    if (els.searchScopeInput) {
      els.searchScopeInput.addEventListener("change", () => {
        syncUserSearchPlaceholder();
        renderUsers();
      });
    }
    els.statusFilter.addEventListener("change", renderUsers);
    if (els.usersSortBtn) {
      els.usersSortBtn.disabled = false;
      els.usersSortBtn.addEventListener("click", cycleUserSortMode);
    }
    if (els.usersRefreshBtn) {
      els.usersRefreshBtn.addEventListener("click", () => {
        void refreshDashboardData();
      });
    }
    els.detailClose.addEventListener("click", closeDetailDrawer);
    els.detailTabButtons.forEach((button) => {
      button.addEventListener("click", () => {
        setDetailTab(String(button.dataset.ownerDetailTab || "overview"));
      });
    });
    if (els.reportSearchInput) els.reportSearchInput.addEventListener("input", renderReports);
    if (els.reportUserFilter) els.reportUserFilter.addEventListener("change", renderReports);
    if (els.reportStatusFilter) els.reportStatusFilter.addEventListener("change", renderReports);
    if (els.reportMonthInput) els.reportMonthInput.addEventListener("change", renderReports);
    if (els.reportMonthInput && typeof els.reportMonthInput.showPicker === "function") {
      els.reportMonthInput.addEventListener("focus", () => {
        try {
          els.reportMonthInput.showPicker();
        } catch (_) {
          // ignore picker failures
        }
      });
    }
    if (els.auditSearchInput) els.auditSearchInput.addEventListener("input", renderAudit);
    if (els.reportDetailClose) els.reportDetailClose.addEventListener("click", closeReportDetail);
    if (els.reportExportPdfBtn) {
      els.reportExportPdfBtn.addEventListener("click", () => {
        void exportFilteredReportsPdf();
      });
    }
    if (els.reportExportCsvBtn) {
      els.reportExportCsvBtn.addEventListener("click", () => {
        void downloadFilteredReportsPdf();
      });
    }
    if (els.reportPreviewClose) {
      els.reportPreviewClose.addEventListener("click", closeReportPreviewModal);
    }
    if (els.reportPreviewModal) {
      els.reportPreviewModal.addEventListener("click", (event) => {
        if (event.target && event.target.hasAttribute("data-owner-report-preview-close")) {
          closeReportPreviewModal();
        }
      });
    }
    if (els.reportPreviewDownload) {
      els.reportPreviewDownload.addEventListener("click", downloadCurrentPreviewPdf);
    }
    if (els.confirmCloseBtn) {
      els.confirmCloseBtn.addEventListener("click", () => settleOwnerConfirm(false));
    }
    if (els.confirmCancelBtn) {
      els.confirmCancelBtn.addEventListener("click", () => settleOwnerConfirm(false));
    }
    if (els.confirmSubmitBtn) {
      els.confirmSubmitBtn.addEventListener("click", () => settleOwnerConfirm(true));
    }
    if (els.confirmModal) {
      els.confirmModal.addEventListener("click", (event) => {
        if (event.target && event.target.hasAttribute("data-owner-confirm-close")) {
          settleOwnerConfirm(false);
        }
      });
    }

    els.navButtons.forEach((btn) => {
      btn.addEventListener("click", () => setActiveTab(String(btn.dataset.ownerTab || "overview")));
    });

    els.quickTabButtons.forEach((btn) => {
      btn.addEventListener("click", () => setActiveTab(String(btn.dataset.ownerJumpTab || "overview")));
    });

    if (els.overviewRecentUsersBody) {
      els.overviewRecentUsersBody.addEventListener("click", (event) => {
        const reportTrigger = event.target.closest("[data-overview-report-user-id]");
        if (reportTrigger) {
          const userId = String(reportTrigger.dataset.overviewReportUserId || "").trim();
          if (!userId) return;
          void previewOverviewUserReports(userId);
          return;
        }
        const trigger = event.target.closest("[data-overview-user-id]");
        if (!trigger) return;
        const userId = String(trigger.dataset.overviewUserId || "").trim();
        if (!userId || !state.users.some((item) => String(item.id || "") === userId)) return;
        state.selectedUserId = userId;
        state.userDetailOpen = true;
        setActiveTab("users");
        hydrateDetailDrawer();
        updateBackupButtonLabel();
      });
    }

    els.detailVerifyBtn.addEventListener("click", () => {
      const user = getSelectedUser();
      if (!user) return;
      void updateVerification(String(user.id || ""), !Boolean(user.email_verified));
    });

    els.detailDisableBtn.addEventListener("click", () => {
      const user = getSelectedUser();
      if (!user) return;
      void updateDisabled(String(user.id || ""), !Boolean(user.is_disabled));
    });

    if (els.detailResetBtn) {
      els.detailResetBtn.addEventListener("click", () => {
        const user = getSelectedUser();
        if (!user) return;
        void sendUserResetLink(user);
      });
    }

    if (els.detailBackupBtn) {
      els.detailBackupBtn.addEventListener("click", () => {
        const user = getSelectedUser();
        if (!user) return;
        void backupUserById(String(user.id || ""));
      });
    }

    els.detailArchiveBtn.addEventListener("click", () => {
      const user = getSelectedUser();
      if (!user) return;
      void archiveUser(String(user.id || ""));
    });

    if (els.detailNoteSaveBtn) {
      els.detailNoteSaveBtn.addEventListener("click", saveUserNote);
    }

    if (els.detailFlagBtn) {
      els.detailFlagBtn.addEventListener("click", toggleUserSuspicious);
    }

    if (els.detailDisplayNameSaveBtn) {
      els.detailDisplayNameSaveBtn.addEventListener("click", () => {
        void saveUserDisplayName();
      });
    }

    if (els.deletedList) {
      els.deletedList.addEventListener("click", (event) => {
        const button = event.target.closest("[data-deleted-action]");
        if (!button) {
          const row = event.target.closest("[data-deleted-user-id]");
          if (!row) return;
          state.selectedDeletedUserId = String(row.dataset.deletedUserId || "");
          renderDeletedUsers();
          renderRecovery();
          return;
        }
        const userId = String(button.dataset.deletedUserId || "");
        const action = String(button.dataset.deletedAction || "");
        if (!userId || !action) return;
        if (action === "restore") {
          void restoreUser(userId);
        } else if (action === "purge") {
          void permanentlyDeleteUser(userId);
        } else if (action === "download") {
          downloadLatestBackupForUser(userId);
        }
      });
    }

    if (els.deletedReportsList) {
      els.deletedReportsList.addEventListener("click", (event) => {
        const button = event.target.closest("[data-deleted-report-action]");
        if (!button) {
          const row = event.target.closest("[data-deleted-report-id]");
          if (!row) return;
          state.selectedDeletedReportId = String(row.dataset.deletedReportId || "");
          renderDeletedReports();
          return;
        }
        const reportId = String(button.dataset.deletedReportId || "");
        const action = String(button.dataset.deletedReportAction || "");
        if (!reportId || !action) return;
        if (action === "restore") {
          void restoreReport(reportId);
        } else if (action === "purge") {
          void permanentlyDeleteReport(reportId);
        } else if (action === "download") {
          downloadDeletedReport(reportId);
        }
      });
    }

    if (els.recoveryList) {
      els.recoveryList.addEventListener("click", (event) => {
        const button = event.target.closest("[data-recovery-action]");
        if (!button) return;
        const userId = String(button.dataset.deletedUserId || "");
        const action = String(button.dataset.recoveryAction || "");
        if (!userId || !action) return;
        if (action === "restore") {
          void restoreUser(userId);
        } else if (action === "purge") {
          void permanentlyDeleteUser(userId);
        } else if (action === "download") {
          downloadLatestBackupForUser(userId);
        }
      });
    }

    if (els.securityQueue) {
      els.securityQueue.addEventListener("click", (event) => {
        const button = event.target.closest("[data-security-action]");
        if (!button) return;
        const action = String(button.dataset.securityAction || "");
        const userId = String(button.dataset.securityUserId || "");
        if (!userId) return;
        state.selectedUserId = userId;
        if (action === "open") {
          state.userDetailOpen = true;
          setActiveTab("users");
          renderUsers();
          hydrateDetailDrawer();
          return;
        }
        const user = state.users.find((item) => String(item.id || "") === userId);
        if (!user) return;
        if (action === "verify") {
          void updateVerification(userId, true);
        } else if (action === "enable") {
          void updateDisabled(userId, false);
        }
      });
    }

    if (els.notificationsList) {
      els.notificationsList.addEventListener("click", (event) => {
        const supportButton = event.target.closest("[data-notification-support]");
        if (supportButton) {
          const supportId = String(supportButton.dataset.notificationSupport || "");
          const userId = String(supportButton.dataset.notificationOpen || "");
          if (userId) state.selectedUserId = userId;
          setActiveTab("support");
          renderSupport();
          if (supportId) {
            const entry = state.supportMessages.find((item) => String(item.id || "") === supportId);
            if (entry && String(entry.status || "new") === "new") {
              void updateSupportMessageStatus(supportId, "read");
            }
          }
          return;
        }
        const button = event.target.closest("[data-notification-open]");
        if (!button) return;
        const userId = String(button.dataset.notificationOpen || "");
        if (!userId) return;
        state.selectedUserId = userId;
        state.userDetailOpen = true;
        setActiveTab("users");
        renderUsers();
        hydrateDetailDrawer();
      });
    }

    if (els.supportList) {
      els.supportList.addEventListener("click", (event) => {
        const actionButton = event.target.closest("[data-support-action]");
        if (actionButton) {
          const supportId = String(actionButton.dataset.supportId || "");
          const action = String(actionButton.dataset.supportAction || "");
          if (!supportId || !action) return;
          if (action === "read") {
            void updateSupportMessageStatus(supportId, "read");
          } else if (action === "resolve") {
            void updateSupportMessageStatus(supportId, "resolved");
          }
          return;
        }
        const openButton = event.target.closest("[data-support-open-user]");
        if (!openButton) return;
        const userId = String(openButton.dataset.supportOpenUser || "");
        if (!userId) return;
        state.selectedUserId = userId;
        state.userDetailOpen = true;
        setActiveTab("users");
        renderUsers();
        hydrateDetailDrawer();
      });
    }

    if (els.backupsList) {
      els.backupsList.addEventListener("click", (event) => {
        const deleteButton = event.target.closest("[data-backup-delete-id]");
        if (deleteButton) {
          const backupId = String(deleteButton.dataset.backupDeleteId || "");
          if (!backupId) return;
          void deleteBackup(backupId);
          return;
        }
        const button = event.target.closest("[data-backup-id]");
        if (!button) return;
        const backupId = String(button.dataset.backupId || "");
        if (!backupId) return;
        downloadBackup(backupId);
      });
    }
    if (els.backupsUsersList) {
      els.backupsUsersList.addEventListener("click", (event) => {
        const backupButton = event.target.closest("[data-backup-user-id]");
        if (backupButton) {
          const userId = String(backupButton.dataset.backupUserId || "");
          if (!userId) return;
          state.selectedUserId = userId;
          renderBackups();
          void backupUserById(userId);
          return;
        }
        const userRow = event.target.closest("[data-backups-user-id]");
        if (!userRow) return;
        const userId = String(userRow.dataset.backupsUserId || "");
        if (!userId) return;
        state.selectedUserId = userId;
        renderBackups();
      });
    }
    if (els.backupsCreateBtn) {
      els.backupsCreateBtn.addEventListener("click", () => {
        const fallbackUserId = state.selectedUserId || String(state.users[0] && state.users[0].id ? state.users[0].id : "");
        if (!fallbackUserId) {
          window.AuthUi.setInlineStatus(els.dashboardStatus, {
            type: "info",
            message: "Create a user first to start backups."
          });
          return;
        }
        state.selectedUserId = fallbackUserId;
        void backupUserById(fallbackUserId);
      });
    }

    if (els.storageSearchInput) {
      els.storageSearchInput.addEventListener("input", () => {
        state.storageSearchQuery = String(els.storageSearchInput.value || "").trim().toLowerCase();
        renderFiles();
      });
    }

    if (els.storageSortBtn) {
      els.storageSortBtn.addEventListener("click", () => {
        state.storageSortMode = state.storageSortMode === "updated" ? "platform" : "updated";
        renderFiles();
      });
    }

    if (els.databaseCollections) {
      els.databaseCollections.addEventListener("click", (event) => {
        const collectionButton = event.target.closest("[data-db-collection]");
        if (!collectionButton) return;
        setDatabaseCollection(String(collectionButton.dataset.dbCollection || "profiles"));
      });
    }

    if (els.filesList) {
      els.filesList.addEventListener("click", (event) => {
        const recordButton = event.target.closest("[data-db-record-id]");
        if (recordButton) {
          setDatabaseRecordSelection(
            String(recordButton.dataset.dbCollection || state.databaseCollection || "profiles"),
            String(recordButton.dataset.dbRecordId || "")
          );
          return;
        }
        const nextSort = event.target.closest("[data-storage-sort]");
        if (nextSort) {
          state.storageSortMode = String(nextSort.dataset.storageSort || "updated");
          renderFiles();
          return;
        }
      });
    }

    if (els.databaseRecordsList) {
      els.databaseRecordsList.addEventListener("click", (event) => {
        const recordButton = event.target.closest("[data-db-record-id]");
        if (!recordButton) return;
        setDatabaseRecordSelection(
          String(recordButton.dataset.dbCollection || "reports"),
          String(recordButton.dataset.dbRecordId || "")
        );
      });
    }

    if (els.dataManager) {
      els.dataManager.addEventListener("submit", (event) => {
        const profileForm = event.target.closest("[data-db-profile-form]");
        if (profileForm) {
          event.preventDefault();
          const formType = String(profileForm.dataset.dbProfileForm || "").trim().toLowerCase();
          if (formType === "latest-report") {
            void saveDatabaseLatestReport(profileForm);
          } else {
            void saveDatabaseProfileName(profileForm);
          }
          return;
        }
        const form = event.target.closest("[data-storage-form]");
        if (!form) return;
        event.preventDefault();
        const platform = String(form.dataset.storageForm || "");
        if (platform) {
          void publishReleaseAsset(platform, form);
        }
      });
      els.dataManager.addEventListener("click", (event) => {
        const recordButton = event.target.closest("[data-db-record-id]");
        if (recordButton) {
          setDatabaseRecordSelection(
            String(recordButton.dataset.dbCollection || "reports"),
            String(recordButton.dataset.dbRecordId || "")
          );
          return;
        }
        const databaseAction = event.target.closest("[data-db-action]");
        if (databaseAction) {
          handleDatabaseManagerAction(databaseAction);
          return;
        }
        const storageAction = event.target.closest("[data-storage-action]");
        if (storageAction) {
          const action = String(storageAction.dataset.storageAction || "");
          const platform = String(storageAction.dataset.storagePlatform || "");
          if (action === "refresh") {
            void refreshDashboardData();
          } else if (action === "copy-public-url" && platform) {
            void copyReleaseAssetUrl(platform);
          } else if (action === "open-download-page" && platform) {
            openReleaseDestination(platform);
          } else if (action === "copy-download-route") {
            void copyTextValue(`${authBaseUrl}${OWNER_RELEASE_DOWNLOAD_PAGE}`, "Download page link copied.");
          } else if (action === "copy-bucket-url") {
            void copyTextValue(`${String(cfg.supabaseUrl || "").replace(/\/$/, "")}/storage/v1/object/public/${OWNER_RELEASE_BUCKET}`, "Bucket URL copied.");
          }
          return;
        }
      });
    }

    if (els.storageManager) {
      els.storageManager.addEventListener("submit", (event) => {
        const form = event.target.closest("[data-storage-form]");
        if (!form) return;
        event.preventDefault();
        const platform = String(form.dataset.storageForm || "");
        if (platform) {
          void publishReleaseAsset(platform, form);
        }
      });
      els.storageManager.addEventListener("click", (event) => {
        const storageAction = event.target.closest("[data-storage-action]");
        if (!storageAction) return;
        const action = String(storageAction.dataset.storageAction || "");
        const platform = String(storageAction.dataset.storagePlatform || "");
        if (action === "refresh") {
          void refreshDashboardData();
        } else if (action === "copy-public-url" && platform) {
          void copyReleaseAssetUrl(platform);
        } else if (action === "open-download-page" && platform) {
          openReleaseDestination(platform);
        } else if (action === "copy-download-route") {
          void copyTextValue(`${authBaseUrl}${OWNER_RELEASE_DOWNLOAD_PAGE}`, "Download page link copied.");
        } else if (action === "copy-bucket-url") {
          void copyTextValue(`${String(cfg.supabaseUrl || "").replace(/\/$/, "")}/storage/v1/object/public/${OWNER_RELEASE_BUCKET}`, "Bucket URL copied.");
        }
      });
    }

    if (els.reportsList) {
      els.reportsList.addEventListener("click", (event) => {
        const bundleButton = event.target.closest("[data-report-bundle-action]");
        if (bundleButton) {
          const bundleId = String(bundleButton.dataset.reportBundleId || "");
          const action = String(bundleButton.dataset.reportBundleAction || "");
          if (!bundleId || !action) return;
          if (action === "view") {
            void previewReportBundle(bundleId);
          } else if (action === "download") {
            void downloadReportBundlePdf(bundleId);
          } else if (action === "csv") {
            downloadReportBundleCsv(bundleId);
          }
          return;
        }
      });
    }

    if (els.reportVerifyBtn) {
      els.reportVerifyBtn.addEventListener("click", () => {
        const report = getSelectedReport();
        if (!report) return;
        void setReportReview(String(report.id || ""), "verified");
      });
    }

    if (els.reportRejectBtn) {
      els.reportRejectBtn.addEventListener("click", () => {
        const report = getSelectedReport();
        if (!report) return;
        void setReportReview(String(report.id || ""), "rejected");
      });
    }

    if (els.reportPendingBtn) {
      els.reportPendingBtn.addEventListener("click", () => {
        const report = getSelectedReport();
        if (!report) return;
        void setReportReview(String(report.id || ""), "pending");
      });
    }

    if (els.reportDeleteBtn) {
      els.reportDeleteBtn.addEventListener("click", () => {
        const report = getSelectedReport();
        if (!report) return;
        void deleteReport(String(report.id || ""));
      });
    }

    if (els.reportDownloadBtn) {
      els.reportDownloadBtn.addEventListener("click", () => {
        const report = getSelectedReport();
        if (!report) return;
        downloadReport(String(report.id || ""));
      });
    }

    if (els.reportPdfBtn) {
      els.reportPdfBtn.addEventListener("click", () => {
        const report = getSelectedReport();
        if (!report) return;
        exportSingleReportPdf(report);
      });
    }

    if (els.settingsForm) {
      els.settingsForm.addEventListener("submit", handleSettingsSave);
    }
  }

  async function boot() {
    hydrateLocalState();
    seedOwnerDefaults();
    hydrateSettingsForm();
    hydrateOwnerLoginNotice();
    setActiveTab("overview");
    showLoginView();

    try {
      const session = await window.WRSupabase.getSession();
      const sessionUser = session && session.user ? session.user : null;
      if (!sessionUser || !hasOwnerUnlock()) return;
      state.sessionUser = sessionUser;
      await openDashboard();
    } catch (error) {
      console.warn("Owner console session bootstrap skipped:", error);
    }
  }

  function seedOwnerDefaults() {
    if (els.emailInput) els.emailInput.value = "";
    if (els.passwordInput) els.passwordInput.value = "";
  }

  function hydrateOwnerLoginNotice() {
    try {
      const url = new URL(window.location.href);
      if (url.searchParams.get("owner_reset") === "success") {
        window.AuthUi.setInlineStatus(els.loginStatus, {
          type: "success",
          message: "Reset admin password completed. Sign in with the new owner password."
        });
        url.searchParams.delete("owner_reset");
        window.history.replaceState({}, "", url.toString());
      }
    } catch (_) {
      // ignore
    }
  }

  function hydrateLocalState() {
    state.localBackups = readJson(OWNER_LOCAL_BACKUPS_KEY, []);
    state.localAudit = readJson(OWNER_LOCAL_AUDIT_KEY, []);
    state.userMeta = readJson(OWNER_USER_META_KEY, {});
    state.settings = {
      ...state.settings,
      ...readJson(OWNER_SETTINGS_KEY, {})
    };
  }

  function triggerTransientClass(target, className, duration) {
    if (!target || !className) return;
    const targetTimers = motionTimers.get(target) || {};
    if (targetTimers[className]) {
      window.clearTimeout(targetTimers[className]);
    }
    target.classList.remove(className);
    void target.offsetWidth;
    target.classList.add(className);
    targetTimers[className] = window.setTimeout(() => {
      target.classList.remove(className);
      const activeTimers = motionTimers.get(target);
      if (!activeTimers) return;
      delete activeTimers[className];
      if (!Object.keys(activeTimers).length) {
        motionTimers.delete(target);
      }
    }, duration);
    motionTimers.set(target, targetTimers);
  }

  function setLoginLoading(isLoading) {
    if (!els.loginView) return;
    els.loginView.classList.toggle("is-authenticating", Boolean(isLoading));
  }

  function setDashboardLoading(isLoading) {
    if (!els.dashboardView) return;
    els.dashboardView.classList.toggle("is-loading", Boolean(isLoading));
  }

  function animateLoginView() {
    triggerTransientClass(els.loginView, "owner-view-entering", 720);
  }

  function animateActivePanel() {
    const activePanel = els.panels.find((panel) => panel && !panel.hidden);
    triggerTransientClass(activePanel, "owner-panel-entering", 620);
  }

  function animateDashboardView() {
    triggerTransientClass(els.dashboardView, "owner-view-entering", 920);
    animateActivePanel();
  }

  function showLoginView() {
    els.loginView.hidden = false;
    els.dashboardView.hidden = true;
    setDashboardLoading(false);
    syncOwnerViewportState();
    animateLoginView();
  }

  function showDashboardView() {
    els.loginView.hidden = true;
    els.dashboardView.hidden = false;
    setLoginLoading(false);
    setDashboardLoading(false);
    syncOwnerViewportState();
    animateDashboardView();
  }

  function resetOwnerDashboardState() {
    state.sessionUser = null;
    state.ownerProfile = null;
    state.users = [];
    state.deletedUsers = [];
    state.reports = [];
    state.filteredReports = [];
    state.deletedReports = [];
    state.remoteBackups = [];
    state.remoteAudit = [];
    state.selectedUserId = "";
    state.userDetailOpen = false;
    state.selectedDeletedUserId = "";
    state.selectedReportId = "";
    state.selectedDeletedReportId = "";
    state.rpcReady = false;
    state.remoteBackupDeleteReady = false;
    state.remoteBackupDeleteNotice = "";
    state.reportRpcReady = false;
    state.reportError = "";
    state.supportMessages = [];
    state.supportReady = false;
    state.supportError = "";
    state.releaseAssets = [];
    state.releaseCatalogReady = false;
    state.releaseCatalogError = "";
    state.storageSearchQuery = "";
    state.storageSortMode = "updated";
    state.databaseCollection = "profiles";
    state.databaseRecordId = "";
    if (els.storageSearchInput) {
      els.storageSearchInput.value = "";
    }
    setLoginLoading(false);
    setDashboardLoading(false);
    closeAddUserModal();
    closeDetailDrawer();
    closeReportDetail();
    closeReportPreviewModal();
    window.AuthUi.clearInlineStatus(els.dashboardStatus);
    showLoginView();
  }

  function wireOwnerAuthWatcher() {
    if (!supabase || !supabase.auth || typeof supabase.auth.onAuthStateChange !== "function") return;
    supabase.auth.onAuthStateChange((_event, session) => {
      const sessionUser = session && session.user ? session.user : null;
      if (sessionUser) {
        state.sessionUser = sessionUser;
        return;
      }
      if (!hasOwnerUnlock() && els.loginView && !els.loginView.hidden) return;
      clearOwnerUnlock();
      resetOwnerDashboardState();
      window.AuthUi.setInlineStatus(els.loginStatus, {
        type: "info",
        message: "Owner session expired. Sign in again."
      });
    });
  }

  async function ensureOwnerSession() {
    const session = await window.WRSupabase.getSession();
    const sessionUser = session && session.user ? session.user : null;
    if (sessionUser) {
      state.sessionUser = sessionUser;
      return sessionUser;
    }
    clearOwnerUnlock();
    resetOwnerDashboardState();
    const authError = new Error("Owner session expired. Sign in again.");
    authError.status = 401;
    authError.code = "unauthorized";
    throw authError;
  }

  function hasVisibleOwnerModal() {
    return [els.addUserModal, els.reportPreviewModal, els.confirmModal].some((modal) => modal && !modal.hidden);
  }

  function syncOwnerViewportState() {
    const dashboardVisible = Boolean(els.dashboardView && !els.dashboardView.hidden);
    document.body.classList.toggle("owner-dashboard-open", dashboardVisible);
    document.body.classList.toggle("owner-modal-open", hasVisibleOwnerModal());
  }

  function showOwnerModal(modal) {
    if (!modal) return;
    modal.hidden = false;
    syncOwnerViewportState();
  }

  function hideOwnerModal(modal) {
    if (!modal) return;
    modal.hidden = true;
    syncOwnerViewportState();
  }

  function settleOwnerConfirm(confirmed) {
    const pending = state.confirmDialog;
    state.confirmDialog = null;
    if (els.confirmModal) {
      els.confirmModal.hidden = true;
      delete els.confirmModal.dataset.tone;
    }
    syncOwnerViewportState();
    if (pending && typeof pending.resolve === "function") {
      pending.resolve(Boolean(confirmed));
    }
  }

  function requestOwnerConfirm(options) {
    const config = options && typeof options === "object" ? options : {};
    const title = String(config.title || "Confirm action");
    const message = String(config.message || "Do you want to continue?");
    const confirmLabel = String(config.confirmLabel || "Continue");
    const cancelLabel = String(config.cancelLabel || "Cancel");
    const kicker = String(config.kicker || "Owner confirmation");
    const tone = config.tone === "danger" ? "danger" : "default";

    if (!els.confirmModal || !els.confirmTitle || !els.confirmMessage || !els.confirmSubmitBtn) {
      window.AuthUi.setInlineStatus(els.dashboardStatus, {
        type: "error",
        message: "Confirmation dialog is unavailable. Refresh the page and try again."
      });
      return Promise.resolve(false);
    }

    if (state.confirmDialog && typeof state.confirmDialog.resolve === "function") {
      state.confirmDialog.resolve(false);
      state.confirmDialog = null;
    }

    if (els.confirmKicker) els.confirmKicker.textContent = kicker;
    els.confirmTitle.textContent = title;
    els.confirmMessage.textContent = message;
    els.confirmSubmitBtn.textContent = confirmLabel;
    if (els.confirmCancelBtn) els.confirmCancelBtn.textContent = cancelLabel;
    els.confirmModal.dataset.tone = tone;
    showOwnerModal(els.confirmModal);

    return new Promise((resolve) => {
      state.confirmDialog = { resolve };
      window.setTimeout(() => {
        try {
          (tone === "danger" ? els.confirmSubmitBtn : (els.confirmCancelBtn || els.confirmSubmitBtn)).focus();
        } catch (_) {
          // ignore focus issues
        }
      }, 30);
    });
  }

  function openAddUserModal() {
    if (!els.addUserModal || !els.addUserForm) return;
    els.addUserForm.reset();
    if (els.addUserVerifiedInput) els.addUserVerifiedInput.checked = true;
    if (els.addUserDisabledInput) els.addUserDisabledInput.checked = false;
    window.AuthUi.clearInlineStatus(els.addUserStatus);
    showOwnerModal(els.addUserModal);
    if (els.addUserNameInput) {
      window.setTimeout(() => {
        try {
          els.addUserNameInput.focus();
        } catch (_) {
          // ignore focus issues
        }
      }, 30);
    }
  }

  function closeAddUserModal() {
    if (!els.addUserModal) return;
    hideOwnerModal(els.addUserModal);
    window.AuthUi.clearInlineStatus(els.addUserStatus);
  }

  async function handleAddUserSubmit(event) {
    event.preventDefault();

    const fullName = String(els.addUserNameInput?.value || "").trim();
    const email = String(els.addUserEmailInput?.value || "").trim().toLowerCase();
    const password = String(els.addUserPasswordInput?.value || "");
    const markVerified = Boolean(els.addUserVerifiedInput?.checked);
    const keepDisabled = Boolean(els.addUserDisabledInput?.checked);

    window.AuthUi.clearInlineStatus(els.addUserStatus);

    if (!fullName || !email || !password) {
      window.AuthUi.setInlineStatus(els.addUserStatus, {
        type: "error",
        message: "Enter full name, email, and password."
      });
      return;
    }

    if (password.length < 8) {
      window.AuthUi.setInlineStatus(els.addUserStatus, {
        type: "error",
        message: "Temporary password must be at least 8 characters."
      });
      return;
    }

    try {
      await assertOwnerAccess();
      const existing = await findUserByEmail(email);
      if (existing) {
        window.AuthUi.setInlineStatus(els.addUserStatus, {
          type: "error",
          message: existing.is_archived
            ? "This email already exists in Trash. Restore that user instead."
            : "A user with this email already exists."
        });
        return;
      }

      if (!ownerDetachedSignupClient) {
        throw new Error("Supabase signup client is not available.");
      }

      window.AuthUi.setBusy(els.addUserSubmitBtn, true, "Create User");

      const signupResult = await ownerDetachedSignupClient.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${authBaseUrl}/signin`,
          data: {
            full_name: fullName,
            name: fullName
          }
        }
      });

      if (signupResult.error) throw signupResult.error;

      const createdUser = await waitForUserByEmail(email);
      if (!createdUser) {
        throw new Error("User created, but the profile is still syncing. Refresh and check the user list again.");
      }

      state.selectedUserId = String(createdUser.id || "");
      state.userDetailOpen = true;

      const followups = [];

      if (markVerified && !createdUser.email_verified) {
        if (state.rpcReady) {
          await ownerRpc("owner_set_email_verified", {
            p_target_user_id: createdUser.id,
            p_is_email_verified: true
          });
          followups.push("verified");
        } else {
          followups.push("created");
        }
      }

      if (keepDisabled && !createdUser.is_disabled) {
        if (state.rpcReady) {
          await ownerRpc("owner_set_disabled", {
            p_target_user_id: createdUser.id,
            p_is_disabled: true
          });
          followups.push("disabled");
        } else {
          followups.push("created");
        }
      }

      await refreshDashboardData();
      closeAddUserModal();

      const messageParts = ["User created"];
      if (followups.includes("verified")) messageParts.push("email verified");
      if (followups.includes("disabled")) messageParts.push("login disabled");
      if (!state.rpcReady && (markVerified || keepDisabled)) {
        messageParts.push("run owner SQL to apply verify or disable changes");
      }

      window.AuthUi.setInlineStatus(els.dashboardStatus, {
        type: "success",
        message: `${messageParts.join(", ")}.`
      });
      window.AuthUi.toast(`${fullName} added successfully.`, "success");
      recordLocalAudit("user_created", `Created ${fullName} (${email}) from the admin dashboard.`);

      try {
        await ownerDetachedSignupClient.auth.signOut();
      } catch (_) {
        // ignore detached client cleanup errors
      }
    } catch (error) {
      window.AuthUi.setInlineStatus(els.addUserStatus, {
        type: "error",
        message: mapOwnerCreateUserError(error)
      });
    } finally {
      window.AuthUi.setBusy(els.addUserSubmitBtn, false, "Create User");
    }
  }

  async function findUserByEmail(email) {
    const normalized = String(email || "").trim().toLowerCase();
    if (!normalized) return null;
    const fields = "id,email,full_name,role,is_disabled,email_verified,auth_provider,avatar_url,created_at,updated_at,last_sign_in_at,is_archived,archived_at,restore_until,archived_backup_id";
    const { data, error } = await supabase
      .from("profiles")
      .select(fields)
      .ilike("email", normalized)
      .limit(1)
      .maybeSingle();

    if (error) throw error;
    return normalizeUserRows(data ? [data] : [])[0] || null;
  }

  async function waitForUserByEmail(email) {
    for (let attempt = 0; attempt < 12; attempt += 1) {
      const user = await findUserByEmail(email);
      if (user) return user;
      await new Promise((resolve) => window.setTimeout(resolve, 450));
    }
    return null;
  }

  async function handlePasswordLogin(event) {
    event.preventDefault();
    window.AuthUi.clearInlineStatus(els.loginStatus);

    const email = String(els.emailInput.value || "").trim();
    const password = String(els.passwordInput.value || "");

    if (!email || !password) {
      window.AuthUi.setInlineStatus(els.loginStatus, {
        type: "error",
        message: "Enter owner email and password."
      });
      return;
    }

    setLoginLoading(true);
    window.AuthUi.setBusy(els.loginSubmit, true, "Open Admin Dashboard");

    try {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      state.sessionUser = data && data.user ? data.user : null;
      setOwnerUnlock();
      await openDashboard();
    } catch (error) {
      clearOwnerUnlock();
      window.AuthUi.setInlineStatus(els.loginStatus, {
        type: "error",
        message: mapOwnerError(error)
      });
    } finally {
      setLoginLoading(false);
      window.AuthUi.setBusy(els.loginSubmit, false, "Open Admin Dashboard");
    }
  }

  async function handleForgotPassword() {
    window.AuthUi.clearInlineStatus(els.loginStatus);
    window.AuthUi.setBusy(els.forgotPasswordBtn, true, "Forgot your password?");

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(OWNER_DEFAULT_EMAIL, {
        redirectTo: ownerResetRedirectUrl
      });
      if (error) throw error;
      window.AuthUi.setInlineStatus(els.loginStatus, {
        type: "success",
        message: `Reset mail sent to ${OWNER_DEFAULT_EMAIL}.`
      });
      recordLocalAudit("owner_reset_requested", "Requested an owner reset email.");
    } catch (error) {
      window.AuthUi.setInlineStatus(els.loginStatus, {
        type: "error",
        message: mapOwnerError(error)
      });
    } finally {
      window.AuthUi.setBusy(els.forgotPasswordBtn, false, "Forgot your password?");
    }
  }

  async function handleLogout() {
    const confirmed = await requestOwnerConfirm({
      kicker: "Sign out",
      title: "Sign out of Admin Dashboard?",
      message: "You will be returned to the owner sign-in page. Do you want to continue?",
      confirmLabel: "Sign Out",
      cancelLabel: "Stay Here"
    });
    if (!confirmed) return;
    recordLocalAudit("sign_out", "Owner signed out from the console.");
    try {
      await supabase.auth.signOut();
    } catch (_) {
      // best effort
    }
    clearOwnerUnlock();
    seedOwnerDefaults();
    resetOwnerDashboardState();
  }

  async function openDashboard() {
    try {
      await assertOwnerAccess();
      await refreshDashboardData();
      hydrateSessionIdentity();
      showDashboardView();
      window.AuthUi.clearInlineStatus(els.loginStatus);
      recordLocalAudit("sign_in", "Owner console opened.");
    } catch (error) {
      clearOwnerUnlock();
      const message = mapOwnerError(error);
      const forbidden =
        Number(error && error.status ? error.status : 0) === 403 ||
        /owner access required/i.test(message);
      if (forbidden) {
        await supabase.auth.signOut().catch(() => {});
        state.sessionUser = null;
        state.ownerProfile = null;
        showLoginView();
        window.AuthUi.setInlineStatus(els.loginStatus, {
          type: "error",
          message: "This signed-in account does not have owner access."
        });
        return;
      }
      showLoginView();
      window.AuthUi.setInlineStatus(els.loginStatus, {
        type: "error",
        message
      });
    }
  }

  async function assertOwnerAccess() {
    const sessionUser = await ensureOwnerSession();

    const { data, error } = await supabase
      .from("profiles")
      .select("id, email, full_name, role, is_disabled")
      .eq("id", sessionUser.id)
      .maybeSingle();

    if (error) throw error;
    if (!data || data.role !== "owner" || data.is_disabled) {
      const forbidden = new Error("Owner access required.");
      forbidden.status = 403;
      throw forbidden;
    }

    state.sessionUser = sessionUser;
    state.ownerProfile = data;
  }

  async function refreshDashboardData() {
    const dashboardVisible = Boolean(els.dashboardView && !els.dashboardView.hidden);
    window.AuthUi.clearInlineStatus(els.dashboardStatus);
    if (dashboardVisible) setDashboardLoading(true);
    window.AuthUi.setBusy(els.refreshBtn, true, "Refresh");

    try {
      await assertOwnerAccess();
      const [rpcResult, reportNotice, backupDeleteCapability, supportResult, releaseCatalogResult] = await Promise.all([
        loadDashboardFromRpc(),
        loadOwnerReportData(),
        probeRemoteBackupDeleteCapability(),
        loadOwnerSupportData(),
        loadOwnerReleaseCatalog()
      ]);
      state.rpcReady = Boolean(rpcResult.writeActionsReady);
      state.rpcNotice = rpcResult.notice || "";
      state.users = rpcResult.users;
      state.deletedUsers = rpcResult.deletedUsers;
      state.remoteBackups = rpcResult.backups;
      state.remoteAudit = rpcResult.audit;
      state.supportMessages = supportResult.messages;
      state.supportReady = supportResult.ready;
      state.supportError = supportResult.error;
      state.releaseAssets = releaseCatalogResult.assets;
      state.releaseCatalogReady = releaseCatalogResult.ready;
      state.releaseCatalogError = releaseCatalogResult.error;
      state.remoteBackupDeleteReady = backupDeleteCapability.ready;
      state.remoteBackupDeleteNotice = backupDeleteCapability.notice;
      applyOwnerAccountFilters();
      state.lastSyncedAt = new Date().toISOString();
      ensureSelections();
      renderAll();
      const dashboardNotice = String(rpcResult.notice || "").trim();
      const combinedNotice = [dashboardNotice, reportNotice].filter(Boolean).join(" ");
      window.AuthUi.setInlineStatus(els.dashboardStatus, {
        type: combinedNotice ? "info" : "success",
        message: combinedNotice || "Live control ready."
      });
      recordLocalAudit(
        "refresh",
        `${rpcResult.writeActionsReady ? "Loaded" : "Fallback loaded"} ${state.users.length} active users and ${state.deletedUsers.length} archived users.`
      );
    } catch (error) {
      if (!isOwnerRpcUnavailable(error) && !isOwnerSqlPatchPending(error)) throw error;
      await loadOwnerDashboardSafeMode({
        message: isOwnerSqlPatchPending(error)
          ? "Dashboard opened in safe mode. Live admin actions are temporarily limited while the runtime patch reconnects."
          : "Read-only mode. Run owner SQL to unlock write actions.",
        recordAction: isOwnerSqlPatchPending(error) ? "refresh_safe_mode" : "refresh_readonly",
        recordSummary: isOwnerSqlPatchPending(error)
          ? "Dashboard switched to safe mode because the live admin runtime patch is not fully active yet."
          : "Owner SQL setup is pending, so the dashboard opened in read-only mode."
      });
    } finally {
      if (dashboardVisible) setDashboardLoading(false);
      updateBackupButtonLabel();
      window.AuthUi.setBusy(els.refreshBtn, false, "Refresh");
    }
  }

  async function loadDashboardFromRpc() {
    const [usersResult, deletedUsersResult, backupsResult, auditResult] = await Promise.allSettled([
      ownerRpc("owner_list_users", {
        p_query: "",
        p_status: "all",
        p_limit: 300,
        p_offset: 0
      }),
      ownerRpc("owner_list_deleted_users", {
        p_query: "",
        p_limit: 200,
        p_offset: 0
      }),
      ownerRpc("owner_list_backups", {
        p_target_user_id: null,
        p_limit: 80
      }),
      ownerRpc("owner_list_audit", {
        p_limit: 120
      })
    ]);

    let fallbackProfilesPromise = null;
    const loadFallbackProfiles = async () => {
      if (!fallbackProfilesPromise) fallbackProfilesPromise = fetchProfilesDirect();
      return fallbackProfilesPromise;
    };

    let writeActionsReady = true;
    const fallbackSegments = [];

    const resolveSegment = async (result, options) => {
      if (result.status === "fulfilled") {
        return options.transform(result.value);
      }

      const error = result.reason;
      const recoverable = isOwnerRpcUnavailable(error) || isOwnerSqlPatchPending(error);
      if (!recoverable) throw error;

      if (options.lockWritesOnRpcUnavailable && isOwnerRpcUnavailable(error)) {
        writeActionsReady = false;
      }

      fallbackSegments.push(options.label);
      return options.fallback();
    };

    const users = await resolveSegment(usersResult, {
      label: "users",
      lockWritesOnRpcUnavailable: true,
      transform: (data) => normalizeUserRows(data),
      fallback: async () => {
        const profiles = await loadFallbackProfiles();
        return profiles.filter((item) => !item.is_archived);
      }
    });

    const deletedUsers = await resolveSegment(deletedUsersResult, {
      label: "trash",
      lockWritesOnRpcUnavailable: true,
      transform: (data) => normalizeUserRows(data),
      fallback: async () => {
        const profiles = await loadFallbackProfiles();
        return profiles.filter((item) => item.is_archived);
      }
    });

    const backups = await resolveSegment(backupsResult, {
      label: "backups",
      lockWritesOnRpcUnavailable: false,
      transform: (data) => normalizeBackups(data),
      fallback: async () => fetchOwnerBackupsDirect().catch(() => [])
    });

    const audit = await resolveSegment(auditResult, {
      label: "audit",
      lockWritesOnRpcUnavailable: false,
      transform: (data) => normalizeAuditEntries(data),
      fallback: async () => fetchOwnerAuditDirect().catch(() => [])
    });

    return {
      users,
      deletedUsers,
      backups,
      audit,
      writeActionsReady,
      notice: buildOwnerDashboardFallbackNotice(fallbackSegments, writeActionsReady)
    };
  }

  function buildOwnerDashboardFallbackNotice(segments, writeActionsReady) {
    const safeSegments = Array.isArray(segments)
      ? segments.filter(Boolean).map((item) => String(item).trim()).filter(Boolean)
      : [];
    if (!safeSegments.length) return "";

    const segmentLabel = formatOwnerFallbackSegments(safeSegments);
    if (writeActionsReady) {
      return `Dashboard refreshed with fallback data for ${segmentLabel} while the runtime patch reconnects. Restore and user control stay available.`;
    }

    return `Dashboard refreshed with fallback data for ${segmentLabel}. Write actions are temporarily locked until the owner SQL runtime reconnects.`;
  }

  function getOwnerDashboardIdentityEmails() {
    return new Set(
      [
        OWNER_DEFAULT_EMAIL,
        state.ownerProfile && state.ownerProfile.email,
        state.sessionUser && state.sessionUser.email
      ].map((value) => String(value || "").trim().toLowerCase()).filter(Boolean)
    );
  }

  function getOwnerDashboardIdentityIds() {
    return new Set(
      [
        state.ownerProfile && state.ownerProfile.id,
        state.sessionUser && state.sessionUser.id
      ].map((value) => String(value || "").trim()).filter(Boolean)
    );
  }

  function isOwnerDashboardIdentityMatch(email, id) {
    const safeEmail = String(email || "").trim().toLowerCase();
    const safeId = String(id || "").trim();
    const ownerEmails = getOwnerDashboardIdentityEmails();
    const ownerIds = getOwnerDashboardIdentityIds();
    return (safeEmail && ownerEmails.has(safeEmail)) || (safeId && ownerIds.has(safeId));
  }

  function applyOwnerAccountFilters() {
    state.users = (Array.isArray(state.users) ? state.users : []).filter(
      (item) => !isOwnerDashboardIdentityMatch(item && item.email, item && item.id)
    );
    state.deletedUsers = (Array.isArray(state.deletedUsers) ? state.deletedUsers : []).filter(
      (item) => !isOwnerDashboardIdentityMatch(item && item.email, item && item.id)
    );
    state.reports = (Array.isArray(state.reports) ? state.reports : []).filter(
      (item) => !isOwnerDashboardIdentityMatch(item && item.user_email, item && item.user_id)
    );
    state.deletedReports = (Array.isArray(state.deletedReports) ? state.deletedReports : []).filter(
      (item) => !isOwnerDashboardIdentityMatch(item && item.user_email, item && item.user_id)
    );
    state.remoteBackups = (Array.isArray(state.remoteBackups) ? state.remoteBackups : []).filter(
      (item) => !isOwnerDashboardIdentityMatch(item && item.target_email, item && item.target_user_id)
    );
    state.localBackups = (Array.isArray(state.localBackups) ? state.localBackups : []).filter(
      (item) => !isOwnerDashboardIdentityMatch(item && item.target_email, item && item.target_user_id)
    );
  }

  function formatOwnerFallbackSegments(segments) {
    const labels = Array.from(
      new Set(
        segments
          .map((item) => String(item || "").trim())
          .filter(Boolean)
      )
    );
    if (!labels.length) return "some sections";
    if (labels.length === 1) return labels[0];
    if (labels.length === 2) return `${labels[0]} and ${labels[1]}`;
    return `${labels.slice(0, -1).join(", ")}, and ${labels[labels.length - 1]}`;
  }

  async function loadOwnerReportData() {
    try {
      const [reports, deletedReports] = await Promise.all([
        ownerRpc("owner_list_reports", {
          p_query: "",
          p_target_user_id: null,
          p_review_status: "all",
          p_limit: 250,
          p_offset: 0
        }),
        ownerRpc("owner_list_deleted_reports", {
          p_query: "",
          p_limit: 250,
          p_offset: 0
        })
      ]);

      state.reports = normalizeReports(reports);
      state.deletedReports = normalizeDeletedReports(deletedReports);
      state.reportRpcReady = true;
      state.reportError = "";
      return "";
    } catch (error) {
      state.reports = [];
      state.deletedReports = [];
      state.reportRpcReady = false;
      state.reportError = mapOwnerReportLoadError(error);
      console.warn("Owner report module opened in safe mode:", error);
      return state.reportError;
    }
  }

  async function loadOwnerSupportData() {
    try {
      const messages = await fetchSupportMessagesDirect();
      return {
        messages,
        ready: true,
        error: ""
      };
    } catch (error) {
      console.warn("Owner support inbox opened in safe mode:", error);
      return {
        messages: [],
        ready: false,
        error: mapOwnerSupportLoadError(error)
      };
    }
  }

  async function loadOwnerReleaseCatalog() {
    try {
      const assets = await fetchReleaseCatalogDirect();
      return {
        assets,
        ready: true,
        error: ""
      };
    } catch (error) {
      console.warn("Owner storage release manager opened in safe mode:", error);
      return {
        assets: getFallbackReleaseAssets(),
        ready: false,
        error: mapOwnerReleaseLoadError(error)
      };
    }
  }

  async function probeRemoteBackupDeleteCapability() {
    try {
      await ownerRpc("owner_delete_backup", {
        p_backup_id: OWNER_PROBE_UUID
      });
      return {
        ready: true,
        notice: ""
      };
    } catch (error) {
      const code = String(error && error.code ? error.code : "").toLowerCase();
      const message = String(error && error.message ? error.message : "").toLowerCase();
      if (isOwnerRpcUnavailable(error) || isOwnerSqlPatchPending(error)) {
        return {
          ready: false,
          notice: "Delete backup needs the latest admin dashboard SQL patch. Create backup and Download JSON still work."
        };
      }
      if (code === "p0001" || message.includes("backup not found")) {
        return {
          ready: true,
          notice: ""
        };
      }
      return {
        ready: true,
        notice: ""
      };
    }
  }

  async function fetchProfilesDirect() {
    const legacyFields = "id,email,full_name,role,is_disabled,email_verified,auth_provider,avatar_url,created_at,updated_at,last_sign_in_at";
    const ownerFields = `${legacyFields},is_archived,archived_at,restore_until,archived_backup_id`;

    let { data, error } = await supabase
      .from("profiles")
      .select(ownerFields)
      .order("created_at", { ascending: false });

    if (error && /is_archived|restore_until|archived_backup_id/i.test(String(error.message || ""))) {
      const retry = await supabase
        .from("profiles")
        .select(legacyFields)
        .order("created_at", { ascending: false });
      data = retry.data;
      error = retry.error;
    }

    if (error) throw error;
    return normalizeUserRows(data);
  }

  async function fetchOwnerBackupsDirect() {
    const { data, error } = await supabase
      .from("owner_backups")
      .select("id,target_user_id,target_email,target_full_name,backup_kind,created_by,snapshot,created_at")
      .order("created_at", { ascending: false })
      .limit(80);

    if (error) throw error;
    return normalizeBackups(data);
  }

  async function fetchOwnerAuditDirect() {
    const { data, error } = await supabase
      .from("owner_audit_logs")
      .select("id,actor_id,actor_email,action,target_user_id,target_email,target_full_name,summary,meta,created_at")
      .order("created_at", { ascending: false })
      .limit(120);

    if (error) throw error;
    return normalizeAuditEntries(data);
  }

  async function fetchSupportMessagesDirect() {
    const { data, error } = await supabase
      .from("support_messages")
      .select("id,user_id,sender_email,sender_name,category,subject,message,status,owner_seen_at,resolved_at,resolved_by,created_at,updated_at")
      .order("created_at", { ascending: false })
      .limit(120);

    if (error) throw error;
    return normalizeSupportMessages(data);
  }

  async function fetchReleaseCatalogDirect() {
    const { data, error } = await supabase
      .from("app_release_assets")
      .select("id,platform,channel,bucket_name,object_path,public_url,file_name,version_label,build_label,release_notes,file_size_bytes,mime_type,is_active,created_at,updated_at,updated_by")
      .eq("channel", OWNER_RELEASE_CHANNEL)
      .order("updated_at", { ascending: false });

    if (error) throw error;
    return normalizeReleaseAssets(data);
  }

  async function loadOwnerDashboardSafeMode(options) {
    const settings = options && typeof options === "object" ? options : {};
    const preserveReports = Boolean(settings.preserveReports);
    const [fallbackProfiles, fallbackBackups, fallbackAudit, fallbackSupport, fallbackReleases] = await Promise.all([
      fetchProfilesDirect(),
      fetchOwnerBackupsDirect().catch(() => []),
      fetchOwnerAuditDirect().catch(() => []),
      loadOwnerSupportData(),
      loadOwnerReleaseCatalog()
    ]);

    state.rpcReady = false;
    state.users = fallbackProfiles.filter((item) => !item.is_archived);
    state.deletedUsers = fallbackProfiles.filter((item) => item.is_archived);
    state.remoteBackups = fallbackBackups;
    state.remoteAudit = fallbackAudit;
    state.supportMessages = fallbackSupport.messages;
    state.supportReady = fallbackSupport.ready;
    state.supportError = fallbackSupport.error;
    state.releaseAssets = fallbackReleases.assets;
    state.releaseCatalogReady = fallbackReleases.ready;
    state.releaseCatalogError = fallbackReleases.error;
    state.remoteBackupDeleteReady = false;
    state.remoteBackupDeleteNotice = fallbackBackups.length
      ? "Delete backup is temporarily unavailable while the admin runtime patch reconnects. Download JSON still works."
      : "";
    applyOwnerAccountFilters();
    if (!preserveReports) {
      state.reports = [];
      state.deletedReports = [];
      state.reportRpcReady = false;
      state.reportError = "";
    }
    state.lastSyncedAt = new Date().toISOString();
    ensureSelections();
    renderAll();
    window.AuthUi.setInlineStatus(els.dashboardStatus, {
      type: "info",
      message: settings.message || "Dashboard opened in safe mode."
    });
    if (settings.recordAction && settings.recordSummary) {
      recordLocalAudit(settings.recordAction, settings.recordSummary);
    }
  }

  async function handleOwnerSqlPatchFallback(error, message, options) {
    if (!isOwnerSqlPatchPending(error)) return false;
    const settings = options && typeof options === "object" ? options : {};
    if (settings.keepInteractive) {
      window.AuthUi.setInlineStatus(els.dashboardStatus, {
        type: "error",
        message: message || "This action needs the latest admin dashboard SQL patch. The dashboard will stay interactive while you refresh."
      });
      return true;
    }
    await loadOwnerDashboardSafeMode({
      message: message || "Dashboard switched to safe mode. Live admin actions are temporarily unavailable until the runtime patch reconnects.",
      preserveReports: true
    });
    return true;
  }

  async function ownerRpc(functionName, params) {
    await assertOwnerAccess();
    const { data, error } = await supabase.rpc(functionName, params || {});
    if (error) {
      const err = new Error(error.message || `${functionName} failed.`);
      err.code = error.code || "";
      err.status = error.status || 400;
      err.details = error.details || "";
      err.hint = error.hint || "";
      throw err;
    }
    return data;
  }

  async function updateVerification(userId, nextVerified) {
    const targetUser = state.users.find((item) => String(item.id || "") === String(userId || ""));
    if (targetUser && !nextVerified && isProviderManagedVerification(targetUser)) {
      window.AuthUi.setInlineStatus(els.dashboardStatus, {
        type: "info",
        message: `${formatProvider(targetUser.auth_provider)} accounts stay verified by the sign-in provider. Use Disable User if you need to block access.`
      });
      return;
    }

    if (!state.rpcReady) {
      window.AuthUi.setInlineStatus(els.dashboardStatus, {
        type: "info",
        message: "Run owner SQL to unlock verification."
      });
      return;
    }

    const actionLabel = nextVerified ? "Verify User" : "Remove Verification";
    window.AuthUi.setBusy(els.detailVerifyBtn, true, actionLabel);

    try {
      await ownerRpc("owner_set_email_verified", {
        p_target_user_id: userId,
        p_is_email_verified: nextVerified
      });
      await refreshDashboardData();
      window.AuthUi.setInlineStatus(els.dashboardStatus, {
        type: "success",
        message: nextVerified ? "User email marked as verified." : "User email verification removed."
      });
    } catch (error) {
      if (await handleOwnerSqlPatchFallback(error)) return;
      window.AuthUi.setInlineStatus(els.dashboardStatus, {
        type: "error",
        message: mapOwnerError(error)
      });
    } finally {
      window.AuthUi.setBusy(els.detailVerifyBtn, false, "Verify User");
    }
  }

  async function updateDisabled(userId, nextDisabled) {
    const targetUser = state.users.find((item) => String(item.id || "") === String(userId || ""));
    if (!state.rpcReady) {
      window.AuthUi.setInlineStatus(els.dashboardStatus, {
        type: "info",
        message: "Run owner SQL to unlock enable/disable."
      });
      return;
    }

    window.AuthUi.setBusy(els.detailDisableBtn, true, nextDisabled ? "Disable User" : "Enable User");

    try {
      await ownerRpc("owner_set_disabled", {
        p_target_user_id: userId,
        p_is_disabled: nextDisabled
      });
      let emailSent = false;
      if (nextDisabled && targetUser) {
        emailSent = await sendUserDisabledEmail(targetUser);
      }
      await refreshDashboardData();
      window.AuthUi.setInlineStatus(els.dashboardStatus, {
        type: emailSent === false && nextDisabled ? "info" : "success",
        message: nextDisabled
          ? (emailSent ? "User disabled. Email sent and active sessions will be signed out." : "User disabled. Email could not be sent, but access is blocked.")
          : "User enabled successfully."
      });
    } catch (error) {
      if (await handleOwnerSqlPatchFallback(error)) return;
      window.AuthUi.setInlineStatus(els.dashboardStatus, {
        type: "error",
        message: mapOwnerError(error)
      });
    } finally {
      window.AuthUi.setBusy(els.detailDisableBtn, false, "Disable User");
    }
  }

  async function archiveUser(userId) {
    const user = state.users.find((item) => String(item.id || "") === String(userId || ""));
    if (!user) return;

    const confirmed = await requestOwnerConfirm({
      kicker: "User action",
      title: "Move user to Trash?",
      message: `Delete ${getUserDisplayName(user)}? This safely moves the account into Trash and blocks sign-in until restore.`,
      confirmLabel: "Move to Trash",
      tone: "danger"
    });
    if (!confirmed) {
      return;
    }

    if (!state.rpcReady) {
      window.AuthUi.setInlineStatus(els.dashboardStatus, {
        type: "info",
        message: "Run owner SQL to unlock archive and recovery."
      });
      return;
    }

    window.AuthUi.setBusy(els.detailArchiveBtn, true, "Delete User");

    try {
      await ownerRpc("owner_archive_user", {
        p_target_user_id: userId
      });
      state.selectedDeletedUserId = userId;
      await refreshDashboardData();
      setActiveTab("trash");
      window.AuthUi.setInlineStatus(els.dashboardStatus, {
        type: "success",
        message: "User moved to Trash."
      });
    } catch (error) {
      if (await handleOwnerSqlPatchFallback(
        error,
        "Archive could not finish because the live Trash SQL patch is not fully active yet. The dashboard stayed interactive so you can keep working.",
        { keepInteractive: true }
      )) return;
      window.AuthUi.setInlineStatus(els.dashboardStatus, {
        type: "error",
        message: mapOwnerError(error)
      });
    } finally {
      window.AuthUi.setBusy(els.detailArchiveBtn, false, "Delete User");
    }
  }

  async function restoreUser(userId) {
    const user = state.deletedUsers.find((item) => String(item.id || "") === String(userId || ""));
    if (!user) return;

    const confirmed = await requestOwnerConfirm({
      kicker: "Recovery",
      title: "Restore user?",
      message: `Restore ${getUserDisplayName(user)} from Deleted Users?`,
      confirmLabel: "Restore User"
    });
    if (!confirmed) {
      return;
    }

    if (!state.rpcReady) {
      window.AuthUi.setInlineStatus(els.dashboardStatus, {
        type: "info",
        message: "Run owner SQL to unlock restore."
      });
      return;
    }

    try {
      await ownerRpc("owner_restore_user", {
        p_target_user_id: userId
      });
      state.selectedUserId = userId;
      await refreshDashboardData();
      setActiveTab("users");
      window.AuthUi.setInlineStatus(els.dashboardStatus, {
        type: "success",
        message: "User restored from Deleted Users."
      });
    } catch (error) {
      if (await handleOwnerSqlPatchFallback(
        error,
        "Restore could not finish because the live Trash restore SQL patch is not fully active yet. The dashboard stayed interactive so you can keep working.",
        { keepInteractive: true }
      )) return;
      window.AuthUi.setInlineStatus(els.dashboardStatus, {
        type: "error",
        message: mapOwnerError(error)
      });
    }
  }

  async function permanentlyDeleteUser(userId) {
    const user = state.deletedUsers.find((item) => String(item.id || "") === String(userId || ""));
    if (!user) return;

    const confirmed = await requestOwnerConfirm({
      kicker: "Permanent delete",
      title: "Delete user permanently?",
      message: `Permanently delete ${getUserDisplayName(user)}? This action cannot be undone from the dashboard.`,
      confirmLabel: "Delete Permanently",
      tone: "danger"
    });
    if (!confirmed) {
      return;
    }

    if (!state.rpcReady) {
      window.AuthUi.setInlineStatus(els.dashboardStatus, {
        type: "info",
        message: "Run owner SQL to unlock permanent delete."
      });
      return;
    }

    try {
      await ownerRpc("owner_permanently_delete_user", {
        p_target_user_id: userId
      });
      state.selectedDeletedUserId = "";
      await refreshDashboardData();
      window.AuthUi.setInlineStatus(els.dashboardStatus, {
        type: "success",
        message: "Archived user permanently deleted."
      });
    } catch (error) {
      if (await handleOwnerSqlPatchFallback(
        error,
        "Permanent delete is waiting for the latest Trash SQL patch. The dashboard stayed interactive so other owner controls keep working.",
        { keepInteractive: true }
      )) return;
      window.AuthUi.setInlineStatus(els.dashboardStatus, {
        type: "error",
        message: mapOwnerError(error)
      });
    }
  }

  async function createManualBackup() {
    const selectedUser = getSelectedUser();
    if (!selectedUser) {
      window.AuthUi.setInlineStatus(els.dashboardStatus, {
        type: "info",
        message: "Select a user first."
      });
      return;
    }

    if (els.backupBtn) {
      window.AuthUi.setBusy(els.backupBtn, true, "Manual Backup");
    }
    if (els.backupsCreateBtn) {
      window.AuthUi.setBusy(els.backupsCreateBtn, true, "Create Backup");
    }

    try {
      if (state.rpcReady) {
        await ownerRpc("owner_create_backup", {
          p_target_user_id: String(selectedUser.id || "")
        });
        await refreshDashboardData();
        window.AuthUi.setInlineStatus(els.dashboardStatus, {
          type: "success",
          message: `Backup created for ${selectedUser.full_name || selectedUser.email || "the selected user"}.`
        });
      } else {
        const backup = createLocalFallbackBackup(selectedUser);
        state.localBackups.unshift(backup);
        state.localBackups = state.localBackups.slice(0, OWNER_MAX_LOCAL_BACKUPS);
        persistJson(OWNER_LOCAL_BACKUPS_KEY, state.localBackups);
        renderBackups();
        renderOverview();
        renderAnalytics();
        renderHealth();
        renderFiles();
        hydrateDetailDrawer();
        if (state.settings.autoDownloadBackup) {
          downloadBackup(backup.id);
        }
        window.AuthUi.setInlineStatus(els.dashboardStatus, {
          type: "success",
          message: `Local fallback backup created for ${selectedUser.full_name || selectedUser.email || "the selected user"}.`
        });
      }
    } catch (error) {
      if (await handleOwnerSqlPatchFallback(error, "Backups opened in safe mode. Create Backup is temporarily unavailable until the runtime patch reconnects.")) return;
      window.AuthUi.setInlineStatus(els.dashboardStatus, {
        type: "error",
        message: mapOwnerError(error)
      });
    } finally {
      updateBackupButtonLabel();
      if (els.backupBtn) {
        window.AuthUi.setBusy(els.backupBtn, false, "Manual Backup");
      }
      if (els.backupsCreateBtn) {
        window.AuthUi.setBusy(els.backupsCreateBtn, false, getSelectedUser() ? "Create Backup" : "Backup User");
      }
    }
  }

  async function backupUserById(userId) {
    if (!userId) return;
    state.selectedUserId = String(userId || "");
    updateBackupButtonLabel();
    await createManualBackup();
  }

  function createLocalFallbackBackup(user) {
    const snapshot = {
      capturedAt: new Date().toISOString(),
      profile: user,
      workLogs: [],
      reminders: [],
      appSettings: {},
      note: "Local fallback backup created before the owner SQL migration was applied."
    };

    const backup = {
      id: `local-${Date.now()}`,
      target_user_id: String(user.id || ""),
      target_email: String(user.email || ""),
      target_full_name: String(user.full_name || user.email || "User"),
      backup_kind: "manual",
      created_by: String(state.sessionUser && state.sessionUser.id ? state.sessionUser.id : ""),
      snapshot,
      created_at: new Date().toISOString(),
      source: "local"
    };

    recordLocalAudit("backup_local", `Created a local fallback backup for ${backup.target_full_name}.`);
    return backup;
  }

  function downloadLatestBackupForUser(userId) {
    const backups = getCombinedBackups().filter((item) => String(item.target_user_id || "") === String(userId || ""));
    if (!backups.length) {
      window.AuthUi.setInlineStatus(els.dashboardStatus, {
        type: "info",
        message: "No backup is available for this user yet."
      });
      return;
    }
    downloadBackup(String(backups[0].id || ""));
  }

  function downloadBackup(backupId) {
    const backup = getCombinedBackups().find((item) => String(item.id || "") === String(backupId || ""));
    if (!backup) return;

    const blob = new Blob([JSON.stringify(backup.snapshot || {}, null, 2)], {
      type: "application/json"
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    const safeStamp = String(backup.created_at || new Date().toISOString()).replace(/[:.]/g, "-");
    const safeName = String(backup.target_full_name || backup.target_email || "user")
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "") || "user";
    link.href = url;
    link.download = `workreport-owner-backup-${safeName}-${safeStamp}.json`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
    recordLocalAudit("backup_download", `Downloaded backup for ${backup.target_full_name || backup.target_email || "user"}.`);
    renderAudit();
  }

  async function deleteBackup(backupId) {
    const backup = getCombinedBackups().find((item) => String(item.id || "") === String(backupId || ""));
    if (!backup) return;

    const targetName = backup.target_full_name || backup.target_email || "this user";
    const isLocalBackup = String(backup.source || "").toLowerCase() === "local" || String(backup.id || "").startsWith("local-");
    if (!isLocalBackup && !state.remoteBackupDeleteReady) {
      state.remoteBackupDeleteNotice = state.remoteBackupDeleteNotice || "Delete backup needs the latest admin dashboard SQL patch. Create backup and Download JSON still work.";
      renderBackups();
      return;
    }

    const confirmed = await requestOwnerConfirm({
      kicker: "Backup delete",
      title: "Delete backup snapshot?",
      message: `Delete ${formatBackupKind(backup.backup_kind).toLowerCase()} for ${targetName}? This removes the saved snapshot record.`,
      confirmLabel: "Delete Backup",
      tone: "danger"
    });
    if (!confirmed) return;

    if (isLocalBackup) {
      state.localBackups = state.localBackups.filter((item) => String(item.id || "") !== String(backupId || ""));
      persistJson(OWNER_LOCAL_BACKUPS_KEY, state.localBackups);
      recordLocalAudit("backup_deleted_local", `Deleted a local backup for ${targetName}.`);
      renderBackups();
      renderOverview();
      renderAnalytics();
      renderHealth();
      renderFiles();
      renderAudit();
      hydrateDetailDrawer();
      window.AuthUi.setInlineStatus(els.dashboardStatus, {
        type: "success",
        message: `Deleted local backup for ${targetName}.`
      });
      return;
    }

    if (!state.rpcReady) {
      window.AuthUi.setInlineStatus(els.dashboardStatus, {
        type: "info",
        message: "Run the latest admin dashboard SQL patch to unlock live backup delete."
      });
      return;
    }

    try {
      await ownerRpc("owner_delete_backup", {
        p_backup_id: String(backup.id || "")
      });
      await refreshDashboardData();
      window.AuthUi.setInlineStatus(els.dashboardStatus, {
        type: "success",
        message: `Deleted backup for ${targetName}.`
      });
    } catch (error) {
      if (isOwnerRpcUnavailable(error) || isOwnerSqlPatchPending(error)) {
        state.remoteBackupDeleteReady = false;
        state.remoteBackupDeleteNotice = "Delete backup needs the latest admin dashboard SQL patch. Create backup and Download JSON still work.";
        window.AuthUi.clearInlineStatus(els.dashboardStatus);
        renderBackups();
        return;
      }
      window.AuthUi.setInlineStatus(els.dashboardStatus, {
        type: "error",
        message: mapOwnerError(error)
      });
    }
  }

  function setActiveTab(tabId) {
    const panelIds = new Set(els.panels.map((panel) => String(panel.dataset.ownerPanel || "")));
    let safeTab = String(tabId || "overview");
    if (safeTab === "security") safeTab = "users";
    if (!panelIds.has(safeTab)) safeTab = "overview";
    state.activeTab = safeTab;
    els.pageTitle.textContent = titleForTab(safeTab);
    if (els.pageSubtitle) {
      els.pageSubtitle.textContent = subtitleForTab(safeTab);
    }
    els.navButtons.forEach((btn) => {
      btn.classList.toggle("is-active", String(btn.dataset.ownerTab || "") === safeTab);
    });
    els.panels.forEach((panel) => {
      panel.hidden = String(panel.dataset.ownerPanel || "") !== safeTab;
    });
    syncOverviewTopbarActions();
    renderOverview();
    renderUsers();
    renderDeletedUsers();
    renderDeletedReports();
    renderBackups();
    renderRecovery();
    renderAudit();
    renderHealth();
    renderReports();
    renderAnalytics();
    renderSecurity();
    renderNotifications();
    renderFiles();
    renderStoragePage();
    renderSupport();
    renderSettingsSummary();
    renderTopbarMeta();
    hydrateSettingsForm();
    if (els.dashboardView && !els.dashboardView.hidden) {
      animateActivePanel();
    }
  }

  function titleForTab(tabId) {
    const map = {
      overview: "Overview",
      users: "Users",
      reports: "Reports",
      analytics: "Analytics",
      backup: "Backups",
      trash: "Trash",
      files: "Database",
      storage: "Storage",
      support: "Support",
      settings: "Settings",
      notifications: "Notifications"
    };
    return map[tabId] || "Admin Dashboard";
  }

  function subtitleForTab(tabId) {
    const map = {
      overview: "Get a complete snapshot of platform activity, user status, and recent operations from one place.",
      users: "Manage account access, identity, verification, and user status from one place.",
      reports: "Review report submissions, approval queues, and export-ready work data quickly.",
      analytics: "Monitor platform performance, sign-in patterns, and usage behavior with clarity.",
      backup: "Inspect recovery snapshots, backup coverage, and restore readiness across the platform.",
      trash: "Restore archived users and manage deletion workflows safely without losing operational context.",
      files: "Browse live profiles, reports, backups, and support records in one owner-safe database workspace.",
      storage: "Publish APK and IPA packages, manage download routes, and keep release delivery under owner control.",
      support: "Review each user support request with clear sender name, email, category, and full message context.",
      settings: "Configure owner preferences, retention policy, and dashboard control defaults.",
      notifications: "Monitor only new user support and access requests in one clean notification inbox."
    };
    return map[tabId] || "Manage platform operations from a clean, enterprise-grade admin workspace.";
  }

  function syncOverviewTopbarActions() {
    const isOverview = state.activeTab === "overview";
    if (els.overviewExportBtn) {
      els.overviewExportBtn.hidden = !isOverview;
    }
    const quickActionsWrap = els.overviewQuickActions
      ? els.overviewQuickActions.closest(".owner-overview-quick-select-wrap")
      : null;
    if (quickActionsWrap) {
      quickActionsWrap.hidden = !isOverview;
    }
  }

  function ensureSelections() {
    if (!state.selectedUserId || !state.users.some((item) => String(item.id || "") === state.selectedUserId)) {
      state.selectedUserId = state.users[0] ? String(state.users[0].id || "") : "";
    }
    if (
      !state.selectedDeletedUserId ||
      !state.deletedUsers.some((item) => String(item.id || "") === state.selectedDeletedUserId)
    ) {
      state.selectedDeletedUserId = state.deletedUsers[0] ? String(state.deletedUsers[0].id || "") : "";
    }
    if (!state.selectedReportId || !state.reports.some((item) => String(item.id || "") === state.selectedReportId)) {
      state.selectedReportId = state.reports[0] ? String(state.reports[0].id || "") : "";
    }
    if (
      !state.selectedDeletedReportId ||
      !state.deletedReports.some((item) => String(item.id || "") === state.selectedDeletedReportId)
    ) {
      state.selectedDeletedReportId = state.deletedReports[0] ? String(state.deletedReports[0].id || "") : "";
    }
  }

  function hydrateSessionIdentity() {
    const email = String(
      (state.ownerProfile && state.ownerProfile.email) ||
      (state.sessionUser && state.sessionUser.email) ||
      OWNER_DEFAULT_EMAIL
    ).trim();
    const name = String(
      (state.ownerProfile && state.ownerProfile.full_name) ||
      (state.sessionUser && state.sessionUser.user_metadata && (state.sessionUser.user_metadata.full_name || state.sessionUser.user_metadata.name)) ||
      "Owner"
    ).trim();

    els.sessionName.textContent = name || "Owner";
    els.sessionEmail.textContent = email || OWNER_DEFAULT_EMAIL;
  }

  function renderAll() {
    renderOverview();
    renderUsers();
    renderDeletedUsers();
    renderDeletedReports();
    renderBackups();
    renderRecovery();
    renderAudit();
    renderHealth();
    renderReports();
    renderAnalytics();
    renderSecurity();
    renderNotifications();
    renderFiles();
    renderSupport();
    renderSettingsSummary();
    renderTopbarMeta();
    hydrateSettingsForm();
    hydrateDetailDrawer();
    hydrateReportDetail();
    updateBackupButtonLabel();
  }

  function formatCompactCount(value) {
    return new Intl.NumberFormat("en", {
      notation: "compact",
      maximumFractionDigits: 1
    }).format(Math.max(0, Number(value || 0)));
  }

  function buildDailySeries(items, getDateValue, days = 8) {
    const safeDays = Math.max(4, Number(days || 8));
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const buckets = [];
    const counts = new Map();

    for (let index = safeDays - 1; index >= 0; index -= 1) {
      const date = new Date(today);
      date.setDate(today.getDate() - index);
      const key = date.toISOString().slice(0, 10);
      buckets.push({
        key,
        label: date.toLocaleDateString("en-GB", { day: "2-digit", month: "short" }),
        shortLabel: date.toLocaleDateString("en-GB", { day: "numeric" })
      });
      counts.set(key, 0);
    }

    (Array.isArray(items) ? items : []).forEach((item) => {
      const raw = typeof getDateValue === "function" ? getDateValue(item) : "";
      if (!raw) return;
      const date = new Date(raw);
      if (Number.isNaN(date.getTime())) return;
      const key = date.toISOString().slice(0, 10);
      if (!counts.has(key)) return;
      counts.set(key, (counts.get(key) || 0) + 1);
    });

    return buckets.map((bucket) => ({
      label: bucket.shortLabel,
      fullLabel: bucket.label,
      value: counts.get(bucket.key) || 0
    }));
  }

  function buildOverviewBarChart(entries, tone = "emerald") {
    const rows = Array.isArray(entries) ? entries.slice(0, 8) : [];
    if (!rows.length) {
      return `<div class="owner-overview-bars-empty">No activity yet</div>`;
    }
    const max = Math.max(...rows.map((entry) => Number(entry && entry.value ? entry.value : 0)), 0);
    if (max <= 0) {
      return rows.map((entry) => `
        <div class="owner-overview-bar-slot is-empty" title="${escapeHtml(String(entry.fullLabel || entry.label || ""))}: 0">
          <div class="owner-overview-bar-track">
            <span class="owner-overview-bar-fill owner-overview-bar-fill-${escapeHtml(tone)}" style="height:10%"></span>
          </div>
          <small>${escapeHtml(String(entry.label || ""))}</small>
        </div>
      `).join("");
    }
    return rows.map((entry) => {
      const value = Math.max(0, Number(entry && entry.value ? entry.value : 0));
      const height = Math.max(12, Math.round((value / max) * 100));
      return `
        <div class="owner-overview-bar-slot" title="${escapeHtml(String(entry.fullLabel || entry.label || ""))}: ${escapeHtml(String(value))}">
          <div class="owner-overview-bar-track">
            <span class="owner-overview-bar-fill owner-overview-bar-fill-${escapeHtml(tone)}" style="height:${height}%"></span>
          </div>
          <small>${escapeHtml(String(entry.label || ""))}</small>
        </div>
      `;
    }).join("");
  }

  async function copyOverviewWorkspaceLink() {
    const url = `${authBaseUrl}/admin-control_dashboard`;
    try {
      if (navigator.clipboard && typeof navigator.clipboard.writeText === "function") {
        await navigator.clipboard.writeText(url);
      } else {
        const input = document.createElement("textarea");
        input.value = url;
        input.setAttribute("readonly", "readonly");
        input.style.position = "absolute";
        input.style.left = "-9999px";
        document.body.appendChild(input);
        input.select();
        document.execCommand("copy");
        document.body.removeChild(input);
      }
      if (window.AuthUi && typeof window.AuthUi.setInlineStatus === "function") {
        window.AuthUi.setInlineStatus(els.dashboardStatus, {
          type: "success",
          message: "Admin dashboard link copied."
        });
      }
    } catch (error) {
      console.warn("Copy dashboard link failed:", error);
      if (window.AuthUi && typeof window.AuthUi.setInlineStatus === "function") {
        window.AuthUi.setInlineStatus(els.dashboardStatus, {
          type: "info",
          message: "Copy failed. Use the visible dashboard link manually."
        });
      }
    }
  }

  function getLocalDayStart(offsetDays = 0) {
    const date = new Date();
    date.setHours(0, 0, 0, 0);
    date.setDate(date.getDate() + Number(offsetDays || 0));
    return date.getTime();
  }

  function toTimestamp(value) {
    if (!value) return 0;
    const date = new Date(value);
    const time = date.getTime();
    return Number.isFinite(time) ? time : 0;
  }

  function countItemsBetween(items, getValue, startTime, endTime) {
    const list = Array.isArray(items) ? items : [];
    return list.reduce((total, item) => {
      const rawValue = typeof getValue === "function" ? getValue(item) : "";
      const timestamp = toTimestamp(rawValue);
      if (!timestamp) return total;
      return timestamp >= startTime && timestamp < endTime ? total + 1 : total;
    }, 0);
  }

  function getReportActivityTimestamp(report) {
    if (!report) return "";
    if (report.created_at) return report.created_at;
    if (report.updated_at) return report.updated_at;
    if (report.log_date) return `${report.log_date}T12:00:00`;
    return "";
  }

  function getTrendBadgeModel(currentValue, previousValue, options = {}) {
    const current = Number(currentValue || 0);
    const previous = Number(previousValue || 0);
    const diff = current - previous;
    const positiveTone = options.positiveTone || "positive";
    const negativeTone = options.negativeTone || "negative";
    const neutralTone = options.neutralTone || "neutral";

    if (current === 0 && previous === 0) {
      return {
        text: options.zeroText || "No change",
        tone: neutralTone
      };
    }

    if (diff === 0) {
      return {
        text: options.sameText || "No change vs yesterday",
        tone: neutralTone
      };
    }

    return {
      text: `${diff > 0 ? "+" : ""}${diff} vs yesterday`,
      tone: diff > 0 ? positiveTone : negativeTone
    };
  }

  function applyTrendBadge(element, model) {
    if (!element) return;
    const tone = String(model && model.tone ? model.tone : "neutral");
    element.textContent = String(model && model.text ? model.text : "No change");
    element.classList.remove("is-positive", "is-negative", "is-neutral", "is-warning");
    element.classList.add(`is-${tone}`);
  }

  function getOverviewUserStatus(user) {
    if (!user) return { label: "Unknown", cls: "status-warning" };
    if (Boolean(user.is_disabled)) return { label: "Disabled", cls: "status-disabled" };
    if (!Boolean(user.email_verified)) return { label: "Unverified", cls: "status-warning" };
    return { label: "Active", cls: "status-active" };
  }

  function getActivityToneClass(tone) {
    const value = String(tone || "neutral").trim().toLowerCase();
    if (value === "green" || value === "success") return "is-success";
    if (value === "amber" || value === "warning") return "is-warning";
    if (value === "red" || value === "danger") return "is-danger";
    return "is-primary";
  }

  function getSystemStatusTone(status) {
    const value = String(status || "healthy").trim().toLowerCase();
    if (value === "issue") return "issue";
    if (value === "warning") return "warning";
    return "healthy";
  }

  function getAuditEventTitle(audit) {
    const action = String(audit && audit.action ? audit.action : "").trim().toLowerCase();
    if (!action) return "Admin activity";
    if (action.includes("backup")) return "Backup created";
    if (action.includes("archive")) return "User moved to trash";
    if (action.includes("restore")) return "User restored";
    if (action.includes("disable")) return "Account status changed";
    if (action.includes("verify")) return "Verification updated";
    if (action.includes("support")) return "Support action recorded";
    return toTitleWords(action);
  }

  function buildOverviewModel() {
    const activeUsers = Array.isArray(state.users) ? state.users.slice() : [];
    const archivedUsers = Array.isArray(state.deletedUsers) ? state.deletedUsers.slice() : [];
    const allUsers = [...activeUsers, ...archivedUsers];
    const reports = Array.isArray(state.reports) ? state.reports.slice() : [];
    const backups = getCombinedBackups();
    const supportMessages = normalizeSupportMessages(state.supportMessages);
    const openSupportMessages = supportMessages.filter((item) => String(item.status || "new") !== "resolved");

    const now = Date.now();
    const todayStart = getLocalDayStart(0);
    const tomorrowStart = getLocalDayStart(1);
    const yesterdayStart = getLocalDayStart(-1);
    const weekStart = getLocalDayStart(-6);
    const previousWeekStart = getLocalDayStart(-13);
    const rollingDayStart = now - (24 * 60 * 60 * 1000);
    const previousRollingDayStart = now - (48 * 60 * 60 * 1000);

    const totalUsers = allUsers.length;
    const activeAccounts = activeUsers.filter((item) => !item.is_disabled).length;
    const disabledAccounts = activeUsers.filter((item) => item.is_disabled).length;
    const archivedCount = archivedUsers.length;
    const unverifiedCount = activeUsers.filter((item) => !item.email_verified).length;
    const googleSignIns = allUsers.filter((item) => String(item.auth_provider || "").toLowerCase() === "google").length;
    const emailSignIns = totalUsers - googleSignIns;
    const activeUsersToday = countItemsBetween(activeUsers, (item) => item.last_sign_in_at, rollingDayStart, now + 1);
    const activeUsersYesterday = countItemsBetween(activeUsers, (item) => item.last_sign_in_at, previousRollingDayStart, rollingDayStart);
    const reportsToday = countItemsBetween(reports, getReportActivityTimestamp, todayStart, tomorrowStart);
    const reportsYesterday = countItemsBetween(reports, getReportActivityTimestamp, yesterdayStart, todayStart);
    const newUsersToday = countItemsBetween(allUsers, (item) => item.created_at, todayStart, tomorrowStart);
    const newUsersYesterday = countItemsBetween(allUsers, (item) => item.created_at, yesterdayStart, todayStart);
    const supportRequestsToday = countItemsBetween(supportMessages, (item) => item.created_at, todayStart, tomorrowStart);
    const supportRequestsYesterday = countItemsBetween(supportMessages, (item) => item.created_at, yesterdayStart, todayStart);
    const reportsThisWeek = countItemsBetween(reports, getReportActivityTimestamp, weekStart, tomorrowStart);
    const reportsPreviousWeek = countItemsBetween(reports, getReportActivityTimestamp, previousWeekStart, weekStart);
    const backupsThisWeek = countItemsBetween(backups, (item) => item.created_at, weekStart, tomorrowStart);
    const latestBackup = backups[0] || null;
    const latestBackupTime = latestBackup ? toTimestamp(latestBackup.created_at) : 0;

    const kpis = {
      totalUsers,
      activeUsersToday,
      reportsToday,
      supportRequests: supportRequestsToday,
      totalTrend: getTrendBadgeModel(newUsersToday, newUsersYesterday, {
        zeroText: "No new users today"
      }),
      activeTrend: getTrendBadgeModel(activeUsersToday, activeUsersYesterday, {
        zeroText: "No recent activity",
        positiveTone: "positive",
        negativeTone: "warning"
      }),
      reportsTrend: getTrendBadgeModel(reportsToday, reportsYesterday, {
        zeroText: "No reports today"
      }),
      supportTrend: supportRequestsToday === 0
        ? { text: "Inbox clear", tone: "positive" }
        : (supportRequestsToday > supportRequestsYesterday
          ? { text: "New requests today", tone: "warning" }
          : (supportRequestsToday > 4
            ? { text: "Reply queue high", tone: "negative" }
            : { text: "Waiting for reply", tone: "warning" }))
    };

    const activityItems = [];
    const pushActivity = (item) => {
      const timestamp = toTimestamp(item && item.time);
      if (!timestamp) return;
      activityItems.push({
        title: item.title,
        description: item.description,
        badge: item.badge,
        tone: item.tone,
        time: timestamp
      });
    };

    activeUsers.slice().sort((a, b) => toTimestamp(b.created_at) - toTimestamp(a.created_at)).slice(0, 4).forEach((user) => {
      pushActivity({
        title: "New user registered",
        description: `${getUserDisplayName(user)} joined the platform with ${formatProvider(user.auth_provider)} sign-in.`,
        badge: "User",
        tone: "primary",
        time: user.created_at
      });
    });

    activeUsers.slice().sort((a, b) => toTimestamp(b.last_sign_in_at) - toTimestamp(a.last_sign_in_at)).slice(0, 4).forEach((user) => {
      if (!user.last_sign_in_at) return;
      pushActivity({
        title: "User signed in",
        description: `${getUserDisplayName(user)} accessed the workspace recently.`,
        badge: "Auth",
        tone: "success",
        time: user.last_sign_in_at
      });
    });

    reports.slice().sort((a, b) => toTimestamp(getReportActivityTimestamp(b)) - toTimestamp(getReportActivityTimestamp(a))).slice(0, 4).forEach((report) => {
      pushActivity({
        title: "Report submitted",
        description: `${report.user_full_name || report.user_email || "User"} submitted a work report${report.log_date ? ` for ${formatDateLabel(report.log_date)}` : ""}.`,
        badge: "Report",
        tone: "primary",
        time: getReportActivityTimestamp(report)
      });
    });

    backups.slice(0, 4).forEach((backup) => {
      pushActivity({
        title: "Backup created",
        description: `${formatBackupKind(backup.backup_kind)} for ${backup.target_full_name || backup.target_email || "a user"} is ready.`,
        badge: "Backup",
        tone: "warning",
        time: backup.created_at
      });
    });

    archivedUsers.slice().sort((a, b) => toTimestamp(b.archived_at || b.updated_at) - toTimestamp(a.archived_at || a.updated_at)).slice(0, 3).forEach((user) => {
      pushActivity({
        title: "User moved to trash",
        description: `${getUserDisplayName(user)} was archived from active access.`,
        badge: "Trash",
        tone: "danger",
        time: user.archived_at || user.updated_at
      });
    });

    getCombinedAudit().slice(0, 4).forEach((audit) => {
      pushActivity({
        title: getAuditEventTitle(audit),
        description: audit.summary || "An admin operation was recorded.",
        badge: "Admin",
        tone: "primary",
        time: audit.created_at || audit.createdAt
      });
    });

    const recentActivity = activityItems
      .sort((left, right) => right.time - left.time)
      .slice(0, 8)
      .map((item) => ({
        title: item.title,
        description: item.description,
        badge: item.badge,
        toneClass: getActivityToneClass(item.tone),
        timestamp: formatDateTime(item.time)
      }));

    const insights = [];
    if (activeUsersToday > activeUsersYesterday) {
      insights.push({
        title: "User activity increased compared to yesterday",
        description: `${activeUsersToday} users were active in the last 24 hours, up from ${activeUsersYesterday} in the previous window.`,
        tone: "positive"
      });
    } else if (activeUsersToday < activeUsersYesterday) {
      insights.push({
        title: "User activity softened compared to yesterday",
        description: `${activeUsersToday} users were active in the last 24 hours, compared with ${activeUsersYesterday} in the previous window.`,
        tone: "warning"
      });
    } else {
      insights.push({
        title: "User activity is holding steady",
        description: `${activeUsersToday} users were active in both the current and previous 24-hour windows.`,
        tone: "neutral"
      });
    }

    insights.push({
      title: googleSignIns >= emailSignIns ? "Most users are signing in with Google" : "Email sign-ins remain the primary method",
      description: `${googleSignIns} Google sign-ins and ${emailSignIns} email-based accounts are currently in the platform mix.`,
      tone: googleSignIns >= emailSignIns ? "positive" : "neutral"
    });

    if (disabledAccounts === 0) {
      insights.push({
        title: "No disabled accounts require review",
        description: "All active accounts are currently enabled and available for access.",
        tone: "positive"
      });
    } else {
      insights.push({
        title: "Disabled accounts need follow-up",
        description: `${disabledAccounts} account${disabledAccounts === 1 ? "" : "s"} are disabled and may need an admin review.`,
        tone: "warning"
      });
    }

    if (reportsThisWeek === reportsPreviousWeek) {
      insights.push({
        title: "Report submissions remain stable this week",
        description: `${reportsThisWeek} reports were submitted this week, matching the previous seven-day period.`,
        tone: "neutral"
      });
    } else if (reportsThisWeek > reportsPreviousWeek) {
      insights.push({
        title: "Report submissions are trending upward",
        description: `${reportsThisWeek} reports were submitted this week, up from ${reportsPreviousWeek} in the previous seven-day period.`,
        tone: "positive"
      });
    } else {
      insights.push({
        title: "Report submissions are lower this week",
        description: `${reportsThisWeek} reports were submitted this week, down from ${reportsPreviousWeek} in the previous seven-day period.`,
        tone: "warning"
      });
    }

    if (backupsThisWeek === 0) {
      insights.push({
        title: "Backup activity is lower than expected",
        description: "No recovery snapshots were created during the last seven days. Review backup coverage soon.",
        tone: "negative"
      });
    } else if (backupsThisWeek < 2) {
      insights.push({
        title: "Backup coverage is light this week",
        description: `${backupsThisWeek} snapshot${backupsThisWeek === 1 ? "" : "s"} were created in the last seven days.`,
        tone: "warning"
      });
    } else {
      insights.push({
        title: "Backup activity looks healthy",
        description: `${backupsThisWeek} snapshots were created over the last seven days, keeping recovery points current.`,
        tone: "positive"
      });
    }

    const recentUsers = activeUsers
      .slice()
      .sort((left, right) => toTimestamp(right.created_at) - toTimestamp(left.created_at))
      .slice(0, 5)
      .map((user) => ({
        id: String(user.id || ""),
        name: getUserDisplayName(user),
        email: user.email || "No email",
        status: getOverviewUserStatus(user),
        lastLogin: formatUserTableDate(user.last_sign_in_at),
        reportsCount: getReportsForUser(user.id).length,
        role: formatUserRole(user.role)
      }));

    const systemStatus = [
      {
        label: "Database",
        status: state.rpcReady ? "Healthy" : (activeUsers.length ? "Warning" : "Issue"),
        tone: state.rpcReady ? "healthy" : (activeUsers.length ? "warning" : "issue"),
        helper: state.rpcReady
          ? "Profile data and admin write actions are connected."
          : "Fallback data is available, but the live owner RPC layer needs attention."
      },
      {
        label: "Authentication",
        status: unverifiedCount || disabledAccounts ? "Warning" : "Healthy",
        tone: unverifiedCount || disabledAccounts ? "warning" : "healthy",
        helper: unverifiedCount
          ? `${unverifiedCount} account${unverifiedCount === 1 ? "" : "s"} are still waiting for email verification.`
          : (disabledAccounts
            ? `${disabledAccounts} account${disabledAccounts === 1 ? "" : "s"} are currently blocked from access.`
            : "Sign-in providers and account verification look healthy.")
      },
      {
        label: "Backups",
        status: latestBackup && latestBackupTime >= getLocalDayStart(-6) ? "Healthy" : (latestBackup ? "Warning" : "Issue"),
        tone: latestBackup && latestBackupTime >= getLocalDayStart(-6) ? "healthy" : (latestBackup ? "warning" : "issue"),
        helper: latestBackup
          ? `Latest snapshot created ${formatDateTime(latestBackup.created_at)}.`
          : "No backup history is available yet for the platform."
      },
      {
        label: "Notifications",
        status: state.supportReady ? "Healthy" : "Warning",
        tone: state.supportReady ? "healthy" : "warning",
        helper: state.supportReady
          ? "Support inbox and owner-facing notifications are operating normally."
          : (state.supportError || "Support notifications are in safe mode until the latest SQL patch is active.")
      }
    ];

    return {
      kpis,
      snapshot: {
        activeAccounts,
        disabledAccounts,
        archivedCount,
        unverifiedCount,
        googleSignIns,
        emailSignIns
      },
      recentActivity,
      insights: insights.slice(0, 5),
      recentUsers,
      systemStatus
    };
  }

  function exportOverviewSummary() {
    const model = buildOverviewModel();
    downloadJsonPayload(`workreport-admin-overview-${new Date().toISOString().slice(0, 10)}`, {
      generated_at: new Date().toISOString(),
      workspace: "WorkReport Admin Dashboard",
      summary: {
        total_users: model.kpis.totalUsers,
        active_users_today: model.kpis.activeUsersToday,
        reports_submitted_today: model.kpis.reportsToday,
        support_requests_today: model.kpis.supportRequests
      },
      platform_snapshot: {
        active_accounts: model.snapshot.activeAccounts,
        disabled_accounts: model.snapshot.disabledAccounts,
        archived_users: model.snapshot.archivedCount,
        unverified_users: model.snapshot.unverifiedCount,
        google_sign_ins: model.snapshot.googleSignIns,
        email_sign_ins: model.snapshot.emailSignIns
      },
      recent_users: model.recentUsers
    });
    if (window.AuthUi && typeof window.AuthUi.setInlineStatus === "function") {
      window.AuthUi.setInlineStatus(els.dashboardStatus, {
        type: "success",
        message: "Summary exported successfully."
      });
    }
  }

  function renderOverview() {
    const model = buildOverviewModel();

    if (els.overviewKpiTotal) {
      els.overviewKpiTotal.textContent = formatCompactCount(model.kpis.totalUsers);
    }
    applyTrendBadge(els.overviewKpiTotalTrend, model.kpis.totalTrend);

    if (els.overviewKpiActive) {
      els.overviewKpiActive.textContent = formatCompactCount(model.kpis.activeUsersToday);
    }
    applyTrendBadge(els.overviewKpiActiveTrend, model.kpis.activeTrend);

    if (els.overviewKpiReports) {
      els.overviewKpiReports.textContent = formatCompactCount(model.kpis.reportsToday);
    }
    applyTrendBadge(els.overviewKpiReportsTrend, model.kpis.reportsTrend);

    if (els.overviewKpiAttention) {
      els.overviewKpiAttention.textContent = formatCompactCount(model.kpis.supportRequests);
    }
    applyTrendBadge(els.overviewKpiAttentionTrend, model.kpis.supportTrend);

    if (els.overviewSnapshotActive) {
      els.overviewSnapshotActive.textContent = formatCompactCount(model.snapshot.activeAccounts);
    }
    if (els.overviewSnapshotDisabled) {
      els.overviewSnapshotDisabled.textContent = formatCompactCount(model.snapshot.disabledAccounts);
    }
    if (els.overviewSnapshotArchived) {
      els.overviewSnapshotArchived.textContent = formatCompactCount(model.snapshot.archivedCount);
    }
    if (els.overviewSnapshotUnverified) {
      els.overviewSnapshotUnverified.textContent = formatCompactCount(model.snapshot.unverifiedCount);
    }
    if (els.overviewSnapshotGoogle) {
      els.overviewSnapshotGoogle.textContent = formatCompactCount(model.snapshot.googleSignIns);
    }
    if (els.overviewSnapshotEmail) {
      els.overviewSnapshotEmail.textContent = formatCompactCount(model.snapshot.emailSignIns);
    }

    if (els.overviewRecentUsersBody) {
      els.overviewRecentUsersBody.innerHTML = model.recentUsers.length
        ? model.recentUsers.map((user) => `
          <tr>
            <td>
              <div class="owner-overview-user-cell">
                <strong>${escapeHtml(user.name)}</strong>
              </div>
            </td>
            <td>${escapeHtml(user.email)}</td>
            <td>${renderBadge(user.status.label, user.status.cls)}</td>
            <td>${escapeHtml(user.lastLogin)}</td>
            <td>${escapeHtml(String(user.reportsCount))}</td>
            <td>${escapeHtml(user.role)}</td>
            <td>
              <div class="owner-overview-user-actions">
                <button class="owner-row-action owner-overview-user-action" type="button" data-overview-user-id="${escapeHtml(user.id)}">View User</button>
                <button class="owner-row-action owner-overview-user-action" type="button" data-overview-report-user-id="${escapeHtml(user.id)}">View Report</button>
              </div>
            </td>
          </tr>
        `).join("")
        : `
          <tr>
            <td colspan="7">
              <div class="owner-overview-empty owner-overview-table-empty">
                <strong>No recent users available</strong>
                <span>Newly created accounts will appear here after the next registration.</span>
              </div>
            </td>
          </tr>
        `;
    }
  }

  function renderTopbarMeta() {
    if (els.topbarMode) {
      els.topbarMode.textContent = state.rpcReady ? "Live control" : "Read only";
      els.topbarMode.classList.toggle("is-live", state.rpcReady);
      els.topbarMode.classList.toggle("is-readonly", !state.rpcReady);
    }
    if (els.topbarSync) {
      els.topbarSync.textContent = state.lastSyncedAt ? `Last sync ${formatDateTime(state.lastSyncedAt)}` : "Not synced";
    }
  }

  function renderReports() {
    if (!els.reportsSummary || !els.reportsList) return;
    populateReportUserFilter();

    const query = String(els.reportSearchInput?.value || "").trim().toLowerCase();
    const userFilter = String(els.reportUserFilter?.value || "all");
    const statusFilter = String(els.reportStatusFilter?.value || "all").toLowerCase();
    const monthValue = ensureReportMonthValue(userFilter);
    const scopeRows = getScopedReportRows({
      userFilter,
      statusFilter: "all",
      monthValue,
      query: ""
    });
    const rows = getScopedReportRows({
      userFilter,
      statusFilter,
      monthValue,
      query
    });
    const bundles = buildReportBundles(rows, monthValue);
    const uniqueUserCount = new Set(rows.map((report) => String(report.user_id || report.user_email || report.user_full_name || "").trim()).filter(Boolean)).size;

    state.filteredReports = rows.slice();
    const exportLocked = !rows.length || uniqueUserCount > 1;
    const scopeLabel = getReportScopeLabel(userFilter);
    const monthLabel = formatMonthLabel(monthValue);
    const summaryCards = buildReportMonthSummaryCards({
      rows,
      scopeRows,
      scopeLabel,
      monthValue,
      statusFilter,
      query
    });

    if (els.reportExportPdfBtn) {
      els.reportExportPdfBtn.disabled = exportLocked;
      els.reportExportPdfBtn.textContent = !rows.length
        ? "Open Work Data PDF"
        : (uniqueUserCount > 1 ? "Choose One User" : `Open Work Data PDF (${rows.length})`);
    }
    if (els.reportExportCsvBtn) {
      els.reportExportCsvBtn.disabled = exportLocked;
      els.reportExportCsvBtn.textContent = !rows.length
        ? "Download Work Data PDF"
        : (uniqueUserCount > 1 ? "Choose One User" : `Download Work Data PDF (${rows.length})`);
    }

    renderSummaryCards(els.reportsSummary, summaryCards);
    closeReportDetail();

    if (!state.reportRpcReady) {
      els.reportsList.innerHTML = `
        <tr>
          <td class="owner-report-empty" colspan="5">
            <div class="owner-report-empty-shell">
              <strong>Report export tools are in safe mode</strong>
              <span>${escapeHtml(state.reportError || "Run the latest owner report SQL to unlock owner report exports and monthly previews.")}</span>
            </div>
          </td>
        </tr>
      `;
      return;
    }

    if (!bundles.length) {
      els.reportsList.innerHTML = `
        <tr>
          <td class="owner-report-empty" colspan="5">
            <div class="owner-report-empty-shell">
              <strong>No report bundles for this view</strong>
              <span>${escapeHtml(`Try another user, month, review state, or search. Current scope: ${scopeLabel} • ${monthLabel}.`)}</span>
            </div>
          </td>
        </tr>
      `;
      return;
    }

    els.reportsList.innerHTML = bundles.map((bundle) => {
      return `
        <tr class="owner-row owner-report-bundle-row" data-report-bundle-id="${escapeHtml(bundle.id)}">
          <td class="owner-user-cell owner-report-user-cell">
            <div class="owner-user-stack">
              <span class="owner-user-avatar">${escapeHtml(getUserInitials(bundle.userName, bundle.userEmail))}</span>
              <span class="owner-user-copy">
                <strong>${escapeHtml(bundle.userName)}</strong>
                <span>${escapeHtml(bundle.userEmail)}</span>
              </span>
            </div>
          </td>
          <td class="owner-date-cell">
            <strong>${escapeHtml(bundle.monthLabel)}</strong>
            <div class="owner-report-summary-stack">
              <span>${escapeHtml(bundle.scopeNote)}</span>
            </div>
          </td>
          <td class="owner-report-number-cell">${escapeHtml(String(bundle.reportCount))}</td>
          <td class="owner-date-cell">
            <strong>${escapeHtml(formatDateLabel(bundle.lastDate))}</strong>
            <div class="owner-report-summary-stack">
              <span>${escapeHtml(`${bundle.presentCount} present • ${bundle.leaveCount} leave • ${bundle.pendingCount} pending`)}</span>
            </div>
          </td>
          <td class="owner-report-action-cell owner-report-bundle-actions">
            <button class="owner-row-action" type="button" data-report-bundle-action="view" data-report-bundle-id="${escapeHtml(bundle.id)}">Open PDF</button>
            <button class="owner-row-action" type="button" data-report-bundle-action="download" data-report-bundle-id="${escapeHtml(bundle.id)}">Download PDF</button>
          </td>
        </tr>
      `;
    }).join("");
  }

  function renderAnalytics() {
    if (!els.analyticsSummary || !els.analyticsGrid) return;
    const allUsers = [...state.users, ...state.deletedUsers];
    const googleCount = allUsers.filter((item) => String(item.auth_provider || "").toLowerCase() === "google").length;
    const emailCount = allUsers.filter((item) => String(item.auth_provider || "").toLowerCase() !== "google").length;
    const verifiedCount = allUsers.filter((item) => item.email_verified).length;
    const recentSigninCount = state.users.filter((item) => isRecentDate(item.last_sign_in_at, 7)).length;
    const totalUsers = allUsers.length || 1;
    const reportCounts = new Map();
    const backupCounts = new Map();
    state.reports.forEach((report) => {
      const key = String(report.user_id || "");
      if (!key) return;
      reportCounts.set(key, (reportCounts.get(key) || 0) + 1);
    });
    getCombinedBackups().forEach((backup) => {
      const key = String(backup.target_user_id || "");
      if (!key) return;
      backupCounts.set(key, (backupCounts.get(key) || 0) + 1);
    });
    const analyticsUsers = state.users.map((user) => {
      const reportCount = reportCounts.get(String(user.id || "")) || 0;
      const backupCount = backupCounts.get(String(user.id || "")) || 0;
      const activityScore = reportCount * 4 + backupCount * 2 + (isRecentDate(user.last_sign_in_at, 7) ? 6 : 0);
      return {
        user,
        reportCount,
        backupCount,
        activityScore
      };
    }).sort((a, b) => b.activityScore - a.activityScore || String(a.user.full_name || "").localeCompare(String(b.user.full_name || "")));
    const topScore = analyticsUsers[0] ? Math.max(analyticsUsers[0].activityScore, 1) : 1;
    const todayReports = state.reports.filter((report) => isRecentDate(`${report.log_date || ""}T00:00:00`, 1)).length;
    const activeToday = state.users.filter((item) => isRecentDate(item.last_sign_in_at, 1)).length;

    renderSummaryCards(els.analyticsSummary, [
      {
        label: "Active today",
        value: String(activeToday),
        meta: "Users active in the last 24 hours."
      },
      {
        label: "Recent sign-ins",
        value: String(recentSigninCount),
        meta: "Users signed in during the last 7 days."
      },
      {
        label: "Today reports",
        value: String(todayReports),
        meta: "Rows created for today."
      },
      {
        label: "Verify rate",
        value: `${Math.round((verifiedCount / totalUsers) * 100)}%`,
        meta: "Verified across active and archived users."
      }
    ]);

    const cards = [
      { label: "Google", value: String(googleCount), meta: "Google provider accounts" },
      { label: "Email", value: String(emailCount), meta: "Email/password accounts" },
      { label: "Disabled", value: String(state.users.filter((item) => item.is_disabled).length), meta: "Blocked active users" },
      { label: "Unverified", value: String(state.users.filter((item) => !item.email_verified).length), meta: "Still waiting for email verify" },
      { label: "Archived", value: String(state.deletedUsers.length), meta: "Users in Deleted Users" },
      { label: "Reports", value: String(state.reports.length), meta: state.reportRpcReady ? "Live work report rows" : "Run owner report SQL to load rows" }
    ];

    els.analyticsGrid.innerHTML = cards.map((item) => `
      <div class="owner-mini-card">
        <span>${escapeHtml(item.label)}</span>
        <strong>${escapeHtml(item.value)}</strong>
        <span>${escapeHtml(item.meta)}</span>
      </div>
    `).join("");

    if (!els.analyticsUsers) return;
    if (!analyticsUsers.length) {
      els.analyticsUsers.innerHTML = `
        <div class="owner-list-item">
          <strong>No analytics users yet</strong>
          <span>User usage bars will appear after accounts and reports sync into the admin dashboard.</span>
        </div>
      `;
      return;
    }

    els.analyticsUsers.innerHTML = analyticsUsers.slice(0, 10).map((entry) => {
      const percentage = Math.max(8, Math.round((entry.activityScore / topScore) * 100));
      return `
        <div class="owner-analytics-user-card">
          <div class="owner-analytics-user-head">
            <div class="owner-user-stack">
              <span class="owner-user-avatar">${escapeHtml(getUserInitials(entry.user.full_name, entry.user.email))}</span>
              <span class="owner-user-copy">
                <strong>${escapeHtml(entry.user.full_name || entry.user.email || "User")}</strong>
                <span>${escapeHtml(entry.user.email || "No email")}</span>
              </span>
            </div>
            <span class="owner-badge ${entry.user.is_disabled ? "status-disabled" : "status-active"}">${escapeHtml(entry.user.is_disabled ? "Disabled" : "Active")}</span>
          </div>
          <div class="owner-analytics-bar">
            <span class="owner-analytics-bar-fill" style="width:${percentage}%"></span>
          </div>
          <div class="owner-analytics-metrics">
            <span>${escapeHtml(`${entry.reportCount} reports`)}</span>
            <span>${escapeHtml(`${entry.backupCount} backups`)}</span>
            <span>${escapeHtml(isRecentDate(entry.user.last_sign_in_at, 7) ? "Recent login" : "No recent login")}</span>
          </div>
        </div>
      `;
    }).join("");
  }

  function renderSecurity() {
    if (!els.securitySummary || !els.securityQueue || !els.securityList) return;
    const ownerIds = new Set(
      [...state.users, ...state.deletedUsers]
        .filter((item) => String(item.role || "").toLowerCase() === "owner")
        .map((item) => String(item.id || ""))
        .filter(Boolean)
    );
    if (state.ownerProfile && state.ownerProfile.id) ownerIds.add(String(state.ownerProfile.id));
    const ownerCount = ownerIds.size;
    const risks = state.users.filter((item) => item.is_disabled || !item.email_verified || isSuspiciousUser(item.id)).slice(0, 8);
    const latestAudit = getCombinedAudit()[0] || null;

    renderSummaryCards(els.securitySummary, [
      {
        label: "Unverified",
        value: String(state.users.filter((item) => !item.email_verified).length),
        meta: "Users waiting for email verify."
      },
      {
        label: "Disabled",
        value: String(state.users.filter((item) => item.is_disabled).length),
        meta: "Blocked accounts in active users."
      },
      {
        label: "Owners",
        value: String(ownerCount),
        meta: "Owner-role accounts detected."
      }
    ]);

    if (!risks.length) {
      els.securityQueue.innerHTML = `
        <div class="owner-list-item">
          <strong>No risky users right now</strong>
          <span>Disabled or unverified users will appear here.</span>
        </div>
      `;
    } else {
      els.securityQueue.innerHTML = risks.map((user) => `
        <div class="owner-list-item">
          <strong>${escapeHtml(user.full_name || user.email || "User")}</strong>
          <span>${escapeHtml(user.email || "")}</span>
          <span>${escapeHtml(isSuspiciousUser(user.id) ? "Marked suspicious" : (user.is_disabled ? "Disabled account" : "Email verify pending"))}</span>
          <div class="owner-inline-actions">
            <button class="owner-row-action" type="button" data-security-action="open" data-security-user-id="${escapeHtml(String(user.id || ""))}">Open User</button>
            ${user.email_verified ? "" : `<button class="owner-row-action" type="button" data-security-action="verify" data-security-user-id="${escapeHtml(String(user.id || ""))}" ${!state.rpcReady ? "disabled" : ""}>${state.rpcReady ? "Verify" : "Locked"}</button>`}
            ${user.is_disabled ? `<button class="owner-row-action" type="button" data-security-action="enable" data-security-user-id="${escapeHtml(String(user.id || ""))}" ${!state.rpcReady ? "disabled" : ""}>${state.rpcReady ? "Enable" : "Locked"}</button>` : ""}
          </div>
        </div>
      `).join("");
    }

    const items = [
      {
        title: "Control path",
        meta: state.rpcReady ? "Live control" : "Read only",
        note: state.rpcReady ? "Write actions are connected to Supabase RPC." : "Run owner SQL to unlock verify, disable, archive, and restore."
      },
      {
        title: "Owner reset route",
        meta: "/admin-control_dashboard/reset",
        note: "Separate from the main app reset page."
      },
      {
        title: "Last owner event",
        meta: latestAudit ? formatDateTime(latestAudit.created_at || latestAudit.createdAt) : "None",
        note: latestAudit ? (latestAudit.summary || latestAudit.action || "Owner action") : "No audit event yet."
      }
    ];
    els.securityList.innerHTML = items.map((item) => `
      <div class="owner-list-item">
        <strong>${escapeHtml(item.title)}</strong>
        <span>${escapeHtml(item.meta)}</span>
        <span>${escapeHtml(item.note)}</span>
      </div>
    `).join("");
  }

  function renderNotifications() {
    if (!els.notificationsList) return;
    const openSupportMessages = normalizeSupportMessages(state.supportMessages)
      .filter((item) => String(item.status || "new") !== "resolved")
      .slice(0, 12);

    if (!state.supportReady) {
      els.notificationsList.innerHTML = `
        <article class="owner-notification-list-item owner-notification-list-empty">
          <strong>Notification Center unavailable</strong>
          <span>${escapeHtml(state.supportError || "User support notifications are temporarily unavailable.")}</span>
        </article>
      `;
      return;
    }

    if (!openSupportMessages.length) {
      els.notificationsList.innerHTML = `
        <article class="owner-notification-list-item owner-notification-list-empty">
          <strong>No notifications yet</strong>
          <span>Current support and access requests will appear here when a user contacts the team.</span>
        </article>
      `;
      return;
    }

    els.notificationsList.innerHTML = openSupportMessages.map((item) => `
      <article class="owner-notification-list-item">
        <div class="owner-notification-list-head">
          <div class="owner-notification-list-copy">
            <strong>${escapeHtml(item.subject || formatSupportCategory(item.category))}</strong>
            <span>${escapeHtml(`${getSupportMessageSender(item)} • ${item.sender_email || "No email provided"}`)}</span>
          </div>
          ${renderBadge(formatSupportStatus(item.status), getSupportStatusClass(item.status))}
        </div>
        <div class="owner-notification-list-meta">
          <span>${escapeHtml(formatSupportCategory(item.category))}</span>
          <span>${escapeHtml(formatDateTime(item.created_at))}</span>
        </div>
      </article>
    `).join("");
  }

  function getFallbackReleaseAssets() {
    return normalizeReleaseAssets([
      {
        id: "fallback-android",
        platform: "android",
        channel: OWNER_RELEASE_CHANNEL,
        bucket_name: OWNER_RELEASE_BUCKET,
        object_path: "workreport-android.apk",
        public_url: OWNER_RELEASE_FALLBACK_ANDROID_URL,
        file_name: "workreport-android.apk",
        version_label: "Current live package",
        build_label: "Fallback link",
        release_notes: "Existing public Android package remains available until the storage release migration is applied.",
        file_size_bytes: 0,
        mime_type: "application/vnd.android.package-archive",
        is_active: true,
        created_at: "",
        updated_at: ""
      }
    ]);
  }

  function getReleaseAsset(platform) {
    const targetPlatform = String(platform || "").trim().toLowerCase();
    const rows = normalizeReleaseAssets(state.releaseAssets).filter((item) => item.platform === targetPlatform);
    if (!rows.length) return null;
    return rows.sort((a, b) => {
      if (state.storageSortMode === "platform") {
        return a.platform.localeCompare(b.platform);
      }
      const aTime = new Date(a.updated_at || a.created_at || 0).getTime();
      const bTime = new Date(b.updated_at || b.created_at || 0).getTime();
      return bTime - aTime;
    })[0];
  }

  function getReleaseDownloadPagePath(platform) {
    return String(platform || "").trim().toLowerCase() === "android" ? OWNER_RELEASE_DOWNLOAD_PAGE : "";
  }

  function getReleasePlatformLabel(platform) {
    return String(platform || "").trim().toLowerCase() === "ios" ? "iOS" : "Android";
  }

  function getReleaseExtension(platform) {
    return String(platform || "").trim().toLowerCase() === "ios" ? ".ipa" : ".apk";
  }

  function getReleaseMimeType(platform, file) {
    const currentPlatform = String(platform || "").trim().toLowerCase();
    if (file && file.type) return String(file.type);
    return currentPlatform === "ios"
      ? "application/octet-stream"
      : "application/vnd.android.package-archive";
  }

  function sanitizeReleaseFileName(fileName, fallbackName) {
    const baseName = String(fileName || fallbackName || "release")
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9._-]+/g, "-")
      .replace(/-+/g, "-")
      .replace(/^-|-$/g, "");
    return baseName || String(fallbackName || "release").toLowerCase();
  }

  function matchesReleaseSearch(asset, query) {
    const search = String(query || "").trim().toLowerCase();
    if (!search) return true;
    const haystack = [
      asset && asset.platform,
      asset && asset.file_name,
      asset && asset.version_label,
      asset && asset.build_label,
      asset && asset.release_notes,
      OWNER_RELEASE_BUCKET,
      "download",
      "storage"
    ].join(" ").toLowerCase();
    return haystack.includes(search);
  }

  function getAllDatabaseBackups() {
    return normalizeBackups([...state.remoteBackups, ...state.localBackups]).sort((a, b) => {
      const aTime = new Date(a.created_at || 0).getTime();
      const bTime = new Date(b.created_at || 0).getTime();
      return bTime - aTime;
    });
  }

  function getLatestReportForUser(userId) {
    return [...state.reports]
      .filter((item) => String(item.user_id || "") === String(userId || ""))
      .sort((a, b) => {
        const aTime = new Date(a.updated_at || a.created_at || a.log_date || 0).getTime();
        const bTime = new Date(b.updated_at || b.created_at || b.log_date || 0).getTime();
        return bTime - aTime;
      })[0] || null;
  }

  function getSortedReportsForUser(userId) {
    return [...state.reports]
      .filter((item) => String(item.user_id || "") === String(userId || ""))
      .sort((a, b) => {
        const aTime = new Date(a.updated_at || a.created_at || a.log_date || 0).getTime();
        const bTime = new Date(b.updated_at || b.created_at || b.log_date || 0).getTime();
        return bTime - aTime;
      });
  }

  function getDatabaseCollectionLabel(collectionId) {
    const map = {
      profiles: "Profiles",
      reports: "Reports",
      backups: "Backups",
      support: "Support"
    };
    return map[String(collectionId || "").trim().toLowerCase()] || "Database";
  }

  function getDatabaseSelectionValue(collectionId) {
    const safeCollection = String(collectionId || "").trim().toLowerCase();
    if (safeCollection === "profiles") return String(state.selectedUserId || "");
    if (safeCollection === "reports") return String(state.selectedReportId || "");
    return String(state.databaseRecordId || "");
  }

  function setDatabaseSelectionValue(collectionId, value) {
    const safeCollection = String(collectionId || "").trim().toLowerCase();
    const safeValue = String(value || "");
    if (safeCollection === "profiles") {
      state.selectedUserId = safeValue;
      return;
    }
    if (safeCollection === "reports") {
      state.selectedReportId = safeValue;
      return;
    }
    state.databaseRecordId = safeValue;
  }

  function setDatabaseCollection(collectionId) {
    const safeCollection = ["profiles", "reports", "backups", "support"].includes(String(collectionId || "").trim().toLowerCase())
      ? String(collectionId || "").trim().toLowerCase()
      : "profiles";
    state.databaseCollection = safeCollection;
    renderFiles();
  }

  function setDatabaseRecordSelection(collectionId, recordId) {
    const safeCollection = String(collectionId || state.databaseCollection || "profiles").trim().toLowerCase() || "profiles";
    state.databaseCollection = safeCollection;
    setDatabaseSelectionValue(safeCollection, recordId);
    renderFiles();
  }

  function buildDatabaseCollections(backups, supportMessages) {
    return [
      {
        id: "profiles",
        title: "profiles",
        count: state.users.length + state.deletedUsers.length,
        note: state.rpcReady ? "Owner write control is live." : "Read-only safe mode is active."
      },
      {
        id: "reports",
        title: "daily_reports",
        count: state.reports.length,
        note: state.reportRpcReady ? "Review controls are available." : (state.reportError || "Report write controls are waiting for SQL.")
      },
      {
        id: "backups",
        title: "owner_backups",
        count: backups.length,
        note: state.remoteBackupDeleteReady ? "Snapshot cleanup is active." : (state.remoteBackupDeleteNotice || "Download and restore are available.")
      },
      {
        id: "support",
        title: "support_messages",
        count: supportMessages.length,
        note: state.supportReady ? "Inbox is synced from users." : (state.supportError || "Support inbox is in safe mode.")
      }
    ];
  }

  function buildDatabaseSearchHaystack(item) {
    return [
      item && item.id,
      item && item.title,
      item && item.subtitle,
      item && item.note,
      item && item.meta,
      item && item.status
    ].filter(Boolean).join(" ").toLowerCase();
  }

  function sortDatabaseDocumentRows(rows) {
    const items = Array.isArray(rows) ? [...rows] : [];
    return items.sort((a, b) => {
      if (state.storageSortMode === "platform") {
        return String(a.title || a.id || "").localeCompare(String(b.title || b.id || ""));
      }
      const aTime = new Date(a.sortDate || 0).getTime();
      const bTime = new Date(b.sortDate || 0).getTime();
      return bTime - aTime;
    });
  }

  function buildDatabaseDocumentRows(collectionId) {
    const safeCollection = String(collectionId || "").trim().toLowerCase();
    if (safeCollection === "profiles") {
      return [...state.users, ...state.deletedUsers].map((user) => ({
        id: String(user.id || ""),
        title: getUserDisplayName(user),
        subtitle: user.email || "No email",
        meta: `${formatProvider(user.auth_provider)} • ${user.is_archived ? "Archived" : (user.role || "member")}`,
        note: user.last_sign_in_at ? `Last sign in ${formatDateTime(user.last_sign_in_at)}` : "No recent sign-in",
        status: user.is_disabled ? "Disabled" : (user.email_verified ? "Verified" : "Pending"),
        sortDate: user.updated_at || user.created_at || "",
        payload: user
      }));
    }
    if (safeCollection === "reports") {
      return state.reports.map((report) => ({
        id: String(report.id || ""),
        title: formatDateLabel(report.log_date),
        subtitle: report.user_full_name || report.user_email || "User report",
        meta: `${formatReportStatus(report.review_status)} • ${formatDateTime(report.updated_at || report.created_at || report.log_date)}`,
        note: summarizeReportEntry(report.entry).secondary,
        status: formatReportStatus(report.review_status),
        sortDate: report.updated_at || report.created_at || report.log_date || "",
        payload: report
      }));
    }
    if (safeCollection === "backups") {
      return getAllDatabaseBackups().map((backup) => ({
        id: String(backup.id || ""),
        title: backup.target_full_name || backup.target_email || "User snapshot",
        subtitle: backup.target_email || "No email",
        meta: `${backup.backup_kind || "manual"} • ${formatStorageSize(getBackupSizeBytes(backup))}`,
        note: formatDateTime(backup.created_at),
        status: backup.backup_kind || "snapshot",
        sortDate: backup.created_at || "",
        payload: backup
      }));
    }
    if (safeCollection === "support") {
      return normalizeSupportMessages(state.supportMessages).map((message) => ({
        id: String(message.id || ""),
        title: getSupportMessageSender(message),
        subtitle: message.sender_email || "No email",
        meta: `${formatSupportStatus(message.status)} • ${formatDateTime(message.created_at)}`,
        note: message.subject || formatSupportCategory(message.category),
        status: formatSupportStatus(message.status),
        sortDate: message.updated_at || message.created_at || "",
        payload: message
      }));
    }
    return [];
  }

  function ensureDatabaseRecordSelection(collectionId, items) {
    const list = Array.isArray(items) ? items : [];
    const currentValue = getDatabaseSelectionValue(collectionId);
    if (currentValue && list.some((item) => String(item.id || "") === currentValue)) {
      return currentValue;
    }
    const fallbackValue = list[0] ? String(list[0].id || "") : "";
    setDatabaseSelectionValue(collectionId, fallbackValue);
    return fallbackValue;
  }

  function renderDatabaseMiniStat(label, value, meta) {
    return `
      <div class="owner-mini-card">
        <span>${escapeHtml(label)}</span>
        <strong>${escapeHtml(value)}</strong>
        <small>${escapeHtml(meta)}</small>
      </div>
    `;
  }

  function renderDatabaseFieldList(rows) {
    const items = Array.isArray(rows) ? rows.filter(Boolean) : [];
    if (!items.length) {
      return `
        <div class="owner-database-field-row">
          <span>State</span>
          <strong>No field data available.</strong>
        </div>
      `;
    }
    return items.map((item) => `
      <div class="owner-database-field-row">
        <span>${escapeHtml(item.label || "Field")}</span>
        <strong>${escapeHtml(item.value || "Not set")}</strong>
      </div>
    `).join("");
  }

  function renderDatabaseFlowNode(kicker, title, rows, tone) {
    const items = Array.isArray(rows) ? rows.filter(Boolean) : [];
    const toneClass = tone ? ` is-${String(tone).trim().toLowerCase()}` : "";
    return `
      <article class="owner-database-flow-node${toneClass}">
        <span class="owner-database-flow-kicker">${escapeHtml(kicker || "Node")}</span>
        <strong>${escapeHtml(title || "Not available")}</strong>
        <div class="owner-database-flow-meta">
          ${items.map((item) => `
            <div class="owner-database-flow-row">
              <span>${escapeHtml(item.label || "Field")}</span>
              <strong>${escapeHtml(item.value || "Not set")}</strong>
            </div>
          `).join("")}
        </div>
      </article>
    `;
  }

  function renderDatabaseJsonInspector(title, payload) {
    return `
      <section class="owner-database-json-panel owner-database-node owner-database-node-wide">
        <div class="owner-database-node-head">
          <div>
            <span>Raw document</span>
            <strong>${escapeHtml(title)}</strong>
          </div>
        </div>
        <pre class="owner-raw-json">${escapeHtml(JSON.stringify(payload && typeof payload === "object" ? payload : {}, null, 2))}</pre>
      </section>
    `;
  }

  function renderDatabaseProfileInspector(user, selectedReport, reportsForUser) {
    if (!user) {
      return `
        <div class="owner-list-item">
          <strong>Select a user</strong>
          <span>Choose a user from the left to inspect and edit the data entered in the WorkReport app.</span>
        </div>
      `;
    }
    const userReports = Array.isArray(reportsForUser) ? reportsForUser : getSortedReportsForUser(user.id);
    const activeReport = selectedReport || userReports[0] || null;
    const nameValue = String(user.full_name || user.email || "").trim();
    const activeEntry = activeReport && activeReport.entry && typeof activeReport.entry === "object" ? activeReport.entry : {};
    const activeSummary = activeReport ? summarizeReportEntry(activeEntry) : {
      primary: "No work entry",
      secondary: "This user has not submitted WorkReport app data yet."
    };
    const activeLeaveDetails = String(
      activeEntry.leaveReasonText || activeEntry.customReasonDetails || activeEntry.leaveReason || ""
    ).trim();
    const lastUpdatedAt = activeReport
      ? formatDateTime(activeReport.updated_at || activeReport.created_at || activeReport.log_date)
      : "No work record yet";
    const latestReport = userReports[0] || null;
    const reportsCountLabel = `${userReports.length} day card${userReports.length === 1 ? "" : "s"}`;
    const profileRows = [
      { label: "User ID", value: String(user.id || "") },
      { label: "Provider", value: formatProvider(user.auth_provider) },
      { label: "Role", value: user.role || "member" },
      { label: "Access", value: user.is_disabled ? "Disabled" : "Active" },
      { label: "Last sign in", value: user.last_sign_in_at ? formatDateTime(user.last_sign_in_at) : "No sign-in yet" },
      { label: "Updated", value: formatDateTime(user.updated_at) }
    ];
    const diagramNodes = [
      {
        kicker: "User",
        title: getUserDisplayName(user),
        tone: "user",
        rows: [
          { label: "Email", value: user.email || "No email" },
          { label: "Provider", value: formatProvider(user.auth_provider) },
          { label: "Access", value: user.is_disabled ? "Disabled" : "Active" }
        ]
      },
      {
        kicker: "Selected day card",
        title: activeReport ? formatDateLabel(activeReport.log_date) : "No day card yet",
        tone: "report",
        rows: [
          { label: "Status", value: activeSummary.primary },
          { label: "Details", value: activeSummary.secondary },
          { label: "Updated", value: lastUpdatedAt }
        ]
      },
      {
        kicker: "Data volume",
        title: reportsCountLabel,
        tone: "activity",
        rows: [
          { label: "Last sign in", value: user.last_sign_in_at ? formatDateTime(user.last_sign_in_at) : "No recent sign-in" },
          { label: "Work location", value: activeEntry.workLocation || "Not set" },
          { label: "Team", value: activeEntry.teamMembers || "Not set" }
        ]
      }
    ];
    return `
      <div class="owner-database-workspace">
        <div class="owner-database-stage-shell">
          <section class="owner-database-stage-head">
            <div class="owner-database-stage-copy">
              <span class="owner-database-pane-kicker">User workspace / ${escapeHtml(String(user.id || "").slice(0, 12) || "document")}</span>
              <h3>${escapeHtml(getUserDisplayName(user))}</h3>
              <p class="owner-users-toolbar-note">${escapeHtml(user.email || "No email")} • Open any day card from the middle column to review and update the exact report values entered in the WorkReport app.</p>
            </div>
            <div class="owner-inline-actions owner-database-stage-actions">
              <button class="owner-row-action" type="button" data-db-action="backup-user">Create Backup</button>
            </div>
          </section>

          <div class="owner-mini-grid owner-database-stage-summary">
            ${renderDatabaseMiniStat("User", getUserDisplayName(user), user.email || "No email")}
            ${renderDatabaseMiniStat("Day cards", reportsCountLabel, latestReport ? `Latest ${formatDateLabel(latestReport.log_date)}` : "No report history")}
            ${renderDatabaseMiniStat("Selected record", activeReport ? formatDateLabel(activeReport.log_date) : "Not selected", activeSummary.primary)}
            ${renderDatabaseMiniStat("Last updated", lastUpdatedAt, user.is_disabled ? "Account access is disabled." : "Account access is active.")}
          </div>

          <section class="owner-database-node owner-database-node-wide owner-database-diagram-panel">
            <div class="owner-database-node-head">
              <div>
                <span>WorkReport data map</span>
                <strong>Selected user flow</strong>
              </div>
            </div>
            <div class="owner-database-flow">
              ${diagramNodes.map((node, index) => `
                ${index ? '<span class="owner-database-flow-link" aria-hidden="true"></span>' : ""}
                ${renderDatabaseFlowNode(node.kicker, node.title, node.rows, node.tone)}
              `).join("")}
            </div>
          </section>

          <div class="owner-database-node-grid owner-database-editor-grid">
            <section class="owner-database-node">
              <div class="owner-database-node-head">
                <div>
                  <span>User profile</span>
                  <strong>Profile details</strong>
                </div>
              </div>
              <form class="owner-storage-release-form" data-db-profile-form="display-name">
                <div class="field owner-storage-field-span">
                  <label for="owner-database-profile-name">Display name</label>
                  <input id="owner-database-profile-name" name="display_name" type="text" maxlength="80" value="${escapeHtml(nameValue)}" placeholder="User display name" />
                  <p class="owner-storage-field-note">Saving here updates the name shown inside the user app as well.</p>
                </div>
                <div class="owner-storage-release-actions">
                  <button class="owner-primary-btn" type="submit">Save Display Name</button>
                </div>
              </form>
              <div class="owner-database-field-list">
                ${renderDatabaseFieldList(profileRows)}
              </div>
            </section>

            <section class="owner-database-node owner-database-node-wide">
              <div class="owner-database-node-head">
                <div>
                  <span>Selected day card</span>
                  <strong>${escapeHtml(activeReport ? `Edit ${formatDateLabel(activeReport.log_date)}` : "No work entry yet")}</strong>
                </div>
              </div>
              ${activeReport ? `
                <form class="owner-storage-release-form owner-database-entry-form" data-db-profile-form="latest-report">
                  <div class="owner-database-entry-grid">
                    <div class="field">
                      <label for="owner-database-work-location">Work location</label>
                      <input id="owner-database-work-location" name="workLocation" type="text" value="${escapeHtml(activeEntry.workLocation || "")}" placeholder="Site or branch" />
                    </div>
                    <div class="field">
                      <label for="owner-database-leave-status">Leave status</label>
                      <select id="owner-database-leave-status" name="leaveStatus">
                        <option value="No"${String(activeEntry.leaveStatus || "").trim() === "Yes" ? "" : " selected"}>No</option>
                        <option value="Yes"${String(activeEntry.leaveStatus || "").trim() === "Yes" ? " selected" : ""}>Yes</option>
                      </select>
                    </div>
                    <div class="field">
                      <label for="owner-database-in-time">In time</label>
                      <input id="owner-database-in-time" name="inTime" type="text" value="${escapeHtml(activeEntry.inTime || "")}" placeholder="08:30" />
                    </div>
                    <div class="field">
                      <label for="owner-database-out-time">Out time</label>
                      <input id="owner-database-out-time" name="outTime" type="text" value="${escapeHtml(activeEntry.outTime || "")}" placeholder="17:30" />
                    </div>
                    <div class="field">
                      <label for="owner-database-movement-out">Movement out</label>
                      <input id="owner-database-movement-out" name="movementOut" type="text" value="${escapeHtml(activeEntry.movementOut || "")}" placeholder="Time or location" />
                    </div>
                    <div class="field">
                      <label for="owner-database-movement-in">Movement in</label>
                      <input id="owner-database-movement-in" name="movementIn" type="text" value="${escapeHtml(activeEntry.movementIn || "")}" placeholder="Time or location" />
                    </div>
                    <div class="field">
                      <label for="owner-database-team-members">Team</label>
                      <input id="owner-database-team-members" name="teamMembers" type="text" value="${escapeHtml(activeEntry.teamMembers || "")}" placeholder="Assigned team" />
                    </div>
                    <div class="field">
                      <label for="owner-database-vehicle-number">Vehicle</label>
                      <input id="owner-database-vehicle-number" name="vehicleNumber" type="text" value="${escapeHtml(activeEntry.vehicleNumber || "")}" placeholder="Vehicle number" />
                    </div>
                    <div class="field">
                      <label for="owner-database-km">KM</label>
                      <input id="owner-database-km" name="km" type="text" value="${escapeHtml(activeEntry.km || "")}" placeholder="Distance" />
                    </div>
                    <div class="field">
                      <label for="owner-database-special-days">Special day</label>
                      <input id="owner-database-special-days" name="specialDays" type="text" value="${escapeHtml(activeEntry.specialDays || "")}" placeholder="Optional tag" />
                    </div>
                    <div class="field owner-storage-field-span">
                      <label for="owner-database-leave-reason">Leave details</label>
                      <textarea id="owner-database-leave-reason" name="leaveReasonText" rows="3" placeholder="Leave reason or owner correction note">${escapeHtml(activeLeaveDetails)}</textarea>
                      <p class="owner-storage-field-note">Changes are saved to the selected user day card.</p>
                    </div>
                  </div>
                  <div class="owner-storage-release-actions">
                    <button class="owner-primary-btn" type="submit">Save Changes</button>
                  </div>
                </form>
              ` : `
                <div class="owner-list-item owner-database-empty-state">
                  <strong>No editable work entry</strong>
                  <span>This user has not submitted any WorkReport day card yet.</span>
                </div>
              `}
            </section>

            <section class="owner-database-node">
              <div class="owner-database-node-head">
                <div>
                  <span>Selected record</span>
                  <strong>${escapeHtml(activeReport ? "Current values" : "No field data")}</strong>
                </div>
              </div>
              <div class="owner-database-field-list">
                ${activeReport ? renderDatabaseFieldList([
                  { label: "Report date", value: formatDateLabel(activeReport.log_date) },
                  { label: "Review status", value: formatReportStatus(activeReport.review_status) },
                  { label: "Attendance", value: getReportAttendanceInfo(activeReport).label },
                  { label: "Work location", value: activeEntry.workLocation || "Not set" },
                  { label: "Team", value: activeEntry.teamMembers || "Not set" },
                  { label: "Vehicle", value: activeEntry.vehicleNumber || "Not set" },
                  { label: "KM", value: activeEntry.km || "Not set" },
                  { label: "Updated", value: formatDateTime(activeReport.updated_at || activeReport.created_at || activeReport.log_date) }
                ]) : `
                  <div class="owner-database-field-row">
                    <span>State</span>
                    <strong>No WorkReport app data is available for this user yet.</strong>
                  </div>
                `}
              </div>
            </section>
          </div>
        </div>
      </div>
    `;
  }

  function renderDatabaseReportInspector(report) {
    if (!report) {
      return `
        <div class="owner-list-item">
          <strong>Select a report</strong>
          <span>Choose a report document to inspect its day fields and review controls.</span>
        </div>
      `;
    }
    return `
      <div class="owner-database-stage-shell">
        <section class="owner-database-stage-head">
          <div class="owner-database-stage-copy">
            <span class="owner-database-pane-kicker">daily_reports / ${escapeHtml(String(report.id || "").slice(0, 12) || "document")}</span>
            <h3>${escapeHtml(formatDateLabel(report.log_date))}</h3>
            <p class="owner-users-toolbar-note">${escapeHtml(report.user_full_name || report.user_email || "User")} • ${escapeHtml(formatReportStatus(report.review_status))}</p>
          </div>
          <div class="owner-inline-actions owner-database-stage-actions">
            <button class="owner-row-action" type="button" data-db-action="report-verified">Verify</button>
            <button class="owner-row-action is-warning" type="button" data-db-action="report-pending">Pending</button>
            <button class="owner-row-action is-danger" type="button" data-db-action="report-rejected">Reject</button>
            <button class="owner-row-action is-danger" type="button" data-db-action="report-delete">Trash</button>
          </div>
        </section>

        <div class="owner-mini-grid owner-database-stage-summary">
          ${renderDatabaseMiniStat("Status", formatReportStatus(report.review_status), report.review_comment || "No owner comment yet.")}
          ${renderDatabaseMiniStat("Attendance", getReportAttendanceInfo(report).label, summarizeReportEntry(report.entry).secondary)}
          ${renderDatabaseMiniStat("Owner", report.user_full_name || report.user_email || "User", report.user_email || "No email")}
          ${renderDatabaseMiniStat("Updated", formatDateTime(report.updated_at || report.created_at || report.log_date), "Latest document change time.")}
        </div>

        <div class="owner-database-node-grid">
          <section class="owner-database-node owner-database-node-wide">
            <div class="owner-database-node-head">
              <div>
                <span>Report fields</span>
                <strong>Day card values</strong>
              </div>
            </div>
            <div class="owner-mini-grid owner-database-daycard-fields">
              ${getReportFieldRows(report.entry).map((item) => `
                <div class="owner-report-field-row">
                  <span>${escapeHtml(item.label)}</span>
                  <strong>${escapeHtml(item.value)}</strong>
                </div>
              `).join("")}
            </div>
          </section>
          ${renderDatabaseJsonInspector("Report document", report)}
        </div>
      </div>
    `;
  }

  function renderDatabaseBackupInspector(backup) {
    if (!backup) {
      return `
        <div class="owner-list-item">
          <strong>Select a backup</strong>
          <span>Choose a backup snapshot to inspect storage, counts, raw JSON, and recovery actions.</span>
        </div>
      `;
    }
    const snapshotCounts = summarizeSnapshot(backup.snapshot);
    return `
      <div class="owner-database-stage-shell">
        <section class="owner-database-stage-head">
          <div class="owner-database-stage-copy">
            <span class="owner-database-pane-kicker">owner_backups / ${escapeHtml(String(backup.id || "").slice(0, 12) || "snapshot")}</span>
            <h3>${escapeHtml(backup.target_full_name || backup.target_email || "User snapshot")}</h3>
            <p class="owner-users-toolbar-note">${escapeHtml(formatDateTime(backup.created_at))} • ${escapeHtml(backup.backup_kind || "manual")}</p>
          </div>
          <div class="owner-inline-actions owner-database-stage-actions">
            <button class="owner-row-action" type="button" data-db-action="backup-download">Download JSON</button>
            <button class="owner-row-action" type="button" data-db-action="backup-open-user">Open User</button>
            <button class="owner-row-action is-danger" type="button" data-db-action="backup-delete" ${state.remoteBackupDeleteReady ? "" : "disabled"}>${escapeHtml(state.remoteBackupDeleteReady ? "Delete Backup" : "Patch Needed")}</button>
          </div>
        </section>

        <div class="owner-mini-grid owner-database-stage-summary">
          ${renderDatabaseMiniStat("Size", formatStorageSize(getBackupSizeBytes(backup)), "Approximate snapshot JSON size.")}
          ${renderDatabaseMiniStat("Work logs", String(snapshotCounts.workLogs), "Entries in latest snapshot payload.")}
          ${renderDatabaseMiniStat("Reminders", String(snapshotCounts.reminders), "Reminder rows in snapshot payload.")}
          ${renderDatabaseMiniStat("Target email", backup.target_email || "No email", "Original backup target account.")}
        </div>

        ${renderDatabaseJsonInspector("Backup snapshot", backup.snapshot || {})}
      </div>
    `;
  }

  function renderDatabaseSupportInspector(message) {
    if (!message) {
      return `
        <div class="owner-list-item">
          <strong>Select a support message</strong>
          <span>Choose a support document to inspect the full user message and owner response status.</span>
        </div>
      `;
    }
    const supportContent = parseSupportMessageContent(message);
    const supportFieldRows = [
      { label: "Sender", value: `${message.sender_name || "User"}${message.sender_email ? ` (${message.sender_email})` : ""}` },
      { label: "Subject", value: message.subject || formatSupportCategory(message.category) }
    ];
    if (supportContent.accountStatus) {
      supportFieldRows.push({ label: "Account Status", value: supportContent.accountStatus });
    }
    if (supportContent.issueType) {
      supportFieldRows.push({ label: "Issue Type", value: supportContent.issueType });
    }
    if (supportContent.submittedFrom) {
      supportFieldRows.push({ label: "Source", value: supportContent.submittedFrom });
    }
    supportFieldRows.push({ label: "Message", value: supportContent.body || "No message body" });
    return `
      <div class="owner-database-stage-shell">
        <section class="owner-database-stage-head">
          <div class="owner-database-stage-copy">
            <span class="owner-database-pane-kicker">support_messages / ${escapeHtml(String(message.id || "").slice(0, 12) || "message")}</span>
            <h3>${escapeHtml(message.subject || formatSupportCategory(message.category))}</h3>
            <p class="owner-users-toolbar-note">${escapeHtml(message.sender_name || message.sender_email || "User")} • ${escapeHtml(formatSupportStatus(message.status))}</p>
          </div>
          <div class="owner-inline-actions owner-database-stage-actions">
            <button class="owner-row-action" type="button" data-db-action="support-open-user">Open User</button>
            <button class="owner-row-action" type="button" data-db-action="support-read">Mark Read</button>
            <button class="owner-row-action" type="button" data-db-action="support-resolve">Resolve</button>
          </div>
        </section>

        <div class="owner-mini-grid owner-database-stage-summary">
          ${renderDatabaseMiniStat("Category", formatSupportCategory(message.category), message.sender_email || "No sender email")}
          ${renderDatabaseMiniStat("Status", formatSupportStatus(message.status), message.owner_seen_at ? `Seen ${formatDateTime(message.owner_seen_at)}` : "Owner has not opened it yet.")}
          ${renderDatabaseMiniStat("Created", formatDateTime(message.created_at), "Original user message time.")}
          ${renderDatabaseMiniStat("Resolved", message.resolved_at ? formatDateTime(message.resolved_at) : "Open", message.resolved_by || "Waiting for owner action.")}
        </div>

        <section class="owner-database-node owner-database-node-wide">
          <div class="owner-database-node-head">
            <div>
              <span>Message body</span>
              <strong>User request</strong>
            </div>
          </div>
          <div class="owner-database-field-list">
            ${renderDatabaseFieldList(supportFieldRows)}
          </div>
        </section>

        ${renderDatabaseJsonInspector("Support document", message)}
      </div>
    `;
  }

  function renderDatabaseInspector(collectionId, selectedItem) {
    return renderDatabaseProfileInspector(selectedItem && selectedItem.payload, null, []);
  }

  function renderStoragePackageCard(platform, asset) {
    const safePlatform = String(platform || "").trim().toLowerCase();
    const label = getReleasePlatformLabel(safePlatform);
    const hasAsset = Boolean(asset && asset.public_url);
    const statusLabel = hasAsset ? "Live" : "Ready";
    const publishLabel = hasAsset ? "Replace & publish" : "Upload & publish";
    const versionValue = asset ? asset.version_label : "";
    const buildValue = asset ? asset.build_label : "";
    const publicUrl = asset ? asset.public_url : "";
    const pagePath = getReleaseDownloadPagePath(safePlatform);
    const currentTimestamp = asset ? (asset.updated_at || asset.created_at) : "";
    return `
      <article class="owner-storage-release-card">
        <div class="owner-storage-release-head">
          <div>
            <p>${escapeHtml(label)}</p>
            <h4>${escapeHtml(`${label} build`)}</h4>
          </div>
          <span class="owner-storage-state-pill${hasAsset ? " is-live" : ""}">${escapeHtml(statusLabel)}</span>
        </div>

        <div class="owner-storage-release-meta-grid">
          <div class="owner-storage-meta-cell">
            <span>Version</span>
            <strong>${escapeHtml(asset && asset.version_label ? asset.version_label : "Not published")}</strong>
          </div>
          <div class="owner-storage-meta-cell">
            <span>Build</span>
            <strong>${escapeHtml(asset && asset.build_label ? asset.build_label : "Not set")}</strong>
          </div>
          <div class="owner-storage-meta-cell">
            <span>File</span>
            <strong>${escapeHtml(asset && asset.file_name ? asset.file_name : `No ${label} file`)}</strong>
          </div>
          <div class="owner-storage-meta-cell">
            <span>Updated</span>
            <strong>${escapeHtml(currentTimestamp ? formatDateTime(currentTimestamp) : "Not published")}</strong>
          </div>
          <div class="owner-storage-meta-cell">
            <span>Size</span>
            <strong>${escapeHtml(asset && asset.file_size_bytes ? formatStorageSize(asset.file_size_bytes) : "Pending")}</strong>
          </div>
        </div>

        <form class="owner-storage-release-form" data-storage-form="${escapeHtml(safePlatform)}">
          <div class="field">
            <label for="owner-storage-version-${escapeHtml(safePlatform)}">Version label</label>
            <input id="owner-storage-version-${escapeHtml(safePlatform)}" name="version_label" type="text" maxlength="60" placeholder="v3.2.1" value="${escapeHtml(versionValue)}" />
          </div>

          <div class="field">
            <label for="owner-storage-build-${escapeHtml(safePlatform)}">Build label</label>
            <input id="owner-storage-build-${escapeHtml(safePlatform)}" name="build_label" type="text" maxlength="60" placeholder="Build 2026.03.30" value="${escapeHtml(buildValue)}" />
          </div>

          <div class="field owner-storage-field-span">
            <label for="owner-storage-file-${escapeHtml(safePlatform)}">Package file</label>
            <input id="owner-storage-file-${escapeHtml(safePlatform)}" name="package_file" type="file" accept="${escapeHtml(getReleaseExtension(safePlatform))}" />
          </div>

          <div class="owner-storage-release-actions">
            <button class="owner-primary-btn" type="submit" data-storage-submit="${escapeHtml(safePlatform)}">${escapeHtml(publishLabel)}</button>
            <button class="owner-ghost-btn" type="button" data-storage-action="copy-public-url" data-storage-platform="${escapeHtml(safePlatform)}" ${publicUrl ? "" : "disabled"}>Copy Link</button>
            <button class="owner-ghost-btn" type="button" data-storage-action="open-download-page" data-storage-platform="${escapeHtml(safePlatform)}" ${(pagePath || publicUrl) ? "" : "disabled"}>${escapeHtml(pagePath ? "Open page" : "Open file")}</button>
          </div>

          <div class="status-box owner-storage-form-status" data-storage-status="${escapeHtml(safePlatform)}" role="status" aria-live="polite"></div>
        </form>
      </article>
    `;
  }

  function renderFiles() {
    if (!els.filesList || !els.dataManager) return;
    state.databaseCollection = "profiles";
    const searchQuery = String(state.storageSearchQuery || "").trim().toLowerCase();
    const documentRows = sortDatabaseDocumentRows(
      state.users.map((user) => ({
        id: String(user.id || ""),
        title: getUserDisplayName(user),
        subtitle: user.email || "No email",
        meta: `${getReportsForUser(user.id).length} work record${getReportsForUser(user.id).length === 1 ? "" : "s"} • ${formatProvider(user.auth_provider)}`,
        note: user.last_sign_in_at ? `Last sign in ${formatDateTime(user.last_sign_in_at)}` : "No recent sign-in",
        status: user.is_disabled ? "Disabled" : "Active",
        sortDate: user.updated_at || user.created_at || "",
        payload: user
      })).filter((item) => !searchQuery || buildDatabaseSearchHaystack(item).includes(searchQuery))
    );
    const selectedId = ensureDatabaseRecordSelection("profiles", documentRows);
    const selectedItem = documentRows.find((item) => String(item.id || "") === selectedId) || null;

    if (els.databaseDocumentsTitle) {
      els.databaseDocumentsTitle.textContent = "User list";
    }
    if (els.databaseDocumentsMeta) {
      els.databaseDocumentsMeta.textContent = searchQuery
        ? `${documentRows.length} user${documentRows.length === 1 ? "" : "s"} matched your search.`
        : `${documentRows.length} workspace user${documentRows.length === 1 ? "" : "s"} available.`;
    }

    els.filesList.innerHTML = documentRows.length
      ? documentRows.map((item) => `
          <button class="owner-database-document-btn${String(item.id || "") === selectedId ? " is-selected" : ""}" type="button" data-db-collection="profiles" data-db-record-id="${escapeHtml(item.id)}">
            <div class="owner-database-document-head">
              <div class="owner-database-document-copy">
                <strong>${escapeHtml(item.title || "User")}</strong>
                <span>${escapeHtml(item.subtitle || "No email")}</span>
              </div>
              <span class="owner-database-document-status">${escapeHtml(item.status || "Live")}</span>
            </div>
            <div class="owner-database-document-meta">
              <span>${escapeHtml(item.meta || "Active user")}</span>
              <span>${escapeHtml(item.note || "No recent sign-in")}</span>
            </div>
          </button>
        `).join("")
      : `
        <div class="owner-storage-empty-row">
          <strong>No users found</strong>
          <span>Try another user name or email search.</span>
        </div>
      `;

    const selectedUser = selectedItem && selectedItem.payload ? selectedItem.payload : null;
    const userReports = selectedUser ? getSortedReportsForUser(selectedUser.id) : [];
    if (!userReports.some((item) => String(item.id || "") === String(state.selectedReportId || ""))) {
      state.selectedReportId = userReports[0] ? String(userReports[0].id || "") : "";
    }
    const selectedReport = userReports.find((item) => String(item.id || "") === String(state.selectedReportId || "")) || null;

    if (els.databaseRecordsTitle) {
      els.databaseRecordsTitle.textContent = selectedUser ? "Day card records" : "Report records";
    }
    if (els.databaseRecordsMeta) {
      els.databaseRecordsMeta.textContent = !selectedUser
        ? "Select a user to inspect report entries."
        : userReports.length
          ? `${userReports.length} report entr${userReports.length === 1 ? "y" : "ies"} available.`
          : "This user has not submitted any report entries yet.";
    }
    if (els.databaseRecordsList) {
      els.databaseRecordsList.innerHTML = !selectedUser
        ? `
          <div class="owner-storage-empty-row">
            <strong>Select a user</strong>
            <span>Choose a user from the left to load their WorkReport day cards.</span>
          </div>
        `
        : userReports.length
          ? userReports.map((report) => {
            const reportSummary = summarizeReportEntry(report.entry);
            const selected = String(report.id || "") === String(selectedReport && selectedReport.id || "");
            return `
              <button class="owner-database-document-btn owner-database-report-picker${selected ? " is-selected" : ""}" type="button" data-db-collection="reports" data-db-record-id="${escapeHtml(String(report.id || ""))}">
                <div class="owner-database-document-head">
                  <div class="owner-database-document-copy">
                    <strong>${escapeHtml(formatDateLabel(report.log_date))}</strong>
                    <span>${escapeHtml(reportSummary.primary || "Work report")}</span>
                  </div>
                  <span class="owner-database-document-status">${escapeHtml(formatReportStatus(report.review_status))}</span>
                </div>
                <div class="owner-database-document-meta">
                  <span>${escapeHtml(reportSummary.secondary || "No extra details")}</span>
                  <span>${escapeHtml(formatDateTime(report.updated_at || report.created_at || report.log_date))}</span>
                </div>
              </button>
            `;
          }).join("")
          : `
            <div class="owner-storage-empty-row">
              <strong>No day cards yet</strong>
              <span>This user has not submitted any WorkReport report data yet.</span>
            </div>
          `;
    }

    els.dataManager.innerHTML = renderDatabaseProfileInspector(selectedUser, selectedReport, userReports);
  }

  function renderStoragePage() {
    if (!els.storageManager) return;
    const catalog = normalizeReleaseAssets(state.releaseAssets);
    const androidAsset = catalog.find((item) => item.platform === "android") || null;
    const iosAsset = catalog.find((item) => item.platform === "ios") || null;
    const latestAsset = [...catalog].sort((left, right) => {
      const leftTime = new Date(left.updated_at || left.created_at || 0).getTime();
      const rightTime = new Date(right.updated_at || right.created_at || 0).getTime();
      return rightTime - leftTime;
    })[0] || null;

    if (els.storageSummary) {
      els.storageSummary.innerHTML = "";
      els.storageSummary.hidden = true;
    }

    els.storageManager.innerHTML = `
      <div class="owner-storage-manager-shell">
        <div class="owner-storage-manager-head">
          <div>
            <p class="owner-surface-kicker">Packages</p>
            <h3>Current releases</h3>
            <p class="owner-storage-manager-copy">${escapeHtml(latestAsset ? `Updated ${formatDateTime(latestAsset.updated_at || latestAsset.created_at)}.` : "Publish the current APK and IPA.")}</p>
          </div>
          <div class="owner-inline-actions">
            <button class="owner-primary-btn" type="button" data-storage-action="refresh">Refresh storage</button>
          </div>
        </div>
        ${state.releaseCatalogReady ? "" : `
          <div class="owner-storage-inline-banner">
            <strong>Publishing unavailable</strong>
            <span>${escapeHtml(state.releaseCatalogError || "Apply the latest storage SQL patch to unlock package publishing.")}</span>
          </div>
        `}
        <div class="owner-storage-release-grid">
          ${renderStoragePackageCard("android", androidAsset)}
          ${renderStoragePackageCard("ios", iosAsset)}
        </div>
      </div>
    `;
  }

  function getStorageStatusElement(platform) {
    const selector = `[data-storage-status="${String(platform || "").trim().toLowerCase()}"]`;
    return (els.storageManager && els.storageManager.querySelector(selector))
      || (els.dataManager && els.dataManager.querySelector(selector))
      || null;
  }

  function setStorageFormStatus(platform, status) {
    const target = getStorageStatusElement(platform);
    if (!target || !window.AuthUi) return;
    if (!status) {
      window.AuthUi.clearInlineStatus(target);
      return;
    }
    window.AuthUi.setInlineStatus(target, status);
  }

  async function copyTextValue(textValue, successMessage) {
    const value = String(textValue || "").trim();
    if (!value) return;
    try {
      if (navigator.clipboard && typeof navigator.clipboard.writeText === "function") {
        await navigator.clipboard.writeText(value);
      } else {
        const input = document.createElement("textarea");
        input.value = value;
        input.setAttribute("readonly", "readonly");
        input.style.position = "absolute";
        input.style.left = "-9999px";
        document.body.appendChild(input);
        input.select();
        document.execCommand("copy");
        document.body.removeChild(input);
      }
      window.AuthUi.setInlineStatus(els.dashboardStatus, {
        type: "success",
        message: successMessage || "Copied to clipboard."
      });
    } catch (error) {
      console.warn("Copy failed:", error);
      window.AuthUi.setInlineStatus(els.dashboardStatus, {
        type: "info",
        message: "Copy failed. Use the visible public link manually."
      });
    }
  }

  async function copyReleaseAssetUrl(platform) {
    const asset = getReleaseAsset(platform);
    const publicUrl = asset && asset.public_url ? asset.public_url : "";
    if (!publicUrl) {
      window.AuthUi.setInlineStatus(els.dashboardStatus, {
        type: "info",
        message: `${getReleasePlatformLabel(platform)} does not have a public package link yet.`
      });
      return;
    }
    await copyTextValue(publicUrl, `${getReleasePlatformLabel(platform)} file URL copied.`);
  }

  function openReleaseDestination(platform) {
    const safePlatform = String(platform || "").trim().toLowerCase();
    const downloadPagePath = getReleaseDownloadPagePath(safePlatform);
    const asset = getReleaseAsset(safePlatform);
    const targetUrl = downloadPagePath ? `${authBaseUrl}${downloadPagePath}` : String(asset && asset.public_url || "").trim();
    if (!targetUrl) {
      window.AuthUi.setInlineStatus(els.dashboardStatus, {
        type: "info",
        message: `${getReleasePlatformLabel(safePlatform)} does not have a public destination yet.`
      });
      return;
    }
    window.open(targetUrl, "_blank", "noopener,noreferrer");
  }

  async function publishReleaseAsset(platform, form) {
    const safePlatform = String(platform || "").trim().toLowerCase();
    const releaseForm = form && form.matches
      ? form
      : (els.storageManager && els.storageManager.querySelector(`[data-storage-form="${safePlatform}"]`))
        || (els.dataManager && els.dataManager.querySelector(`[data-storage-form="${safePlatform}"]`));
    if (!releaseForm) return;

    const versionInput = releaseForm.querySelector('[name="version_label"]');
    const buildInput = releaseForm.querySelector('[name="build_label"]');
    const notesInput = releaseForm.querySelector('[name="release_notes"]');
    const fileInput = releaseForm.querySelector('[name="package_file"]');
    const submitButton = releaseForm.querySelector(`[data-storage-submit="${safePlatform}"]`);
    const currentAsset = getReleaseAsset(safePlatform);
    const selectedFile = fileInput && fileInput.files ? fileInput.files[0] : null;
    const versionLabel = String(versionInput && versionInput.value || "").trim();
    const buildLabel = String(buildInput && buildInput.value || "").trim();
    const releaseNotes = String(notesInput && notesInput.value || "").trim();

    if (!state.releaseCatalogReady) {
      setStorageFormStatus(safePlatform, {
        type: "info",
        message: state.releaseCatalogError || "Run the latest storage SQL patch to unlock owner publishing."
      });
      return;
    }

    if (!currentAsset && !selectedFile) {
      setStorageFormStatus(safePlatform, {
        type: "error",
        message: `Choose a ${getReleaseExtension(safePlatform)} file for the first ${getReleasePlatformLabel(safePlatform)} publish.`
      });
      return;
    }

    if (selectedFile) {
      const expectedExtension = getReleaseExtension(safePlatform);
      const fileName = String(selectedFile.name || "").toLowerCase();
      if (!fileName.endsWith(expectedExtension)) {
        setStorageFormStatus(safePlatform, {
          type: "error",
          message: `Upload a valid ${expectedExtension} file for ${getReleasePlatformLabel(safePlatform)}.`
        });
        return;
      }
      if (Number(selectedFile.size || 0) > OWNER_RELEASE_MAX_BYTES) {
        setStorageFormStatus(safePlatform, {
          type: "error",
          message: `Package is too large. Keep it under ${formatStorageSize(OWNER_RELEASE_MAX_BYTES)}.`
        });
        return;
      }
    }

    const submitLabel = submitButton ? String(submitButton.textContent || "").trim() : (safePlatform === "ios" ? "Upload IPA" : "Upload APK");
    setStorageFormStatus(safePlatform, null);
    window.AuthUi.setBusy(submitButton, true, safePlatform === "ios" ? "Upload IPA" : "Upload APK");

    let uploadedObjectPath = "";

    try {
      let objectPath = currentAsset ? currentAsset.object_path : "";
      let publicUrl = currentAsset ? currentAsset.public_url : "";
      let fileName = currentAsset ? currentAsset.file_name : "";
      let fileSizeBytes = currentAsset ? Number(currentAsset.file_size_bytes || 0) : 0;
      let mimeType = currentAsset ? currentAsset.mime_type : getReleaseMimeType(safePlatform);

      if (selectedFile) {
        const safeName = sanitizeReleaseFileName(selectedFile.name, `workreport-${safePlatform}${getReleaseExtension(safePlatform)}`);
        uploadedObjectPath = `${safePlatform}/${Date.now()}-${safeName}`;
        const storageClient = supabase.storage.from(OWNER_RELEASE_BUCKET);
        const { error: uploadError } = await storageClient.upload(uploadedObjectPath, selectedFile, {
          cacheControl: "3600",
          upsert: false,
          contentType: getReleaseMimeType(safePlatform, selectedFile)
        });
        if (uploadError) throw uploadError;
        const { data: publicData } = storageClient.getPublicUrl(uploadedObjectPath);
        objectPath = uploadedObjectPath;
        publicUrl = String(publicData && publicData.publicUrl || "").trim();
        fileName = selectedFile.name;
        fileSizeBytes = Number(selectedFile.size || 0);
        mimeType = getReleaseMimeType(safePlatform, selectedFile);
      }

      const payload = {
        platform: safePlatform,
        channel: OWNER_RELEASE_CHANNEL,
        bucket_name: OWNER_RELEASE_BUCKET,
        object_path: objectPath,
        public_url: publicUrl,
        file_name: fileName,
        version_label: versionLabel || null,
        build_label: buildLabel || null,
        release_notes: releaseNotes || null,
        file_size_bytes: fileSizeBytes,
        mime_type: mimeType || null,
        is_active: true,
        updated_by: String(state.sessionUser && state.sessionUser.id || state.ownerProfile && state.ownerProfile.id || "").trim() || null
      };

      const { error: saveError } = await supabase
        .from("app_release_assets")
        .upsert(payload, { onConflict: "platform,channel" });

      if (saveError) {
        if (uploadedObjectPath) {
          await supabase.storage.from(OWNER_RELEASE_BUCKET).remove([uploadedObjectPath]).catch(() => {});
        }
        throw saveError;
      }

      const releaseCatalog = await loadOwnerReleaseCatalog();
      state.releaseAssets = releaseCatalog.assets;
      state.releaseCatalogReady = releaseCatalog.ready;
      state.releaseCatalogError = releaseCatalog.error;
      renderFiles();
      setStorageFormStatus(safePlatform, {
        type: "success",
        message: `${getReleasePlatformLabel(safePlatform)} package published. Public link and website routing are updated.`
      });
      window.AuthUi.setInlineStatus(els.dashboardStatus, {
        type: "success",
        message: `${getReleasePlatformLabel(safePlatform)} release published successfully.`
      });
      recordLocalAudit(
        "release_published",
        `Published ${getReleasePlatformLabel(safePlatform)} release${versionLabel ? ` ${versionLabel}` : ""}${buildLabel ? ` (${buildLabel})` : ""}.`
      );
      renderAudit();
    } catch (error) {
      setStorageFormStatus(safePlatform, {
        type: "error",
        message: mapReleasePublishError(error)
      });
      window.AuthUi.setInlineStatus(els.dashboardStatus, {
        type: "error",
        message: mapReleasePublishError(error)
      });
    } finally {
      window.AuthUi.setBusy(submitButton, false, submitLabel || (safePlatform === "ios" ? "Upload IPA" : "Upload APK"));
    }
  }

  function mapReleasePublishError(error) {
    const message = String(error && error.message || "").trim();
    if (/new row violates row-level security|permission denied|policy/i.test(message)) {
      return "Storage policy blocked this upload. Apply the latest storage SQL patch and try again.";
    }
    if (/duplicate/i.test(message)) {
      return "This file name already exists in storage. Rename the package or upload again.";
    }
    if (/relation .*app_release_assets.* does not exist|app_release_assets/i.test(message)) {
      return "Storage release catalog is not ready yet. Apply the latest storage SQL patch first.";
    }
    if (/bucket/i.test(message)) {
      return "Downloads bucket is not ready yet. Apply the latest storage SQL patch first.";
    }
    return message || "Release publish failed. Try again after the storage SQL patch is active.";
  }

  function mapOwnerReleaseLoadError(error) {
    const message = String(error && error.message || "").trim();
    if (/relation .*app_release_assets.* does not exist|app_release_assets/i.test(message)) {
      return "Storage release catalog needs the latest SQL patch. The existing Android fallback link is still live.";
    }
    if (/permission denied|policy|row-level security/i.test(message)) {
      return "Storage policies are not fully active yet. Apply the latest storage SQL patch to unlock owner publishing.";
    }
    return message || "Storage release catalog is temporarily unavailable.";
  }

  function renderSupport() {
    if (!els.supportSummary || !els.supportList) return;
    const messages = normalizeSupportMessages(state.supportMessages);
    const unreadCount = messages.filter((item) => String(item.status || "new") === "new").length;
    const openCount = messages.filter((item) => String(item.status || "new") !== "resolved").length;
    const accessSupportCount = messages.filter((item) => String(item.status || "new") !== "resolved" && isAccessSupportCategory(item.category)).length;
    const latestMessage = messages[0] || null;

    renderSummaryCards(els.supportSummary, [
      {
        label: "Open requests",
        value: state.supportReady ? String(openCount) : "Unavailable",
        meta: state.supportReady ? "Messages sent from the Work Report app." : (state.supportError || "Support inbox needs the latest SQL patch.")
      },
      {
        label: "New requests",
        value: String(unreadCount),
        meta: "New messages waiting for owner review."
      },
      {
        label: "Access support",
        value: String(accessSupportCount),
        meta: accessSupportCount
          ? `${accessSupportCount} access support request${accessSupportCount === 1 ? "" : "s"} waiting.`
          : (latestMessage ? `Latest ${formatDateTime(latestMessage.created_at)}` : "No user contact history yet.")
      }
    ]);

    if (!state.supportReady) {
      els.supportList.innerHTML = `
        <div class="owner-list-item">
          <strong>Support inbox unavailable</strong>
          <span>${escapeHtml(state.supportError || "Run the latest support/contact SQL patch to unlock user messages.")}</span>
        </div>
      `;
      return;
    }

    if (!messages.length) {
      els.supportList.innerHTML = `
        <div class="owner-list-item">
          <strong>No support messages yet</strong>
          <span>User support requests and issue reports from the app will appear here.</span>
        </div>
      `;
      return;
    }

    els.supportList.innerHTML = messages.slice(0, 18).map((item) => `
      ${(() => {
        const supportContent = parseSupportMessageContent(item);
        return `
      <article class="owner-support-request-card">
        <div class="owner-support-request-head">
          <div class="owner-support-request-title">
            <strong>${escapeHtml(item.subject || formatSupportCategory(item.category))}</strong>
            <span>${escapeHtml(formatSupportCategory(item.category))}</span>
          </div>
          ${renderBadge(formatSupportStatus(item.status), getSupportStatusClass(item.status))}
        </div>
        <div class="owner-support-request-meta">
          <div class="owner-support-request-meta-row">
            <span>Name</span>
            <strong>${escapeHtml(getSupportMessageSender(item))}</strong>
          </div>
          <div class="owner-support-request-meta-row">
            <span>Email</span>
            <strong>${escapeHtml(item.sender_email || "No email provided")}</strong>
          </div>
          <div class="owner-support-request-meta-row">
            <span>Received</span>
            <strong>${escapeHtml(formatDateTime(item.created_at))}</strong>
          </div>
          ${supportContent.accountStatus ? `
          <div class="owner-support-request-meta-row">
            <span>Account Status</span>
            <strong>${escapeHtml(supportContent.accountStatus)}</strong>
          </div>` : ""}
          ${supportContent.issueType ? `
          <div class="owner-support-request-meta-row">
            <span>Issue Type</span>
            <strong>${escapeHtml(supportContent.issueType)}</strong>
          </div>` : ""}
        </div>
        <div class="owner-support-request-body">
          <span>Message</span>
          <p>${escapeHtml(supportContent.body || "No message body.")}</p>
        </div>
        <div class="owner-inline-actions">
          ${item.user_id ? `<button class="owner-row-action" type="button" data-support-open-user="${escapeHtml(String(item.user_id || ""))}">Open User</button>` : ""}
          ${String(item.status || "new") === "new" ? `<button class="owner-row-action" type="button" data-support-action="read" data-support-id="${escapeHtml(String(item.id || ""))}">Mark Read</button>` : ""}
          ${String(item.status || "new") !== "resolved" ? `<button class="owner-row-action" type="button" data-support-action="resolve" data-support-id="${escapeHtml(String(item.id || ""))}">Resolve</button>` : ""}
        </div>
      </article>`;
      })()}
    `).join("");
  }

  function renderUsers() {
    const query = String(els.searchInput.value || "").trim().toLowerCase();
    const searchScope = String(els.searchScopeInput?.value || "email").toLowerCase();
    const statusFilter = String(els.statusFilter.value || "all").toLowerCase();
    syncUserSearchPlaceholder();

    const rows = state.users.filter((user) => {
      const name = getUserDisplayName(user).toLowerCase();
      const email = String(user.email || "").toLowerCase();
      const id = String(user.id || "").toLowerCase();
      const role = String(user.role || "").toLowerCase();
      let queryMatch = true;
      if (query) {
        if (searchScope === "name") {
          queryMatch = name.includes(query);
        } else if (searchScope === "uid") {
          queryMatch = id.includes(query);
        } else if (searchScope === "email") {
          queryMatch = email.includes(query);
        } else {
          queryMatch = name.includes(query) || email.includes(query) || id.includes(query) || role.includes(query);
        }
      }
      if (!queryMatch) return false;
      if (statusFilter === "enabled") return !user.is_disabled;
      if (statusFilter === "disabled") return Boolean(user.is_disabled);
      if (statusFilter === "verified") return Boolean(user.email_verified);
      if (statusFilter === "unverified") return !user.email_verified;
      return true;
    }).sort(compareUsersByActiveSort);

    if (!rows.some((item) => String(item.id || "") === state.selectedUserId)) {
      state.selectedUserId = rows[0] ? String(rows[0].id || "") : "";
      state.userDetailOpen = false;
    }
    if (els.usersCountChip) {
      els.usersCountChip.textContent = String(rows.length);
    }
    if (els.usersSortBtn) {
      els.usersSortBtn.disabled = state.users.length < 2;
      els.usersSortBtn.textContent = getUserSortButtonLabel();
      els.usersSortBtn.setAttribute("aria-label", getUserSortButtonLabel());
    }
    if (els.addUserOpenBtn) {
      els.addUserOpenBtn.disabled = !ownerDetachedSignupClient;
      els.addUserOpenBtn.textContent = ownerDetachedSignupClient ? "Add User" : "Signup Unavailable";
    }

    els.usersBody.innerHTML = "";

    if (!rows.length) {
      els.usersBody.innerHTML = `<tr class="owner-users-empty-row"><td colspan="7">No accounts match the current filters.</td></tr>`;
      closeDetailDrawer();
      return;
    }

    rows.forEach((user) => {
      const selected = String(user.id || "") === state.selectedUserId;
      const actionsLocked = !state.rpcReady;
      const displayName = getUserDisplayName(user);
      const userTags = [];
      if (String(user.role || "").trim().toLowerCase() === "owner") {
        userTags.push(`<span class="owner-user-role-pill">${escapeHtml(formatUserRole(user.role))}</span>`);
      }
      if (isSuspiciousUser(user.id)) {
        userTags.push(`<span class="owner-user-flag-pill">Flagged</span>`);
      }
      const row = document.createElement("tr");
      row.className = `owner-row${selected ? " is-selected" : ""}`;
      row.innerHTML = `
        <td class="owner-check-cell owner-check-avatar-cell">
          <span class="owner-user-avatar">${escapeHtml(getUserInitials(user.full_name, user.email))}</span>
        </td>
        <td class="owner-uid-cell">
          <span>${escapeHtml(formatShortUid(String(user.id || "")))}</span>
        </td>
        <td class="owner-user-cell owner-user-name-cell">
          <span class="owner-user-copy">
            <span class="owner-user-name-line">
              <strong>${escapeHtml(displayName)}</strong>
            </span>
            ${userTags.length ? `<span class="owner-user-tag-row">${userTags.join("")}</span>` : ""}
          </span>
        </td>
        <td class="owner-email-cell">
          <span>${escapeHtml(user.email || "")}</span>
        </td>
        <td>${renderBadge(formatProvider(user.auth_provider), `provider-${String(user.auth_provider || "email").toLowerCase()}`)}</td>
        <td class="owner-date-cell">${escapeHtml(formatUserTableDate(user.last_sign_in_at))}</td>
        <td class="owner-access-cell">
          ${renderUserAccessToggle(user, actionsLocked)}
        </td>
      `;

      row.addEventListener("click", (event) => {
        if (event.target.closest("[data-user-action]")) return;
        state.selectedUserId = String(user.id || "");
        state.userDetailOpen = true;
        renderUsers();
        hydrateDetailDrawer();
        updateBackupButtonLabel();
      });

      row.querySelectorAll("[data-user-action]").forEach((button) => {
        button.addEventListener("click", (event) => {
          event.stopPropagation();
          state.selectedUserId = String(user.id || "");
          const action = String(button.dataset.userAction || "");
          if (action === "open") {
            state.userDetailOpen = true;
            renderUsers();
            hydrateDetailDrawer();
          } else if (action === "backup") {
            state.userDetailOpen = false;
            void backupUserById(String(user.id || ""));
          } else if (action === "verify") {
            void updateVerification(String(user.id || ""), !Boolean(user.email_verified));
          } else if (action === "reset") {
            void sendUserResetLink(user);
          } else if (action === "disable") {
            void updateDisabled(String(user.id || ""), !Boolean(user.is_disabled));
          } else if (action === "delete" || action === "archive") {
            void archiveUser(String(user.id || ""));
          }
        });
      });

      els.usersBody.appendChild(row);
    });

    hydrateDetailDrawer();
  }

  function renderDeletedUsers() {
    if (!els.deletedList) return;
    renderDeletedSummary();

    els.deletedList.innerHTML = "";

    if (!state.deletedUsers.length) {
      els.deletedList.innerHTML = `
        <div class="owner-list-item">
          <strong>No deleted users</strong>
          <span>Archived accounts will appear here after you use the Archive action.</span>
        </div>
      `;
      return;
    }

    state.deletedUsers.forEach((user) => {
      const selected = String(user.id || "") === state.selectedDeletedUserId;
      const actionsLocked = !state.rpcReady;
      const restoreDeadline = user.restore_until ? `Restore until ${formatDateTime(user.restore_until)}` : "Restore window active";
      const row = document.createElement("div");
      row.className = `owner-list-item owner-deleted-card${selected ? " is-selected" : ""}`;
      row.dataset.deletedUserId = String(user.id || "");
      row.innerHTML = `
        <strong>${escapeHtml(user.full_name || user.email || "Archived user")}</strong>
        <span>${escapeHtml(user.email || "")}</span>
        <span>${escapeHtml(restoreDeadline)}</span>
        <div class="owner-inline-actions">
          <button class="owner-row-action" type="button" data-deleted-action="restore" data-deleted-user-id="${escapeHtml(String(user.id || ""))}" ${actionsLocked ? "disabled" : ""}>${actionsLocked ? "SQL Setup Needed" : "Restore"}</button>
          <button class="owner-row-action" type="button" data-deleted-action="download" data-deleted-user-id="${escapeHtml(String(user.id || ""))}">Download Backup</button>
          <button class="owner-row-action is-danger" type="button" data-deleted-action="purge" data-deleted-user-id="${escapeHtml(String(user.id || ""))}" ${actionsLocked ? "disabled" : ""}>${actionsLocked ? "SQL Setup Needed" : "Delete Permanently"}</button>
        </div>
      `;
      els.deletedList.appendChild(row);
    });
  }

  function renderDeletedReports() {
    if (!els.deletedReportsList || !els.deletedReportsSummary) return;
    if (!state.deletedReports.some((item) => String(item.id || "") === state.selectedDeletedReportId)) {
      state.selectedDeletedReportId = state.deletedReports[0] ? String(state.deletedReports[0].id || "") : "";
    }

    renderSummaryCards(els.deletedReportsSummary, [
      {
        label: "Deleted reports",
        value: String(state.deletedReports.length),
        meta: "Reports moved into Trash."
      },
      {
        label: "Selected",
        value: getSelectedDeletedReport() ? formatDateLabel(getSelectedDeletedReport().log_date) : "None",
        meta: getSelectedDeletedReport()
          ? (getSelectedDeletedReport().user_full_name || getSelectedDeletedReport().user_email || "Deleted report")
          : "Choose a deleted report."
      },
      {
        label: "Restore mode",
        value: state.reportRpcReady ? "Live" : "Locked",
        meta: state.reportRpcReady ? "Restore and purge are ready." : "Run owner report SQL to unlock actions."
      }
    ]);

    if (!state.reportRpcReady) {
      els.deletedReportsList.innerHTML = `
        <div class="owner-list-item">
          <strong>Deleted report recovery is not active yet</strong>
          <span>${escapeHtml(state.reportError || "Run the latest owner report SQL to restore or permanently delete report rows.")}</span>
        </div>
      `;
      return;
    }

    if (!state.deletedReports.length) {
      els.deletedReportsList.innerHTML = `
        <div class="owner-list-item">
          <strong>No deleted reports</strong>
          <span>Report rows moved to Trash will appear here.</span>
        </div>
      `;
      return;
    }

    els.deletedReportsList.innerHTML = state.deletedReports.map((report) => {
      const selected = String(report.id || "") === state.selectedDeletedReportId;
      const summary = summarizeReportEntry(report.entry);
      return `
        <div class="owner-list-item owner-report-item${selected ? " is-selected" : ""}" data-deleted-report-id="${escapeHtml(String(report.id || ""))}">
          <div class="owner-report-item-header">
            <div class="owner-report-item-copy">
              <strong>${escapeHtml(report.user_full_name || report.user_email || "Deleted report")}</strong>
              <span>${escapeHtml(formatDateLabel(report.log_date))}</span>
            </div>
            ${renderBadge(formatReportStatus(report.review_status), getReportStatusClass(report.review_status))}
          </div>
          <div class="owner-report-item-meta">
            <span>${escapeHtml(summary.primary)}</span>
            <span>${escapeHtml(report.archived_at ? `Deleted ${formatDateTime(report.archived_at)}` : summary.secondary)}</span>
          </div>
          <div class="owner-inline-actions">
            <button class="owner-row-action" type="button" data-deleted-report-action="restore" data-deleted-report-id="${escapeHtml(String(report.id || ""))}">Restore</button>
            <button class="owner-row-action" type="button" data-deleted-report-action="download" data-deleted-report-id="${escapeHtml(String(report.id || ""))}">Download</button>
            <button class="owner-row-action is-danger" type="button" data-deleted-report-action="purge" data-deleted-report-id="${escapeHtml(String(report.id || ""))}">Delete Permanently</button>
          </div>
        </div>
      `;
    }).join("");
  }

  function renderBackups() {
    if (!els.backupsList) return;
    const backups = getCombinedBackups();
    if (!state.users.some((item) => String(item.id || "") === String(state.selectedUserId || ""))) {
      state.selectedUserId = state.users[0] ? String(state.users[0].id || "") : "";
    }
    const selectedUser = getSelectedUser();
    const selectedBackups = selectedUser ? getBackupsForUser(selectedUser.id) : [];
    renderBackupsSummary(backups);

    if (els.backupsUsersList) {
      if (!state.users.length) {
        els.backupsUsersList.innerHTML = `
          <div class="owner-list-item">
            <strong>No users yet</strong>
            <span>Create a user first to start capturing backup snapshots.</span>
          </div>
        `;
      } else {
        const userRows = state.users.map((user) => {
          const userBackups = getBackupsForUser(user.id);
          const latestBackup = userBackups[0] || null;
          return {
            user,
            count: userBackups.length,
            latestBackup
          };
        }).sort((a, b) => {
          if (b.count !== a.count) return b.count - a.count;
          return getUserDisplayName(a.user).localeCompare(getUserDisplayName(b.user));
        });

        els.backupsUsersList.innerHTML = userRows.map((entry) => `
          <div class="owner-list-item owner-backups-user-card${String(entry.user.id || "") === String(state.selectedUserId || "") ? " is-selected" : ""}" data-backups-user-id="${escapeHtml(String(entry.user.id || ""))}">
            <div class="owner-backups-user-head">
              <div class="owner-backups-user-copy">
                <strong>${escapeHtml(getUserDisplayName(entry.user))}</strong>
                <span>${escapeHtml(entry.user.email || "")}</span>
              </div>
              <span class="owner-count-chip">${escapeHtml(String(entry.count))}</span>
            </div>
            <span>${escapeHtml(entry.latestBackup ? `Latest ${formatDateTime(entry.latestBackup.created_at)}` : "No snapshots yet")}</span>
            <div class="owner-inline-actions">
              <button class="owner-row-action" type="button" data-backup-user-id="${escapeHtml(String(entry.user.id || ""))}">Backup Now</button>
            </div>
          </div>
        `).join("");
      }
    }

    if (els.backupsSelectedCopy) {
      if (!selectedUser) {
        els.backupsSelectedCopy.textContent = "Select a user to create and manage backup snapshots.";
      } else {
        const latestBackup = selectedBackups[0] || null;
        els.backupsSelectedCopy.textContent = `${getUserDisplayName(selectedUser)} • ${selectedBackups.length} snapshot${selectedBackups.length === 1 ? "" : "s"} • ${latestBackup ? `Latest ${formatDateTime(latestBackup.created_at)}` : "No snapshots yet"}`;
      }
    }
    if (els.backupsNotice) {
      const hasRemoteBackups = backups.some((item) => String(item.source || "").toLowerCase() !== "local");
      const showNotice = Boolean(state.rpcReady && hasRemoteBackups && !state.remoteBackupDeleteReady && state.remoteBackupDeleteNotice);
      els.backupsNotice.hidden = !showNotice;
      els.backupsNotice.textContent = showNotice ? state.remoteBackupDeleteNotice : "";
    }
    if (els.backupsCreateBtn) {
      els.backupsCreateBtn.disabled = !selectedUser;
      els.backupsCreateBtn.textContent = selectedUser ? "Create Backup" : "Backup User";
    }

    els.backupsList.innerHTML = "";

    if (!selectedUser) {
      els.backupsList.innerHTML = `
        <div class="owner-list-item">
          <strong>No selected user</strong>
          <span>Choose a user from the backup user list to view and create snapshots.</span>
        </div>
      `;
      return;
    }

    if (!selectedBackups.length) {
      els.backupsList.innerHTML = `
        <div class="owner-list-item">
          <strong>No backups yet</strong>
          <span>Create the first snapshot for ${escapeHtml(getUserDisplayName(selectedUser))} from this page.</span>
        </div>
      `;
      return;
    }

    selectedBackups.forEach((backup) => {
      const counts = summarizeSnapshot(backup.snapshot);
      const sourceLabel = backup.source === "local" ? "Local fallback snapshot" : "Supabase owner snapshot";
      const kindLabel = formatBackupKind(backup.backup_kind);
      const remoteDeleteLocked = String(backup.source || "").toLowerCase() !== "local" && !state.remoteBackupDeleteReady;
      const row = document.createElement("div");
      row.className = "owner-list-item owner-backup-record";
      row.innerHTML = `
        <div class="owner-backup-record-head">
          <div class="owner-backup-record-copy">
            <strong>${escapeHtml(backup.target_full_name || backup.target_email || "User backup")}</strong>
            <span>${escapeHtml(formatDateTime(backup.created_at))}</span>
          </div>
          ${renderBadge(kindLabel, "provider-email")}
        </div>
        <span>${escapeHtml(`${sourceLabel} • ${formatStorageSize(getBackupSizeBytes(backup))}`)}</span>
        <span>${escapeHtml(`${counts.workLogs} work logs, ${counts.reminders} reminders`)}</span>
        <div class="owner-inline-actions">
          <button class="owner-row-action" type="button" data-backup-id="${escapeHtml(String(backup.id || ""))}">Download JSON</button>
          <button class="owner-row-action ${remoteDeleteLocked ? "is-warning" : "is-danger"}" type="button" data-backup-delete-id="${escapeHtml(String(backup.id || ""))}" ${remoteDeleteLocked ? "disabled" : ""}>${remoteDeleteLocked ? "SQL Patch Needed" : "Delete Backup"}</button>
        </div>
      `;
      els.backupsList.appendChild(row);
    });
  }

  function renderRecovery() {
    if (!els.recoverySummary || !els.recoveryList) return;

    const selected = getSelectedDeletedUser();
    const deletedCount = state.deletedUsers.length;
    const selectedName = selected ? (selected.full_name || selected.email || "Archived user") : "No archived user selected";
    const selectedDeadline = selected && selected.restore_until
      ? formatDateTime(selected.restore_until)
      : "Restore window starts after the first archive action.";

    els.recoverySummary.innerHTML = `
      <div class="owner-mini-card">
        <span>Deleted Users</span>
        <strong>${escapeHtml(String(deletedCount))}</strong>
        <span>Archived accounts waiting for action.</span>
      </div>
      <div class="owner-mini-card">
        <span>Selected Recovery</span>
        <strong>${escapeHtml(selectedName)}</strong>
        <span>${escapeHtml(selectedDeadline)}</span>
      </div>
      <div class="owner-mini-card">
        <span>Recovery Source</span>
        <strong>${escapeHtml(state.rpcReady ? "Supabase archive" : "Read-only preview")}</strong>
        <span>${escapeHtml(state.rpcReady ? "Restore uses archive tables and backups." : "Run owner SQL to unlock restore actions.")}</span>
      </div>
    `;

    if (!selected) {
      els.recoveryList.innerHTML = `
        <div class="owner-list-item">
          <strong>Nothing to restore yet</strong>
          <span>Archive a user first. Deleted data and backup will appear here.</span>
        </div>
      `;
      return;
    }

    const latestBackup = getCombinedBackups().find((item) => String(item.target_user_id || "") === String(selected.id || ""));
    els.recoveryList.innerHTML = `
      <div class="owner-list-item">
        <strong>${escapeHtml(selected.full_name || selected.email || "Archived user")}</strong>
        <span>${escapeHtml(selected.email || "")}</span>
        <span>${escapeHtml(selected.restore_until ? `Restore until ${formatDateTime(selected.restore_until)}` : "Restore available")}</span>
        <span>${escapeHtml(latestBackup ? `Latest backup: ${formatDateTime(latestBackup.created_at)}` : "No backup found yet")}</span>
        <div class="owner-inline-actions">
          <button class="owner-row-action" type="button" data-recovery-action="restore" data-deleted-user-id="${escapeHtml(String(selected.id || ""))}" ${!state.rpcReady ? "disabled" : ""}>${state.rpcReady ? "Restore User" : "SQL Setup Needed"}</button>
          <button class="owner-row-action" type="button" data-recovery-action="download" data-deleted-user-id="${escapeHtml(String(selected.id || ""))}">Download Backup</button>
          <button class="owner-row-action is-danger" type="button" data-recovery-action="purge" data-deleted-user-id="${escapeHtml(String(selected.id || ""))}" ${!state.rpcReady ? "disabled" : ""}>${state.rpcReady ? "Delete Permanently" : "SQL Setup Needed"}</button>
        </div>
      </div>
    `;
  }

  function renderAudit() {
    if (!els.auditList) return;
    const query = String(els.auditSearchInput?.value || "").trim().toLowerCase();
    const auditEntries = getCombinedAudit().filter((item) => {
      if (!query) return true;
      const haystack = [
        item.summary,
        item.action,
        item.target_full_name,
        item.target_email,
        item.actor_email,
        item.created_at
      ].join(" ").toLowerCase();
      return haystack.includes(query);
    });
    renderAuditSummary(auditEntries);
    els.auditList.innerHTML = "";

    if (!auditEntries.length) {
      els.auditList.innerHTML = `
        <div class="owner-list-item">
          <strong>No owner activity yet</strong>
          <span>Sign-in, refresh, backup, archive, restore, and delete actions will appear here.</span>
        </div>
      `;
      return;
    }

    auditEntries.forEach((item) => {
      const row = document.createElement("div");
      row.className = "owner-list-item";
      row.innerHTML = `
        <strong>${escapeHtml(item.summary || item.title || "Owner action")}</strong>
        <span class="owner-audit-meta">${escapeHtml(item.target_full_name || item.target_email || item.message || "")}</span>
        <span class="owner-audit-meta">${escapeHtml(formatDateTime(item.created_at || item.createdAt))}</span>
      `;
      els.auditList.appendChild(row);
    });
  }

  function renderHealth() {
    if (!els.healthGrid) return;
    const backups = getCombinedBackups();
    const auditEntries = getCombinedAudit();
    renderHealthSummary(backups, auditEntries);
    const cards = [
      {
        label: "Control Path",
        value: state.rpcReady ? "Supabase live" : "Read-only safe",
        meta: state.rpcReady
          ? "Archive, restore, backup, and audit are live."
          : "Run owner SQL to unlock write controls."
      },
      {
        label: "Active Users",
        value: String(state.users.length),
        meta: "Rows loaded in this owner session."
      },
      {
        label: "Deleted Users",
        value: String(state.deletedUsers.length),
        meta: "Archived accounts waiting for action."
      },
      {
        label: "Reports",
        value: String(state.reports.length),
        meta: state.reportRpcReady ? "Live report rows loaded." : "Report SQL not active yet."
      },
      {
        label: "Snapshots",
        value: String(backups.length),
        meta: `Retention setting: ${state.settings.retentionDays} days`
      },
      {
        label: "Reset Route",
        value: "/admin-control_dashboard/reset",
        meta: "Separate from the main app reset."
      },
      {
        label: "Audit Events",
        value: String(auditEntries.length),
        meta: "Local and Supabase owner actions."
      }
    ];

    els.healthGrid.innerHTML = cards.map((card) => `
      <div class="owner-mini-card">
        <span>${escapeHtml(card.label)}</span>
        <strong>${escapeHtml(card.value)}</strong>
        <span>${escapeHtml(card.meta)}</span>
      </div>
    `).join("");

    renderDataManager(backups, auditEntries);
  }

  function hydrateDetailDrawer() {
    const user = getSelectedUser();
    if (!user || !state.userDetailOpen) {
      closeDetailDrawer();
      return;
    }

    const displayName = getUserDisplayName(user);
    if (els.usersWorkspace) {
      els.usersWorkspace.classList.add("has-detail-open");
    }
    els.detailDrawer.hidden = false;
    els.detailName.textContent = displayName;
    els.detailEmail.textContent = String(user.email || "");
    if (els.detailNameInline) els.detailNameInline.textContent = displayName;
    if (els.detailEmailInline) els.detailEmailInline.textContent = String(user.email || "");
    if (els.detailUid) els.detailUid.textContent = formatLongUid(user.id);
    els.detailRole.textContent = formatUserRole(user.role);
    els.detailProvider.textContent = formatProvider(user.auth_provider);
    els.detailStatus.textContent = user.is_disabled ? "Disabled" : "Active";
    els.detailVerified.textContent = user.email_verified ? "Verified" : "Pending";
    els.detailCreated.textContent = formatDateTime(user.created_at);
    if (els.detailUpdated) els.detailUpdated.textContent = formatDateTime(user.updated_at);
    els.detailLastSignin.textContent = formatDateTime(user.last_sign_in_at);
    els.detailVerifyBtn.disabled = !state.rpcReady;
    els.detailDisableBtn.disabled = !state.rpcReady;
    els.detailArchiveBtn.disabled = !state.rpcReady;
    if (state.rpcReady && isProviderManagedVerification(user) && user.email_verified) {
      els.detailVerifyBtn.disabled = true;
      els.detailVerifyBtn.textContent = `${formatProvider(user.auth_provider)} Verified`;
    } else {
      els.detailVerifyBtn.textContent = state.rpcReady ? (user.email_verified ? "Remove Verification" : "Verify User") : "SQL Setup Needed";
    }
    els.detailDisableBtn.textContent = state.rpcReady ? (user.is_disabled ? "Enable User" : "Disable User") : "SQL Setup Needed";
    els.detailArchiveBtn.textContent = state.rpcReady ? "Delete User" : "SQL Setup Needed";
    if (els.detailResetBtn) {
      els.detailResetBtn.textContent = "Send Reset Link";
    }
    if (els.detailNote) {
      els.detailNote.value = getUserMeta(user.id).note || "";
    }
    if (els.detailDisplayNameInput) {
      els.detailDisplayNameInput.value = displayName;
      els.detailDisplayNameInput.disabled = !state.rpcReady;
    }
    if (els.detailDisplayNameSaveBtn) {
      els.detailDisplayNameSaveBtn.disabled = !state.rpcReady;
      els.detailDisplayNameSaveBtn.textContent = state.rpcReady ? "Save Name" : "SQL Setup Needed";
    }
    if (els.detailFlagBtn) {
      els.detailFlagBtn.textContent = isSuspiciousUser(user.id) ? "Clear Suspicious" : "Mark Suspicious";
    }
    if (els.detailProviderCard) {
      els.detailProviderCard.innerHTML = `
        <strong>Provider Information</strong>
        <span>${escapeHtml(`This user signs in with ${formatProvider(user.auth_provider)}.`)}</span>
        <span>${escapeHtml(user.email_verified ? "Account confirmed and ready for access." : "Email verification is still pending.")}</span>
      `;
    }
    if (els.detailRawJson) {
      els.detailRawJson.textContent = JSON.stringify(user, null, 2);
    }
    renderDetailLogs(user);
    setDetailTab(state.detailTab || "overview");
    renderDetailSummary(user);
  }

  function closeDetailDrawer() {
    state.userDetailOpen = false;
    if (els.usersWorkspace) {
      els.usersWorkspace.classList.remove("has-detail-open");
    }
    els.detailDrawer.hidden = true;
    if (els.detailSummary) els.detailSummary.innerHTML = "";
    if (els.detailNote) els.detailNote.value = "";
    if (els.detailDisplayNameInput) {
      els.detailDisplayNameInput.value = "";
      els.detailDisplayNameInput.disabled = true;
    }
    if (els.detailRawJson) els.detailRawJson.textContent = "";
    if (els.detailProviderCard) els.detailProviderCard.innerHTML = "";
    if (els.detailLogList) els.detailLogList.innerHTML = "";
    if (els.detailNameInline) els.detailNameInline.textContent = "Select a user";
    if (els.detailEmailInline) els.detailEmailInline.textContent = "Choose a row to inspect account status.";
  }

  function setDetailTab(tabId) {
    state.detailTab = tabId || "overview";
    els.detailTabButtons.forEach((button) => {
      button.classList.toggle("is-active", String(button.dataset.ownerDetailTab || "") === state.detailTab);
    });
    els.detailPanels.forEach((panel) => {
      panel.hidden = String(panel.dataset.ownerDetailPanel || "") !== state.detailTab;
    });
  }

  function getSelectedUser() {
    return state.users.find((item) => String(item.id || "") === state.selectedUserId) || null;
  }

  function getSelectedDeletedUser() {
    return state.deletedUsers.find((item) => String(item.id || "") === state.selectedDeletedUserId) || null;
  }

  function updateBackupButtonLabel() {
    if (els.backupBtn && !els.backupBtn.disabled) {
      els.backupBtn.textContent = "Manual Backup";
    }
  }

  function hydrateSettingsForm() {
    if (!els.retentionDaysInput || !els.autoDownloadBackupInput) return;
    els.retentionDaysInput.value = String(state.settings.retentionDays || 30);
    els.autoDownloadBackupInput.checked = Boolean(state.settings.autoDownloadBackup);
    if (els.ownerEmailValue) els.ownerEmailValue.value = OWNER_DEFAULT_EMAIL;
    if (els.ownerResetValue) els.ownerResetValue.value = "/admin-control_dashboard/reset";
  }

  function renderUsersSummary(rows) {
    if (!els.usersSummary) return;
    const selected = getSelectedUser();
    const activeCount = rows.filter((item) => !item.is_disabled).length;
    const disabledCount = rows.filter((item) => item.is_disabled).length;
    const selectedLabel = selected ? getUserDisplayName(selected) : "None selected";
    const summaryItems = [
      { label: "Total Accounts", value: String(rows.length) },
      { label: "Active Access", value: String(activeCount) },
      { label: "Disabled", value: String(disabledCount) },
      { label: "Focused Account", value: selectedLabel, emphasized: true }
    ];
    els.usersSummary.innerHTML = summaryItems.map((item) => `
      <span class="owner-users-footer-stat${item.emphasized ? " is-emphasized" : ""}">
        <small>${escapeHtml(item.label)}</small>
        <strong>${escapeHtml(item.value)}</strong>
      </span>
    `).join("");
  }

  function renderUserAccessToggle(user, actionsLocked) {
    const isEnabled = !Boolean(user.is_disabled);
    return `
      <button
        class="owner-access-toggle${isEnabled ? " is-on" : ""}"
        type="button"
        data-user-action="disable"
        data-user-id="${escapeHtml(String(user.id || ""))}"
        ${actionsLocked ? "disabled" : ""}
        aria-label="${escapeHtml(actionsLocked ? "SQL setup needed" : (isEnabled ? "Disable user access" : "Enable user access"))}">
        <span class="owner-access-toggle-track">
          <span class="owner-access-toggle-knob"></span>
        </span>
      </button>
    `;
  }

  function renderUserActionMenu(user, options) {
    const actionsLocked = Boolean(options && options.actionsLocked);
    return `
      <details class="owner-row-menu">
        <summary class="owner-row-menu-trigger" aria-label="Open user actions">⋯</summary>
        <div class="owner-row-menu-popover">
          <button class="owner-row-menu-item" type="button" data-user-action="open" data-user-id="${escapeHtml(String(user.id || ""))}">View Profile</button>
          <button class="owner-row-menu-item" type="button" data-user-action="reset" data-user-id="${escapeHtml(String(user.id || ""))}">Send Reset Link</button>
          <button class="owner-row-menu-item" type="button" data-user-action="backup" data-user-id="${escapeHtml(String(user.id || ""))}">Backup Data</button>
          <button class="owner-row-menu-item is-danger" type="button" data-user-action="delete" data-user-id="${escapeHtml(String(user.id || ""))}" ${actionsLocked ? "disabled" : ""}>Delete User</button>
        </div>
      </details>
    `;
  }

  function renderDetailLogs(user) {
    if (!els.detailLogList) return;
    const targetUserId = String(user && user.id ? user.id : "");
    const targetEmail = String(user && user.email ? user.email : "").toLowerCase();
    const matches = getCombinedAudit().filter((entry) => {
      const entryUserId = String(entry && entry.target_user_id ? entry.target_user_id : "");
      const entryEmail = String(entry && entry.target_email ? entry.target_email : "").toLowerCase();
      return (targetUserId && entryUserId === targetUserId) || (targetEmail && entryEmail === targetEmail);
    }).slice(0, 8);

    if (!matches.length) {
      els.detailLogList.innerHTML = `
        <div class="owner-list-item">
          <strong>No user logs yet</strong>
          <span>Reset links, backups, disable actions, and other owner activity will appear here.</span>
        </div>
      `;
      return;
    }

    els.detailLogList.innerHTML = matches.map((entry) => `
      <div class="owner-list-item">
        <strong>${escapeHtml(entry.summary || entry.action || "Owner action")}</strong>
        <span>${escapeHtml(formatDateTime(entry.created_at || entry.createdAt))}</span>
        <span>${escapeHtml(entry.actor_email || "Owner console")}</span>
      </div>
    `).join("");
  }

  function renderReportActionMenu(report, actionsLocked) {
    return `
      <details class="owner-row-menu">
        <summary class="owner-row-menu-trigger" aria-label="Open report actions">⋯</summary>
        <div class="owner-row-menu-popover">
          <button class="owner-row-menu-item" type="button" data-report-action="open" data-report-id="${escapeHtml(String(report.id || ""))}">Open Report</button>
          <button class="owner-row-menu-item" type="button" data-report-action="verify" data-report-id="${escapeHtml(String(report.id || ""))}" ${actionsLocked ? "disabled" : ""}>Verify</button>
          <button class="owner-row-menu-item" type="button" data-report-action="reject" data-report-id="${escapeHtml(String(report.id || ""))}" ${actionsLocked ? "disabled" : ""}>Reject</button>
          <button class="owner-row-menu-item" type="button" data-report-action="pending" data-report-id="${escapeHtml(String(report.id || ""))}" ${actionsLocked ? "disabled" : ""}>Set Pending</button>
          <button class="owner-row-menu-item is-danger" type="button" data-report-action="delete" data-report-id="${escapeHtml(String(report.id || ""))}" ${actionsLocked ? "disabled" : ""}>Move to Trash</button>
        </div>
      </details>
    `;
  }

  function ensureReportMonthValue(userFilter) {
    if (!els.reportMonthInput) return getCurrentMonthValue();
    if (!String(els.reportMonthInput.value || "").trim()) {
      els.reportMonthInput.value = getDefaultReportMonthValue(userFilter);
    }
    return String(els.reportMonthInput.value || getCurrentMonthValue());
  }

  function getCurrentMonthValue() {
    const today = new Date();
    return `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}`;
  }

  function getDefaultReportMonthValue(userFilter) {
    const pool = state.reports
      .filter((report) => userFilter === "all" || String(report.user_id || "") === String(userFilter || ""));
    const latest = pool
      .map((report) => String(report.log_date || "").slice(0, 7))
      .filter(Boolean)
      .sort()
      .pop();
    return latest || getCurrentMonthValue();
  }

  function matchesReportMonth(value, monthValue) {
    if (!monthValue) return true;
    return String(value || "").slice(0, 7) === String(monthValue || "");
  }

  function getScopedReportRows({ userFilter, statusFilter, monthValue, query }) {
    return state.reports.filter((report) => {
      const haystack = [
        report.user_email,
        report.user_full_name,
        report.log_date,
        JSON.stringify(report.entry || {})
      ].join(" ").toLowerCase();
      const queryMatch = !query || haystack.includes(query);
      const userMatch = userFilter === "all" || String(report.user_id || "") === String(userFilter || "");
      const statusMatch = statusFilter === "all" || String(report.review_status || "pending").toLowerCase() === statusFilter;
      const monthMatch = matchesReportMonth(report.log_date, monthValue);
      return queryMatch && userMatch && statusMatch && monthMatch;
    }).sort((a, b) => {
      const aTime = new Date(`${a.log_date || ""}T00:00:00`).getTime();
      const bTime = new Date(`${b.log_date || ""}T00:00:00`).getTime();
      return aTime - bTime;
    });
  }

  function getReportScopeLabel(userFilter) {
    if (userFilter === "all") return "All users";
    const selectedOption = els.reportUserFilter && els.reportUserFilter.selectedOptions && els.reportUserFilter.selectedOptions[0];
    return String(selectedOption && selectedOption.textContent ? selectedOption.textContent : "Selected user");
  }

  function buildReportMonthSummaryCards({ rows, scopeRows, scopeLabel, monthValue, statusFilter, query }) {
    const presentCount = rows.filter((report) => getReportAttendanceInfo(report).isPresent).length;
    const leaveCount = rows.filter((report) => getReportAttendanceInfo(report).isLeave).length;
    const movementCount = rows.filter((report) => hasMovementReport(report)).length;
    const verifiedCount = rows.filter((report) => String(report.review_status || "pending").toLowerCase() === "verified").length;
    const pendingCount = rows.filter((report) => String(report.review_status || "pending").toLowerCase() === "pending").length;
    const rejectedCount = rows.filter((report) => String(report.review_status || "pending").toLowerCase() === "rejected").length;
    const uniqueLoggedDays = new Set(scopeRows.map((report) => String(report.log_date || ""))).size;
    const missingCount = scopeLabel !== "All users"
      ? Math.max(getDaysInMonthFromValue(monthValue) - uniqueLoggedDays, 0)
      : 0;

    return [
      {
        label: "Scope",
        value: scopeLabel,
        meta: formatMonthLabel(monthValue)
      },
      {
        label: "Logged",
        value: String(rows.length),
        meta: `${uniqueLoggedDays} unique day${uniqueLoggedDays === 1 ? "" : "s"} in this month`
      },
      {
        label: "Present",
        value: String(presentCount),
        meta: `${movementCount} day${movementCount === 1 ? "" : "s"} with movement`
      },
      {
        label: "Leave",
        value: String(leaveCount),
        meta: `${rows.filter((report) => getReportAttendanceInfo(report).isOwnLeave).length} own leave`
      },
      {
        label: "Missing",
        value: scopeLabel === "All users" ? "--" : String(missingCount),
        meta: scopeLabel === "All users"
          ? "Pick one user for exact missing-day count"
          : `${getDaysInMonthFromValue(monthValue)} calendar day${getDaysInMonthFromValue(monthValue) === 1 ? "" : "s"} in month`
      },
      {
        label: "Review",
        value: String(pendingCount),
        meta: `${verifiedCount} verified • ${rejectedCount} rejected${statusFilter !== "all" || query ? " in current view" : ""}`
      }
    ];
  }

  function buildReportBundles(rows, monthValue) {
    const bundles = new Map();
    rows.forEach((report) => {
      const userId = String(report.user_id || report.user_email || report.user_full_name || "user");
      const bundleId = `${userId}::${String(monthValue || String(report.log_date || "").slice(0, 7) || "month")}`;
      const attendance = getReportAttendanceInfo(report);
      const reviewStatus = String(report.review_status || "pending").toLowerCase();
      if (!bundles.has(bundleId)) {
        bundles.set(bundleId, {
          id: bundleId,
          userId,
          userName: report.user_full_name || report.user_email || "User",
          userEmail: report.user_email || "",
          monthValue: String(monthValue || String(report.log_date || "").slice(0, 7) || getCurrentMonthValue()),
          monthLabel: formatMonthLabel(String(monthValue || String(report.log_date || "").slice(0, 7) || getCurrentMonthValue())),
          scopeNote: "Monthly Work Data Sheet",
          rows: [],
          reportCount: 0,
          presentCount: 0,
          leaveCount: 0,
          pendingCount: 0,
          lastDate: String(report.log_date || ""),
          lastStatus: formatReportStatus(report.review_status)
        });
      }
      const bundle = bundles.get(bundleId);
      bundle.rows.push(report);
      bundle.reportCount += 1;
      if (attendance.isPresent) bundle.presentCount += 1;
      if (attendance.isLeave) bundle.leaveCount += 1;
      if (reviewStatus === "pending") bundle.pendingCount += 1;
      if (String(report.log_date || "") >= String(bundle.lastDate || "")) {
        bundle.lastDate = String(report.log_date || "");
        bundle.lastStatus = formatReportStatus(report.review_status);
      }
    });

    return Array.from(bundles.values()).sort((a, b) => {
      const nameCompare = String(a.userName || a.userEmail || "").localeCompare(String(b.userName || b.userEmail || ""));
      if (nameCompare !== 0) return nameCompare;
      return String(a.monthValue || "").localeCompare(String(b.monthValue || ""));
    });
  }

  function getReportBundle(bundleId) {
    return buildReportBundles(state.filteredReports, ensureReportMonthValue(String(els.reportUserFilter?.value || "all")))
      .find((bundle) => bundle.id === String(bundleId || "")) || null;
  }

  function parseOwnerMonthValue(monthValue) {
    const [yearText, monthText] = String(monthValue || "").split("-");
    const year = Number(yearText);
    const monthNumber = Number(monthText);
    if (!Number.isFinite(year) || !Number.isFinite(monthNumber)) return null;
    const monthIndex = monthNumber - 1;
    if (monthIndex < 0 || monthIndex > 11) return null;
    return {
      year,
      monthNumber,
      monthIndex
    };
  }

  function isWeekendDate(year, monthIndex, day) {
    const dayIndex = new Date(year, monthIndex, day).getDay();
    return dayIndex === 0 || dayIndex === 6;
  }

  function formatOwnerPdfDate(day, monthIndex, year) {
    return `${String(day).padStart(2, "0")}.${String(monthIndex + 1).padStart(2, "0")}.${year}`;
  }

  function buildExactMonthlyPdfRows(reports, monthValue) {
    const monthInfo = parseOwnerMonthValue(monthValue);
    if (!monthInfo) return [];
    const rows = Array.isArray(reports) ? reports.filter(Boolean) : [];
    const rowMap = new Map();
    rows.forEach((report) => {
      const key = String(report && report.log_date ? report.log_date : "").trim();
      if (!key) return;
      rowMap.set(key, report);
    });

    const daysInMonth = getDaysInMonthFromValue(monthValue);
    return Array.from({ length: daysInMonth }, (_, index) => {
      const day = index + 1;
      const isoDate = `${monthInfo.year}-${String(monthInfo.monthNumber).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
      const report = rowMap.get(isoDate);
      const entry = report && report.entry && typeof report.entry === "object" ? report.entry : {};
      const leaveStatus = String(entry.leaveStatus || "No").trim() || "No";
      const leaveReason = String(entry.leaveReason || "").trim();
      return {
        date: formatOwnerPdfDate(day, monthInfo.monthIndex, monthInfo.year),
        inTime: entry.inTime || "-",
        outTime: entry.outTime || "-",
        movementOut: entry.movementOut || "-",
        movementIn: entry.movementIn || "-",
        teamMembers: entry.teamMembers || "-",
        workLocation: entry.workLocation || "-",
        vehicleNumber: entry.vehicleNumber || "-",
        km: entry.km || "-",
        specialDays: entry.specialDays || "-",
        leaveStatus,
        leaveReason: leaveStatus.toLowerCase() === "yes"
          ? (leaveReason || entry.leaveReasonText || entry.customReasonDetails || "-")
          : "-"
      };
    });
  }

  function hasOwnerRowDataForPdf(row) {
    const fields = ["inTime", "outTime", "movementOut", "movementIn", "teamMembers", "workLocation", "vehicleNumber", "km", "specialDays", "leaveStatus", "leaveReason"];
    return fields.some((key) => {
      const value = String(row && row[key] != null ? row[key] : "").trim();
      if (!value || value === "-") return false;
      if (key === "leaveStatus" && value.toLowerCase() === "no") return false;
      return true;
    });
  }

  function resolveExactMonthlyPdfRequest(reports, options) {
    const rows = Array.isArray(reports) ? reports.filter(Boolean) : [];
    if (!rows.length) {
      return { error: "No monthly rows available for this user." };
    }
    const monthValue = String((options && options.monthValue) || String(rows[0].log_date || "").slice(0, 7) || "").trim();
    const monthInfo = parseOwnerMonthValue(monthValue);
    if (!monthInfo) {
      return { error: "Select a valid month to open the Work Data Sheet PDF." };
    }
    const userKeys = new Set(rows.map((report) => String(report.user_id || report.user_email || report.user_full_name || "").trim()).filter(Boolean));
    if (userKeys.size > 1) {
      return { error: "Choose one user from the monthly list to open the exact Work Data Sheet PDF." };
    }
    const firstRow = rows.find(Boolean) || {};
    const displayName = String((options && options.scopeLabel) || firstRow.user_full_name || firstRow.user_email || "User").trim() || "User";
    const rowSource = buildExactMonthlyPdfRows(rows, monthValue);
    return {
      rows,
      rowSource,
      userId: String((options && options.userId) || firstRow.user_id || "").trim(),
      monthValue,
      monthLabel: formatMonthLabel(monthValue),
      year: monthInfo.year,
      monthIndex: monthInfo.monthIndex,
      monthNumber: monthInfo.monthNumber,
      displayName,
      serviceNo: String((options && options.serviceNo) || firstRow.service_no || firstRow.serviceNo || "").trim(),
      fileName: `Work_Report_${monthInfo.year}_${monthInfo.monthNumber}.pdf`
    };
  }

  function clampOwnerPdfNumber(value, min, max, fallback) {
    const parsed = Number(value);
    if (!Number.isFinite(parsed)) return fallback;
    return Math.min(max, Math.max(min, parsed));
  }

  function getOwnerPdfFieldMeta(source) {
    return OWNER_PDF_EXPORT_FIELD_OPTIONS.find((field) => field.source === source) || OWNER_PDF_EXPORT_FIELD_OPTIONS[0];
  }

  function createDefaultOwnerPdfTableSettings() {
    return {
      headerBg: "#f3f4f6",
      headerTextColor: "#1f2937",
      tableTextColor: "#1f2937",
      borderColor: "#9ca3af",
      borderWidth: 1,
      headerFontSize: 9.6,
      rowFontSize: 10,
      cellPaddingX: 4,
      cellPaddingY: 6,
      headerPaddingX: 4,
      headerPaddingY: 6,
      rowLineHeight: 1.15,
      headerLineHeight: 1.1,
      includeEmptyRows: true,
      columns: OWNER_PDF_EXPORT_FIELD_OPTIONS.map((field, index) => ({
        id: `col_${field.source}_${index}`,
        source: field.source,
        label: field.label,
        width: field.width,
        visible: true
      }))
    };
  }

  function sanitizeOwnerPdfHeadingState(raw) {
    const source = raw && typeof raw === "object" ? raw : {};
    return {
      title: String(source.title || "").trim(),
      name: String(source.name || "").trim(),
      serviceNo: String(source.serviceNo || "").trim()
    };
  }

  function sanitizeOwnerPdfTableSettings(raw) {
    const fallback = createDefaultOwnerPdfTableSettings();
    if (!raw || typeof raw !== "object") return fallback;
    const safeColor = (value, fb) => (/^#[0-9a-fA-F]{6}$/.test(String(value || "").trim()) ? String(value).trim() : fb);
    const prettifyLabel = (text) => {
      const safeText = String(text || "").trim();
      if (!safeText) return safeText;
      if (/\s/.test(safeText)) return safeText;
      return safeText.replace(/([a-z])([A-Z])/g, "$1 $2");
    };
    const colsRaw = Array.isArray(raw.columns) && raw.columns.length ? raw.columns : fallback.columns;
    const columns = colsRaw.map((col, index) => {
      const source = getOwnerPdfFieldMeta(String(col && col.source ? col.source : "")).source;
      const meta = getOwnerPdfFieldMeta(source);
      return {
        id: String(col && col.id ? col.id : `col_${source}_${index}`),
        source,
        label: prettifyLabel(String(col && col.label ? col.label : meta.label)).slice(0, 48),
        width: clampOwnerPdfNumber(col && col.width, 2, 35, meta.width),
        visible: !(col && col.visible === false)
      };
    }).filter(Boolean);
    return {
      headerBg: safeColor(raw.headerBg, fallback.headerBg),
      headerTextColor: safeColor(raw.headerTextColor, fallback.headerTextColor),
      tableTextColor: safeColor(raw.tableTextColor, fallback.tableTextColor),
      borderColor: safeColor(raw.borderColor, fallback.borderColor),
      borderWidth: clampOwnerPdfNumber(raw.borderWidth, 0.5, 3, fallback.borderWidth),
      headerFontSize: clampOwnerPdfNumber(raw.headerFontSize, 8, 14, fallback.headerFontSize),
      rowFontSize: clampOwnerPdfNumber(raw.rowFontSize, 8, 14, fallback.rowFontSize),
      cellPaddingX: clampOwnerPdfNumber(raw.cellPaddingX, 2, 18, fallback.cellPaddingX),
      cellPaddingY: clampOwnerPdfNumber(raw.cellPaddingY, 2, 18, fallback.cellPaddingY),
      headerPaddingX: clampOwnerPdfNumber(raw.headerPaddingX, 2, 18, fallback.headerPaddingX),
      headerPaddingY: clampOwnerPdfNumber(raw.headerPaddingY, 2, 18, fallback.headerPaddingY),
      rowLineHeight: clampOwnerPdfNumber(raw.rowLineHeight, 1, 1.8, fallback.rowLineHeight),
      headerLineHeight: clampOwnerPdfNumber(raw.headerLineHeight, 1, 1.8, fallback.headerLineHeight),
      includeEmptyRows: raw.includeEmptyRows !== false,
      columns: columns.length ? columns : fallback.columns
    };
  }

  function normalizeOwnerPdfPreferences(raw) {
    const source = raw && typeof raw === "object" ? raw : {};
    return {
      pdfHeading: sanitizeOwnerPdfHeadingState(source.pdfHeading),
      pdfTableSettings: sanitizeOwnerPdfTableSettings(source.pdfTableSettings),
      updatedAt: String(source.updatedAt || source.updated_at || "").trim(),
      source: String(source.source || "").trim()
    };
  }

  function readOwnerPdfPreferencesFromSnapshot(snapshot) {
    const appSettings = snapshot && snapshot.appSettings && typeof snapshot.appSettings === "object"
      ? snapshot.appSettings
      : {};
    const settings = appSettings.settings && typeof appSettings.settings === "object"
      ? appSettings.settings
      : appSettings;
    if (!settings || typeof settings !== "object") return null;
    if ((!settings.pdfHeading || typeof settings.pdfHeading !== "object") && (!settings.pdfTableSettings || typeof settings.pdfTableSettings !== "object")) {
      return null;
    }
    return normalizeOwnerPdfPreferences({
      pdfHeading: settings.pdfHeading,
      pdfTableSettings: settings.pdfTableSettings,
      updatedAt: appSettings.updated_at || appSettings.updatedAt || snapshot.capturedAt || "",
      source: "backup_snapshot"
    });
  }

  function getCachedOwnerPdfPreferences(userId) {
    const key = String(userId || "").trim();
    if (!key) return null;
    const cached = state.userPdfPreferences[key];
    return cached && typeof cached === "object" ? cached : null;
  }

  function setCachedOwnerPdfPreferences(userId, prefs) {
    const key = String(userId || "").trim();
    if (!key) return null;
    const normalized = normalizeOwnerPdfPreferences(prefs);
    state.userPdfPreferences[key] = normalized;
    return normalized;
  }

  function getOwnerPdfPreferencesFromBackup(userId) {
    const backup = getLatestBackupForUser(userId);
    if (!backup || !backup.snapshot) return null;
    const prefs = readOwnerPdfPreferencesFromSnapshot(backup.snapshot);
    if (!prefs) return null;
    return setCachedOwnerPdfPreferences(userId, prefs);
  }

  function isMissingOwnerPdfPreferenceRpc(error) {
    const text = String((error && (error.message || error.details || error.hint)) || "").toLowerCase();
    return text.includes("owner_get_user_pdf_preferences")
      || text.includes("function public.owner_get_user_pdf_preferences")
      || text.includes("schema cache")
      || text.includes("does not exist");
  }

  async function ensureOwnerUserPdfPreferences(userId) {
    const key = String(userId || "").trim();
    if (!key) {
      return normalizeOwnerPdfPreferences({});
    }
    const cached = getCachedOwnerPdfPreferences(key);
    if (cached) return cached;
    try {
      const remote = await ownerRpc("owner_get_user_pdf_preferences", {
        p_target_user_id: key
      });
      return setCachedOwnerPdfPreferences(key, remote || {});
    } catch (error) {
      if (!isMissingOwnerPdfPreferenceRpc(error)) {
        throw error;
      }
    }
    const backupPrefs = getOwnerPdfPreferencesFromBackup(key);
    if (backupPrefs) return backupPrefs;
    return setCachedOwnerPdfPreferences(key, {});
  }

  function buildOwnerPdfHeadingConfig(request) {
    const headingState = sanitizeOwnerPdfHeadingState(request && request.pdfPreferences ? request.pdfPreferences.pdfHeading : null);
    const title = String(request && request.title ? request.title : (headingState.title || OWNER_PDF_EXPORT_TITLE_DEFAULT)).trim() || OWNER_PDF_EXPORT_TITLE_DEFAULT;
    const name = String(request && request.displayName ? request.displayName : (headingState.name || "User")).trim() || "User";
    const serviceNo = String(request && request.serviceNo ? request.serviceNo : (headingState.serviceNo || OWNER_PDF_EXPORT_SERVICE_DEFAULT)).trim() || OWNER_PDF_EXPORT_SERVICE_DEFAULT;
    const subtitleParts = [`Name: ${name}`];
    if (serviceNo) subtitleParts.push(`Service No: ${serviceNo}`);
    return {
      title,
      name,
      serviceNo,
      subtitle: subtitleParts.join(" | ")
    };
  }

  function formatOwnerPdfHeaderLabel(label, source) {
    const raw = String(label || "").trim();
    const normalized = raw.replace(/\s+/g, " ").toLowerCase();
    if (source === "movementOut" && (normalized === "movement out time" || normalized === "movementouttime")) {
      return "Movement<br>Out Time";
    }
    if (source === "movementIn" && (normalized === "movement in time" || normalized === "movementintime")) {
      return "Movement<br>In Time";
    }
    if (source === "km" && (normalized === "km reading" || normalized === "kmreading")) {
      return "KM<br>Reading";
    }
    return escapeHtml(raw).replace(/\n/g, "<br>");
  }

  function renderOwnerPdfTableMarkup(rowSource, tableSettings) {
    const cfg = sanitizeOwnerPdfTableSettings(tableSettings);
    const visibleColumns = cfg.columns.filter((col) => col.visible);
    const columns = visibleColumns.length ? visibleColumns : cfg.columns.slice(0, 1);
    const widthTotal = columns.reduce((sum, col) => sum + Number(col.width || 0), 0) || 1;
    const colgroupHtml = columns.map((col) => `<col style="width:${((col.width / widthTotal) * 100).toFixed(4)}%">`).join("");
    const border = `${cfg.borderWidth}px solid ${cfg.borderColor}`;
    const compactLeaveReasons = new Set(["public holiday", "normal leave day", "own leave", "poya day"]);
    const headerHtml = columns.map((col) => {
      const label = formatOwnerPdfHeaderLabel(col.label || getOwnerPdfFieldMeta(col.source).label, col.source);
      return `<th style="border:${border};padding:${cfg.headerPaddingY}px ${cfg.headerPaddingX}px;font-weight:700;white-space:normal;word-break:keep-all;line-height:${cfg.headerLineHeight};font-size:${cfg.headerFontSize}px;">${label}</th>`;
    }).join("");
    const rowHtml = rowSource.map((row) => {
      const normalizedRowLeaveReason = String(row && row.leaveReason ? row.leaveReason : "").trim().toLowerCase();
      const rowCellBackgroundStyle = normalizedRowLeaveReason === "own leave" ? "background:#fee2e2;" : "";
      return `<tr>${columns.map((col) => {
        const textValue = String(row && row[col.source] ? row[col.source] : "-") || "-";
        let extraStyle = "";
        if (col.source === "date") {
          const [dayText, monthText, yearText] = textValue.split(".");
          const day = Number(dayText);
          const monthIndex = Number(monthText) - 1;
          const year = Number(yearText);
          if (Number.isFinite(day) && Number.isFinite(monthIndex) && Number.isFinite(year) && isWeekendDate(year, monthIndex, day)) {
            extraStyle += "color:#ef4444;font-weight:700;";
          }
        }
        if (col.source === "leaveStatus" && textValue.toLowerCase() === "yes") {
          extraStyle += "color:#2563eb;font-weight:700;";
        }
        if (col.source === "leaveReason") {
          const normalizedReason = textValue.trim().toLowerCase();
          const useCompactSingleLine = compactLeaveReasons.has(normalizedReason);
          const leaveReasonFontSize = useCompactSingleLine ? Math.max(cfg.rowFontSize - 0.7, 8.6) : cfg.rowFontSize;
          const leaveReasonStyles = useCompactSingleLine
            ? "white-space:nowrap;text-overflow:clip;word-break:normal;letter-spacing:-0.1px;"
            : "white-space:normal;word-break:break-word;";
          return `<td style="border:${border};padding:${cfg.cellPaddingY}px ${cfg.cellPaddingX}px;line-height:${cfg.rowLineHeight};font-size:${leaveReasonFontSize}px;overflow:hidden;${leaveReasonStyles}${rowCellBackgroundStyle}${extraStyle}">${escapeHtml(textValue)}</td>`;
        }
        return `<td style="border:${border};padding:${cfg.cellPaddingY}px ${cfg.cellPaddingX}px;white-space:nowrap;line-height:${cfg.rowLineHeight};font-size:${cfg.rowFontSize}px;overflow:hidden;text-overflow:ellipsis;${rowCellBackgroundStyle}${extraStyle}">${escapeHtml(textValue)}</td>`;
      }).join("")}</tr>`;
    }).join("");

    return `
      <table style="width:100%;margin:0 auto;table-layout:fixed;border-collapse:collapse;border:${border};font-size:${cfg.rowFontSize}px;color:${cfg.tableTextColor};">
        <colgroup>${colgroupHtml}</colgroup>
        <thead style="background:${cfg.headerBg};color:${cfg.headerTextColor};"><tr>${headerHtml}</tr></thead>
        <tbody style="text-align:center;">${rowHtml}</tbody>
      </table>
    `;
  }

  function buildOwnerPdfHeaderMarkup(headingConfig, year, monthIndex) {
    const monthHeading = new Date(year, monthIndex, 1).toLocaleDateString("en-GB", {
      month: "long",
      year: "numeric"
    });
    return `
      <div style="display:flex;align-items:center;justify-content:space-between;gap:16px;margin:0 0 12px;padding:0 0 10px;border-bottom:1px solid #dbe3ef;">
        <div style="min-width:0;flex:1;">
          <h2 style="font-size:18px;font-weight:800;margin:0;color:#2563eb;letter-spacing:-0.02em;">${escapeHtml(headingConfig.title || "Work Data Sheet")}</h2>
          <p style="font-size:12.5px;font-weight:600;margin:4px 0 0;color:#475569;">${escapeHtml(headingConfig.subtitle || "")}</p>
        </div>
        <div style="text-align:right;align-self:center;flex-shrink:0;white-space:nowrap;font-size:16px;font-weight:800;color:#0f172a;letter-spacing:-0.02em;line-height:1.04;">${escapeHtml(monthHeading)}</div>
      </div>
    `;
  }

  function buildOwnerPdfFooterMarkup(pageLabel) {
    return `
      <div style="display:flex;align-items:center;justify-content:space-between;gap:12px;margin-top:1px;padding-top:3px;border-top:1px solid #dbe3ef;color:#475569;font-size:10px;line-height:1;">
        <a href="${escapeHtml(OWNER_PDF_EXPORT_BRAND_URL)}" target="_blank" rel="noopener noreferrer" data-pdf-link-url="${escapeHtml(OWNER_PDF_EXPORT_BRAND_URL)}" style="display:inline-flex;align-items:center;justify-content:flex-start;gap:7px;text-decoration:none;color:inherit;min-width:0;flex:1 1 auto;">
          <span style="display:inline-flex;align-items:center;justify-content:center;width:25px;height:25px;flex-shrink:0;line-height:0;transform:translateY(3px);">
            <img src="${OWNER_PDF_EXPORT_BRAND_ICON_SRC}" alt="Work Report" style="display:block;width:25px;height:25px;object-fit:contain;object-position:center;" />
          </span>
          <span style="display:flex;flex-direction:column;justify-content:center;align-items:flex-start;min-width:0;line-height:1;gap:1px;">
            <span style="display:block;margin:0;font-size:10.6px;font-weight:800;letter-spacing:-0.01em;line-height:1.02;color:#111827;white-space:nowrap;">Work Report</span>
            <span style="display:block;margin:0;font-size:7.8px;font-weight:700;letter-spacing:0.01em;line-height:1.02;color:#64748b;white-space:nowrap;">workreport.online</span>
          </span>
        </a>
        <div style="font-weight:700;color:#334155;font-size:10px;line-height:1;flex-shrink:0;">${escapeHtml(pageLabel || "Page 1")}</div>
      </div>
    `;
  }

  function buildOwnerPdfPageShellMarkup(headerMarkup, tableMarkup, footerMarkup) {
    return `
      <div style="width:100%;min-height:${OWNER_PDF_EXPORT_CONTENT_MIN_HEIGHT_PX}px;display:flex;flex-direction:column;justify-content:space-between;gap:${OWNER_PDF_EXPORT_SECTION_GAP_PX}px;box-sizing:border-box;">
        <div style="width:100%;margin:0 auto;">${headerMarkup}</div>
        <div style="width:100%;margin:0 auto;display:flex;flex:1 1 auto;align-items:center;justify-content:center;">
          <div style="width:100%;margin:0 auto;">${tableMarkup}</div>
        </div>
        <div style="width:100%;margin:0 auto;">${footerMarkup}</div>
      </div>
    `;
  }

  function buildOwnerMonthPdfWrapper(request) {
    const wrapper = document.createElement("div");
    wrapper.style.position = "fixed";
    wrapper.style.left = "-9999px";
    wrapper.style.top = "0";
    wrapper.style.width = `${OWNER_PDF_EXPORT_WIDTH_PX}px`;
    wrapper.style.maxWidth = `${OWNER_PDF_EXPORT_WIDTH_PX}px`;
    wrapper.style.minHeight = `${OWNER_PDF_EXPORT_HEIGHT_PX}px`;
    wrapper.style.boxSizing = "border-box";
    wrapper.style.background = "#ffffff";
    wrapper.style.color = "#1f2937";
    wrapper.style.padding = `${OWNER_PDF_EXPORT_PADDING_PX}px`;
    wrapper.style.fontSize = "12px";
    wrapper.style.lineHeight = "1.25";
    wrapper.style.fontFamily = "Arial, Helvetica, sans-serif";
    const headingConfig = buildOwnerPdfHeadingConfig(request);
    const baseTableSettings = sanitizeOwnerPdfTableSettings(request && request.pdfPreferences ? request.pdfPreferences.pdfTableSettings : null);
    const tableSettings = sanitizeOwnerPdfTableSettings({
      ...baseTableSettings,
      cellPaddingY: Math.max(Number(baseTableSettings.cellPaddingY) || 0, 8.8),
      headerPaddingY: Math.max(Number(baseTableSettings.headerPaddingY) || 0, 7.8),
      rowLineHeight: Math.max(Number(baseTableSettings.rowLineHeight) || 0, 1.26),
      rowFontSize: Math.max(Number(baseTableSettings.rowFontSize) || 0, 11.6),
      headerFontSize: Math.max(Number(baseTableSettings.headerFontSize) || 0, 11.1),
      tableTextColor: "#000000",
      headerTextColor: "#000000"
    });
    const rowSource = tableSettings.includeEmptyRows ? request.rowSource.slice() : request.rowSource.filter(hasOwnerRowDataForPdf);
    const tableMarkup = renderOwnerPdfTableMarkup(rowSource, tableSettings);
    wrapper.innerHTML = buildOwnerPdfPageShellMarkup(
      buildOwnerPdfHeaderMarkup(headingConfig, request.year, request.monthIndex),
      tableMarkup,
      buildOwnerPdfFooterMarkup("Page 1")
    );
    return wrapper;
  }

  function collectOwnerPdfLinkOverlayRects(rootElement) {
    if (!rootElement || typeof rootElement.getBoundingClientRect !== "function") return [];
    const rootRect = rootElement.getBoundingClientRect();
    if (!rootRect.width || !rootRect.height) return [];
    return Array.from(rootElement.querySelectorAll(OWNER_PDF_EXPORT_LINK_SELECTOR)).map((linkEl) => {
      const url = String(linkEl.getAttribute("data-pdf-link-url") || linkEl.getAttribute("href") || "").trim();
      if (!url) return null;
      const rect = linkEl.getBoundingClientRect();
      if (!rect.width || !rect.height) return null;
      return {
        url,
        x: Math.max(0, rect.left - rootRect.left),
        y: Math.max(0, rect.top - rootRect.top),
        width: rect.width,
        height: rect.height
      };
    }).filter(Boolean);
  }

  function addOwnerCanvasSnapshotToPdf(pdf, canvas, options) {
    const marginX = Math.max(0, Number(options && options.marginX) || 0);
    const marginY = Math.max(0, Number(options && options.marginY) || 0);
    const sourceWidth = Math.max(1, Number(options && options.sourceWidth) || canvas.width || 1);
    const sourceHeight = Math.max(1, Number(options && options.sourceHeight) || canvas.height || 1);
    const linkRects = Array.isArray(options && options.linkRects) ? options.linkRects : [];
    const pageWidth = Number(typeof pdf?.internal?.pageSize?.getWidth === "function"
      ? pdf.internal.pageSize.getWidth()
      : (pdf?.internal?.pageSize?.width || 210));
    const pageHeight = Number(typeof pdf?.internal?.pageSize?.getHeight === "function"
      ? pdf.internal.pageSize.getHeight()
      : (pdf?.internal?.pageSize?.height || 297));
    const maxWidth = Math.max(1, pageWidth - (marginX * 2));
    const maxHeight = Math.max(1, pageHeight - (marginY * 2));
    let renderWidth = maxWidth;
    let renderHeight = (canvas.height * renderWidth) / canvas.width;
    if (renderHeight > maxHeight) {
      const scaleFactor = maxHeight / renderHeight;
      renderWidth *= scaleFactor;
      renderHeight *= scaleFactor;
    }
    const imageData = canvas.toDataURL("image/png");
    const x = (pageWidth - renderWidth) / 2;
    const y = marginY;
    pdf.addImage(imageData, "PNG", x, y, renderWidth, renderHeight, undefined, "FAST");
    if (typeof pdf?.link === "function" && linkRects.length) {
      const scaleX = renderWidth / sourceWidth;
      const scaleY = renderHeight / sourceHeight;
      linkRects.forEach((linkRect) => {
        const linkWidth = Math.max(0, Number(linkRect.width) || 0) * scaleX;
        const linkHeight = Math.max(0, Number(linkRect.height) || 0) * scaleY;
        if (!linkWidth || !linkHeight || !linkRect.url) return;
        pdf.link(
          x + (Math.max(0, Number(linkRect.x) || 0) * scaleX),
          y + (Math.max(0, Number(linkRect.y) || 0) * scaleY),
          linkWidth,
          linkHeight,
          { url: String(linkRect.url) }
        );
      });
    }
  }

  async function createExactMonthlyPdfBlob(reports, options) {
    const request = resolveExactMonthlyPdfRequest(reports, options || {});
    if (request.error) {
      const error = new Error(request.error);
      error.code = "owner_pdf_request_invalid";
      throw error;
    }
    const pdfPreferences = await ensureOwnerUserPdfPreferences(request.userId);
    request.pdfPreferences = pdfPreferences;
    if (pdfPreferences && pdfPreferences.pdfHeading) {
      const headingState = sanitizeOwnerPdfHeadingState(pdfPreferences.pdfHeading);
      if (headingState.name) request.displayName = headingState.name;
      if (headingState.serviceNo) request.serviceNo = headingState.serviceNo;
      if (headingState.title) request.title = headingState.title;
    }
    if (!(window.html2canvas && window.jspdf && window.jspdf.jsPDF)) {
      throw new Error("PDF preview tools are still loading. Refresh and try again.");
    }
    const wrapper = buildOwnerMonthPdfWrapper(request);
    document.body.appendChild(wrapper);
    try {
      const sourceWidth = wrapper.getBoundingClientRect().width || wrapper.offsetWidth || OWNER_PDF_EXPORT_WIDTH_PX;
      const sourceHeight = wrapper.getBoundingClientRect().height || wrapper.offsetHeight || OWNER_PDF_EXPORT_HEIGHT_PX;
      const linkRects = collectOwnerPdfLinkOverlayRects(wrapper);
      const canvas = await window.html2canvas(wrapper, {
        scale: 3,
        useCORS: true,
        scrollX: 0,
        scrollY: 0,
        backgroundColor: "#FFFFFF",
        logging: false,
        imageTimeout: 15000
      });
      const { jsPDF } = window.jspdf;
      const pdf = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
      addOwnerCanvasSnapshotToPdf(pdf, canvas, {
        marginX: 3,
        marginY: 3,
        sourceWidth,
        sourceHeight,
        linkRects
      });
      return {
        blob: pdf.output("blob"),
        fileName: request.fileName,
        displayName: request.displayName,
        monthLabel: request.monthLabel
      };
    } finally {
      wrapper.remove();
    }
  }

  function revokeReportPreviewUrl() {
    if (state.reportPreviewUrl && String(state.reportPreviewUrl).startsWith("blob:")) {
      try {
        URL.revokeObjectURL(state.reportPreviewUrl);
      } catch (_) {
        // ignore revoke failures
      }
    }
    state.reportPreviewUrl = "";
    state.reportPreviewFileName = "";
  }

  function downloadBlobPayload(fileName, blob) {
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = String(fileName || "download.pdf");
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.setTimeout(() => {
      URL.revokeObjectURL(url);
    }, 1000);
  }

  async function openExactMonthlyPdfPreview(reports, options) {
    try {
      const pdfAsset = await createExactMonthlyPdfBlob(reports, options || {});
      if (!els.reportPreviewModal || !els.reportPreviewFrame) return false;
      revokeReportPreviewUrl();
      state.reportPreviewRows = Array.isArray(reports) ? reports.slice() : [];
      state.reportPreviewOptions = { ...(options || {}), exactMonthly: true };
      state.reportPreviewFileName = pdfAsset.fileName;
      state.reportPreviewUrl = URL.createObjectURL(pdfAsset.blob);
      if (els.reportPreviewTitle) {
        els.reportPreviewTitle.textContent = "Work Data Sheet PDF";
      }
      if (els.reportPreviewCopy) {
        els.reportPreviewCopy.textContent = `${pdfAsset.displayName} • ${pdfAsset.monthLabel}`;
      }
      els.reportPreviewFrame.src = state.reportPreviewUrl;
      showOwnerModal(els.reportPreviewModal);
      return true;
    } catch (error) {
      window.AuthUi.setInlineStatus(els.dashboardStatus, {
        type: "error",
        message: mapOwnerError(error)
      });
      return false;
    }
  }

  async function downloadExactMonthlyPdf(reports, options) {
    try {
      const pdfAsset = await createExactMonthlyPdfBlob(reports, options || {});
      downloadBlobPayload(pdfAsset.fileName, pdfAsset.blob);
      window.AuthUi.setInlineStatus(els.dashboardStatus, {
        type: "success",
        message: `Downloaded Work Data Sheet PDF for ${pdfAsset.displayName}.`
      });
      return true;
    } catch (error) {
      window.AuthUi.setInlineStatus(els.dashboardStatus, {
        type: "error",
        message: mapOwnerError(error)
      });
      return false;
    }
  }

  function getReportAttendanceInfo(report) {
    const entry = report && report.entry && typeof report.entry === "object" ? report.entry : {};
    const leaveStatus = String(entry.leaveStatus || "").trim().toLowerCase();
    const leaveReason = String(entry.leaveReason || "").trim();
    const isLeave = leaveStatus === "yes";
    const isOwnLeave = isLeave && leaveReason.toLowerCase() === "own leave";
    const isPresent = !isLeave && Boolean(entry.inTime || entry.outTime);
    if (isLeave) {
      return {
        isLeave: true,
        isOwnLeave,
        isPresent: false,
        label: leaveReason ? `Leave • ${leaveReason}` : "Leave",
        badgeClass: "status-disabled"
      };
    }
    if (isPresent) {
      return {
        isLeave: false,
        isOwnLeave: false,
        isPresent: true,
        label: "Present",
        badgeClass: "status-active"
      };
    }
    return {
      isLeave: false,
      isOwnLeave: false,
      isPresent: false,
      label: "Missing",
      badgeClass: "provider-email"
    };
  }

  function hasMovementReport(report) {
    const entry = report && report.entry && typeof report.entry === "object" ? report.entry : {};
    return Boolean(entry.movementOut || entry.movementIn);
  }

  function formatMonthLabel(monthValue) {
    if (!monthValue) return "Current month";
    const date = new Date(`${monthValue}-01T00:00:00`);
    if (Number.isNaN(date.getTime())) return String(monthValue);
    return date.toLocaleDateString("en-GB", {
      month: "long",
      year: "numeric"
    });
  }

  function getDaysInMonthFromValue(monthValue) {
    if (!monthValue) return 0;
    const [yearText, monthText] = String(monthValue || "").split("-");
    const year = Number(yearText);
    const month = Number(monthText);
    if (!Number.isFinite(year) || !Number.isFinite(month)) return 0;
    return new Date(year, month, 0).getDate();
  }

  function formatReportDayLabel(value) {
    if (!value) return "No day";
    const date = new Date(`${value}T00:00:00`);
    if (Number.isNaN(date.getTime())) return "No day";
    return date.toLocaleDateString("en-GB", { weekday: "short" });
  }

  function getInOutMeta(entry) {
    const parts = [];
    if (entry.workLocation) parts.push(entry.workLocation);
    if (entry.teamMembers) parts.push(`Team ${entry.teamMembers}`);
    return parts.join(" • ") || "No in/out note";
  }

  function renderDeletedSummary() {
    if (!els.deletedSummary) return;
    const selected = getSelectedDeletedUser();
    renderSummaryCards(els.deletedSummary, [
      {
        label: "Archived",
        value: String(state.deletedUsers.length),
        meta: "Accounts waiting in Deleted Users."
      },
      {
        label: "Selected",
        value: selected ? (selected.full_name || selected.email || "User") : "None",
        meta: selected ? (selected.email || "Archived user") : "Choose an archived user."
      },
      {
        label: "Restore Until",
        value: selected && selected.restore_until ? formatDateTime(selected.restore_until) : "Not set",
        meta: "Restore window for the selected user."
      }
    ]);
  }

  function renderBackupsSummary(backups) {
    if (!els.backupsSummary) return;
    const selected = getSelectedUser();
    const selectedBackups = selected ? backups.filter((item) => String(item.target_user_id || "") === String(selected.id || "")) : [];
    renderSummaryCards(els.backupsSummary, [
      {
        label: "Snapshots",
        value: String(backups.length),
        meta: "Manual, archive, and local fallback backups."
      },
      {
        label: "Latest",
        value: backups[0] ? formatDateTime(backups[0].created_at) : "None",
        meta: "Newest backup in the admin dashboard."
      },
      {
        label: "Selected User",
        value: String(selectedBackups.length),
        meta: selected ? "Snapshots for the active selected user." : "Select a user to see personal snapshot count."
      },
      {
        label: "Storage",
        value: formatStorageSize(backups.reduce((sum, item) => sum + getBackupSizeBytes(item), 0)),
        meta: "Approximate JSON snapshot usage."
      }
    ]);
  }

  function renderAuditSummary(auditEntries) {
    if (!els.auditSummary) return;
    const latest = auditEntries[0] || null;
    renderSummaryCards(els.auditSummary, [
      {
        label: "Events",
        value: String(auditEntries.length),
        meta: "Owner actions stored in local and Supabase logs."
      },
      {
        label: "Latest",
        value: latest ? (latest.action || "owner_action") : "None",
        meta: latest ? formatDateTime(latest.created_at || latest.createdAt) : "No audit rows yet."
      },
      {
        label: "Target",
        value: latest ? (latest.target_full_name || latest.target_email || "Owner console") : "None",
        meta: "Most recent action target."
      }
    ]);
  }

  function renderHealthSummary(backups, auditEntries) {
    if (!els.healthSummary) return;
    renderSummaryCards(els.healthSummary, [
      {
        label: "Mode",
        value: state.rpcReady ? "Live control" : "Read only",
        meta: state.rpcReady ? "Write controls are available." : "Read-only fallback is active."
      },
      {
        label: "Last Sync",
        value: state.lastSyncedAt ? formatDateTime(state.lastSyncedAt) : "Not synced",
        meta: "Latest dashboard refresh time."
      },
      {
        label: "Coverage",
        value: `${state.users.length + state.deletedUsers.length} users`,
        meta: `${backups.length} backups • ${auditEntries.length} audit rows`
      }
    ]);
  }

  function renderDataManager(backups, auditEntries) {
    if (!els.dataManager) return;
    const selected = getSelectedUser();
    const latestBackup = selected ? getLatestBackupForUser(selected.id) : null;
    const snapshotCounts = latestBackup ? summarizeSnapshot(latestBackup.snapshot) : { workLogs: 0, reminders: 0 };
    const rows = [
      {
        title: "Profiles table",
        meta: `${state.users.length} active • ${state.deletedUsers.length} archived`,
        note: state.rpcReady ? "Profile control is live." : "Profile control is read-only."
      },
      {
        title: "Backup storage",
        meta: `${backups.length} snapshot${backups.length === 1 ? "" : "s"} ready`,
        note: latestBackup ? `Latest for selected user: ${formatDateTime(latestBackup.created_at)}` : "No selected user snapshot yet."
      },
      {
        title: "Audit log",
        meta: `${auditEntries.length} owner action${auditEntries.length === 1 ? "" : "s"} recorded`,
        note: "Refresh, backup, archive, restore, and delete actions appear here."
      },
      {
        title: "Report rows",
        meta: `${state.reports.length} live • ${state.deletedReports.length} deleted`,
        note: state.reportRpcReady
          ? "Report review and trash control are active."
          : (state.reportError || "Run the owner report SQL to unlock report control.")
      },
      {
        title: "Selected user data",
        meta: selected ? (selected.full_name || selected.email || "User") : "No user selected",
        note: selected
          ? `${snapshotCounts.workLogs} work logs • ${snapshotCounts.reminders} reminders in the latest snapshot.`
          : "Select a user to inspect snapshot counts."
      }
    ];

    els.dataManager.innerHTML = rows.map((item) => `
      <div class="owner-list-item">
        <strong>${escapeHtml(item.title)}</strong>
        <span>${escapeHtml(item.meta)}</span>
        <span>${escapeHtml(item.note)}</span>
      </div>
    `).join("");
  }

  function renderDetailSummary(user) {
    if (!els.detailSummary) return;
    const backups = getBackupsForUser(user.id);
    const latestBackup = backups[0] || null;
    const snapshotCounts = latestBackup ? summarizeSnapshot(latestBackup.snapshot) : { workLogs: 0, reminders: 0 };
    const note = getUserMeta(user.id).note || "";
    const supportMessages = getSupportMessagesForUser(user.id);
    const unresolvedSupport = supportMessages.filter((item) => String(item.status || "new") !== "resolved");
    renderSummaryCards(els.detailSummary, [
      {
        label: "Snapshots",
        value: String(backups.length),
        meta: "Backups available for this user."
      },
      {
        label: "Latest Backup",
        value: latestBackup ? formatDateTime(latestBackup.created_at) : "None",
        meta: latestBackup ? "Newest snapshot time." : "Create a backup to capture data."
      },
      {
        label: "Snapshot Data",
        value: `${snapshotCounts.workLogs} / ${snapshotCounts.reminders}`,
        meta: "Work logs / reminders in the latest snapshot."
      },
      {
        label: "Owner flag",
        value: isSuspiciousUser(user.id) ? "Suspicious" : "Normal",
        meta: note ? "Private note saved." : "No private note yet."
      },
      {
        label: "Support",
        value: String(supportMessages.length),
        meta: unresolvedSupport.length
          ? `${unresolvedSupport.length} open owner message${unresolvedSupport.length === 1 ? "" : "s"}.`
          : "No open support messages."
      }
    ]);
  }

  function renderSettingsSummary() {
    if (!els.settingsSummary) return;
    renderSummaryCards(els.settingsSummary, [
      {
        label: "Owner email",
        value: OWNER_DEFAULT_EMAIL,
        meta: "Primary owner sign-in account."
      },
      {
        label: "Reset route",
        value: "/admin-control_dashboard/reset",
        meta: "Separate owner reset page."
      },
      {
        label: "Backup retention",
        value: `${state.settings.retentionDays} days`,
        meta: state.settings.autoDownloadBackup ? "Auto-download after manual backup." : "Manual download only."
      }
    ]);
  }

  function populateReportUserFilter() {
    if (!els.reportUserFilter) return;
    const currentValue = String(els.reportUserFilter.value || "");
    const preferredValue = currentValue || String(state.selectedUserId || "all");
    const map = new Map();
    [...state.users, ...state.deletedUsers].forEach((user) => {
      const id = String(user.id || "");
      if (!id) return;
      map.set(id, {
        id,
        full_name: user.full_name || "",
        email: user.email || ""
      });
    });
    state.reports.forEach((report) => {
      const id = String(report.user_id || "");
      if (!id || map.has(id)) return;
      map.set(id, {
        id,
        full_name: report.user_full_name || "",
        email: report.user_email || ""
      });
    });
    const users = Array.from(map.values())
      .sort((a, b) => String(a.full_name || a.email || "").localeCompare(String(b.full_name || b.email || "")));
    const options = ['<option value="all">All users</option>']
      .concat(users.map((user) => `<option value="${escapeHtml(String(user.id || ""))}">${escapeHtml(user.full_name || user.email || "User")}</option>`));
    els.reportUserFilter.innerHTML = options.join("");
    if (Array.from(els.reportUserFilter.options).some((opt) => opt.value === preferredValue)) {
      els.reportUserFilter.value = preferredValue;
    } else {
      els.reportUserFilter.value = "all";
    }
  }

  function getSelectedReport() {
    return state.reports.find((item) => String(item.id || "") === state.selectedReportId) || null;
  }

  function getSelectedDeletedReport() {
    return state.deletedReports.find((item) => String(item.id || "") === state.selectedDeletedReportId) || null;
  }

  function hydrateReportDetail() {
    if (!els.reportDetail) return;
    const report = getSelectedReport();
    if (!report) {
      closeReportDetail();
      return;
    }

    els.reportDetail.hidden = false;
    if (els.reportDetailTitle) els.reportDetailTitle.textContent = formatDateLabel(report.log_date);
    if (els.reportDetailMeta) {
      els.reportDetailMeta.textContent = `${report.user_full_name || report.user_email || "User"} • ${formatReportStatus(report.review_status)}`;
    }
    if (els.reportReviewComment) {
      els.reportReviewComment.value = String(report.review_comment || "");
    }
    if (els.reportDetailSummary) {
      const summary = summarizeReportEntry(report.entry);
      const attendance = getReportAttendanceInfo(report);
      const entry = report.entry && typeof report.entry === "object" ? report.entry : {};
      renderSummaryCards(els.reportDetailSummary, [
        {
          label: "Date",
          value: formatDateLabel(report.log_date),
          meta: `${formatReportDayLabel(report.log_date)} • ${formatMonthLabel(String(report.log_date || "").slice(0, 7))}`
        },
        {
          label: "Attendance",
          value: attendance.label,
          meta: summary.secondary
        },
        {
          label: "Review",
          value: formatReportStatus(report.review_status),
          meta: report.user_email || "Report owner"
        },
        {
          label: "Location",
          value: entry.workLocation || "Not set",
          meta: entry.teamMembers ? `Team ${entry.teamMembers}` : "No team"
        }
      ]);
    }
    if (els.reportDetailFields) {
      els.reportDetailFields.innerHTML = getReportFieldRows(report.entry).map((item) => `
        <div class="owner-report-field-row">
          <span>${escapeHtml(item.label)}</span>
          <strong>${escapeHtml(item.value)}</strong>
        </div>
      `).join("");
    }

    const locked = !state.reportRpcReady;
    if (els.reportVerifyBtn) {
      els.reportVerifyBtn.disabled = locked;
      els.reportVerifyBtn.textContent = locked ? "SQL Setup Needed" : "Mark Verified";
    }
    if (els.reportRejectBtn) {
      els.reportRejectBtn.disabled = locked;
      els.reportRejectBtn.textContent = locked ? "SQL Setup Needed" : "Mark Rejected";
    }
    if (els.reportPendingBtn) {
      els.reportPendingBtn.disabled = locked;
      els.reportPendingBtn.textContent = locked ? "SQL Setup Needed" : "Set Pending";
    }
    if (els.reportPdfBtn) {
      els.reportPdfBtn.disabled = false;
      els.reportPdfBtn.textContent = "Open Day PDF";
    }
    if (els.reportDownloadBtn) {
      els.reportDownloadBtn.disabled = false;
      els.reportDownloadBtn.textContent = "Download JSON";
    }
    if (els.reportDeleteBtn) {
      els.reportDeleteBtn.disabled = locked;
      els.reportDeleteBtn.textContent = locked ? "SQL Setup Needed" : "Move to Trash";
    }
  }

  function closeReportDetail() {
    if (!els.reportDetail) return;
    els.reportDetail.hidden = true;
    if (els.reportDetailSummary) els.reportDetailSummary.innerHTML = "";
    if (els.reportDetailFields) els.reportDetailFields.innerHTML = "";
    if (els.reportReviewComment) els.reportReviewComment.value = "";
  }

  async function setReportReview(reportId, reviewStatus) {
    const report = state.reports.find((item) => String(item.id || "") === String(reportId || ""));
    if (!report) return;
    if (!state.reportRpcReady) {
      window.AuthUi.setInlineStatus(els.dashboardStatus, {
        type: "info",
        message: "Run the owner report SQL to unlock report review."
      });
      return;
    }

    const comment = String(els.reportReviewComment?.value || report.review_comment || "").trim();
    const labelMap = {
      verified: "Mark Verified",
      rejected: "Mark Rejected",
      pending: "Set Pending"
    };
    const buttonMap = {
      verified: els.reportVerifyBtn,
      rejected: els.reportRejectBtn,
      pending: els.reportPendingBtn
    };
    const targetBtn = buttonMap[reviewStatus] || null;
    if (targetBtn) window.AuthUi.setBusy(targetBtn, true, labelMap[reviewStatus] || "Save");

    try {
      await ownerRpc("owner_set_report_review", {
        p_report_id: reportId,
        p_review_status: reviewStatus,
        p_review_comment: comment
      });
      await refreshDashboardData();
      window.AuthUi.setInlineStatus(els.dashboardStatus, {
        type: "success",
        message: `Report review updated to ${formatReportStatus(reviewStatus)}.`
      });
      setActiveTab("reports");
    } catch (error) {
      window.AuthUi.setInlineStatus(els.dashboardStatus, {
        type: "error",
        message: mapOwnerError(error)
      });
    } finally {
      if (targetBtn) window.AuthUi.setBusy(targetBtn, false, labelMap[reviewStatus] || "Save");
    }
  }

  async function deleteReport(reportId) {
    const report = state.reports.find((item) => String(item.id || "") === String(reportId || ""));
    if (!report) return;
    const confirmed = await requestOwnerConfirm({
      kicker: "Report action",
      title: "Move report to Trash?",
      message: `Move report ${formatDateLabel(report.log_date)} for ${report.user_full_name || report.user_email || "this user"} to Trash?`,
      confirmLabel: "Move to Trash",
      tone: "danger"
    });
    if (!confirmed) {
      return;
    }
    if (!state.reportRpcReady) {
      window.AuthUi.setInlineStatus(els.dashboardStatus, {
        type: "info",
        message: "Run the owner report SQL to unlock report delete."
      });
      return;
    }

    if (els.reportDeleteBtn) window.AuthUi.setBusy(els.reportDeleteBtn, true, "Move to Trash");
    try {
      await ownerRpc("owner_delete_report", { p_report_id: reportId });
      state.selectedDeletedReportId = reportId;
      await refreshDashboardData();
      setActiveTab("trash");
      window.AuthUi.setInlineStatus(els.dashboardStatus, {
        type: "success",
        message: "Report moved to Trash."
      });
    } catch (error) {
      window.AuthUi.setInlineStatus(els.dashboardStatus, {
        type: "error",
        message: mapOwnerError(error)
      });
    } finally {
      if (els.reportDeleteBtn) window.AuthUi.setBusy(els.reportDeleteBtn, false, "Move to Trash");
    }
  }

  async function restoreReport(reportId) {
    const report = state.deletedReports.find((item) => String(item.id || "") === String(reportId || ""));
    if (!report) return;
    const confirmed = await requestOwnerConfirm({
      kicker: "Recovery",
      title: "Restore report?",
      message: `Restore deleted report ${formatDateLabel(report.log_date)} for ${report.user_full_name || report.user_email || "this user"}?`,
      confirmLabel: "Restore Report"
    });
    if (!confirmed) {
      return;
    }
    if (!state.reportRpcReady) {
      window.AuthUi.setInlineStatus(els.dashboardStatus, {
        type: "info",
        message: "Run the owner report SQL to unlock report restore."
      });
      return;
    }

    try {
      await ownerRpc("owner_restore_report", { p_report_id: reportId });
      state.selectedReportId = reportId;
      await refreshDashboardData();
      setActiveTab("reports");
      window.AuthUi.setInlineStatus(els.dashboardStatus, {
        type: "success",
        message: "Deleted report restored."
      });
    } catch (error) {
      window.AuthUi.setInlineStatus(els.dashboardStatus, {
        type: "error",
        message: mapOwnerError(error)
      });
    }
  }

  async function permanentlyDeleteReport(reportId) {
    const report = state.deletedReports.find((item) => String(item.id || "") === String(reportId || ""));
    if (!report) return;
    const confirmed = await requestOwnerConfirm({
      kicker: "Permanent delete",
      title: "Delete report permanently?",
      message: `Permanently delete report ${formatDateLabel(report.log_date)}? This cannot be undone from the dashboard.`,
      confirmLabel: "Delete Permanently",
      tone: "danger"
    });
    if (!confirmed) {
      return;
    }
    if (!state.reportRpcReady) {
      window.AuthUi.setInlineStatus(els.dashboardStatus, {
        type: "info",
        message: "Run the owner report SQL to unlock permanent report delete."
      });
      return;
    }

    try {
      await ownerRpc("owner_permanently_delete_report", { p_report_id: reportId });
      state.selectedDeletedReportId = "";
      await refreshDashboardData();
      setActiveTab("trash");
      window.AuthUi.setInlineStatus(els.dashboardStatus, {
        type: "success",
        message: "Deleted report permanently removed."
      });
    } catch (error) {
      window.AuthUi.setInlineStatus(els.dashboardStatus, {
        type: "error",
        message: mapOwnerError(error)
      });
    }
  }

  function downloadReport(reportId) {
    const report = state.reports.find((item) => String(item.id || "") === String(reportId || ""));
    if (!report) return;
    downloadJsonPayload(`workreport-report-${String(report.log_date || "report")}-${String(report.id || "").slice(0, 8)}`, {
      id: report.id,
      user_id: report.user_id,
      user_email: report.user_email,
      user_full_name: report.user_full_name,
      log_date: report.log_date,
      review_status: report.review_status,
      review_comment: report.review_comment,
      entry: report.entry
    });
  }

  function exportFilteredReportsCsv() {
    if (!state.filteredReports.length) {
      window.AuthUi.setInlineStatus(els.dashboardStatus, {
        type: "info",
        message: "No monthly rows to export."
      });
      return;
    }

    const userFilter = String(els.reportUserFilter?.value || "all");
    const monthValue = ensureReportMonthValue(userFilter);
    const scopeLabel = getReportScopeLabel(userFilter);
    const lines = [
      [
        "Date",
        "Day",
        "User",
        "Status",
        "Review",
        "In Time",
        "Out Time",
        "Movement Out",
        "Movement In",
        "Team",
        "Location",
        "Vehicle",
        "KM",
        "Special Day",
        "Leave Status",
        "Leave Reason",
        "Leave Note"
      ].map(escapeCsvCell).join(",")
    ].concat(state.filteredReports.map((report) => {
      const entry = report.entry && typeof report.entry === "object" ? report.entry : {};
      const attendance = getReportAttendanceInfo(report);
      return [
        report.log_date || "",
        formatReportDayLabel(report.log_date),
        report.user_full_name || report.user_email || "",
        attendance.label,
        formatReportStatus(report.review_status),
        entry.inTime || "",
        entry.outTime || "",
        entry.movementOut || "",
        entry.movementIn || "",
        entry.teamMembers || "",
        entry.workLocation || "",
        entry.vehicleNumber || "",
        entry.km || "",
        entry.specialDays || "",
        entry.leaveStatus || "No",
        entry.leaveReason || "",
        entry.leaveReasonText || entry.customReasonDetails || ""
      ].map(escapeCsvCell).join(",");
    }));

    downloadTextPayload(
      `workreport-monthly-sheet-${scopeLabel}-${monthValue}`,
      lines.join("\n"),
      "text/csv;charset=utf-8",
      "csv"
    );
    recordLocalAudit("reports_export_csv", `Exported monthly CSV for ${scopeLabel} (${formatMonthLabel(monthValue)}).`);
    renderAudit();
    window.AuthUi.setInlineStatus(els.dashboardStatus, {
      type: "success",
      message: `Monthly CSV downloaded for ${scopeLabel}.`
    });
  }

  async function exportFilteredReportsPdf() {
    if (!state.filteredReports.length) {
      window.AuthUi.setInlineStatus(els.dashboardStatus, {
        type: "info",
        message: "No monthly rows to export."
      });
      return;
    }

    const userFilter = String(els.reportUserFilter?.value || "all");
    const monthValue = ensureReportMonthValue(userFilter);
    const scopeLabel = getReportScopeLabel(userFilter);
    const scopeRows = getScopedReportRows({
      userFilter,
      statusFilter: "all",
      monthValue,
      query: ""
    });
    const opened = await openExactMonthlyPdfPreview(state.filteredReports, {
      scopeLabel,
      monthValue
    });
    if (opened) {
      recordLocalAudit("reports_export_pdf", `Opened monthly Work Data Sheet PDF for ${scopeLabel}.`);
      renderAudit();
      window.AuthUi.setInlineStatus(els.dashboardStatus, {
        type: "success",
        message: `Opened monthly Work Data Sheet PDF for ${scopeLabel}.`
      });
    }
  }

  async function downloadFilteredReportsPdf() {
    if (!state.filteredReports.length) {
      window.AuthUi.setInlineStatus(els.dashboardStatus, {
        type: "info",
        message: "No monthly rows to download."
      });
      return;
    }
    const userFilter = String(els.reportUserFilter?.value || "all");
    const monthValue = ensureReportMonthValue(userFilter);
    const scopeLabel = getReportScopeLabel(userFilter);
    const downloaded = await downloadExactMonthlyPdf(state.filteredReports, {
      scopeLabel,
      monthValue
    });
    if (downloaded) {
      recordLocalAudit("reports_export_pdf_download", `Downloaded monthly Work Data Sheet PDF for ${scopeLabel}.`);
      renderAudit();
    }
  }

  async function previewOverviewUserReports(userId) {
    const user = state.users.find((item) => String(item.id || "") === String(userId || ""));
    if (!user) return;
    const rows = getReportsForUser(user.id).slice(0, 12);
    if (!rows.length) {
      window.AuthUi.setInlineStatus(els.dashboardStatus, {
        type: "info",
        message: `No reports available yet for ${getUserDisplayName(user)}.`
      });
      return;
    }
    openReportPreviewModal(rows, {
      title: "User Report View",
      subtitle: `${getUserDisplayName(user)} • ${rows.length} recent report${rows.length === 1 ? "" : "s"}`,
      scopeLabel: getUserDisplayName(user),
      monthLabel: rows[0] && rows[0].log_date ? formatMonthLabel(String(rows[0].log_date).slice(0, 7)) : "Latest reports"
    });
    recordLocalAudit("overview_user_report_preview", `Opened report preview for ${getUserDisplayName(user)} from overview.`);
    renderAudit();
  }

  function exportSingleReportPdf(report) {
    if (!report) return;
    const opened = openReportPrintWindow([report], {
      title: "Daily Work Data Sheet",
      subtitle: `${report.user_full_name || report.user_email || "User"} • ${formatDateLabel(report.log_date)}`,
      scopeLabel: report.user_full_name || report.user_email || "User",
      monthLabel: formatMonthLabel(String(report.log_date || "").slice(0, 7)),
      summaryCards: [
        {
          label: "Day",
          value: formatDateLabel(report.log_date),
          meta: formatReportDayLabel(report.log_date)
        },
        {
          label: "Attendance",
          value: getReportAttendanceInfo(report).label,
          meta: formatReportStatus(report.review_status)
        },
        {
          label: "Location",
          value: String((report.entry && report.entry.workLocation) || "Not set"),
          meta: String((report.entry && report.entry.teamMembers) ? `Team ${report.entry.teamMembers}` : "No team")
        }
      ]
    });
    if (opened) {
      recordLocalAudit("report_export_pdf", `Opened day PDF for ${report.user_full_name || report.user_email || "report"}.`);
      renderAudit();
      window.AuthUi.setInlineStatus(els.dashboardStatus, {
        type: "success",
        message: "Opened selected day PDF."
      });
    }
  }

  function openReportPrintWindow(reports, options) {
    const rows = Array.isArray(reports) ? reports.filter(Boolean) : [];
    if (!rows.length) return;
    openReportPreviewModal(rows, options || {});
    return true;
  }

  async function previewReportBundle(bundleId) {
    const bundle = getReportBundle(bundleId);
    if (!bundle) return;
    const opened = await openExactMonthlyPdfPreview(bundle.rows, {
      scopeLabel: bundle.userName,
      monthValue: bundle.monthValue
    });
    if (opened) {
      recordLocalAudit("reports_export_pdf", `Opened monthly Work Data Sheet PDF for ${bundle.userName}.`);
      renderAudit();
    }
  }

  async function downloadReportBundlePdf(bundleId) {
    const bundle = getReportBundle(bundleId);
    if (!bundle) return;
    const downloaded = await downloadExactMonthlyPdf(bundle.rows, {
      scopeLabel: bundle.userName,
      monthValue: bundle.monthValue
    });
    if (downloaded) {
      recordLocalAudit("reports_export_pdf_download", `Downloaded monthly Work Data Sheet PDF for ${bundle.userName}.`);
      renderAudit();
    }
  }

  function downloadReportBundleCsv(bundleId) {
    const bundle = getReportBundle(bundleId);
    if (!bundle) return;
    const lines = [
      [
        "Date",
        "User",
        "Status",
        "Review",
        "In Time",
        "Out Time",
        "Team",
        "Location",
        "Leave Reason"
      ].map(escapeCsvCell).join(",")
    ].concat(bundle.rows.map((report) => {
      const entry = report.entry && typeof report.entry === "object" ? report.entry : {};
      return [
        report.log_date || "",
        report.user_full_name || report.user_email || "",
        getReportAttendanceInfo(report).label,
        formatReportStatus(report.review_status),
        entry.inTime || "",
        entry.outTime || "",
        entry.teamMembers || "",
        entry.workLocation || "",
        entry.leaveReason || ""
      ].map(escapeCsvCell).join(",");
    }));
    downloadTextPayload(
      `workreport-${bundle.userName}-${bundle.monthValue}`,
      lines.join("\n"),
      "text/csv;charset=utf-8",
      "csv"
    );
  }

  function openReportPreviewModal(reports, options) {
    if (!els.reportPreviewModal || !els.reportPreviewFrame) return;
    const rows = Array.isArray(reports) ? reports.filter(Boolean) : [];
    if (!rows.length) return;
    const previewOptions = { ...(options || {}) };
    state.reportPreviewRows = rows.slice();
    state.reportPreviewOptions = previewOptions;
    if (els.reportPreviewTitle) {
      els.reportPreviewTitle.textContent = String(previewOptions.title || "Work Data Sheet");
    }
    if (els.reportPreviewCopy) {
      els.reportPreviewCopy.textContent = String(previewOptions.subtitle || "Preview the selected report export inside the admin dashboard.");
    }
    els.reportPreviewFrame.srcdoc = buildReportPrintHtml(rows, previewOptions);
    showOwnerModal(els.reportPreviewModal);
  }

  function closeReportPreviewModal() {
    if (!els.reportPreviewModal) return;
    hideOwnerModal(els.reportPreviewModal);
    state.reportPreviewRows = [];
    state.reportPreviewOptions = null;
    revokeReportPreviewUrl();
    if (els.reportPreviewFrame) {
      els.reportPreviewFrame.src = "about:blank";
      els.reportPreviewFrame.srcdoc = "";
    }
  }

  function downloadCurrentPreviewPdf() {
    if (state.reportPreviewUrl && state.reportPreviewFileName) {
      const link = document.createElement("a");
      link.href = state.reportPreviewUrl;
      link.download = state.reportPreviewFileName;
      document.body.appendChild(link);
      link.click();
      link.remove();
      return;
    }
    if (!state.reportPreviewRows.length) return;
    downloadReportRowsPdf(state.reportPreviewRows, state.reportPreviewOptions || {});
  }

  function downloadReportRowsPdf(reports, options) {
    const rows = Array.isArray(reports) ? reports.filter(Boolean) : [];
    if (!rows.length) return;
    const jsPDF = window.jspdf && window.jspdf.jsPDF;
    if (!jsPDF) {
      window.AuthUi.setInlineStatus(els.dashboardStatus, {
        type: "error",
        message: "PDF library is not ready yet."
      });
      return;
    }

    const pdf = new jsPDF({ orientation: "landscape", unit: "mm", format: "a4" });
    const title = String(options && options.title ? options.title : "Work Data Sheet");
    const subtitle = String(options && options.subtitle ? options.subtitle : "");
    const fileStem = String(options && options.fileStem ? options.fileStem : `workreport-${Date.now()}`);
    const summaryCards = Array.isArray(options && options.summaryCards) ? options.summaryCards : [];
    const columns = [
      { label: "Date", width: 22 },
      { label: "User", width: 34 },
      { label: "Status", width: 22 },
      { label: "Review", width: 22 },
      { label: "In / Out", width: 28 },
      { label: "Movement", width: 42 },
      { label: "Team / Location", width: 52 },
      { label: "Leave", width: 42 }
    ];
    const pageWidth = 297;
    const pageHeight = 210;
    const marginX = 10;
    const topY = 14;
    const bottomLimit = 195;
    let cursorY = topY;

    const drawHeader = () => {
      pdf.setFillColor(244, 241, 234);
      pdf.rect(0, 0, pageWidth, 34, "F");
      pdf.setFont("helvetica", "bold");
      pdf.setFontSize(19);
      pdf.setTextColor(18, 24, 38);
      pdf.text(title, marginX, 16);
      pdf.setFont("helvetica", "normal");
      pdf.setFontSize(10);
      pdf.setTextColor(93, 114, 149);
      if (subtitle) pdf.text(subtitle, marginX, 23);
      pdf.text(`Generated ${formatDateTime(new Date().toISOString())}`, pageWidth - 68, 23);
      cursorY = 40;
      if (summaryCards.length) {
        let summaryX = marginX;
        summaryCards.slice(0, 4).forEach((card) => {
          pdf.setDrawColor(221, 212, 197);
          pdf.setFillColor(255, 255, 255);
          pdf.roundedRect(summaryX, cursorY, 66, 16, 3, 3, "FD");
          pdf.setFont("helvetica", "normal");
          pdf.setFontSize(8);
          pdf.setTextColor(107, 114, 128);
          pdf.text(String(card.label || ""), summaryX + 3, cursorY + 5);
          pdf.setFont("helvetica", "bold");
          pdf.setFontSize(11);
          pdf.setTextColor(18, 24, 38);
          pdf.text(String(card.value || ""), summaryX + 3, cursorY + 10.5);
          pdf.setFont("helvetica", "normal");
          pdf.setFontSize(7);
          pdf.setTextColor(107, 114, 128);
          pdf.text(pdf.splitTextToSize(String(card.meta || ""), 60), summaryX + 3, cursorY + 14);
          summaryX += 69;
        });
        cursorY += 23;
      }

      let columnX = marginX;
      pdf.setFillColor(245, 246, 249);
      pdf.setDrawColor(221, 212, 197);
      pdf.setFont("helvetica", "bold");
      pdf.setFontSize(8.5);
      pdf.setTextColor(18, 24, 38);
      columns.forEach((column) => {
        pdf.rect(columnX, cursorY, column.width, 9, "FD");
        pdf.text(column.label, columnX + 2, cursorY + 5.8);
        columnX += column.width;
      });
      cursorY += 9;
    };

    const drawRow = (report) => {
      const entry = report.entry && typeof report.entry === "object" ? report.entry : {};
      const attendance = getReportAttendanceInfo(report);
      const values = [
        formatDateLabel(report.log_date),
        report.user_full_name || report.user_email || "--",
        attendance.label,
        formatReportStatus(report.review_status),
        `${entry.inTime || "--"} / ${entry.outTime || "--"}`,
        [entry.movementOut ? `Out ${entry.movementOut}` : "", entry.movementIn ? `In ${entry.movementIn}` : "", entry.vehicleNumber ? `Vehicle ${entry.vehicleNumber}` : ""].filter(Boolean).join(" • ") || "No movement",
        [entry.teamMembers || "No team", entry.workLocation || "No location"].filter(Boolean).join(" • "),
        entry.leaveStatus === "Yes" || entry.leaveStatus === "yes"
          ? `${entry.leaveReason || "Leave"}${entry.leaveReasonText ? ` • ${entry.leaveReasonText}` : ""}`
          : (entry.specialDays || "No special day")
      ];
      const cellLines = values.map((value, index) => pdf.splitTextToSize(String(value || "--"), Math.max(columns[index].width - 4, 10)));
      const rowHeight = Math.max(...cellLines.map((lines) => (lines.length * 4) + 5), 11);
      if (cursorY + rowHeight > bottomLimit) {
        pdf.addPage();
        drawHeader();
      }
      let cellX = marginX;
      pdf.setFont("helvetica", "normal");
      pdf.setFontSize(8.3);
      pdf.setTextColor(18, 24, 38);
      cellLines.forEach((lines, index) => {
        pdf.setDrawColor(232, 226, 214);
        pdf.rect(cellX, cursorY, columns[index].width, rowHeight);
        pdf.text(lines, cellX + 2, cursorY + 4.8);
        cellX += columns[index].width;
      });
      cursorY += rowHeight;
    };

    drawHeader();
    rows.forEach(drawRow);
    pdf.save(`${sanitizeFileStem(fileStem)}.pdf`);
    recordLocalAudit("report_pdf_download", `Downloaded PDF export for ${subtitle || title}.`);
    renderAudit();
    window.AuthUi.setInlineStatus(els.dashboardStatus, {
      type: "success",
      message: "PDF downloaded successfully."
    });
  }

  function buildReportPrintHtml(reports, options) {
    const title = String(options && options.title ? options.title : "Work Data Sheet");
    const subtitle = String(options && options.subtitle ? options.subtitle : `${reports.length} row export`);
    const scopeLabel = String(options && options.scopeLabel ? options.scopeLabel : (reports[0] && (reports[0].user_full_name || reports[0].user_email) ? (reports[0].user_full_name || reports[0].user_email) : "Work Report"));
    const monthLabel = String(options && options.monthLabel ? options.monthLabel : formatMonthLabel(String((reports[0] && reports[0].log_date) || "").slice(0, 7)));
    const summaryCards = Array.isArray(options && options.summaryCards) && options.summaryCards.length
      ? options.summaryCards
      : buildReportMonthSummaryCards({
          rows: reports,
          scopeRows: reports,
          scopeLabel,
          monthValue: String((reports[0] && reports[0].log_date) || "").slice(0, 7),
          statusFilter: "all",
          query: ""
        });
    const summaryMarkup = summaryCards.map((card) => `
      <div class="summary-card">
        <span>${escapeHtml(card.label)}</span>
        <strong>${escapeHtml(card.value)}</strong>
        <small>${escapeHtml(card.meta)}</small>
      </div>
    `).join("");
    const tableRows = reports.map((report) => {
      const entry = report.entry && typeof report.entry === "object" ? report.entry : {};
      const attendance = getReportAttendanceInfo(report);
      const leaveNote = entry.leaveReasonText || entry.customReasonDetails || "";
      return `
        <tr>
          <td>${escapeHtml(formatDateLabel(report.log_date))}</td>
          <td>${escapeHtml(formatReportDayLabel(report.log_date))}</td>
          <td>${escapeHtml(report.user_full_name || report.user_email || "--")}</td>
          <td>${escapeHtml(attendance.label)}</td>
          <td>${escapeHtml(formatReportStatus(report.review_status))}</td>
          <td>${escapeHtml(entry.inTime || "--")}</td>
          <td>${escapeHtml(entry.outTime || "--")}</td>
          <td>${escapeHtml(entry.movementOut || "--")}</td>
          <td>${escapeHtml(entry.movementIn || "--")}</td>
          <td>${escapeHtml(entry.teamMembers || "--")}</td>
          <td>${escapeHtml(entry.workLocation || "--")}</td>
          <td>${escapeHtml(entry.vehicleNumber || "--")}</td>
          <td>${escapeHtml(entry.km || "--")}</td>
          <td>${escapeHtml(entry.specialDays || "--")}</td>
          <td>${escapeHtml(entry.leaveStatus || "No")}</td>
          <td>${escapeHtml(entry.leaveReason || "--")}</td>
          <td>${escapeHtml(leaveNote || "--")}</td>
        </tr>
      `;
    }).join("");

    return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <title>${escapeHtml(title)}</title>
  <style>
    :root {
      color-scheme: light;
      --bg: #f6f2ea;
      --surface: #ffffff;
      --border: #ddd4c5;
      --text: #182132;
      --muted: #697180;
      --accent: #1f5eff;
      --accent-soft: rgba(31, 94, 255, 0.10);
    }
    * { box-sizing: border-box; }
    body {
      margin: 0;
      padding: 32px;
      background: var(--bg);
      color: var(--text);
      font-family: "Manrope", "Segoe UI", sans-serif;
    }
    .page-head {
      display: flex;
      justify-content: space-between;
      gap: 16px;
      align-items: flex-end;
      margin-bottom: 24px;
    }
    .page-head h1 {
      margin: 0;
      font-size: 34px;
      letter-spacing: -0.03em;
    }
    .page-head p {
      margin: 10px 0 0;
      color: var(--muted);
      font-size: 15px;
    }
    .export-meta {
      color: var(--muted);
      font-size: 13px;
      text-align: right;
    }
    .sheet {
      background: var(--surface);
      border: 1px solid var(--border);
      border-radius: 24px;
      padding: 24px;
      box-shadow: 0 16px 36px rgba(18, 24, 38, 0.08);
      page-break-inside: avoid;
    }
    .sheet-head {
      display: flex;
      justify-content: space-between;
      gap: 16px;
      align-items: flex-start;
      margin-bottom: 18px;
    }
    .eyebrow {
      margin: 0 0 6px;
      color: var(--muted);
      font-size: 12px;
      font-weight: 800;
      letter-spacing: 0.08em;
      text-transform: uppercase;
    }
    .sheet-head h2 {
      margin: 0;
      font-size: 24px;
      letter-spacing: -0.03em;
    }
    .meta {
      margin: 8px 0 0;
      color: var(--muted);
      font-size: 14px;
    }
    .status-chip {
      min-height: 36px;
      padding: 0 14px;
      border-radius: 999px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      background: var(--accent-soft);
      color: var(--accent);
      font-size: 12px;
      font-weight: 800;
      letter-spacing: 0.06em;
      text-transform: uppercase;
      white-space: nowrap;
    }
    .summary-grid {
      display: grid;
      grid-template-columns: repeat(3, minmax(0, 1fr));
      gap: 12px;
      margin-bottom: 18px;
    }
    .summary-card {
      display: grid;
      gap: 6px;
      padding: 14px 16px;
      border-radius: 16px;
      border: 1px solid var(--border);
      background: #fff;
    }
    .summary-card span {
      color: var(--muted);
      font-size: 11px;
      font-weight: 800;
      letter-spacing: 0.08em;
      text-transform: uppercase;
    }
    .summary-card strong {
      font-size: 20px;
      line-height: 1.5;
      word-break: break-word;
    }
    .summary-card small {
      color: var(--muted);
      font-size: 12px;
      line-height: 1.55;
    }
    .sheet-meta {
      display: flex;
      gap: 10px;
      flex-wrap: wrap;
      margin-bottom: 16px;
    }
    .meta-chip {
      min-height: 34px;
      padding: 0 14px;
      border-radius: 999px;
      border: 1px solid var(--border);
      background: #fbfaf7;
      color: var(--text);
      font-size: 12px;
      font-weight: 700;
      display: inline-flex;
      align-items: center;
      justify-content: center;
    }
    .sheet-table-wrap {
      overflow: hidden;
      border-radius: 18px;
      border: 1px solid var(--border);
    }
    table {
      width: 100%;
      border-collapse: collapse;
      background: #fff;
    }
    thead th {
      background: #f7f4ee;
      color: var(--muted);
      font-size: 11px;
      font-weight: 800;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      text-align: left;
      padding: 12px 10px;
      border-bottom: 1px solid var(--border);
    }
    tbody td {
      padding: 12px 10px;
      border-bottom: 1px solid rgba(221, 212, 197, 0.7);
      font-size: 12px;
      line-height: 1.45;
      vertical-align: top;
    }
    tbody tr:nth-child(even) td {
      background: rgba(248, 246, 241, 0.6);
    }
    @media print {
      body { padding: 16px; background: #fff; }
      .sheet { box-shadow: none; }
    }
  </style>
</head>
<body>
  <header class="page-head">
    <div>
      <h1>${escapeHtml(title)}</h1>
      <p>${escapeHtml(subtitle)}</p>
    </div>
    <div class="export-meta">
      <div>Exported ${escapeHtml(formatDateTime(new Date().toISOString()))}</div>
      <div>Work Report Admin Dashboard</div>
    </div>
  </header>
  <section class="sheet">
    <div class="sheet-head">
      <div>
        <p class="eyebrow">Monthly export</p>
        <h2>${escapeHtml(scopeLabel)}</h2>
        <p class="meta">${escapeHtml(monthLabel)}</p>
      </div>
      <div class="status-chip">${escapeHtml(`${reports.length} row${reports.length === 1 ? "" : "s"}`)}</div>
    </div>
    <div class="sheet-meta">
      <div class="meta-chip">${escapeHtml(scopeLabel)}</div>
      <div class="meta-chip">${escapeHtml(monthLabel)}</div>
      <div class="meta-chip">${escapeHtml(`${reports.length} daily record${reports.length === 1 ? "" : "s"}`)}</div>
    </div>
    <div class="summary-grid">${summaryMarkup}</div>
    <div class="sheet-table-wrap">
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Day</th>
            <th>User</th>
            <th>Status</th>
            <th>Review</th>
            <th>In</th>
            <th>Out</th>
            <th>Move Out</th>
            <th>Move In</th>
            <th>Team</th>
            <th>Location</th>
            <th>Vehicle</th>
            <th>KM</th>
            <th>Special</th>
            <th>Leave Status</th>
            <th>Leave Reason</th>
            <th>Leave Note</th>
          </tr>
        </thead>
        <tbody>${tableRows}</tbody>
      </table>
    </div>
  </section>
  <script>
    window.addEventListener('load', () => {
      setTimeout(() => {
        window.focus();
        window.print();
      }, 250);
    });
  </script>
</body>
</html>`;
  }

  function downloadDeletedReport(reportId) {
    const report = state.deletedReports.find((item) => String(item.id || "") === String(reportId || ""));
    if (!report) return;
    downloadJsonPayload(`workreport-deleted-report-${String(report.log_date || "report")}-${String(report.id || "").slice(0, 8)}`, {
      id: report.id,
      user_id: report.user_id,
      user_email: report.user_email,
      user_full_name: report.user_full_name,
      log_date: report.log_date,
      archived_at: report.archived_at,
      review_status: report.review_status,
      review_comment: report.review_comment,
      entry: report.entry
    });
  }

  function downloadTextPayload(fileStem, text, mimeType, extension) {
    const blob = new Blob([String(text || "")], { type: mimeType || "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    const safeExtension = String(extension || "txt").replace(/[^a-z0-9]+/gi, "").toLowerCase() || "txt";
    link.href = url;
    link.download = `${sanitizeFileStem(fileStem || "download")}.${safeExtension}`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
  }

  function escapeCsvCell(value) {
    const text = String(value == null ? "" : value);
    if (/[",\n]/.test(text)) {
      return `"${text.replace(/"/g, "\"\"")}"`;
    }
    return text;
  }

  function downloadJsonPayload(fileStem, payload) {
    const blob = new Blob([JSON.stringify(payload || {}, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${sanitizeFileStem(fileStem || "download")}.json`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
  }

  function sanitizeFileStem(value) {
    return String(value || "download")
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9_-]+/gi, "-")
      .replace(/-+/g, "-")
      .replace(/^-+|-+$/g, "") || "download";
  }

  function summarizeReportEntry(entry) {
    const data = entry && typeof entry === "object" ? entry : {};
    const primary = data.leaveStatus === "Yes"
      ? `Leave • ${data.leaveReason || "Not specified"}`
      : (data.workLocation || data.inTime || "No location set");
    const secondaryParts = [];
    if (data.inTime) secondaryParts.push(`In ${data.inTime}`);
    if (data.outTime) secondaryParts.push(`Out ${data.outTime}`);
    if (data.teamMembers) secondaryParts.push(`Team ${data.teamMembers}`);
    return {
      primary,
      secondary: secondaryParts.join(" • ") || "No extra details"
    };
  }

  function getReportFieldRows(entry) {
    const data = entry && typeof entry === "object" ? entry : {};
    const rows = [
      ["Status", data.leaveStatus === "Yes" ? `Leave${data.leaveReason ? ` • ${data.leaveReason}` : ""}` : (data.inTime ? "Present" : "No attendance")],
      ["Work location", data.workLocation || "Not set"],
      ["In time", data.inTime || "Not set"],
      ["Out time", data.outTime || "Not set"],
      ["Movement out", data.movementOut || "Not set"],
      ["Movement in", data.movementIn || "Not set"],
      ["Team", data.teamMembers || "Not set"],
      ["Vehicle", data.vehicleNumber || "Not set"],
      ["KM", data.km || "Not set"],
      ["Special day", data.specialDays || "None"],
      ["Leave details", data.leaveReasonText || data.customReasonDetails || "None"]
    ];
    return rows.map(([label, value]) => ({ label, value: String(value || "Not set") }));
  }

  function formatDateLabel(value) {
    if (!value) return "No date";
    const date = new Date(`${value}T00:00:00`);
    if (Number.isNaN(date.getTime())) return String(value);
    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric"
    });
  }

  function formatShortUid(value) {
    const id = String(value || "").trim();
    if (!id) return "--";
    return id.length > 12 ? `${id.slice(0, 8)}...` : id;
  }

  function formatLongUid(value) {
    const id = String(value || "").trim();
    return id || "--";
  }

  function isTodayDate(value) {
    if (!value) return false;
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    return String(value) === `${year}-${month}-${day}`;
  }

  function formatReportStatus(value) {
    const status = String(value || "pending").toLowerCase();
    if (status === "verified") return "Verified";
    if (status === "rejected") return "Rejected";
    return "Pending";
  }

  function getReportStatusClass(value) {
    const status = String(value || "pending").toLowerCase();
    if (status === "verified") return "status-active";
    if (status === "rejected") return "status-disabled";
    return "provider-email";
  }

  function renderSummaryCards(target, cards) {
    if (!target) return;
    target.innerHTML = cards.map((card) => `
      <div class="owner-mini-card">
        <span>${escapeHtml(card.label)}</span>
        <strong>${escapeHtml(card.value)}</strong>
        <span>${escapeHtml(card.meta)}</span>
      </div>
    `).join("");
  }

  function getBackupsForUser(userId) {
    return getCombinedBackups().filter((item) => String(item.target_user_id || "") === String(userId || ""));
  }

  function getLatestBackupForUser(userId) {
    return getBackupsForUser(userId)[0] || null;
  }

  function getReportsForUser(userId) {
    return state.reports
      .filter((item) => String(item.user_id || "") === String(userId || ""))
      .sort((a, b) => {
        const aTime = a.log_date
          ? new Date(`${a.log_date}T00:00:00`).getTime()
          : new Date(a.updated_at || a.created_at || 0).getTime();
        const bTime = b.log_date
          ? new Date(`${b.log_date}T00:00:00`).getTime()
          : new Date(b.updated_at || b.created_at || 0).getTime();
        return bTime - aTime;
      });
  }

  function getLatestUserAudit(userId) {
    return getCombinedAudit().find((item) => String(item.target_user_id || "") === String(userId || "")) || null;
  }

  function getSupportMessagesForUser(userId) {
    return normalizeSupportMessages(state.supportMessages).filter((item) => String(item.user_id || "") === String(userId || ""));
  }

  async function sendUserResetLink(user) {
    const email = String(user && user.email ? user.email : "").trim();
    if (!email) return;
    const confirmed = await requestOwnerConfirm({
      kicker: "Password reset",
      title: "Send reset link?",
      message: `Send password reset link to ${email}?`,
      confirmLabel: "Send Reset Link"
    });
    if (!confirmed) return;
    if (els.detailResetBtn) {
      window.AuthUi.setBusy(els.detailResetBtn, true, "Send Reset Link");
    }
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${authBaseUrl}/reset`
      });
      if (error) throw error;
      window.AuthUi.setInlineStatus(els.dashboardStatus, {
        type: "success",
        message: `Reset link sent to ${email}.`
      });
      recordLocalAudit("user_reset_requested", `Sent password reset link to ${email}.`);
      renderAudit();
      renderNotifications();
      renderReports();
    } catch (error) {
      window.AuthUi.setInlineStatus(els.dashboardStatus, {
        type: "error",
        message: mapOwnerError(error)
      });
    } finally {
      if (els.detailResetBtn) {
        window.AuthUi.setBusy(els.detailResetBtn, false, "Send Reset Link");
      }
    }
  }

  async function sendUserDisabledEmail(user) {
    const email = String(user && user.email ? user.email : "").trim().toLowerCase();
    if (!email) return false;

    try {
      const response = await fetch(OWNER_AUTH_EMAIL_FUNCTION_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          type: "accountDisabled",
          email,
          displayName: String(user && user.full_name ? user.full_name : "").trim() || "there"
        })
      });

      const payload = await response.json().catch(() => ({}));
      if (!response.ok || payload?.ok === false) {
        throw new Error(String(payload?.error || `status-${response.status}`));
      }

      recordLocalAudit("user_disabled_email_sent", `Sent disabled account email to ${email}.`);
      renderAudit();
      renderNotifications();
      return true;
    } catch (error) {
      console.warn("Disabled account email send failed:", error);
      recordLocalAudit("user_disabled_email_failed", `Could not send disabled account email to ${email}.`);
      renderAudit();
      renderNotifications();
      return false;
    }
  }

  async function saveUserDisplayName() {
    const user = getSelectedUser();
    const input = els.detailDisplayNameInput;
    if (!user || !input) return;
    const nextName = String(input.value || "").trim().replace(/\s+/g, " ");
    const currentStoredName = String(user.full_name || "").trim();

    if (!nextName) {
      window.AuthUi.setInlineStatus(els.dashboardStatus, {
        type: "error",
        message: "Display name cannot be empty."
      });
      input.focus();
      return;
    }

    if (nextName === currentStoredName) {
      window.AuthUi.setInlineStatus(els.dashboardStatus, {
        type: "info",
        message: "Display name is already up to date."
      });
      return;
    }

    if (!state.rpcReady) {
      window.AuthUi.setInlineStatus(els.dashboardStatus, {
        type: "info",
        message: "Run owner SQL to unlock display name updates."
      });
      return;
    }

    if (els.detailDisplayNameSaveBtn) {
      window.AuthUi.setBusy(els.detailDisplayNameSaveBtn, true, "Save Name");
    }

    try {
      await ownerRpc("owner_update_user_profile", {
        p_target_user_id: String(user.id || ""),
        p_full_name: nextName
      });
      await refreshDashboardData();
      window.AuthUi.setInlineStatus(els.dashboardStatus, {
        type: "success",
        message: "Display name updated across the app."
      });
    } catch (error) {
      if (await handleOwnerSqlPatchFallback(error)) return;
      window.AuthUi.setInlineStatus(els.dashboardStatus, {
        type: "error",
        message: mapOwnerError(error)
      });
    } finally {
      if (els.detailDisplayNameSaveBtn) {
        window.AuthUi.setBusy(els.detailDisplayNameSaveBtn, false, state.rpcReady ? "Save Name" : "SQL Setup Needed");
      }
    }
  }

  async function saveDatabaseProfileName(form) {
    const user = getSelectedUser();
    const input = form && form.querySelector ? form.querySelector('[name="display_name"]') : null;
    if (!user || !input) return;
    const nextName = String(input.value || "").trim().replace(/\s+/g, " ");
    const currentStoredName = String(user.full_name || "").trim();

    if (!nextName) {
      window.AuthUi.setInlineStatus(els.dashboardStatus, {
        type: "error",
        message: "Display name cannot be empty."
      });
      input.focus();
      return;
    }

    if (nextName === currentStoredName) {
      window.AuthUi.setInlineStatus(els.dashboardStatus, {
        type: "info",
        message: "Display name is already up to date."
      });
      return;
    }

    if (!state.rpcReady) {
      window.AuthUi.setInlineStatus(els.dashboardStatus, {
        type: "info",
        message: "Run owner SQL to unlock display name updates."
      });
      return;
    }

    const submitButton = form.querySelector('button[type="submit"]');
    if (submitButton) {
      window.AuthUi.setBusy(submitButton, true, "Save Display Name");
    }

    try {
      await ownerRpc("owner_update_user_profile", {
        p_target_user_id: String(user.id || ""),
        p_full_name: nextName
      });
      await refreshDashboardData();
      window.AuthUi.setInlineStatus(els.dashboardStatus, {
        type: "success",
        message: "Display name updated across the app."
      });
    } catch (error) {
      if (await handleOwnerSqlPatchFallback(error)) return;
      window.AuthUi.setInlineStatus(els.dashboardStatus, {
        type: "error",
        message: mapOwnerError(error)
      });
    } finally {
      if (submitButton) {
        window.AuthUi.setBusy(submitButton, false, "Save Display Name");
      }
    }
  }

  async function saveDatabaseLatestReport(form) {
    const user = getSelectedUser();
    const selectedReport = getSelectedReport();
    const editableReport = user && selectedReport && String(selectedReport.user_id || "") === String(user.id || "")
      ? selectedReport
      : (user ? getLatestReportForUser(user.id) : null);
    if (!user || !editableReport) {
      window.AuthUi.setInlineStatus(els.dashboardStatus, {
        type: "info",
        message: "There is no user work entry ready to edit yet."
      });
      return;
    }

    const currentEntry = editableReport.entry && typeof editableReport.entry === "object" ? editableReport.entry : {};
    const formData = new FormData(form);
    const nextEntry = { ...currentEntry };
    const submitButton = form.querySelector('button[type="submit"]');
    const fieldNames = [
      "workLocation",
      "inTime",
      "outTime",
      "movementOut",
      "movementIn",
      "teamMembers",
      "vehicleNumber",
      "km",
      "specialDays"
    ];

    fieldNames.forEach((fieldName) => {
      nextEntry[fieldName] = String(formData.get(fieldName) || "").trim();
    });

    const leaveStatus = String(formData.get("leaveStatus") || "No").trim() === "Yes" ? "Yes" : "No";
    const leaveReasonText = String(formData.get("leaveReasonText") || "").trim();
    nextEntry.leaveStatus = leaveStatus;
    nextEntry.leaveReasonText = leaveReasonText;
    nextEntry.customReasonDetails = leaveReasonText;
    nextEntry.leaveReason = leaveStatus === "Yes"
      ? (leaveReasonText || String(currentEntry.leaveReason || "").trim() || "Leave")
      : "";

    if (leaveStatus !== "Yes") {
      nextEntry.leaveReasonText = "";
      nextEntry.customReasonDetails = "";
    }

    const comparableCurrent = {
      workLocation: String(currentEntry.workLocation || "").trim(),
      inTime: String(currentEntry.inTime || "").trim(),
      outTime: String(currentEntry.outTime || "").trim(),
      movementOut: String(currentEntry.movementOut || "").trim(),
      movementIn: String(currentEntry.movementIn || "").trim(),
      teamMembers: String(currentEntry.teamMembers || "").trim(),
      vehicleNumber: String(currentEntry.vehicleNumber || "").trim(),
      km: String(currentEntry.km || "").trim(),
      specialDays: String(currentEntry.specialDays || "").trim(),
      leaveStatus: String(currentEntry.leaveStatus || "").trim() === "Yes" ? "Yes" : "No",
      leaveReasonText: String(currentEntry.leaveReasonText || currentEntry.customReasonDetails || currentEntry.leaveReason || "").trim()
    };
    const comparableNext = {
      workLocation: String(nextEntry.workLocation || "").trim(),
      inTime: String(nextEntry.inTime || "").trim(),
      outTime: String(nextEntry.outTime || "").trim(),
      movementOut: String(nextEntry.movementOut || "").trim(),
      movementIn: String(nextEntry.movementIn || "").trim(),
      teamMembers: String(nextEntry.teamMembers || "").trim(),
      vehicleNumber: String(nextEntry.vehicleNumber || "").trim(),
      km: String(nextEntry.km || "").trim(),
      specialDays: String(nextEntry.specialDays || "").trim(),
      leaveStatus: String(nextEntry.leaveStatus || "").trim() === "Yes" ? "Yes" : "No",
      leaveReasonText: String(nextEntry.leaveReasonText || nextEntry.customReasonDetails || nextEntry.leaveReason || "").trim()
    };

    if (JSON.stringify(comparableCurrent) === JSON.stringify(comparableNext)) {
      window.AuthUi.setInlineStatus(els.dashboardStatus, {
        type: "info",
        message: "Selected day card is already up to date."
      });
      return;
    }

    if (submitButton) {
      window.AuthUi.setBusy(submitButton, true, "Save Changes");
    }

    try {
      await assertOwnerAccess();
      const { error } = await supabase
        .from("daily_reports")
        .update({
          entry: nextEntry,
          updated_at: new Date().toISOString()
        })
        .eq("id", String(editableReport.id || ""));
      if (error) throw error;

      await refreshDashboardData();
      window.AuthUi.setInlineStatus(els.dashboardStatus, {
        type: "success",
        message: "Selected user work data updated successfully."
      });
    } catch (error) {
      if (await handleOwnerSqlPatchFallback(
        error,
        "Live work data edits need the latest admin dashboard SQL patch. The page stayed interactive while you keep working.",
        { keepInteractive: true }
      )) return;
      window.AuthUi.setInlineStatus(els.dashboardStatus, {
        type: "error",
        message: mapOwnerError(error)
      });
    } finally {
      if (submitButton) {
        window.AuthUi.setBusy(submitButton, false, "Save Changes");
      }
    }
  }

  function handleDatabaseManagerAction(actionButton) {
    const action = String(actionButton && actionButton.dataset ? actionButton.dataset.dbAction || "" : "");
    const selectedUser = getSelectedUser();
    const selectedReport = getSelectedReport();
    const selectedBackup = getAllDatabaseBackups().find((item) => String(item.id || "") === String(state.databaseRecordId || ""));
    const selectedSupport = normalizeSupportMessages(state.supportMessages).find((item) => String(item.id || "") === String(state.databaseRecordId || ""));

    if (action === "toggle-user-verify" && selectedUser) {
      void updateVerification(String(selectedUser.id || ""), !Boolean(selectedUser.email_verified));
      return;
    }
    if (action === "toggle-user-disabled" && selectedUser) {
      void updateDisabled(String(selectedUser.id || ""), !Boolean(selectedUser.is_disabled));
      return;
    }
    if (action === "backup-user" && selectedUser) {
      void backupUserById(String(selectedUser.id || ""));
      return;
    }
    if (action === "archive-user" && selectedUser) {
      void archiveUser(String(selectedUser.id || ""));
      return;
    }
    if (action === "open-support-thread" && selectedUser) {
      setActiveTab("support");
      renderSupport();
      return;
    }
    if (action === "report-verified" && selectedReport) {
      void setReportReview(String(selectedReport.id || ""), "verified");
      return;
    }
    if (action === "report-pending" && selectedReport) {
      void setReportReview(String(selectedReport.id || ""), "pending");
      return;
    }
    if (action === "report-rejected" && selectedReport) {
      void setReportReview(String(selectedReport.id || ""), "rejected");
      return;
    }
    if (action === "report-delete" && selectedReport) {
      void deleteReport(String(selectedReport.id || ""));
      return;
    }
    if (action === "backup-download" && selectedBackup) {
      downloadBackup(String(selectedBackup.id || ""));
      return;
    }
    if (action === "backup-delete" && selectedBackup) {
      void deleteBackup(String(selectedBackup.id || ""));
      return;
    }
    if (action === "backup-open-user" && selectedBackup) {
      setDatabaseCollection("profiles");
      setDatabaseRecordSelection("profiles", String(selectedBackup.target_user_id || ""));
      return;
    }
    if (action === "support-read" && selectedSupport) {
      void updateSupportMessageStatus(String(selectedSupport.id || ""), "read");
      return;
    }
    if (action === "support-resolve" && selectedSupport) {
      void updateSupportMessageStatus(String(selectedSupport.id || ""), "resolved");
      return;
    }
    if (action === "support-open-user" && selectedSupport) {
      setDatabaseCollection("profiles");
      setDatabaseRecordSelection("profiles", String(selectedSupport.user_id || ""));
    }
  }

  async function updateSupportMessageStatus(messageId, nextStatus) {
    const supportId = String(messageId || "");
    const desiredStatus = String(nextStatus || "").trim().toLowerCase();
    if (!supportId || !["read", "resolved"].includes(desiredStatus)) return;

    const targetMessage = state.supportMessages.find((item) => String(item.id || "") === supportId);
    if (!targetMessage) return;

    try {
      const nowIso = new Date().toISOString();
      const actorId = String(state.sessionUser && state.sessionUser.id || state.ownerProfile && state.ownerProfile.id || "").trim() || null;
      const patch = {
        status: desiredStatus,
        owner_seen_at: targetMessage.owner_seen_at || nowIso,
        resolved_at: desiredStatus === "resolved" ? nowIso : null,
        resolved_by: desiredStatus === "resolved" ? actorId : null
      };
      const { error } = await supabase
        .from("support_messages")
        .update(patch)
        .eq("id", supportId);
      if (error) throw error;
      await refreshDashboardData();
      window.AuthUi.setInlineStatus(els.dashboardStatus, {
        type: "success",
        message: desiredStatus === "resolved" ? "Support message resolved." : "Support message marked as read."
      });
      recordLocalAudit(
        desiredStatus === "resolved" ? "support_message_resolved" : "support_message_read",
        `${desiredStatus === "resolved" ? "Resolved" : "Reviewed"} support message from ${getSupportMessageSender(targetMessage)}.`
      );
      renderAudit();
    } catch (error) {
      window.AuthUi.setInlineStatus(els.dashboardStatus, {
        type: "error",
        message: mapOwnerSupportLoadError(error)
      });
    }
  }

  function saveUserNote() {
    const user = getSelectedUser();
    if (!user || !els.detailNote) return;
    const meta = getUserMeta(user.id);
    meta.note = String(els.detailNote.value || "").trim();
    setUserMeta(user.id, meta);
    renderDetailSummary(user);
    window.AuthUi.setInlineStatus(els.dashboardStatus, {
      type: "success",
      message: "Owner note saved."
    });
    recordLocalAudit("user_note_saved", `Saved a private note for ${user.full_name || user.email || "user"}.`);
    renderAudit();
  }

  function toggleUserSuspicious() {
    const user = getSelectedUser();
    if (!user) return;
    const meta = getUserMeta(user.id);
    meta.suspicious = !Boolean(meta.suspicious);
    setUserMeta(user.id, meta);
    hydrateDetailDrawer();
    renderUsers();
    renderSecurity();
    renderNotifications();
    window.AuthUi.setInlineStatus(els.dashboardStatus, {
      type: "success",
      message: meta.suspicious ? "User marked suspicious." : "Suspicious mark removed."
    });
    recordLocalAudit(meta.suspicious ? "user_marked_suspicious" : "user_suspicious_cleared", `${meta.suspicious ? "Marked" : "Cleared"} suspicious flag for ${user.full_name || user.email || "user"}.`);
    renderAudit();
  }

  function getUserMeta(userId) {
    const key = String(userId || "");
    if (!key) return {};
    return state.userMeta[key] && typeof state.userMeta[key] === "object" ? { ...state.userMeta[key] } : {};
  }

  function setUserMeta(userId, meta) {
    const key = String(userId || "");
    if (!key) return;
    state.userMeta[key] = {
      note: String(meta.note || "").trim(),
      suspicious: Boolean(meta.suspicious)
    };
    persistJson(OWNER_USER_META_KEY, state.userMeta);
  }

  function isSuspiciousUser(userId) {
    return Boolean(getUserMeta(userId).suspicious);
  }

  function isRecentDate(value, days) {
    if (!value) return false;
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return false;
    const threshold = Date.now() - days * 24 * 60 * 60 * 1000;
    return date.getTime() >= threshold;
  }

  function handleSettingsSave(event) {
    event.preventDefault();
    const retentionDays = Math.min(Math.max(Number(els.retentionDaysInput.value || 30), 1), 365);
    const autoDownloadBackup = Boolean(els.autoDownloadBackupInput.checked);
    state.settings = {
      retentionDays,
      autoDownloadBackup
    };
    persistJson(OWNER_SETTINGS_KEY, state.settings);
    renderHealth();
    window.AuthUi.setInlineStatus(els.dashboardStatus, {
      type: "success",
      message: "Settings saved on this device."
    });
    recordLocalAudit("settings_saved", "Updated admin dashboard preferences.");
  }

  function getCombinedBackups() {
    const all = [...normalizeBackups(state.remoteBackups), ...normalizeBackups(state.localBackups)];
    return all.sort((a, b) => {
      const aTime = new Date(a.created_at || 0).getTime();
      const bTime = new Date(b.created_at || 0).getTime();
      return bTime - aTime;
    });
  }

  function getCombinedAudit() {
    const remote = normalizeAuditEntries(state.remoteAudit);
    const local = normalizeAuditEntries(state.localAudit);
    const all = [...remote, ...local];
    return all.sort((a, b) => {
      const aTime = new Date(a.created_at || a.createdAt || 0).getTime();
      const bTime = new Date(b.created_at || b.createdAt || 0).getTime();
      return bTime - aTime;
    }).slice(0, 120);
  }

  function recordLocalAudit(type, message) {
    state.localAudit.unshift({
      id: `local-${type}-${Date.now()}`,
      action: type,
      summary: message,
      created_at: new Date().toISOString()
    });
    state.localAudit = state.localAudit.slice(0, OWNER_MAX_LOCAL_AUDIT);
    persistJson(OWNER_LOCAL_AUDIT_KEY, state.localAudit);
  }

  function normalizeUserRows(rows) {
    return Array.isArray(rows)
      ? rows.map((row) => ({
          id: String(row.id || "").trim(),
          email: String(row.email || "").trim(),
          full_name: String(row.full_name || "").trim(),
          role: String(row.role || "user").trim().toLowerCase() || "user",
          is_disabled: Boolean(row.is_disabled),
          is_archived: Boolean(row.is_archived),
          email_verified: Boolean(row.email_verified),
          auth_provider: String(row.auth_provider || "email").trim().toLowerCase() || "email",
          avatar_url: row.avatar_url || "",
          created_at: row.created_at || "",
          updated_at: row.updated_at || "",
          last_sign_in_at: row.last_sign_in_at || "",
          archived_at: row.archived_at || "",
          restore_until: row.restore_until || "",
          archived_backup_id: row.archived_backup_id || ""
        }))
      : [];
  }

  function normalizeBackups(rows) {
    return Array.isArray(rows)
      ? rows.map((row) => ({
          id: row.id || `local-${Date.now()}`,
          target_user_id: row.target_user_id || "",
          target_email: row.target_email || "",
          target_full_name: row.target_full_name || row.target_email || "User",
          backup_kind: row.backup_kind || "manual",
          created_by: row.created_by || "",
          snapshot: row.snapshot || {},
          created_at: row.created_at || new Date().toISOString(),
          source: row.source || "remote"
        }))
      : [];
  }

  function normalizeAuditEntries(rows) {
    return Array.isArray(rows)
      ? rows.map((row) => ({
          id: row.id || `local-audit-${Date.now()}`,
          actor_id: row.actor_id || "",
          actor_email: row.actor_email || "",
          action: row.action || row.type || "owner_action",
          target_user_id: row.target_user_id || "",
          target_email: row.target_email || "",
          target_full_name: row.target_full_name || "",
          summary: row.summary || row.message || row.title || "Owner action",
          meta: row.meta || {},
          created_at: row.created_at || row.createdAt || new Date().toISOString()
        }))
      : [];
  }

  function normalizeSupportMessages(rows) {
    return Array.isArray(rows)
      ? rows.map((row) => ({
          id: String(row.id || "").trim(),
          user_id: String(row.user_id || "").trim(),
          sender_email: String(row.sender_email || "").trim(),
          sender_name: String(row.sender_name || "").trim(),
          category: String(row.category || "support").trim().toLowerCase() || "support",
          subject: String(row.subject || "").trim(),
          message: String(row.message || "").trim(),
          status: String(row.status || "new").trim().toLowerCase() || "new",
          owner_seen_at: row.owner_seen_at || "",
          resolved_at: row.resolved_at || "",
          resolved_by: row.resolved_by || "",
          created_at: row.created_at || "",
          updated_at: row.updated_at || ""
        })).sort((left, right) => {
          const priorityDiff = getSupportPriorityScore(right) - getSupportPriorityScore(left);
          if (priorityDiff !== 0) return priorityDiff;
          return new Date(right.created_at || right.updated_at || 0).getTime() - new Date(left.created_at || left.updated_at || 0).getTime();
        })
      : [];
  }

  function normalizeReleaseAssets(rows) {
    return Array.isArray(rows)
      ? rows.map((row) => ({
          id: String(row.id || "").trim(),
          platform: String(row.platform || "android").trim().toLowerCase() || "android",
          channel: String(row.channel || OWNER_RELEASE_CHANNEL).trim().toLowerCase() || OWNER_RELEASE_CHANNEL,
          bucket_name: String(row.bucket_name || OWNER_RELEASE_BUCKET).trim() || OWNER_RELEASE_BUCKET,
          object_path: String(row.object_path || "").trim(),
          public_url: String(row.public_url || "").trim(),
          file_name: String(row.file_name || "").trim(),
          version_label: String(row.version_label || "").trim(),
          build_label: String(row.build_label || "").trim(),
          release_notes: String(row.release_notes || "").trim(),
          file_size_bytes: Math.max(0, Number(row.file_size_bytes || 0)),
          mime_type: String(row.mime_type || "").trim(),
          is_active: row.is_active !== false,
          created_at: row.created_at || "",
          updated_at: row.updated_at || row.created_at || "",
          updated_by: String(row.updated_by || "").trim()
        }))
      : [];
  }

  function normalizeReports(rows) {
    return Array.isArray(rows)
      ? rows.map((row) => ({
          id: row.id || "",
          user_id: row.user_id || "",
          user_email: row.user_email || "",
          user_full_name: row.user_full_name || row.user_email || "User",
          log_date: row.log_date || "",
          entry: row.entry && typeof row.entry === "object" ? row.entry : {},
          created_at: row.created_at || "",
          updated_at: row.updated_at || "",
          review_status: row.review_status || "pending",
          review_comment: row.review_comment || ""
        }))
      : [];
  }

  function normalizeDeletedReports(rows) {
    return Array.isArray(rows)
      ? rows.map((row) => ({
          id: row.id || "",
          user_id: row.user_id || "",
          user_email: row.user_email || "",
          user_full_name: row.user_full_name || row.user_email || "User",
          log_date: row.log_date || "",
          entry: row.entry && typeof row.entry === "object" ? row.entry : {},
          archived_at: row.archived_at || "",
          archived_by: row.archived_by || "",
          review_status: row.review_status || "pending",
          review_comment: row.review_comment || ""
        }))
      : [];
  }

  function summarizeSnapshot(snapshot) {
    const workLogs = Array.isArray(snapshot && snapshot.workLogs) ? snapshot.workLogs.length : 0;
    const reminders = Array.isArray(snapshot && snapshot.reminders) ? snapshot.reminders.length : 0;
    return { workLogs, reminders };
  }

  function isOwnerRpcUnavailable(error) {
    const code = String(error && error.code ? error.code : "").toLowerCase();
    const message = String(error && error.message ? error.message : "").toLowerCase();
    return (
      code === "42883" ||
      code === "pgrst202" ||
      message.includes("could not find the function public.owner_") ||
      message.includes("function public.owner_") ||
      message.includes("does not exist")
    );
  }

  function isOwnerSqlPatchPending(error) {
    const code = String(error && error.code ? error.code : "").toLowerCase();
    const message = String(error && error.message ? error.message : "").toLowerCase();
    return (
      code === "42702" ||
      message.includes("column reference \"id\" is ambiguous") ||
      (message.includes("column reference") && message.includes("ambiguous"))
    );
  }

  function mapOwnerReportLoadError(error) {
    const code = String(error && error.code ? error.code : "").toLowerCase();
    const message = String(error && error.message ? error.message : "").trim();

    if (isOwnerRpcUnavailable(error)) {
      return "Run the latest owner report SQL to unlock report review, trash, and restore.";
    }
    if (isOwnerSqlPatchPending(error) || code === "42702" || /column reference \"id\" is ambiguous/i.test(message)) {
      return "Report tools are in safe mode. Run the latest owner report SQL fix, then refresh this page.";
    }
    if (/owner access required/i.test(message)) {
      return "Report tools need the owner account. Sign in again and refresh.";
    }
    return "Report tools are in safe mode until the latest owner report SQL fix is applied.";
  }

  function mapOwnerSupportLoadError(error) {
    const code = String(error && error.code ? error.code : "").toLowerCase();
    const message = String(error && error.message ? error.message : "").trim();

    if (code === "42501" || /row-level security|permission denied/i.test(message)) {
      return "Support inbox is restricted until the latest support/contact SQL patch is applied with owner access policies.";
    }
    if (code === "42p01" || /support_messages/i.test(message) && /does not exist|relation/i.test(message)) {
      return "Support inbox needs the latest support/contact SQL patch.";
    }
    if (isOwnerSqlPatchPending(error)) {
      return "Support inbox is in safe mode. Run the latest admin dashboard SQL patch, then refresh.";
    }
    if (isOwnerRpcUnavailable(error)) {
      return "Support inbox needs the latest support/contact SQL patch.";
    }
    if (/owner access required/i.test(message)) {
      return "Support inbox needs the owner account. Sign in again and refresh.";
    }
    return "Support inbox is temporarily unavailable until the latest support/contact SQL patch is applied.";
  }

  function mapOwnerError(error) {
    const code = String(error && error.code ? error.code : "").toLowerCase();
    const message = String(error && error.message ? error.message : "").trim();
    const table = {
      invalid_credentials: "Invalid owner email or password.",
      email_not_confirmed: "Verify the owner email before signing in.",
      unauthorized: "Owner session expired. Sign in again.",
      "42501": "Owner access required.",
      pgrst202: "Owner SQL setup is pending. Run the owner migration first.",
      "42702": "Owner SQL fix is pending. Run the latest admin dashboard SQL patch, then refresh this page."
    };

    if (table[code]) return table[code];
    if (isOwnerSqlPatchPending(error)) {
      return "Owner SQL fix is pending. Run the latest admin dashboard SQL patch, then refresh this page.";
    }
    if (/authentication required/i.test(message) || /jwt/i.test(message)) {
      return "Owner session expired. Sign in again.";
    }
    if (/column reference \"id\" is ambiguous/i.test(message)) {
      return "Owner SQL fix is pending. Run the latest admin dashboard SQL patch, then refresh this page.";
    }
    if (/owner access required/i.test(message)) return "Owner access required.";
    if (/archive regular users only/i.test(message)) return "This dashboard does not archive owner accounts.";
    if (/your own owner account/i.test(message)) return "You cannot disable, archive, or delete your own owner account.";
    if (/restore the archived user/i.test(message)) return "Restore the archived user instead of enabling it directly.";
    if (/archive the user before permanent delete/i.test(message)) return "Archive the user first, then use permanent delete.";
    if (/redirect url/i.test(message) || /redirectto/i.test(message)) {
      return "Add /admin-control_dashboard/reset to Supabase Auth redirect URLs, then retry.";
    }
    return message || "Owner request failed.";
  }

  function mapOwnerCreateUserError(error) {
    const code = String(error && error.code ? error.code : "").toLowerCase();
    const message = String(error && error.message ? error.message : "").trim();

    if (code === "user_already_exists" || /already registered/i.test(message) || /already exists/i.test(message)) {
      return "This email already has an account.";
    }
    if (/password/i.test(message) && /least|characters|weak/i.test(message)) {
      return message || "Use a stronger temporary password.";
    }
    if (/signups?.*disabled/i.test(message) || /signup is disabled/i.test(message)) {
      return "Supabase email signup is disabled. Enable email signup first.";
    }
    if (/profile is still syncing/i.test(message)) {
      return message;
    }
    return mapOwnerError(error);
  }

  function formatProvider(provider) {
    const value = String(provider || "email").trim().toLowerCase();
    if (value === "google") return "Google";
    if (value === "email") return "Email";
    return value ? value.charAt(0).toUpperCase() + value.slice(1) : "Email";
  }

  function formatSupportCategory(category) {
    const value = String(category || "support").trim().toLowerCase();
    if (value === "access_support") return "Access Support";
    if (value === "account_disabled") return "Account Disabled";
    if (value === "login_issue") return "Login Issue";
    if (value === "access_request") return "Access Request";
    if (value === "other") return "Other Issue";
    if (value === "report_issue") return "Report Issue";
    if (value === "account_help") return "Account Help";
    if (value === "feature_request") return "Feature Request";
    if (value === "reporting") return "Reporting Help";
    return toTitleWords(value || "Support");
  }

  function isAccessSupportCategory(category) {
    const value = String(category || "").trim().toLowerCase();
    return value === "access_support" || value === "account_disabled" || value === "login_issue" || value === "access_request";
  }

  function getSupportPriorityScore(message) {
    const status = String(message && message.status ? message.status : "new").trim().toLowerCase();
    let score = 0;
    if (status !== "resolved") score += 10;
    if (status === "new") score += 8;
    if (isAccessSupportCategory(message && message.category)) score += 20;
    return score;
  }

  function formatSupportStatus(status) {
    const value = String(status || "new").trim().toLowerCase();
    if (value === "resolved") return "Resolved";
    if (value === "read") return "Read";
    return "New";
  }

  function getSupportStatusClass(status) {
    const value = String(status || "new").trim().toLowerCase();
    if (value === "resolved") return "support-resolved";
    if (value === "read") return "support-read";
    return "support-new";
  }

  function getSupportMessageSender(message) {
    const linkedUser = state.users.find((item) => String(item.id || "") === String(message && message.user_id || ""));
    if (linkedUser) return getUserDisplayName(linkedUser);
    const explicitName = String(message && message.sender_name ? message.sender_name : "").trim();
    if (explicitName) return explicitName;
    const email = String(message && message.sender_email ? message.sender_email : "").trim();
    if (email) return email;
    return "User";
  }

  function parseSupportMessageContent(message) {
    const raw = String(message && message.message ? message.message : "").replace(/\r\n/g, "\n").trim();
    if (!raw) {
      return {
        body: "",
        accountStatus: "",
        issueType: "",
        submittedFrom: ""
      };
    }

    const lines = raw.split("\n");
    let cursor = 0;
    let accountStatus = "";
    let issueType = "";
    let submittedFrom = "";

    if (/^access support request$/i.test(String(lines[0] || "").trim())) {
      cursor += 1;
    }

    while (cursor < lines.length && !String(lines[cursor] || "").trim()) {
      cursor += 1;
    }

    for (; cursor < lines.length; cursor += 1) {
      const line = String(lines[cursor] || "").trim();
      if (!line) {
        cursor += 1;
        break;
      }
      let matchedMeta = false;
      const accountMatch = line.match(/^account status:\s*(.+)$/i);
      if (accountMatch) {
        accountStatus = String(accountMatch[1] || "").trim();
        matchedMeta = true;
      }
      const issueMatch = line.match(/^issue type:\s*(.+)$/i);
      if (issueMatch) {
        issueType = String(issueMatch[1] || "").trim();
        matchedMeta = true;
      }
      const sourceMatch = line.match(/^submitted from:\s*(.+)$/i);
      if (sourceMatch) {
        submittedFrom = String(sourceMatch[1] || "").trim();
        matchedMeta = true;
      }
      if (!matchedMeta) {
        break;
      }
    }

    const body = lines.slice(cursor).join("\n").trim() || raw;
    return {
      body,
      accountStatus,
      issueType,
      submittedFrom
    };
  }

  function truncateText(value, maxLength) {
    const clean = String(value || "").trim();
    const safeLength = Math.max(10, Number(maxLength || 120));
    if (clean.length <= safeLength) return clean;
    return `${clean.slice(0, safeLength - 1).trimEnd()}…`;
  }

  function isProviderManagedVerification(user) {
    const provider = String(user && user.auth_provider ? user.auth_provider : "email").trim().toLowerCase();
    return provider && provider !== "email";
  }

  function formatDateTime(value) {
    if (!value) return "Never";
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return "Never";
    return date.toLocaleString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });
  }

  function formatUserTableDate(value) {
    if (!value) return "Never";
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return "Never";
    return date.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric"
    });
  }

  function toTitleWords(value) {
    return String(value || "")
      .trim()
      .replace(/[_-]+/g, " ")
      .replace(/\s+/g, " ")
      .split(" ")
      .filter(Boolean)
      .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
      .join(" ");
  }

  function getUserDisplayName(user) {
    const explicitName = String(user && user.full_name ? user.full_name : "").trim();
    if (explicitName && explicitName.toLowerCase() !== "user") return explicitName;
    const emailLocalPart = String(user && user.email ? user.email : "").trim().replace(/@.*$/, "");
    const derivedName = toTitleWords(emailLocalPart);
    if (derivedName) return derivedName;
    const shortUid = formatShortUid(user && user.id ? user.id : "");
    return shortUid !== "--" ? shortUid : "Account";
  }

  function formatUserRole(role) {
    const normalized = String(role || "").trim().toLowerCase();
    if (!normalized || normalized === "user") return "Member";
    if (normalized === "owner") return "Owner";
    return toTitleWords(normalized);
  }

  function getUserSortButtonLabel() {
    if (state.userSortMode === "recent") return "Sort: Recent Sign-in";
    if (state.userSortMode === "name") return "Sort: Name";
    return "Sort: User ID";
  }

  function getUserSortTimestamp(value) {
    const time = value ? new Date(value).getTime() : 0;
    return Number.isFinite(time) ? time : 0;
  }

  function compareUsersByActiveSort(left, right) {
    const sortMode = String(state.userSortMode || "uid");
    if (sortMode === "recent") {
      const timestampDiff = getUserSortTimestamp(right.last_sign_in_at) - getUserSortTimestamp(left.last_sign_in_at);
      if (timestampDiff) return timestampDiff;
    } else if (sortMode === "name") {
      const nameDiff = getUserDisplayName(left).localeCompare(getUserDisplayName(right), undefined, { sensitivity: "base" });
      if (nameDiff) return nameDiff;
    }
    return String(left.id || "").localeCompare(String(right.id || ""));
  }

  function cycleUserSortMode() {
    const order = ["uid", "recent", "name"];
    const currentIndex = order.indexOf(String(state.userSortMode || "uid"));
    state.userSortMode = order[(currentIndex + 1) % order.length];
    renderUsers();
  }

  function syncUserSearchPlaceholder() {
    if (!els.searchInput) return;
    const scope = String(els.searchScopeInput?.value || "email").toLowerCase();
    if (scope === "name") {
      els.searchInput.placeholder = "Search display names";
      return;
    }
    if (scope === "uid") {
      els.searchInput.placeholder = "Search user ID";
      return;
    }
    if (scope === "all") {
      els.searchInput.placeholder = "Search accounts";
      return;
    }
    els.searchInput.placeholder = "Search email address";
  }

  function getUserInitials(fullName, email) {
    const source = String(fullName || email || "User").trim();
    if (!source) return "U";
    const words = source
      .replace(/@.*$/, "")
      .split(/[\s._-]+/)
      .filter(Boolean)
      .slice(0, 2);
    if (!words.length) return "U";
    return words.map((part) => part.charAt(0).toUpperCase()).join("").slice(0, 2);
  }

  function formatStatDateTime(value) {
    if (!value) return "None";
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return "None";
    return date.toLocaleString("en-GB", {
      day: "2-digit",
      month: "short",
      hour: "2-digit",
      minute: "2-digit"
    });
  }

  function formatBackupKind(kind) {
    const value = String(kind || "manual").trim().toLowerCase();
    if (value === "archive") return "Archive backup";
    if (value === "pre_delete") return "Pre-delete backup";
    return "Manual backup";
  }

  function getBackupSizeBytes(backup) {
    try {
      return new Blob([JSON.stringify(backup && backup.snapshot ? backup.snapshot : {})]).size;
    } catch (_) {
      return 0;
    }
  }

  function formatStorageSize(bytes) {
    const size = Number(bytes || 0);
    if (!size) return "0 KB";
    if (size >= 1024 * 1024) return `${(size / (1024 * 1024)).toFixed(1)} MB`;
    return `${Math.max(1, Math.round(size / 1024))} KB`;
  }

  function renderBadge(label, cls) {
    return `<span class="owner-badge ${escapeHtml(cls)}">${escapeHtml(label)}</span>`;
  }

  function escapeHtml(value) {
    return String(value || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function persistJson(key, value) {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (_) {
      // ignore storage failures
    }
  }

  function readJson(key, fallback) {
    try {
      const raw = window.localStorage.getItem(key);
      if (!raw) return fallback;
      const parsed = JSON.parse(raw);
      return parsed == null ? fallback : parsed;
    } catch (_) {
      return fallback;
    }
  }

  function hasOwnerUnlock() {
    try {
      return window.sessionStorage.getItem(OWNER_UNLOCK_KEY) === "1";
    } catch (_) {
      return false;
    }
  }

  function setOwnerUnlock() {
    try {
      window.sessionStorage.setItem(OWNER_UNLOCK_KEY, "1");
    } catch (_) {
      // ignore
    }
  }

  function clearOwnerUnlock() {
    try {
      window.sessionStorage.removeItem(OWNER_UNLOCK_KEY);
    } catch (_) {
      // ignore
    }
  }
})();
