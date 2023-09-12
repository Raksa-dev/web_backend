var express = require("express");
var paymentController = require("../controllers/payment.controller");
var paymentRouter = express.Router();

paymentRouter.get("/", paymentController.handlePaymentController);

module.exports = paymentRouter;
