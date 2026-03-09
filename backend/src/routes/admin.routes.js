const express = require("express");
const { requireAuth } = require("../middleware/auth.middleware");
const { requireOwner } = require("../middleware/admin.middleware");
const userController = require("../controllers/user.controller");

const router = express.Router();

router.get("/users", requireAuth, requireOwner, userController.listUsersAdmin);
router.patch("/users/:id/verify", requireAuth, requireOwner, userController.setUserVerifyStatus);
router.patch("/users/:id/status", requireAuth, requireOwner, userController.setUserDisabledStatus);

module.exports = router;
