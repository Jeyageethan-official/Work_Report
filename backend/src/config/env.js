const dotenv = require("dotenv");

dotenv.config();

const required = [
  "MYSQL_HOST",
  "MYSQL_USER",
  "MYSQL_DATABASE",
  "JWT_ACCESS_SECRET",
  "JWT_REFRESH_SECRET",
  "FRONTEND_URL",
  "APP_BASE_URL",
  "API_BASE_URL"
];

for (const key of required) {
  if (!process.env[key]) {
    throw new Error(`Missing required environment variable: ${key}`);
  }
}

function parseOrigins() {
  const values = (process.env.FRONTEND_URL || "")
    .split(",")
    .map((value) => value.trim())
    .filter(Boolean);
  const defaults = [
    "http://localhost:5500",
    "http://127.0.0.1:5500",
    "https://workreport.online",
    "https://www.workreport.online",
    "https://work-report-fe3da.web.app"
  ];
  defaults.forEach((origin) => {
    if (!values.includes(origin)) values.push(origin);
  });

  const appOrigin = (() => {
    try {
      return new URL(process.env.APP_BASE_URL).origin;
    } catch {
      return null;
    }
  })();

  if (appOrigin && !values.includes(appOrigin)) {
    values.push(appOrigin);
  }

  return values;
}

function parseOwnerEmails() {
  return (process.env.ADMIN_OWNER_EMAILS || "")
    .split(",")
    .map((value) => value.trim().toLowerCase())
    .filter(Boolean);
}

const env = {
  nodeEnv: process.env.NODE_ENV || "development",
  isProd: (process.env.NODE_ENV || "development") === "production",
  port: Number(process.env.PORT || 4000),
  frontendUrl: process.env.FRONTEND_URL.split(",")[0].trim(),
  frontendOrigins: parseOrigins(),
  appBaseUrl: process.env.APP_BASE_URL,
  apiBaseUrl: process.env.API_BASE_URL,
  db: {
    host: process.env.MYSQL_HOST,
    port: Number(process.env.MYSQL_PORT || 3306),
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD || "",
    database: process.env.MYSQL_DATABASE,
    connectionLimit: Number(process.env.MYSQL_CONNECTION_LIMIT || 10)
  },
  jwt: {
    accessSecret: process.env.JWT_ACCESS_SECRET,
    refreshSecret: process.env.JWT_REFRESH_SECRET,
    accessExpiresIn: process.env.JWT_ACCESS_EXPIRES_IN || "15m",
    refreshExpiresIn: process.env.JWT_REFRESH_EXPIRES_IN || "30d",
    rememberRefreshExpiresIn: process.env.JWT_REMEMBER_REFRESH_EXPIRES_IN || "60d"
  },
  cookie: {
    domain: process.env.COOKIE_DOMAIN || undefined,
    secure: String(process.env.COOKIE_SECURE || "false") === "true",
    sameSite: process.env.COOKIE_SAME_SITE || "lax"
  },
  bcryptSaltRounds: Number(process.env.BCRYPT_SALT_ROUNDS || 12),
  smtp: {
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT || 587),
    secure: String(process.env.SMTP_SECURE || "false") === "true",
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
    fromName: process.env.MAIL_FROM_NAME || "Work Report",
    fromEmail: process.env.MAIL_FROM_EMAIL || process.env.MAIL_FROM_EMAI || "noreply@workreport.online"
  },
  google: {
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackUrl: process.env.GOOGLE_CALLBACK_URL
  },
  adminApiKey: process.env.ADMIN_API_KEY || "",
  adminOwnerEmails: parseOwnerEmails(),
  firebase: {
    projectId: process.env.FIREBASE_PROJECT_ID || "",
    serviceAccountJson: process.env.FIREBASE_SERVICE_ACCOUNT_JSON || "",
    serviceAccountPath: process.env.FIREBASE_SERVICE_ACCOUNT_PATH || ""
  }
};

module.exports = env;
