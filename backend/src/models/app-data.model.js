const { query } = require("../config/db");

function safeStringify(value, fallback) {
  try {
    return JSON.stringify(value ?? fallback);
  } catch {
    return JSON.stringify(fallback);
  }
}

async function getAppDataByUserId(userId) {
  const rows = await query(
    `SELECT user_id, work_data, reminders, settings_json, updated_at
     FROM user_app_data
     WHERE user_id = :userId
     LIMIT 1`,
    { userId }
  );

  if (!rows[0]) {
    return {
      userId,
      workData: {},
      reminders: [],
      settings: {}
    };
  }

  const row = rows[0];
  return {
    userId: row.user_id,
    workData: JSON.parse(row.work_data || "{}"),
    reminders: JSON.parse(row.reminders || "[]"),
    settings: JSON.parse(row.settings_json || "{}"),
    updatedAt: row.updated_at || null
  };
}

async function upsertAppDataByUserId(userId, { workData = {}, reminders = [], settings = {} }) {
  await query(
    `INSERT INTO user_app_data (user_id, work_data, reminders, settings_json)
     VALUES (:userId, :workData, :reminders, :settings)
     ON DUPLICATE KEY UPDATE
       work_data = VALUES(work_data),
       reminders = VALUES(reminders),
       settings_json = VALUES(settings_json),
       updated_at = CURRENT_TIMESTAMP`,
    {
      userId,
      workData: safeStringify(workData, {}),
      reminders: safeStringify(reminders, []),
      settings: safeStringify(settings, {})
    }
  );

  return getAppDataByUserId(userId);
}

module.exports = {
  getAppDataByUserId,
  upsertAppDataByUserId
};
