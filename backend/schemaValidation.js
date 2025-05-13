const Joi = require("joi");

module.exports.listingSchema = Joi.object({
  listing: Joi.object({
    title: Joi.string().min(3).max(100).required().messages({
      "any.required": "Title is required",
      "string.empty": "Title is required ",
      "string.min": "Title must be at least 3 characters",
      "string.max": "Title must be under 100 characters",
    }),

    description: Joi.string().min(10).max(200).required().messages({
      "any.required": "Description is required",
      "string.empty": "Description is required ",
      "string.min": "Description must be at least 10 characters",
    }),

    image_url: Joi.string().uri().empty("").messages({
      "string.empty": "Image URL is required",
      "string.uri": "Image URL must be a valid URL",
    }),

    price: Joi.number().min(0).required().messages({
      "any.required": "Price is required",
      "number.base": "Price must be a number",
      "number.min": "Price cannot be negative",
      "any.required": "Price is required",
    }),

    location: Joi.string().min(2).max(100).required().messages({
      "any.required": "Location is required",
      "string.empty": "Location is required",
      "string.min": "Location must be at least 2 characters",
    }),

    country: Joi.string().min(2).max(100).required().messages({
      "any.required": "Country is required",
      "string.empty": "Country is required",
      "string.min": "Country must be at least 2 characters",
    }),
  }).required(),
}).required();

// review
module.exports.reviewsSchema = Joi.object({
  review: Joi.object({
    rating: Joi.number().min(1).max(5).required(),
    comment: Joi.string().min(2).max(20000).required().messages({
      "any.required": "comment is required",
      "string.empty": "comment is required",
      "string.min": "comment must be at least 2 characters",
    }),
  }).required(),
}).required();
