const mongoose = require("mongoose");

const sidebarSchema = new mongoose.Schema({
  panelID: { type: mongoose.Types.ObjectId, required: true },
  pageID: { type: mongoose.Types.ObjectId, required: true },
  userID: { type: mongoose.Types.ObjectId, required: true },
  label: { type: String },
  path: { type: String },
  groupName: String,
  items: [
    {
      label: String,
      path: String,
    },
  ],
  type: { type: String, default: "single", enum: ["single", "group"] },
});

module.exports = mongoose.model("Sidebar", sidebarSchema);
