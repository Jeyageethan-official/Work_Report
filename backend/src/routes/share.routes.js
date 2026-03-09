const express = require("express");
const { requireAuth } = require("../middleware/auth.middleware");
const shareController = require("../controllers/share.controller");

const router = express.Router();

router.post("/monthly", requireAuth, shareController.createMonthlyShare);
router.get("/:id", shareController.getPublicShare);

module.exports = router;
