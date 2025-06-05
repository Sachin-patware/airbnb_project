const express = require("express");
const router = express.Router();
const WrapAsync = require("../utility/wrapAsync.js");
const { listingSchema } = require("../schemaValidation.js");
const { isLoggedIn } = require("../utility/isLogin.js");
const { isOwner } = require("../utility/isOwner.js");
const listingController = require("../controller/listing.jsx");
const multer = require("multer");
const { storage } = require("../utility/CloudConfig.js");
const upload = multer({ storage });


//listing validate middelware function
const validatelisting = (req, res, next) => {
    req.body = {
    listing: {
      title: req.body.title,
      description: req.body.description,
      price: Number(req.body.price),
      location: req.body.location,
      country: req.body.country,
      image_url: req.file?.path,
    },
  };
  const { error } = listingSchema.validate(req.body);

  if (error) {
    const messages = error.details.map((err) => err.message).join("\n");

    return res.status(400).json({ error: messages });
  } else {
    next();
  }
};
// all listings & create new
router
  .route("/")
  .get(WrapAsync(listingController.show))
  .post(
    isLoggedIn,
    upload.single("image_url"),
    validatelisting,
    WrapAsync(listingController.createlisting)
  );

// view details of listing
// update
// delete route
router
  .route("/:id")
  .get(WrapAsync(listingController.details))
  .put(
    isLoggedIn,
    isOwner,
    upload.single("image_url"),
    validatelisting,
    WrapAsync(listingController.updatelisting)
  )
  .delete(isLoggedIn, isOwner, WrapAsync(listingController.deletelisting));

module.exports = router;
