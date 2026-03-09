const express = require("express");
const { requireAuth } = require("../middleware/auth.middleware");
const { requireOwner } = require("../middleware/admin.middleware");
const userController = require("../controllers/user.controller");

const router = express.Router();

router.get("/profile", requireAuth, userController.getProfile);
router.get("/app-data", requireAuth, userController.getMyAppData);
router.put("/app-data", requireAuth, userController.saveMyAppData);
router.get("/admin/users", requireAuth, requireOwner, userController.listUsersAdmin);
router.patch("/admin/users/:id/verify", requireAuth, requireOwner, userController.setUserVerifyStatus);
router.patch("/admin/users/:id/status", requireAuth, requireOwner, userController.setUserDisabledStatus);

module.exports = router;
