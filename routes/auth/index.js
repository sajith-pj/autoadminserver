var express = require("express");
const { signInController, signUpController } = require("../../controllers/auth");
const { body } = require("express-validator");
var router = express.Router();

router.post(
  "/signin",
  body("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Please enter a valid email address"),
  body("password")
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 6 })
    .withMessage("Password should contain atleast 6 characters"),
  signInController
);
router.post(
  "/signup",
  body("name").notEmpty().withMessage("Email is required"),
  body("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Please enter a valid email address"),
  body("phoneNumber").notEmpty().withMessage("Phone number is required"),
  body("password")
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 6 })
    .withMessage("Password should contain atleast 6 characters"),
  body("confirmPassword")
    .notEmpty()
    .withMessage("Please confirm your password ")
    .isLength({ min: 6 })
    .withMessage("Password should contain atleast 6 characters")
    .custom((value, { req }) => value === req.body.password),
  signUpController
);

module.exports = router;
