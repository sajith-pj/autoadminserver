const mongoose = require("mongoose");
const formSchema = new mongoose.Schema({
  template: [
    {
      container: { type: Object, required: true },
      label: { type: Object, required: true },
      input: { type: Object, required: true },
    },
  ],
  validation: {
    required: { type: Boolean },
    accept: { type: String, enum: ["All", "A", "N", "A&N"] },
    minimum: { type: String },
    maximum: { type: String },
  },
});

module.exports = mongoose.model("Form", formSchema);  
