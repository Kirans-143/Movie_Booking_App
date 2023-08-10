const paymentController = require("../controllers/payment.controller");
const authJwt = require("../middlewares/authJwt");

module.exports = (app) => {
  app.get(
    "/movieBooking/api/v1/payments",
    [authJwt.verifyToken],
    paymentController.getAllPayments
  );
  app.get(
    "/movieBooking/api/v1/payments/:id",
    [authJwt.verifyToken],
    paymentController.getPaymentsById
  );
  app.post(
    "/movieBooking/api/v1/payments",
    [authJwt.verifyToken],
    paymentController.createPayment
  );
};
