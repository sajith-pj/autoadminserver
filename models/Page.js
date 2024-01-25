const mongoose = require("mongoose");

const pageSchema = new mongoose.Schema({
  title: { type: String, required: true },
  subTitle: { type: String, required: true },
  components: [
    { type: Schema.Types.ObjectId, required: true, refPath: "componentName" },
  ],
  componentName: { type: String, required: true, enum: ["Form,Table"] },
});

module.exports = mongoose.model("Page", pageSchema);
