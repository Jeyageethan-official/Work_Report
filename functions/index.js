const { onRequest } = require("firebase-functions/v2/https");
const { defineSecret, defineString } = require("firebase-functions/params");
const logger = require("firebase-functions/logger");
const admin = require("firebase-admin");

admin.initializeApp();

const resendApiKey = defineSecret("RESEND_API_KEY");

const PROJECT_ID = process.env.GCLOUD_PROJECT || "work-report-fe3da";
const appBaseUrlParam = defineString("APP_BASE_URL", {
  default: `https://${PROJECT_ID}.web.app`,
});
const mailFromParam = defineString("MAIL_FROM", {
  default: "Work Report <no-reply@workreport.app>",
});
const mailTemplateVersion = "2026-03-07-b";

const json = (res, status, payload) => {
  res.status(status).set("Content-Type", "application/json").send(JSON.stringify(payload));
};

const escapeHtml = (value = "") =>
  String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

const applyCors = (req, res) => {
  const origin = req.headers.origin || "";
  if (
    /^https:\/\/.*\.web\.app$/i.test(origin) ||
    /^https:\/\/.*\.firebaseapp\.com$/i.test(origin) ||
    /^https:\/\/.*\.github\.io$/i.test(origin) ||
    /^http:\/\/localhost(:\d+)?$/i.test(origin)
  ) {
    res.set("Access-Control-Allow-Origin", origin);
  } else {
    res.set("Access-Control-Allow-Origin", "*");
  }
  res.set("Access-Control-Allow-Headers", "Content-Type");
  res.set("Access-Control-Allow-Methods", "POST,OPTIONS");
};

const buildPremiumTemplate = ({ title, subtitle, ctaText, ctaUrl, tip }) => `
<!doctype html>
<html>
  <body style="margin:0;padding:0;background:#eef4ff;font-family:Inter,Arial,sans-serif;color:#111827;">
    <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="background:#eef4ff;padding:28px 12px;">
      <tr>
        <td align="center">
          <table width="620" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;max-width:620px;background:#ffffff;border:1px solid #dbe3ef;border-radius:18px;overflow:hidden;">
            <tr>
              <td style="padding:16px 18px;border-bottom:1px solid #e5e7eb;">
                <table width="100%" cellpadding="0" cellspacing="0" role="presentation">
                  <tr>
                    <td style="width:48px;vertical-align:middle;">
                      <div style="width:42px;height:42px;border-radius:12px;background:#dbeafe;color:#1d4ed8;font-weight:800;display:flex;align-items:center;justify-content:center;">WR</div>
                    </td>
                    <td style="vertical-align:middle;">
                      <div style="font-size:20px;font-weight:800;color:#0f172a;">Work Report</div>
                      <div style="font-size:12px;color:#64748b;">Professional Suite</div>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr>
              <td style="padding:24px 20px 18px;">
                <h2 style="margin:0 0 8px;font-size:24px;line-height:1.25;color:#0f172a;">${escapeHtml(title)}</h2>
                <p style="margin:0 0 16px;font-size:14px;line-height:1.55;color:#475569;">${escapeHtml(subtitle)}</p>
                <a href="${ctaUrl}" style="display:inline-block;background:#2563eb;color:#ffffff;text-decoration:none;font-size:15px;font-weight:700;padding:12px 18px;border-radius:12px;">${escapeHtml(ctaText)}</a>
                <p style="margin:16px 0 0;font-size:13px;line-height:1.6;color:#64748b;">${escapeHtml(tip)}</p>
              </td>
            </tr>
            <tr>
              <td style="padding:14px 20px;border-top:1px solid #eef2f7;background:#f8fbff;">
                <p style="margin:0;font-size:12px;color:#64748b;">Need help? Contact support from inside Work Report app settings.</p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>
`;

const sendViaResend = async ({ apiKey, from, to, subject, html }) => {
  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: [to],
      subject,
      html,
    }),
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Resend request failed: ${response.status} ${text}`);
  }
};

exports.sendAuthEmail = onRequest(
  {
    region: "us-central1",
    cors: false,
    secrets: [resendApiKey],
  },
  async (req, res) => {
    applyCors(req, res);
    if (req.method === "OPTIONS") return res.status(204).send("");
    if (req.method !== "POST") return json(res, 405, { ok: false, error: "method-not-allowed" });

    try {
      const { type, email, displayName } = req.body || {};
      const cleanType = String(type || "").trim();
      const cleanEmail = String(email || "").trim().toLowerCase();
      const cleanName = String(displayName || "").trim() || "there";

      if (!cleanEmail || !cleanEmail.includes("@")) return json(res, 400, { ok: false, error: "invalid-email" });
      if (!["verifyEmail", "resetPassword"].includes(cleanType)) return json(res, 400, { ok: false, error: "invalid-type" });

      const actionCodeSettings = {
        url: `${appBaseUrlParam.value()}?authAction=1`,
        handleCodeInApp: false,
      };

      let link = "";
      let subject = "";
      let html = "";

      if (cleanType === "verifyEmail") {
        link = await admin.auth().generateEmailVerificationLink(cleanEmail, actionCodeSettings);
        subject = "Verify your Work Report email";
        html = buildPremiumTemplate({
          title: "Verify your email",
          subtitle: `Hi ${cleanName}, confirm your email to activate Work Report account access.`,
          ctaText: "Verify Email",
          ctaUrl: link,
          tip: "If you did not request this, you can ignore this message.",
        });
      } else {
        link = await admin.auth().generatePasswordResetLink(cleanEmail, actionCodeSettings);
        subject = "Reset your Work Report password";
        html = buildPremiumTemplate({
          title: "Reset your password",
          subtitle: `Hi ${cleanName}, use this secure link to set a new password for Work Report.`,
          ctaText: "Reset Password",
          ctaUrl: link,
          tip: "For security, this link expires automatically.",
        });
      }

      const key = resendApiKey.value();
      if (!key) throw new Error("RESEND_API_KEY is not configured.");

      await sendViaResend({
        apiKey: key,
        from: mailFromParam.value(),
        to: cleanEmail,
        subject: `${subject}`,
        html: `${html}\n<!-- template:${mailTemplateVersion} -->`,
      });

      return json(res, 200, { ok: true });
    } catch (err) {
      logger.error("sendAuthEmail failed", err);
      return json(res, 500, { ok: false, error: "send-failed" });
    }
  }
);
