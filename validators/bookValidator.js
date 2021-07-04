const Joi = require('joi');

// Account API validation
const book_validator = Joi.object({
  name: Joi.string().min(1).required(),
  author: Joi.string().min(1).required(),
  number_of_copy: Joi.number().required(),
  release_date: Joi.date().required()

})
const book_update_validator = Joi.object({
    name: Joi.string().min(1),
    author: Joi.string().min(1),
    number_of_copy: Joi.number(),
    release_date: Joi.date()
  
  })


module.exports = {
    book_validator,
    book_update_validator
}