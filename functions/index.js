const { onRequest } = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");
const admin = require("firebase-admin");

admin.initializeApp();

const PROJECT_ID = process.env.GCLOUD_PROJECT || "work-report-fe3da";
const APP_URL = process.env.APP_BASE_URL || `https://${PROJECT_ID}.web.app`;
const RESEND_API_KEY = process.env.RESEND_API_KEY || "";
const MAIL_FROM = process.env.MAIL_FROM || "Work Report <no-reply@workreport.app>";

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

const cors = (req, res) => {
  const origin = req.headers.origin || "";
  if (origin.startsWith("http://localhost") || /https:\/\/.*\.web\.app$/.test(origin) || /https:\/\/.*\.firebaseapp\.com$/.test(origin)) {
    res.set("Access-Control-Allow-Origin", origin);
  } else {
    res.set("Access-Control-Allow-Origin", "*");
  }
  res.set("Access-Control-Allow-Headers", "Content-Type");
  res.set("Access-Control-Allow-Methods", "POST,OPTIONS");
};

const buildEmailHtml = ({ title, subtitle, ctaText, ctaUrl, tip }) => `
<!doctype html>
<html>
  <body style="margin:0;background:#eef4ff;font-family:Inter,Arial,sans-serif;color:#111827;">
    <div style="max-width:620px;margin:24px auto;background:#ffffff;border:1px solid #dbe3ef;border-radius:18px;overflow:hidden;">
      <div style="padding:18px 20px;border-bottom:1px solid #e5e7eb;display:flex;align-items:center;gap:10px;">
        <div style="width:40px;height:40px;border-radius:12px;background:#dbeafe;display:flex;align-items:center;justify-content:center;font-weight:800;color:#1d4ed8;">WR</div>
        <div>
          <div style="font-size:18px;font-weight:800;">Work Report</div>
          <div style="font-size:12px;color:#64748b;">Professional Suite</div>
        </div>
      </div>
      <div style="padding:22px 20px 20px;">
        <h2 style="margin:0 0 6px;font-size:22px;line-height:1.25;">${escapeHtml(title)}</h2>
        <p style="margin:0 0 16px;color:#475569;font-size:14px;">${escapeHtml(subtitle)}</p>
        <a href="${ctaUrl}" style="display:inline-block;background:#2563eb;color:#ffffff;text-decoration:none;font-weight:700;padding:12px 18px;border-radius:12px;">${escapeHtml(ctaText)}</a>
        <p style="margin:16px 0 0;color:#64748b;font-size:13px;line-height:1.5;">${escapeHtml(tip)}</p>
      </div>
    </div>
  </body>
</html>`;

const sendWithResend = async ({ to, subject, html }) => {
  if (!RESEND_API_KEY) {
    throw new Error("Missing RESEND_API_KEY. Set env before deploy.");
  }
  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: MAIL_FROM,
      to: [to],
      subject,
      html,
    }),
  });
  if (!response.ok) {
    const txt = await response.text();
    throw new Error(`Resend error: ${response.status} ${txt}`);
  }
};

exports.sendAuthEmail = onRequest({ cors: false, region: "us-central1" }, async (req, res) => {
  cors(req, res);
  if (req.method === "OPTIONS") return res.status(204).send("");
  if (req.method !== "POST") return json(res, 405, { ok: false, error: "method-not-allowed" });

  try {
    const { type, email, displayName } = req.body || {};
    const cleanEmail = String(email || "").trim().toLowerCase();
    if (!cleanEmail || !cleanEmail.includes("@")) return json(res, 400, { ok: false, error: "invalid-email" });
    if (!["verifyEmail", "resetPassword"].includes(type)) return json(res, 400, { ok: false, error: "invalid-type" });

    const actionCodeSettings = {
      url: `${APP_URL}?authAction=1`,
      handleCodeInApp: false,
    };

    let link = "";
    let subject = "";
    let html = "";
    const namePart = displayName ? String(displayName).trim() : "there";

    if (type === "verifyEmail") {
      link = await admin.auth().generateEmailVerificationLink(cleanEmail, actionCodeSettings);
      subject = "Verify your Work Report email";
      html = buildEmailHtml({
        title: "Verify your email",
        subtitle: `Hi ${namePart}, confirm your email to activate Work Report login.`,
        ctaText: "Verify Email",
        ctaUrl: link,
        tip: "If you did not create this account, you can ignore this email.",
      });
    } else {
      link = await admin.auth().generatePasswordResetLink(cleanEmail, actionCodeSettings);
      subject = "Reset your Work Report password";
      html = buildEmailHtml({
        title: "Reset your password",
        subtitle: `Hi ${namePart}, use this secure link to reset your Work Report password.`,
        ctaText: "Reset Password",
        ctaUrl: link,
        tip: "For security, this link expires automatically.",
      });
    }

    await sendWithResend({ to: cleanEmail, subject, html });
    return json(res, 200, { ok: true });
  } catch (err) {
    logger.error("sendAuthEmail failed", err);
    return json(res, 500, { ok: false, error: "send-failed" });
  }
});
