const express = require('express');
const secretRoute = require('./secret.routes');

const router = express.Router();

const defaultRoutes = [
  {
    path: '/secrets',
    route: secretRoute,
  },
];


defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});


module.exports = router;
