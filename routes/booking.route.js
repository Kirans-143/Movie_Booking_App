const bookingController = require("../controllers/booking.controller");
const authJwt = require('./../middlewares/authJwt')


module.exports = function (app) {
    app.get("/movieBooking/api/v1/bookings", [authJwt.verifyToken ], bookingController.getAllBookings); 
    app.get("/movieBooking/api/v1/bookings/:id", [authJwt.verifyToken ], bookingController.getBookingById);  
    app.post("/movieBooking/api/v1/bookings", [authJwt.verifyToken ], bookingController.createBooking);
    app.put("/movieBooking/api/v1/bookings/:id", [authJwt.verifyToken ], bookingController.updateBooking);
}