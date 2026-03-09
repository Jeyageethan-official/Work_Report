const { query } = require("../config/db");

async function upsertShare({ id, ownerUserId, title, payload }) {
  await query(
    `INSERT INTO public_shares (id, owner_user_id, title, payload_json)
     VALUES (:id, :ownerUserId, :title, :payload)
     ON DUPLICATE KEY UPDATE
       title = VALUES(title),
       payload_json = VALUES(payload_json),
       updated_at = CURRENT_TIMESTAMP`,
    {
      id,
      ownerUserId,
      title,
      payload: JSON.stringify(payload || {})
    }
  );

  const rows = await query(
    `SELECT id, owner_user_id, title, payload_json, created_at, updated_at
     FROM public_shares
     WHERE id = :id
     LIMIT 1`,
    { id }
  );

  return rows[0] || null;
}

async function findShareById(id) {
  const rows = await query(
    `SELECT ps.id, ps.owner_user_id, ps.title, ps.payload_json, ps.created_at, ps.updated_at,
            u.full_name AS owner_name, u.email AS owner_email
     FROM public_shares ps
     LEFT JOIN users u ON u.id = ps.owner_user_id
     WHERE ps.id = :id
     LIMIT 1`,
    { id }
  );
  return rows[0] || null;
}

module.exports = {
  upsertShare,
  findShareById
};
