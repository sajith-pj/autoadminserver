const mongoose = require("mongoose");

const panelSchema = new mongoose.Schema({
  name: { type: String, required: true },
  logo: { type: String },
  sidebar: [{ type: mongoose.Schema.Types.ObjectId, ref: "Sidebar" }],
  pages: [{ type: mongoose.Schema.Types.ObjectId, ref: "Page" }],
});

module.exports = mongoose.model("Panel", panelSchema);
