const express = require("express");
const router = express.Router({ mergeParams: true });
const WrapAsync = require("../utility/wrapAsync.js");
const { reviewsSchema } = require("../schemaValidation.js");
const { isLoggedIn } = require("../utility/isLogin.js");
const { isAuthor } = require("../utility/isAuthor.js");
const ReviewController = require("../controller/reviews.jsx");

// validate review
const validatereview = (req, res, next) => {
  const { error } = reviewsSchema.validate(req.body);

  if (error) {
    const messages = error.details.map((err) => err.message).join("\n");
    console.log(messages);

    return res.status(400).json({ error: messages });
  } else {
    next();
  }
};

// review post route
router.post(
  "/",
  isLoggedIn,
  validatereview,
  WrapAsync(ReviewController.createReview)
);

// review delete route
router.delete(
  "/:reviewId",
  isLoggedIn,
  isAuthor,
  WrapAsync(ReviewController.deleteReview)
);

module.exports = router;
