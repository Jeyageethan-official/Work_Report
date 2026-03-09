const asyncHandler = require("../utils/asyncHandler");
const userModel = require("../models/user.model");
const appDataModel = require("../models/app-data.model");

const getProfile = asyncHandler(async (req, res) => {
  res.json({ ok: true, user: req.user });
});

const listUsersAdmin = asyncHandler(async (req, res) => {
  const { rows, nextCursor } = await userModel.listUsersAdmin({
    queryText: (req.query.query || "").trim(),
    status: (req.query.status || "all").trim(),
    limit: Number(req.query.limit || 50),
    cursor: req.query.cursor ? Number(req.query.cursor) : null
  });
  res.json({ ok: true, users: rows, nextCursor });
});

const setUserVerifyStatus = asyncHandler(async (req, res) => {
  const userId = Number(req.params.id);
  const isEmailVerified = Boolean(req.body.isEmailVerified);
  await userModel.updateEmailVerifiedById(userId, isEmailVerified);
  const user = await userModel.findById(userId);
  res.json({ ok: true, user });
});

const setUserDisabledStatus = asyncHandler(async (req, res) => {
  const userId = Number(req.params.id);
  const isDisabled = Boolean(req.body.isDisabled);
  await userModel.updateDisabledById(userId, isDisabled);
  const user = await userModel.findById(userId);
  res.json({ ok: true, user });
});

const getMyAppData = asyncHandler(async (req, res) => {
  const data = await appDataModel.getAppDataByUserId(req.user.id);
  res.json({ ok: true, data });
});

const saveMyAppData = asyncHandler(async (req, res) => {
  const payload = {
    workData: req.body?.workData && typeof req.body.workData === "object" ? req.body.workData : {},
    reminders: Array.isArray(req.body?.reminders) ? req.body.reminders : [],
    settings: req.body?.settings && typeof req.body.settings === "object" ? req.body.settings : {}
  };

  const data = await appDataModel.upsertAppDataByUserId(req.user.id, payload);
  res.json({ ok: true, data });
});

module.exports = {
  getProfile,
  getMyAppData,
  saveMyAppData,
  listUsersAdmin,
  setUserVerifyStatus,
  setUserDisabledStatus
};
