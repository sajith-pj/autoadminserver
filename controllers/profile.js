const User = require("../models/User");

const getProfileDetails = async (req, res) => {
  const user = await User.findOne({ email: req.user.email });
  console.log(req.user);
  if (!user)
    return res
      .status(401)
      .json({ data: {}, message: "Unauthorized: Invalid email" });

  return res
    .status(200)
    .json({
      data: { ...user._doc, password: "" },
      message: "User profile fetched",
    });
};

module.exports = { getProfileDetails };
