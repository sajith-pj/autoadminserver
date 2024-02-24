const { validationResult } = require("express-validator");
const Page = require("../models/Page");
const Panel = require("../models/Panel");
const { default: mongoose } = require("mongoose");
const Sidebar = require("../models/Sidebar");
const { ObjectId } = mongoose.Types;

const createNewPage = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.errors });
  }
  const { label, path, isInnerPage, sidebarGroup, selectedPanel } = req.body;

  const panel = await Panel.findOne({ _id: selectedPanel });
  if (!panel)
    return res.status(400).json({ errors: [{ msg: "Invalid panel" }] });

  const pageWithSameLabel = await Page.findOne({ label });
  if (pageWithSameLabel)
    return res
      .status(400)
      .json({ errors: [{ msg: "Label is already exist" }] });

  const pageWithSamePath = await Page.findOne({ path });
  if (pageWithSamePath)
    return res.status(400).json({ errors: [{ msg: "Path is already exist" }] });

  const newPage = new Page({
    panelID: new ObjectId(panel._id),
    createdBy: new ObjectId(req.user._id),
    label,
    path,
    isInnerPage,
    sidebarGroup,
  });
  newPage
    .save()
    .then(async (page) => {
      try {
        const sidebarGroupWithSameGroupName = await Sidebar.findOne({
          groupName: sidebarGroup,
        });
        let newSidebarOption = undefined;

        if (sidebarGroupWithSameGroupName) {
          Sidebar.findOneAndUpdate(
            { groupName: sidebarGroup },
            { $push: { items: { label, path } } }
          )
            .then(() => {
              return res
                .status(200)
                .json({ message: `${label} created successfully` });
            })
            .catch((error) => {
              console.log(error);
              return res
                .status(500)
                .json({ errors: [{ msg: "Something Went Wrong" }] });
            });
        } else if (
          !sidebarGroupWithSameGroupName &&
          sidebarGroup &&
          sidebarGroup !== ""
        ) {
          newSidebarOption = await Sidebar.create({
            panelID: panel._id,
            pageID: page._id,
            userID: req.user._id,
            groupName: sidebarGroup,
            items: [{ label, path }],
            type: "group",
          });
        } else {
          newSidebarOption = await new Sidebar({
            label,
            path,
            type: "single",
          });
        }

        if (newSidebarOption) {
          Panel.findOneAndUpdate(
            { _id: new ObjectId(panel._id) },
            { $push: { sidebar: newSidebarOption._id, pages: page._id } }
          )
            .then(() => {
              return res
                .status(200)
                .json({ message: `${label} created successfully` });
            })
            .catch((error) => {
              console.log(error);
              return res
                .status(200)
                .json({ message: `${label} created successfully` });
            });
        }
      } catch (error) {
        return res
          .status(500)
          .json({ errors: [{ msg: "Something Went Wrong" }] });
      }
    })
    .catch((error) => {
      console.log(error);
      return res.status(400).json({ message: `Something Went Wrong` });
    });
};

const getAllPages = async (req, res) => {
  const { panelId } = req.params;
  try {
    const allPages = await Page.find({
      panelID: new ObjectId(panelId),
      createdBy: new ObjectId(req.user._id),
    });
    return res
      .status(200)
      .json({ message: "Pages listed successfully", data: allPages });
  } catch (error) {
    return res.status(500).json({ message: "Something Went Wrong", data: [] });
  }
};

module.exports = { createNewPage, getAllPages };
