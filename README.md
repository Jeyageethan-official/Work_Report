# WorkReport

## Custom Branded Auth Email (Verify / Reset)

This project now includes Firebase Functions endpoint:

- `sendAuthEmail` (file: `functions/index.js`)

It sends branded email templates using Resend API instead of Firebase default plain template.

### 1. Install functions dependencies

```bash
cd functions
npm install
```

### 2. Set environment variables before deploy

```bash
export RESEND_API_KEY="re_xxx"
export MAIL_FROM="Work Report <no-reply@yourdomain.com>"
export APP_BASE_URL="https://work-report-fe3da.web.app"
```

### 3. Deploy functions + hosting

```bash
firebase deploy --only functions,hosting
```

### 4. DNS deliverability (required to reduce spam)

Use your own sender domain and configure:

- SPF
- DKIM
- DMARC

Without this, email can still land in spam even with custom template.
