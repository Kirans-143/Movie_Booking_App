const Booking = require("../models/bookings.model");
const User = require("../models/users.model");
const Constants = require("../utils/constants");

const createBooking = async (req, res) => {
  const user = await User.findOne({
    userId: req.userId,
  });
  var bookingObject = {
    theatreId: req.body.theatreId,
    movieId: req.body.movieId,
    userId: user._id,
    status: req.body.status,
    timing: req.body.timing,
    noOfSeats: req.body.noOfSeats,
    totalCost:
      req.body.noOfSeats * Constants.bookingAndPaymentObjects.ticketPrice,
  };
  try {
    const booking = await Booking.create(bookingObject);
    res.status(201).send(booking);
  } catch (err) {
    console.log(err);
    res.status(500).send({
      message: "Internal error while creating the booking",
    });
  }
};

const getAllBookings = async (req, res) => {
  const user = await User.findOne({
    userId: req.userId,
  });

  const queryObj = {};
  if (user.userType == Constants.userTypesObject.userTypes.admin) {
  } else {
    queryObj.userId = user._id;
  }

  const bookings = await Booking.find(queryObj);
  res.status(200).send(bookings);
};

const getBookingById = async (req, res) => {
  const user = await User.findOne({
    _id: req.userId,
  });
  try {
    const bookings = await Booking.findOne({ _id: req.params.id });
    if (
      bookings.userId != req.userId &&
      user.userType != Constants.userTypesObject.userTypes.admin
    ) {
      res.status(404).send({
        message: "Access Denied",
      });
    }
    res.status(200).send(bookings);
  } catch (err) {
    console.log(err.message);
    res.status(500).send({
      message: "Internal error while searching for the booking by Id",
    });
  }
};

const updateBooking = async (req, res) => {
  const user = await User.findOne({
    _id: req.userId,
  });
  const booking = await Booking.findOne({
    _id: req.params.id,
  });
  if (
    user.userType != Constants.userTypesObject.userTypes.admin &&
    booking.userId != user._id
  ) {
    res.status(404).send({
      message: "Access Denied",
    });
  }
  booking.theatreId =
    req.body.theatreId != undefined ? req.body.theatreId : booking.theatreId;
  booking.movieId =
    req.body.movieId != undefined ? req.body.movieId : booking.movieId;
  booking.userId =
    req.body.userId != undefined ? req.body.userId : booking.userId;
  booking.status =
    req.body.status != undefined ? req.body.status : booking.status;

  try {
    const updatedBooking = await booking.save();
    res.status(201).send(updatedBooking);
  } catch (err) {
    console.log(err);
    res.status(500).send({
      message: "Internal error while updating the booking",
    });
  }
};

module.exports = {
  getAllBookings,
  getBookingById,
  createBooking,
  updateBooking,
};
