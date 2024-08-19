const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { secretService } = require('../services');
const moment = require('moment');

const checkConnection = catchAsync(async (req, res) => {
    console.log('root hit');
    await secretService.sendEmail('subhasishdeyjobs@gmail.com');
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
  if(secret.email !== undefined){
    await secretService.sendEmail;
  }
  const timeToExpire = secret.timeToExpire.split(' ');
  const createdAt = secret.createdAt;
  const finalTime = moment(createdAt).add(parseInt(timeToExpire[0]), timeToExpire[1]);
  const currentTime = moment();
  const isTimeElapsed = currentTime.isBetween(moment(createdAt), finalTime);
  if(!isTimeElapsed){
    await secretService.deleteSecretById(secret._id);
    res.status(400).send('Expired');
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
