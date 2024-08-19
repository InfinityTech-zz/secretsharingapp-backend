const httpStatus = require('http-status');
const { Secrets } = require('../models');
const ApiError = require('../utils/ApiError');
const Cryptr = require('cryptr');

const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'phyllis.dubuque28@ethereal.email',
        pass: 'jv1rUX6sSupjsHEsX5'
    }
});

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

const sendEmail = async(email) => {
    // send mail with defined transport object
    console.log('send email hit');
    const info = await transporter.sendMail({
      from: '"Test Secret share App 👻" <secretshare@ethereal.email>', // sender address
      to: email, // list of receivers
      subject: "Secretpicked up", // Subject line
      text: "Secret Picked up", // plain text body
      html: "<b>Secret Picked up</b>", // html body
    });
  
    console.log("Message sent: %s", info.messageId);
    // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
  }
  

module.exports = {
  createSecret,
  getSecretById,
  deleteSecretById,
  sendEmail
};