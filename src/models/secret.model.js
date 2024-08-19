const mongoose = require('mongoose');
const validator = require('validator');
const { toJSON } = require('./plugins');

const secretSchema = mongoose.Schema(
  {
    secret: {
      type: String,
      required: true,
    },
    timeToExpire: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: false,
      trim: true,
      lowercase: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error('Invalid email');
        }
      },
    },
    saltPhrase: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
secretSchema.plugin(toJSON);



/**
 * @typedef Secrets
 */
const Secrets = mongoose.model('Secrets', secretSchema);

module.exports = Secrets;