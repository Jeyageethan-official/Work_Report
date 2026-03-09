const crypto = require("crypto");
const asyncHandler = require("../utils/asyncHandler");
const ApiError = require("../utils/ApiError");
const shareModel = require("../models/share.model");

function makeShareId(userId, year, month) {
  const input = `${userId}:${year}:${month}`;
  const digest = crypto.createHash("sha256").update(input).digest("hex").slice(0, 20);
  return `rpt_${digest}_${year}_${month}`;
}

const createMonthlyShare = asyncHandler(async (req, res) => {
  const year = Number(req.body?.year);
  const month = Number(req.body?.month);
  const payload = req.body?.payload || {};

  if (!Number.isInteger(year) || year < 2000 || year > 2100) {
    throw new ApiError(400, "Invalid year", "INVALID_YEAR");
  }
  if (!Number.isInteger(month) || month < 1 || month > 12) {
    throw new ApiError(400, "Invalid month", "INVALID_MONTH");
  }

  const id = makeShareId(req.user.id, year, month);
  const title = `Work Report - ${String(month).padStart(2, "0")}/${year}`;

  const row = await shareModel.upsertShare({
    id,
    ownerUserId: req.user.id,
    title,
    payload
  });

  res.json({
    ok: true,
    shareId: id,
    share: {
      id: row.id,
      title: row.title,
      createdAt: row.created_at,
      updatedAt: row.updated_at
    }
  });
});

const getPublicShare = asyncHandler(async (req, res) => {
  const shareId = String(req.params.id || "").trim();
  if (!shareId) {
    throw new ApiError(400, "Invalid share id", "INVALID_SHARE_ID");
  }

  const row = await shareModel.findShareById(shareId);
  if (!row) {
    throw new ApiError(404, "Shared report not found", "SHARE_NOT_FOUND");
  }

  let payload = {};
  try {
    payload = JSON.parse(row.payload_json || "{}");
  } catch {
    payload = {};
  }

  res.json({
    ok: true,
    share: {
      id: row.id,
      title: row.title,
      ownerName: row.owner_name || row.owner_email || "User",
      payload,
      createdAt: row.created_at,
      updatedAt: row.updated_at
    }
  });
});

module.exports = {
  createMonthlyShare,
  getPublicShare
};
