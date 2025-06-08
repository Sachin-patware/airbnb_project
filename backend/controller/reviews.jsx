const Listing = require("../models/listing.js");
const Review =require("../models/review.js");

// create
module.exports.createReview=async (req, res) => {
    const { id } = req.params;
    try {
    let listing = await Listing.findById(id);
      const newReview = new Review(req.body.review);
      newReview.author=req.user._id;
      listing.reviews.push(newReview);
       console.log(newReview)
      await listing.save();
      await newReview.save();
      res.status(200).json({ message: "review created successfully :)" });
    } catch (error) {
      res.status(500).json({ error: "Something went wrong ❌" });
    }
  }
// delete
module.exports.deleteReview=async (req, res) => {
  const { id, reviewId } = req.params;

  await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
  const reviewDelete = await Review.findByIdAndDelete(reviewId);
  console.log(reviewDelete)
  res.status(200).json({ message: "Successfully deleted" });
}