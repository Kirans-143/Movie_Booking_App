


const Booking = require("../models/bookings.model");
const User = require("../models/users.model");
const Constants = require("../utils/constants");


const createBooking = async (req, res) => {

    const user = await User.findOne({
        userId: req.userId
    })
    var bookingObject = {
        theatreId: req.body.theatreId,
        movieId: req.body.movieId,
        userId: user._id,
        status: req.body.status
    }
    try {
        const booking = await Booking.create(bookingObject);
        res.status(201).send(booking);
    } catch (err) {
        console.log(err);
        res.status(500).send({
            message: "Internal error while creating the booking"
        })
    }

}

const getAllBookings = async (req, res) => {

    const user = await User.findOne({
        userId: req.userId
    })

    const queryObj = {};
    if (user.userType == Constants.userTypesObject.userTypes.admin || Constants.userTypesObject.userTypes.customer) {
    } else {
        queryObj._id = user._id
    }

    const bookings = await Booking.find(queryObj);
    res.status(200).send(bookings);
}

const getBookingById = async (req, res) => {
    try {
        const bookings = await Booking.findOne({ _id: req.params.id });
        res.status(200).send(bookings);
    } catch (err) {
        console.log(err.message);
        res.status(500).send({
            message: "Internal error while searching for the booking by Id"
        })
    }

}

const updateBooking = async (req, res) => {

    const booking = await Booking.findOne({
        _id: req.params.id
    })
    booking.theatreId = req.body.theatreId != undefined ? req.body.theatreId : booking.theatreId;
    booking.movieId = req.body.movieId != undefined ? req.body.movieId : booking.movieId;
    booking.userId = req.body.userId != undefined ? req.body.userId : booking.userId;
    booking.status = req.body.status != undefined ? req.body.status : booking.status;

    try {
        const updatedBooking = await booking.save();
        res.status(201).send(updatedBooking);
    } catch (err) {
        console.log(err);
        res.status(500).send({
            message: "Internal error while updating the booking"
        })
    }

}


module.exports = {getAllBookings , getBookingById , createBooking , updateBooking}