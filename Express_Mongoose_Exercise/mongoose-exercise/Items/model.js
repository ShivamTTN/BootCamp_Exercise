const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const itemSchema = new Schema({
  name: {
    type: String,
    required: true,
    min: 5,
  },
  quantity: {
    type: Number,
    required: true,
  },
  isSanitized: Boolean,
  unit: {
    type: String,
    required: true,
  },
  expiryDate: {
    type: Date,
    default: null,
  },
  createdDate: {
    type: Date,
    default: Date.now,
  },
  updatedDate: {
    type: Date,
    default: null,
  },
  category: {
    type: String,
    enum: [
      "Grocery",
      "Medical",
      "Fruits & Veg",
      "Berverages",
      "Babycare.Cleaning",
    ],
  },
  location: {
    type: String,
    enum: ["Store", "Kitchen"],
  },
});

itemSchema.pre("update", function () {
  this.set({ updatedDate: Date.now() });
});

const itemModel = mongoose.model("Item", itemSchema);

module.exports = {
  itemModel,
};
