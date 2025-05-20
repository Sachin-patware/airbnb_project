const Listing = require("../models/listing");

module.exports.isOwner = async(req, res, next) => {
  let {id}=req.params;
  let listing= await Listing.findById(id);
if (!listing.owner[0]._id.equals(req.user._id)) {
     return res.status(400).json({
      isowner:true,
      warning: "You don't have to permission",
    });
}
    next();
};
