
const Listing = require("../models/listing.js");
const { listingSchema } = require("../schemaValidation.js");
const mbxGeocoding = require("@mapbox/mapbox-sdk/services/geocoding");
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const geocodingClient = mbxGeocoding({ accessToken: process.env.MAP_API_KEY });

// show all listings
module.exports.show = async (req, res) => {
  try {
    const alllistings = await Listing.find({});
    await res.json(alllistings);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};
//   details
module.exports.details = async (req, res) => {
  const { id } = req.params;
  const listing = await Listing.findById(id)
    .populate({
      path: "reviews",
      populate: {
        path: "author",
      },
    })
    .populate("owner");
  res.json(listing);
};
//   create
module.exports.createlisting = async (req, res) => {
  let response = await geocodingClient
    .forwardGeocode({
      query: req.body.listing.location,
      limit: 1,
    })
    .send();
  console.log(response.body.features[0].geometry, "----");

  const { error, value } = listingSchema.validate(req.body);
  let url = req.file ? req.file.path : "";
  let filename = req.file ? req.file.filename : "default.jpg";
  try {
    const newListing = new Listing(value.listing);
    newListing.image_url = { url, filename };
    newListing.owner = req.user._id;
    newListing.Geometry = response.body.features[0].geometry;
    console.log(newListing);
    await newListing.save();
    res.status(200).json({ message: "Listing created successfully :)" });
  } catch (error) {
    res.status(500).json({ error: "Added failed,Try Again!" });
  }
};
// update
module.exports.updatelisting = async (req, res) => {
  let response = await geocodingClient
    .forwardGeocode({
      query: req.body.listing.location,
      limit: 1,
    })
    .send();
  console.log(response.body.features[0].geometry, "----by update");

  const { id } = req.params;
  try {
    let update_listing = await Listing.findByIdAndUpdate(id, req.body.listing, {
      new: true,
      runValidators: true,
    });
    update_listing.Geometry = response.body.features[0].geometry;

    if (req.file) {
      const url = req.file.path;
      const filename = req.file.filename;
      console.log(url, "----", filename);
      update_listing.image_url = { url, filename };
    }
    await update_listing.save();
    res.status(200).json({ message: "Listing update successfully" });
  } catch (error) {
    res.status(500).json({ error: "Update failed,Try Again!" });
  }
};
// delete
module.exports.deletelisting = async (req, res) => {
  const { id } = req.params;
  const listingDelete = await Listing.findByIdAndDelete(id);
  console.log(listingDelete);
  res.status(200).json({ message: "Successfully Delete" });
};
