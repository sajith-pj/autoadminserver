const { default: mongoose } = require("mongoose");
const Panel = require("../models/Panel");
const { ObjectId } = mongoose.Types;

const createNewPanel = async (req, res) => {
  const { panelName, panelLogo } = req.body;
  try {
    let isExist = await Panel.findOne({ name: panelName });
    if (isExist)
      return res.status(400).json({ message: "Panel name is already exists" });
    const newPanel = new Panel({
      createdBy: new ObjectId(req.user._id),
      name: panelName,
      logo: panelLogo,
    });
    newPanel.save().then(() => {
      return res.status(200).json({ message: "Panel created successfully " });
    });
  } catch (err) {
    return res.status(400).json({ message: "Something Went Wrong" });
  }
};

const getPanelList = async (req, res) => {
  try {
    const panels = await Panel.find();
    return res
      .status(200)
      .json({ data: panels, message: "Panels fetched successfully" });
  } catch (error) {
    return res.status(400).json({ errors: [{ msg: "Something Went Wrong" }] });
  }
};

module.exports = { createNewPanel, getPanelList };
