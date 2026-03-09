const { query } = require("../config/db");

async function findByEmail(email) {
  const rows = await query(
    `SELECT id, full_name, email, password_hash, is_email_verified, is_disabled, role, auth_provider, google_id, firebase_uid, avatar_url, last_login_at, created_at, updated_at
     FROM users
     WHERE email = :email
     LIMIT 1`,
    { email }
  );
  return rows[0] || null;
}

async function findById(id) {
  const rows = await query(
    `SELECT id, full_name, email, password_hash, is_email_verified, is_disabled, role, auth_provider, google_id, firebase_uid, avatar_url, last_login_at, created_at, updated_at
     FROM users
     WHERE id = :id
     LIMIT 1`,
    { id }
  );
  return rows[0] || null;
}

async function findByGoogleId(googleId) {
  const rows = await query(
    `SELECT id, full_name, email, password_hash, is_email_verified, is_disabled, role, auth_provider, google_id, firebase_uid, avatar_url, last_login_at, created_at, updated_at
     FROM users
     WHERE google_id = :googleId
     LIMIT 1`,
    { googleId }
  );
  return rows[0] || null;
}

async function createUser({ fullName, email, passwordHash, provider = "local", googleId = null, avatarUrl = null, isEmailVerified = false }) {
  const result = await query(
    `INSERT INTO users (full_name, email, password_hash, is_email_verified, auth_provider, google_id, avatar_url, role, is_disabled)
     VALUES (:fullName, :email, :passwordHash, :isEmailVerified, :provider, :googleId, :avatarUrl, 'user', 0)`,
    {
      fullName,
      email,
      passwordHash,
      isEmailVerified: isEmailVerified ? 1 : 0,
      provider,
      googleId,
      avatarUrl
    }
  );
  return findById(result.insertId);
}

async function markEmailVerified(userId) {
  await query(
    `UPDATE users
     SET is_email_verified = 1, updated_at = CURRENT_TIMESTAMP
     WHERE id = :userId`,
    { userId }
  );
}

async function updatePassword(userId, passwordHash) {
  await query(
    `UPDATE users
     SET password_hash = :passwordHash, updated_at = CURRENT_TIMESTAMP
     WHERE id = :userId`,
    { userId, passwordHash }
  );
}

async function updateFromGoogle(userId, { fullName, avatarUrl, googleId }) {
  await query(
    `UPDATE users
     SET full_name = :fullName,
         avatar_url = :avatarUrl,
         google_id = :googleId,
         auth_provider = CASE WHEN auth_provider = 'local' THEN 'local_google' ELSE 'google' END,
         is_email_verified = 1,
         updated_at = CURRENT_TIMESTAMP
     WHERE id = :userId`,
    { userId, fullName, avatarUrl, googleId }
  );
  return findById(userId);
}

async function setFirebaseUid(userId, firebaseUid) {
  await query(
    `UPDATE users
     SET firebase_uid = :firebaseUid, updated_at = CURRENT_TIMESTAMP
     WHERE id = :userId`,
    { userId, firebaseUid }
  );
}

async function updateLastLogin(userId) {
  await query(
    `UPDATE users
     SET last_login_at = UTC_TIMESTAMP(), updated_at = CURRENT_TIMESTAMP
     WHERE id = :userId`,
    { userId }
  );
}

async function updateEmailVerifiedById(userId, isEmailVerified) {
  await query(
    `UPDATE users
     SET is_email_verified = :isEmailVerified, updated_at = CURRENT_TIMESTAMP
     WHERE id = :userId`,
    { userId, isEmailVerified: isEmailVerified ? 1 : 0 }
  );
}

async function updateDisabledById(userId, isDisabled) {
  await query(
    `UPDATE users
     SET is_disabled = :isDisabled, updated_at = CURRENT_TIMESTAMP
     WHERE id = :userId`,
    { userId, isDisabled: isDisabled ? 1 : 0 }
  );
}

async function listUsersAdmin({ queryText = "", status = "all", limit = 50, cursor = null }) {
  const likeQuery = `%${queryText}%`;
  const safeLimit = Math.max(1, Math.min(Number(limit) || 50, 100));

  const rows = await query(
    `SELECT id, full_name, email, is_email_verified, is_disabled, role, auth_provider, google_id, firebase_uid, avatar_url, last_login_at, created_at, updated_at
     FROM users
     WHERE (:queryText = '' OR full_name LIKE :likeQuery OR email LIKE :likeQuery)
       AND (
         :status = 'all'
         OR (:status = 'enabled' AND is_disabled = 0)
         OR (:status = 'disabled' AND is_disabled = 1)
         OR (:status = 'verified' AND is_email_verified = 1)
         OR (:status = 'unverified' AND is_email_verified = 0)
       )
       AND (:cursor IS NULL OR id < :cursor)
     ORDER BY id DESC
     LIMIT :limit`,
    {
      queryText,
      likeQuery,
      status,
      cursor: cursor ? Number(cursor) : null,
      limit: safeLimit
    }
  );

  const nextCursor = rows.length === safeLimit ? rows[rows.length - 1].id : null;
  return { rows, nextCursor };
}

async function listRecent(limit = 100) {
  const rows = await query(
    `SELECT id, full_name, email, is_email_verified, is_disabled, role, auth_provider, google_id, firebase_uid, created_at, updated_at
     FROM users
     ORDER BY id DESC
     LIMIT :limit`,
    { limit: Number(limit) || 100 }
  );
  return rows;
}

module.exports = {
  findByEmail,
  findById,
  findByGoogleId,
  createUser,
  markEmailVerified,
  updatePassword,
  updateFromGoogle,
  setFirebaseUid,
  updateLastLogin,
  updateEmailVerifiedById,
  updateDisabledById,
  listUsersAdmin,
  listRecent
};
