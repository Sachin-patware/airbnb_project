const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
  comment: { type: String },
  rating: {
    type: Number,
    min: 1,
    max: 5,
  },
  author: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});
const review = mongoose.model("Review", reviewSchema);
module.exports = review;
