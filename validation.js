const Joi = require("@hapi/joi");

//  User registration
exports.registerValidation = (data) => {
  const schema = Joi.object({
    name: Joi.string().min(6).required(),
    password: Joi.string().min(6).required(),
  });
  return schema.validate({
    name: data.username,
    password: data.password,
  });
};

//  User login
exports.loginValidation = (data) => {
  const schema = Joi.object({
    name: Joi.string().min(6).required(),
    password: Joi.string().min(6).required(),
  });
  return schema.validate({
    name: data.username,
    password: data.password,
  });
};
