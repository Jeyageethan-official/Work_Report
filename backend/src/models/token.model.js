const { query } = require("../config/db");

async function createToken({ userId, tokenHash, tokenType, expiresAt }) {
  await query(
    `INSERT INTO auth_tokens (user_id, token_hash, token_type, expires_at)
     VALUES (:userId, :tokenHash, :tokenType, :expiresAt)`,
    { userId, tokenHash, tokenType, expiresAt }
  );
}

async function findValidToken({ tokenHash, tokenType }) {
  const rows = await query(
    `SELECT id, user_id, token_hash, token_type, expires_at, consumed_at, created_at
     FROM auth_tokens
     WHERE token_hash = :tokenHash
       AND token_type = :tokenType
       AND consumed_at IS NULL
       AND expires_at > UTC_TIMESTAMP()
     LIMIT 1`,
    { tokenHash, tokenType }
  );
  return rows[0] || null;
}

async function consumeToken(tokenId) {
  await query(
    `UPDATE auth_tokens
     SET consumed_at = UTC_TIMESTAMP()
     WHERE id = :tokenId`,
    { tokenId }
  );
}

async function consumeTokensByType(userId, tokenType) {
  await query(
    `UPDATE auth_tokens
     SET consumed_at = UTC_TIMESTAMP()
     WHERE user_id = :userId
       AND token_type = :tokenType
       AND consumed_at IS NULL`,
    { userId, tokenType }
  );
}

module.exports = {
  createToken,
  findValidToken,
  consumeToken,
  consumeTokensByType
};
