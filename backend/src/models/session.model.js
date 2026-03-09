const { query } = require("../config/db");

async function createSession({ userId, refreshTokenHash, userAgent, ipAddress, expiresAt, rememberMe }) {
  const result = await query(
    `INSERT INTO user_sessions (user_id, refresh_token_hash, user_agent, ip_address, expires_at, remember_me)
     VALUES (:userId, :refreshTokenHash, :userAgent, :ipAddress, :expiresAt, :rememberMe)`,
    {
      userId,
      refreshTokenHash,
      userAgent,
      ipAddress,
      expiresAt,
      rememberMe: rememberMe ? 1 : 0
    }
  );
  return result.insertId;
}

async function findValidSession(refreshTokenHash) {
  const rows = await query(
    `SELECT id, user_id, refresh_token_hash, is_revoked, expires_at, remember_me
     FROM user_sessions
     WHERE refresh_token_hash = :refreshTokenHash
       AND is_revoked = 0
       AND expires_at > UTC_TIMESTAMP()
     LIMIT 1`,
    { refreshTokenHash }
  );
  return rows[0] || null;
}

async function revokeSessionByToken(refreshTokenHash) {
  await query(
    `UPDATE user_sessions
     SET is_revoked = 1, revoked_at = UTC_TIMESTAMP()
     WHERE refresh_token_hash = :refreshTokenHash
       AND is_revoked = 0`,
    { refreshTokenHash }
  );
}

async function revokeAllUserSessions(userId) {
  await query(
    `UPDATE user_sessions
     SET is_revoked = 1, revoked_at = UTC_TIMESTAMP()
     WHERE user_id = :userId
       AND is_revoked = 0`,
    { userId }
  );
}

module.exports = {
  createSession,
  findValidSession,
  revokeSessionByToken,
  revokeAllUserSessions
};
