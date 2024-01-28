var express = require("express");
const Panel = require("../../models/Panel");
var router = express.Router();

router.post("/new", async (req, res) => {
  const { name, logo } = req.body;
  try {
    let isExist = await Panel.find({ name });
    if (isExist)
      return res.status(400).json({ message: "Panel name is already exists" });

    const newPanel = await Panel.create({
      name,
      logo,
    });
    newPanel.save().then(() => {
      return res.status(200).json({ message: "Panel created successfully " });
    });
  } catch (err) {
    return res.status(400).json({ message: "Something Went Wrong" });
  }
});

module.exports = router;
