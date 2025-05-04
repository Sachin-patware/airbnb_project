

const Joi = require('joi');

module.exports.listingSchema = Joi.object({
  listing: Joi.object({
    title: Joi.string()
      .min(3)
      .max(100)
      .required()
      .messages({
        'string.empty': 'Title is required',
        'string.min': 'Title must be at least 3 characters',
        'string.max': 'Title must be under 100 characters',
      }),

    description: Joi.string()
      .min(10)
      .max(200)
      .required()
      .messages({
        'string.empty': 'Description is required',
        'string.min': 'Description must be at least 10 characters',
      }),

      image_url: Joi.string()
      .uri()
      .empty('')
      .messages({
        'string.empty': 'Image URL is required',
        'string.uri': 'Image URL must be a valid URL',
      }),
    

    price: Joi.number()
      .min(0)
      .required()
      .messages({
        'number.base': 'Price must be a number',
        'number.min': 'Price cannot be negative',
        'any.required': 'Price is required',
      }),

    location: Joi.string()
      .min(2)
      .max(100)
      .required('Location is required')
      .messages({
        'string.empty': 'Location is required',
        'string.min': 'Location must be at least 2 characters',
      }),

    country: Joi.string()
      .min(2)
      .max(100)
      .required()
      .messages({
        'string.empty': 'Country is required',
        'string.min': 'Country must be at least 2 characters',
      }),

  }).required()
});
