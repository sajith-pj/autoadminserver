var express = require("express");
const verifyToken = require("../../middleware/auth");
const { createNewPage, getAllPages } = require("../../controllers/page");
const { body } = require("express-validator");
var router = express.Router();

router.post(
  "/list",
  body("label").notEmpty().withMessage("Label is required"),
  body("path").notEmpty().withMessage("Path is required"),
  body("selectedPanel").notEmpty().withMessage("selectedPanel ID is required"),
  body("isInnerPage")
    .notEmpty()
    .withMessage("Path is required")
    .isBoolean()
    .withMessage("isInnerPage should be boolean"),
  verifyToken,
  createNewPage
);
router.get("/list/:panelId", verifyToken, getAllPages);

module.exports = router;
