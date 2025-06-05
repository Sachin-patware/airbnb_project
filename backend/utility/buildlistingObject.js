
const buildListingObject = (req, res, next) => {
  req.body.listing = {
    title: req.body.title,
    description: req.body.description,
    price: req.body.price,
    location: req.body.location,
    country: req.body.country,
    image_url: req.file?.path || "",
  };
  next();
};
