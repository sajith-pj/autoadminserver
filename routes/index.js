var express = require("express");
var router = express.Router();

router.use("/auth", require("./auth"));
router.use("/profile", require("./user"));
router.use("/panel", require("./panel"));
router.use("/pages", require("./page"));

module.exports = router;
