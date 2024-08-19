const httpStatus = require('http-status');
const { Secrets } = require('../models');
const ApiError = require('../utils/ApiError');
const Cryptr = require('cryptr');

/**
 * Create a secret
 * @param {Object} secretBody
 * @returns {Promise<Secret>}
 */
const createSecret = async (secretBody) => {
  const cryptr = secretBody.saltPhrase !== undefined ? new Cryptr(secretBody.saltPhrase) : new Cryptr('secretKey');
  secretBody.secret = cryptr.encrypt(secretBody.secret);
  //return 'hghghghghgghhg';
  return Secrets.create(secretBody);
};


/**
 * Get secret by id
 * @param {ObjectId} id
 * @returns {Promise<User>}
 */
const getSecretById = async (id) => {
  return Secrets.findById(id);
};


/**
 * Delete user by id
 * @param {ObjectId} userId
 * @returns {Promise<User>}
 */
const deleteSecretById = async (secretId) => {
  const secret = await getSecretById(secretId);
  if (!secret) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Secret not found');
  }
  await secret.remove();
  return secret;
};

module.exports = {
  createSecret,
  getSecretById,
  deleteSecretById,
};