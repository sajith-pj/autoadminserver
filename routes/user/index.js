var express = require("express");
const verifyToken = require("../../middleware/auth");
const { getProfileDetails } = require("../../controllers/profile");
var router = express.Router();
router.get("/", verifyToken, getProfileDetails);
module.exports = router;
