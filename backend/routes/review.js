const express = require("express");
const router=express.Router({mergeParams:true})
const Listing = require("../models/listing.js");
const Review =require("../models/review.js");
const WrapAsync = require("../utility/wrapAsync.js");
const { reviewsSchema } = require("../schemaValidation.js");
const { isLoggedIn } = require('../utility/checkAuthoncation.js');
const { isAuthor } = require("../utility/isAuthor.js");



// validate review 
const validatereview = (req , res , next)=>{
  const { error } = reviewsSchema.validate(req.body,);

  if (error) {
    const messages = error.details.map((err) => err.message).join("\n");
    console.log(messages);

    return res.status(400).json({ error: messages });
  } else {
    next();
  }
}


// review post route
router.post(
  "/",
  isLoggedIn,
  validatereview,
  WrapAsync(async (req, res) => {
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
  })
);

// review delete route 
router.delete("/:reviewId",
  isLoggedIn,isAuthor,
   WrapAsync(async (req, res) => {
  const { id, reviewId } = req.params;

  await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
  const reviewDelete = await Review.findByIdAndDelete(reviewId);

  res.status(200).json({ message: "Successfully deleted" });
}));

module.exports=router;