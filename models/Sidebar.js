const mongoose = require("mongoose");

const sidebarSchema = new mongoose.Schema({
  label: { type: String, required: true },
  path: { type: String, required: true },
});

module.exports = mongoose.model("Sidebar", sidebarSchema);
