const bookingController = require("../controllers/booking.controller");
const authJwt = require("./../middlewares/authJwt");
const verifyBookingReqBody = require("../middlewares/verifyBookingReqBody");

module.exports = function (app) {
  app.get(
    "/movieBooking/api/v1/bookings",
    [authJwt.verifyToken],
    bookingController.getAllBookings
  );
  app.get(
    "/movieBooking/api/v1/bookings/:id",
    [authJwt.verifyToken],
    bookingController.getBookingById
  );
  app.post(
    "/movieBooking/api/v1/bookings",
    [authJwt.verifyToken, verifyBookingReqBody.validateBookingReqBody],
    bookingController.createBooking
  );
  app.put(
    "/movieBooking/api/v1/bookings/:id",
    [authJwt.verifyToken],
    bookingController.updateBooking
  );
};
