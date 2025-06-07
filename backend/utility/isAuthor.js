const Review = require("../models/review");

module.exports.isAuthor = async(req, res, next) => {
  let {reviewId }=req.params;
  let review= await Review.findById(reviewId );
if (!review.author[0]._id.equals(req.user._id)) {
     return res.status(400).json({
      warning_author: "You don't have to permission to delete review",
    });
}
    next();
};
