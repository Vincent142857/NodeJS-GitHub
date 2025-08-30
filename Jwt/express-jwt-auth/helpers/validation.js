const Joi = require("joi"); //validation


const userValidate = (data) => {
  const userSchema = Joi.object({
    email: Joi.string().pattern(new RegExp("gmail.com$")).email().lowercase().required(),
    password: Joi.string().min(4).max(32).required(),
    confirmPassword: Joi.string().valid(Joi.ref('password')).required().messages({
      'any.only': 'Confirm password does not match password'
    }),
    firstName: Joi.string().min(2).max(32).required(),
    lastName: Joi.string().min(2).max(32).required(),
    phone: Joi.string().pattern(new RegExp("^[0-9]{10,11}$")).required(),
    address: Joi.string().min(5).max(255).required(),
    role: Joi.string().valid('user', 'admin').required()
  }).options({
    abortEarly: false, // return all errors
    allowUnknown: true, // allow additional properties
    stripUnknown: true // remove additional properties
  });

  return userSchema.validate(data);
}

const productValidate = (data) => {
  const productSchema = Joi.object({
    name: Joi.string().min(2).max(255).required(),
    description: Joi.string().min(5).max(1000).required(),
    price: Joi.number().min(0).required(),
    stock: Joi.number().min(0).required(),
    category: Joi.string().min(2).max(255).required(),
    image: Joi.string().uri().required()
  }).options({
    abortEarly: false, // return all errors
    allowUnknown: true, // allow additional properties
    stripUnknown: true // remove additional properties
  });

  return productSchema.validate(data);
}


module.exports = {
  userValidate,
  productValidate
}