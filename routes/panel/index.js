var express = require("express");
const verifyToken = require("../../middleware/auth");
const { createNewPanel, getPanelList } = require("../../controllers/panel");
var router = express.Router();

router.get("/list/", verifyToken, getPanelList);
router.post("/list", verifyToken, createNewPanel);

module.exports = router;
