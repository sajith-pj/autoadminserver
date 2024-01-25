var express = require("express");
var router = express.Router();

router.use("/auth", require("./auth"));
router.use("/panel", require("./panel"));

module.exports = router;
