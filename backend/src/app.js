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

Promise.all([ensureUsersCompatibilityColumns(), ensureAppDataTable(), ensurePublicSharesTable()]).catch((err) => {
  console.error("Startup schema ensure failed:", err);
});

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
