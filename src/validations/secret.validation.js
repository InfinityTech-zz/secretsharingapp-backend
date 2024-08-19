const Joi = require('joi');

const createSecret = {
  body: Joi.object().keys({
    email: Joi.string().email(),
    saltPhrase: Joi.string(),
    secret: Joi.string().required(),
    timeToExpire: Joi.string().required()
  }),
};


const getSecret = {
  params: Joi.object().keys({
    secretId: Joi.string().custom(objectId),
  }),
};

const deleteSecret = {
  params: Joi.object().keys({
    secretId: Joi.string().custom(objectId),
  }),
};

module.exports = {
createSecret,
  getSecret,
  deleteSecret,
};
