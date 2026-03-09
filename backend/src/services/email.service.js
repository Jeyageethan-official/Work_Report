const nodemailer = require("nodemailer");
const env = require("../config/env");
const ApiError = require("../utils/ApiError");

const transporter = nodemailer.createTransport({
  host: env.smtp.host,
  port: env.smtp.port,
  secure: env.smtp.secure,
  auth:
    env.smtp.user && env.smtp.pass
      ? {
          user: env.smtp.user,
          pass: env.smtp.pass
        }
      : undefined
});

function buildLayout({ title, subtitle, ctaLabel, ctaUrl, footerNote }) {
  return `
<!doctype html>
<html>
  <body style="margin:0;padding:0;background:#eef3ff;font-family:Inter,Segoe UI,Arial,sans-serif;color:#111827;">
    <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="padding:24px 12px;background:#eef3ff;">
      <tr>
        <td align="center">
          <table width="620" cellpadding="0" cellspacing="0" role="presentation" style="max-width:620px;width:100%;background:#ffffff;border:1px solid #d9e4ff;border-radius:18px;overflow:hidden;">
            <tr>
              <td style="padding:16px 20px;border-bottom:1px solid #e6ecff;">
                <table width="100%" role="presentation"><tr>
                  <td style="width:48px;"><div style="width:40px;height:40px;border-radius:12px;background:#dbeafe;color:#2563eb;font-weight:800;line-height:40px;text-align:center;">WR</div></td>
                  <td>
                    <div style="font-size:20px;font-weight:800;color:#0f172a;">Work Report</div>
                    <div style="font-size:12px;color:#64748b;">Professional Suite</div>
                  </td>
                </tr></table>
              </td>
            </tr>
            <tr>
              <td style="padding:24px 20px;">
                <h2 style="margin:0 0 8px 0;font-size:24px;color:#111827;">${title}</h2>
                <p style="margin:0 0 20px 0;font-size:14px;line-height:1.6;color:#475569;">${subtitle}</p>
                <a href="${ctaUrl}" style="display:inline-block;background:linear-gradient(135deg,#2563eb,#1d4ed8);color:#fff;text-decoration:none;padding:12px 20px;border-radius:12px;font-weight:700;font-size:14px;">${ctaLabel}</a>
              </td>
            </tr>
            <tr>
              <td style="padding:14px 20px;background:#f8faff;border-top:1px solid #e8efff;font-size:12px;color:#64748b;">${footerNote}</td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}

async function sendMail({ to, subject, html, text }) {
  try {
    await transporter.sendMail({
      from: `${env.smtp.fromName} <${env.smtp.fromEmail}>`,
      to,
      subject,
      html,
      text
    });
  } catch (error) {
    throw new ApiError(502, "Failed to send email. Please try again.", "EMAIL_SEND_FAILED");
  }
}

async function sendVerificationEmail({ to, fullName, verifyLink }) {
  const html = buildLayout({
    title: "Verify your email",
    subtitle: `Hi ${fullName || "there"}, confirm your email to activate Work Report account access.`,
    ctaLabel: "Verify Email",
    ctaUrl: verifyLink,
    footerNote: "If you did not request this, you can safely ignore this email."
  });
  await sendMail({
    to,
    subject: "Verify your Work Report email",
    html,
    text: `Verify your email: ${verifyLink}`
  });
}

async function sendResetPasswordEmail({ to, fullName, resetLink }) {
  const html = buildLayout({
    title: "Reset your password",
    subtitle: `Hi ${fullName || "there"}, use this secure link to reset your Work Report password.`,
    ctaLabel: "Reset Password",
    ctaUrl: resetLink,
    footerNote: "For security, this link expires soon. If you did not request this, ignore this email."
  });
  await sendMail({
    to,
    subject: "Reset your Work Report password",
    html,
    text: `Reset your password: ${resetLink}`
  });
}

module.exports = {
  sendVerificationEmail,
  sendResetPasswordEmail
};
