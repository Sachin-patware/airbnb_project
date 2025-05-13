const express= require("express");
const router=express.Router()
const Listing = require("../models/listing.js");
const WrapAsync = require("../utility/wrapAsync.js");
const { listingSchema } = require("../schemaValidation.js");


//listing validate middelware function
const validatelisting = (req, res, next) => {
  const { error } = listingSchema.validate(req.body);
  
  if (error) {
    const messages = error.details.map((err) => err.message).join("\n");
    console.log(messages);

    return res.status(400).json({ error: messages });
  } else {
    next();
  }
};


// show all listing
router.get(
  "/",
  WrapAsync(async (req, res) => {
    try {
      const alllistings = await Listing.find({});
      await res.json(alllistings);
    } catch (err) {
      res.status(500).json({ error: "Server error" });
    }
  })
);
// view details of listing
router.get(
  "/:id",
  WrapAsync(async (req, res) => {
    const { id } = req.params;
    const listing = await Listing.findById(id).populate("reviews");
    res.json(listing);
  })
);

// create new
router.post(
  "/",
  validatelisting,
  WrapAsync(async (req, res) => {
    const { error, value } = listingSchema.validate(req.body);
    try {
      const newListing = new Listing(value.listing);
      console.log(newListing);
      await newListing.save();

      res.status(200).json({ message: "Listing created successfully :)" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Something went wrong ❌" });
    }
  })
);

// update
router.put(
  "/:id",
  validatelisting,
  WrapAsync(async (req, res) => {
    const { id } = req.params;
     try{
      await Listing.findByIdAndUpdate(id, req.body.listing, {
        runValidators: true,
      });
      res.status(200).json({ message: "Listing update successfully" });
    }catch (error) {
      console.error(error);
      res.status(500).json({ error: "Something went wrong ❌" });
    }
  })
);

// delete route
router.delete(
  "/:id",
  WrapAsync(async (req, res) => {
    const { id } = req.params;

      const listingDelete = await Listing.findByIdAndDelete(id);
      console.log(listingDelete);
      res.status(200).json({message: "Successfully deleted"});
 
  })
);

module.exports=router;