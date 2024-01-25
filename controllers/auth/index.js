const { validationResult } = require("express-validator");
const User = require("../../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const signInController = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.errors });
  }
  const { email, password } = req.body;
  const validUser = await User.findOne({ email });
  if (!validUser) {
    return res
      .status(401)
      .json({ errors: [{ msg: "Please enter a valid email address" }] });
  }


  const isPasswordValid = await bcrypt.compare(password, validUser.password);
  if (!isPasswordValid) {
    return res.status(400).json({ errors: [{ msg: "Incorrect password" }] });
  }

  const token = jwt.sign({ ...validUser, password: "" }, "secret", {
    expiresIn: "2 days",
  });
  return res.status(200).json({ message: "Logged In successfully", token });
};

const signUpController = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.errors });
  }

  const { name, email, password, phoneNumber } = req.body;
  const userAlreadyExists = await User.findOne({ email: email });
  if (userAlreadyExists)
    return res.status(400).json({ errors: [{ msg: "Email already in use" }] });

  let hashedPassword = await bcrypt.hash(password, 10);
  console.log(hashedPassword);

  const newUser = new User({
    name,
    email,
    password: hashedPassword,
    phoneNumber,
  });

  newUser
    .save()
    .then((data) => {
      return res.status(200).json({ message: `Account created successfully` });
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).json({ message: "Something went wrong" });
    });
};
module.exports = { signInController, signUpController };
