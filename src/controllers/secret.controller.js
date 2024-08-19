const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { secretService } = require('../services');

const checkConnection = catchAsync(async (req, res) => {
    res.send('Hello Server Started');
  });

const createSecret = catchAsync(async (req, res) => {
  const secret = await secretService.createSecret(req.body);
  res.status(httpStatus.CREATED).send(secret);
});

const getSecret = catchAsync(async (req, res) => {
  const secret = await secretService.getSecretById(req.params.secretId);
  if (!secret) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Secret not found1');
  }
  res.send(secret);
});

const deleteSecret = catchAsync(async (req, res) => {
  await secretService.deleteSecretById(req.params.secretId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  checkConnection,
  createSecret,
  getSecret,
  deleteSecret,
};
