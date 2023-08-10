const ObjectId = require("mongoose").Types.ObjectId;
const Theatre = require("../models/theatre.model");

validateBookingReqBody = async (req, res, next) => {
  if (!req.body.theatreId) {
    return res.status(400).send({
      message: "Failed! theatre ID required",
    });
  }
  if (!ObjectId.isValid(req.body.theatreId)) {
    return res.status(400).send({
      message: "Failed! Invalid theatre ID",
    });
  }
  if (!req.body.movieId) {
    return res.status(400).send({
      message: "Failed! movie ID required",
    });
  }

  if (!ObjectId.isValid(req.body.movieId)) {
    return res.status(400).send({
      message: "Failed! movieID is not a valid Object ID",
    });
  }

  const theatre = await Theatre.findOne({ _id: req.body.theatreId });

  if (theatre == null) {
    return res.status(404).send({
      message: "Failed! Theatre passed does not exist",
    });
  }

  if (!theatre.movies.includes(req.body.movieId)) {
    return res.status(404).send({
      message:
        "Failed! movieId passed is not available inside the theatre's movies",
    });
  }
  if (!req.body.timing) {
    return res.status(404).send({
      message: "Failed! timing is not provided in request",
    });
  }
  if (!req.body.noOfSeats) {
    return res.status(404).send({
      message: "Failed! no Of Seats is not provided in request",
    });
  }
  next();
};

module.exports = {
  validateBookingReqBody,
};
