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

    image_url: Joi.string()
      .allow("")
      .uri({ scheme: ["http", "https"] })
      .messages({
        "string.uri": "Image URL must be a valid URL",
      }),

    price: Joi.number().min(0).required().messages({
      "any.required": "Price is required",
      "number.base": "Price must be a number",
      "number.min": "Price cannot be negative",
      "any.required": "Price is required",
    }),
     category: Joi.string()
      .valid(
        "trending",
        "home",
        "beach",
        "iconic cities",
        "mountains",
        "amazing pools",
        "farms",
        "castales",
        "arctic",
        "new",
        "camping"
      )
      .required(),


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

// user

module.exports.userSchema = Joi.object({
  username: Joi.string().trim().min(2).max(100).required().messages({
    "string.base": "Username must be a valid string",
    "string.empty": "Username is required",
    "string.min": "Username must be at least 2 characters",
    "string.max": "Username must not exceed 100 characters",
    "any.required": "Username is required",
  }),

  email: Joi.string()
    .trim()
    .lowercase()
    .email({ tlds: { allow: false } })
    .required()
    .messages({
      "string.base": "Email must be a valid string",
      "string.email": "Please enter a valid email address",
      "string.empty": "Email is required",
      "any.required": "Email is required",
    }),

  password: Joi.string()
    .min(8)
    .max(128)
    .pattern(
      new RegExp(
        "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$"
      )
    )
    .required()
    .messages({
      "string.base": "Password must be a valid string",
      "string.empty": "Password is required",
      "string.min": "Password must be at least 8 characters long",
      "string.max": "Password must not exceed 128 characters",
      "string.pattern.base":
        "Password must have uppercase, lowercase, number & special character",
      "any.required": "Password is required",
    }),
}).required();
