# WorkReport

## Premium Branded Auth Emails (Blaze)

This app supports branded emails for:
- Verify Email
- Forgot Password

using Firebase Functions + Resend.

### 1) Install function deps

```bash
cd functions
npm install
```

### 2) Set required function secret

```bash
firebase functions:secrets:set RESEND_API_KEY
```

### 3) Set sender + app URL params

Create file: `functions/.env.work-report-fe3da`

```bash
APP_BASE_URL=https://work-report-fe3da.web.app
MAIL_FROM=Work Report <no-reply@yourdomain.com>
```

### 4) Deploy

```bash
cd ..
firebase deploy --only functions,hosting
```

### 5) Deliverability setup (important)

For better inbox delivery (less spam), configure sender domain with:
- SPF
- DKIM
- DMARC

> Note: No provider can guarantee 100% inbox for every recipient, but this setup is the professional standard.
