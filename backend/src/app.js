const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const passport = require("./config/passport");
const env = require("./config/env");
const authRoutes = require("./routes/auth.routes");
const userRoutes = require("./routes/user.routes");
const adminRoutes = require("./routes/admin.routes");
const shareRoutes = require("./routes/share.routes");
const { query } = require("./config/db");
const { notFoundHandler, errorHandler } = require("./middleware/error.middleware");

const app = express();

app.set("trust proxy", 1);

app.use(
  helmet({
    crossOriginResourcePolicy: { policy: "cross-origin" }
  })
);

app.use(
  cors({
    origin(origin, cb) {
      if (!origin || env.frontendOrigins.includes(origin)) {
        return cb(null, true);
      }
      return cb(new Error("CORS origin denied"));
    },
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    credentials: true
  })
);

app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(passport.initialize());

async function ensureAppDataTable() {
  await query(
    `CREATE TABLE IF NOT EXISTS user_app_data (
      user_id BIGINT UNSIGNED NOT NULL,
      work_data LONGTEXT NOT NULL,
      reminders LONGTEXT NOT NULL,
      settings_json LONGTEXT NOT NULL,
      updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      PRIMARY KEY (user_id),
      CONSTRAINT fk_user_app_data_user
        FOREIGN KEY (user_id) REFERENCES users(id)
        ON DELETE CASCADE
    ) ENGINE=InnoDB`
  );
}

async function ensurePublicSharesTable() {
  await query(
    `CREATE TABLE IF NOT EXISTS public_shares (
      id VARCHAR(80) NOT NULL,
      owner_user_id BIGINT UNSIGNED NOT NULL,
      title VARCHAR(255) NOT NULL,
      payload_json LONGTEXT NOT NULL,
      created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      PRIMARY KEY (id),
      KEY idx_public_shares_owner (owner_user_id),
      CONSTRAINT fk_public_shares_user
        FOREIGN KEY (owner_user_id) REFERENCES users(id)
        ON DELETE CASCADE
    ) ENGINE=InnoDB`
  );
}

async function ensureCoreAuthTables() {
  await query(
    `CREATE TABLE IF NOT EXISTS users (
      id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
      full_name VARCHAR(120) NOT NULL,
      email VARCHAR(255) NOT NULL,
      password_hash VARCHAR(255) NULL,
      is_email_verified TINYINT(1) NOT NULL DEFAULT 0,
      is_disabled TINYINT(1) NOT NULL DEFAULT 0,
      auth_provider ENUM('local', 'google', 'local_google') NOT NULL DEFAULT 'local',
      role ENUM('user', 'owner') NOT NULL DEFAULT 'user',
      google_id VARCHAR(191) NULL,
      firebase_uid VARCHAR(128) NULL,
      avatar_url VARCHAR(500) NULL,
      last_login_at DATETIME NULL,
      created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      PRIMARY KEY (id),
      UNIQUE KEY uq_users_email (email),
      UNIQUE KEY uq_users_firebase_uid (firebase_uid),
      UNIQUE KEY uq_users_google_id (google_id),
      KEY idx_users_provider (auth_provider),
      KEY idx_users_verified (is_email_verified),
      KEY idx_users_role_disabled (role, is_disabled)
    ) ENGINE=InnoDB`
  );

  await query(
    `CREATE TABLE IF NOT EXISTS auth_tokens (
      id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
      user_id BIGINT UNSIGNED NOT NULL,
      token_hash CHAR(64) NOT NULL,
      token_type ENUM('EMAIL_VERIFY', 'PASSWORD_RESET') NOT NULL,
      expires_at DATETIME NOT NULL,
      consumed_at DATETIME NULL,
      created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
      PRIMARY KEY (id),
      UNIQUE KEY uq_auth_tokens_hash (token_hash),
      KEY idx_auth_tokens_user_type (user_id, token_type),
      KEY idx_auth_tokens_expiry (expires_at),
      CONSTRAINT fk_auth_tokens_user
        FOREIGN KEY (user_id) REFERENCES users(id)
        ON DELETE CASCADE
    ) ENGINE=InnoDB`
  );

  await query(
    `CREATE TABLE IF NOT EXISTS user_sessions (
      id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
      user_id BIGINT UNSIGNED NOT NULL,
      refresh_token_hash CHAR(64) NOT NULL,
      user_agent VARCHAR(500) NULL,
      ip_address VARCHAR(64) NULL,
      remember_me TINYINT(1) NOT NULL DEFAULT 0,
      is_revoked TINYINT(1) NOT NULL DEFAULT 0,
      revoked_at DATETIME NULL,
      expires_at DATETIME NOT NULL,
      created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
      PRIMARY KEY (id),
      UNIQUE KEY uq_user_sessions_refresh_hash (refresh_token_hash),
      KEY idx_user_sessions_user_id (user_id),
      KEY idx_user_sessions_expiry (expires_at),
      KEY idx_user_sessions_revoked (is_revoked),
      CONSTRAINT fk_user_sessions_user
        FOREIGN KEY (user_id) REFERENCES users(id)
        ON DELETE CASCADE
    ) ENGINE=InnoDB`
  );
}

async function ensureUsersCompatibilityColumns() {
  const rows = await query(
    `SELECT COLUMN_NAME
     FROM information_schema.COLUMNS
     WHERE TABLE_SCHEMA = :schema
       AND TABLE_NAME = 'users'`,
    { schema: env.db.database }
  );

  const existing = new Set(rows.map((r) => String(r.COLUMN_NAME || "").toLowerCase()));
  const alters = [];

  if (!existing.has("is_disabled")) {
    alters.push("ADD COLUMN is_disabled TINYINT(1) NOT NULL DEFAULT 0");
  }
  if (!existing.has("role")) {
    alters.push("ADD COLUMN role ENUM('user','owner') NOT NULL DEFAULT 'user'");
  }
  if (!existing.has("firebase_uid")) {
    alters.push("ADD COLUMN firebase_uid VARCHAR(128) NULL");
  }
  if (!existing.has("last_login_at")) {
    alters.push("ADD COLUMN last_login_at DATETIME NULL");
  }

  if (alters.length > 0) {
    await query(`ALTER TABLE users ${alters.join(", ")}`);
  }

  try {
    await query("CREATE UNIQUE INDEX ux_users_firebase_uid ON users (firebase_uid)");
  } catch (err) {
    if (String(err.message || "").toLowerCase().includes("duplicate key name")) {
      // already exists
    } else {
      throw err;
    }
  }
}

(async () => {
  try {
    await ensureCoreAuthTables();
    await ensureUsersCompatibilityColumns();
    await ensureAppDataTable();
    await ensurePublicSharesTable();
  } catch (err) {
    console.error("Startup schema ensure failed:", err);
  }
})();

app.get("/health", async (req, res) => {
  try {
    await query("SELECT 1");
    res.json({ ok: true, uptime: process.uptime(), db: "up" });
  } catch (err) {
    res.status(500).json({ ok: false, uptime: process.uptime(), db: "down" });
  }
});

app.get("/health/firebase", async (req, res) => {
  res.status(410).json({
    ok: false,
    code: "FIREBASE_BRIDGE_REMOVED",
    message: "Firebase bridge is disabled in MySQL-only mode."
  });
});

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/share", shareRoutes);

app.use(notFoundHandler);
app.use(errorHandler);

module.exports = app;
