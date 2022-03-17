const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  productName: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  productCategory: {
    type: String,
    required: true,
  },
  productUrl: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Products", postSchema);
