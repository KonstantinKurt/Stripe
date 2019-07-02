const express = require('express');
const stripeController = require('../controllers/stripeController.js');
const stripeRouter = express.Router();

stripeRouter.post(`/`,stripeController.payment);

module.exports = stripeRouter;
