var express = require("express");
var paymentController = require("../controllers/payment.controller");
var paymentRouter = express.Router();

paymentRouter.post("/request", paymentController.handlePaymentController);
paymentRouter.post(
  "/response",
  paymentController.handleResponsePaymentController
);

module.exports = paymentRouter;
