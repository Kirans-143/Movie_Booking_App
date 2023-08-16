const Bookings = require("../models/bookings.model");
const Payments = require("../models/payments.model");
const Users = require("../models/users.model");
const Constants = require("../utils/constants");
const { sendEmail } = require("../utils/notificationClient");

exports.getAllPayments = async (req, res) => {
  const queryObj = {};
  const user = await Users.findOne({ userId: req.userId });

  if (user.userType !== Constants.userTypesObject.userTypes.admin) {
    const bookings = await Bookings.find({ userId: user._id });
    const bookingIds = bookings.map((booking) => booking._id);
    queryObj.bookingIds = { $in: bookingIds };
  }
  try {
    const payment = await Payments.find(queryObj);
    return res.status(200).send({ payment });
  } catch (err) {
    console.log(err.message);
    return res.status(500).send("Internal Server Error");
  }
};

exports.getPaymentsById = async (req, res) => {
  try {
    const payments = await Payments.findOne({ _id: req.params.id });
    return res.status(200).send(payments);
  } catch (err) {
    console.log(err.message);
    return res.status(500).send({
      message: "Internal error while searching for the payment gateway",
    });
  }
};

exports.createPayment = async (req, res) => {
  const booking = await Bookings.findOne({ _id: req.body.bookingId });

  var bookingTime = booking.createdAt;
  var currentTime = Date.now();
  var minutes = Math.floor((currentTime - bookingTime) / (1000 * 60));
  if (minutes > 5) {
    booking.status = Constants.bookingAndPaymentObjects.bookingStatus.expired;
    await booking.save();
    return res.status(200).send({
      message: "Can't do the payment as the booking has expired",
    });
  }

  var paymentObect = {
    bookingId: req.body.bookingId,
    amount: req.body.amount,
    status: Constants.bookingAndPaymentObjects.paymentStatus.success,
  };
  try {
    const payment = await Payments.create(paymentObect);
    booking.status = Constants.bookingAndPaymentObjects.bookingStatus.completed;
    await booking.save();

    const user = await Users.findOne({
      userId: req.userId,
    });
    sendEmail(
      payment._id,
      "Payment successful for the booking id : " + payment.bookingId,
      JSON.stringify(booking),
      user.email,
      "mba-no-reply@gmail.com"
    );
    return res.status(201).send(payment);
  } catch (err) {
    console.log(err.message);
    res.status(500).send({
      message: "Internal error while creating the booking",
    });
  }
};
