var express = require("express");
const Panel = require("../../models/Panel");
var router = express.Router();

router.post("/", async (req, res) => {
  const { name, logo, sidebarList } = req.body;
  try {
    let isExist = await Panel.find({ name });
    if (isExist)
      return res
        .status(400)
        .json({ message: "Panel with name is already exists" });

    const newPanel = await Panel.create({
      name,
      logo,
      sidebar: sidebarList,
    });
    
    return res.status(200).json({ message: " Successfully created " });
  } catch (err) {
    return res.status(400).json({ message: "Something Went Wrong" });
  }
});

module.exports = router;
