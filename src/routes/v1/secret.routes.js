const express = require('express');
const secretController = require('../../controllers/secret.controller');

const router = express.Router();

router.get('/', secretController.checkConnection);

router.post('/createSecret', secretController.createSecret);

router.get('/:secretId', secretController.getSecret);

module.exports = router;
