const mongoose = require("mongoose");
const review = require("./review");
const { required } = require("joi");
const Schema = mongoose.Schema;
const default_link =
  "https://media.istockphoto.com/id/2155879397/photo/house-in-a-charming-neighborhood-with-stunning-sidewalk-landscaping.webp?a=1&b=1&s=612x612&w=0&k=20&c=LlqEpFyrJBmSZ8v3CshnYJo9X00p8Y7wGv3mIDNqpZ4=";


const listingSchema = new Schema({
  title: { type: String, required: true },
  description: String,
  image_url: {
    url: {
      type: String,
      default: default_link,
      set: (url) => (url === "" ? default_link : url),
    },
    filename: String,
  },
  price: Number,
   category: {
    type: String,
    enum: [
      "trending",
      "home",
      "beach",
      "iconic cities",    
      "mountains",
      "amazing pools",
      "farms",
      "castales",
      "arctic",
      "new",
      "camping",
    ],
    required: true,
  },
  location: String,
  country: String,
  reviews: [
    {
      type: Schema.Types.ObjectId,
      ref: "Review",
    },
  ],

  owner: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],

  Geometry: [{
    type: {
      type: String,
      enum: ["Point"],
      required: true,
    },
    coordinates: {
      type: [Number],
      required: true,
    },
  }],
});

listingSchema.post("findOneAndDelete", async (listing) => {
  if (listing) {
    await review.deleteMany({ _id: { $in: listing.reviews } });
  }
});

// model
const Listing = mongoose.model("Listing", listingSchema);

module.exports = Listing;
