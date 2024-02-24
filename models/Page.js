const mongoose = require("mongoose");

const pageSchema = new mongoose.Schema(
  {
    panelID: { type: mongoose.Types.ObjectId, required: true },
    createdBy: { type: mongoose.Types.ObjectId, required: true },
    label: { type: String, required: true },
    path: { type: String, required: true },
    sidebarGroup: { type: String },
    isInnerPage: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Page", pageSchema);
