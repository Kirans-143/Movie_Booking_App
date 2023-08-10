const express = require("express");
const bodyParser = require("body-parser");
const serverConfig = require("./configs/server.config");
const dbConfig = require("./configs/db.config");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const Movies = require("./models/movie.model");
const Users = require("./models/users.model");
const Theatre = require("./models/theatre.model");
const Bookings = require("./models/bookings.model");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect(dbConfig.DB_URL);
const db = mongoose.connection;
db.on("error", () => {
  console.log("Error while connecting to DB");
});
db.once("open", () => {
  console.log("Connected to mongo DB");
  init();
});

/*
This function will initialise state of movie booking database
*/
async function init() {
  await Users.collection.drop();
  const user1 = await Users.create({
    name: "Anshul",
    userId: "admin",
    email: "anshul@gmail.com",
    userType: "ADMIN",
    password: bcrypt.hashSync("Welcome", 8),
  });
  const user2 = await Users.create({
    name: "Kiran",
    userId: "customer",
    email: "kiran@gmail.com",
    userType: "CUSTOMER",
    password: bcrypt.hashSync("Welcome", 8),
  });
  await Movies.collection.drop();
  const movie = await Movies.create({
    name: "Radhe Shyam",
    description: "Radhe Shyam is a 2019 American comedy film",
    casts: ["Prabhas", "Pooja"],
    director: "Radha Krishna Kumar",
    trailerUrl: "http://youtube.com",
    posterUrl: "http://youtube.com",
    language: "Hindi",
    releaseDate: "11-02-23",
    releaseStatus: "RELEASED",
  });
  console.log("Two users created successfully");

  await Theatre.collection.drop();
  const theatre = await Theatre.create({
    name: "FunCinema",
    city: "Bangalore",
    description: "Top Class Theatre",
    pinCode: 581329,
    movies: [movie._id],
  });
  console.log("A movie and theatre created successfully");

  await Bookings.collection.drop();
  const booking = await Bookings.create({
    theatreId: theatre._id,
    userId: user2._id,
    movieId: movie._id,
    timing: "9pm - 12pm",
    noOfSeats: 5,
  });
  console.log("Booking is Created");
}

require("./routes/movie.route")(app);
require("./routes/theatre.route")(app);
require("./routes/auth.route")(app);
require("./routes/user.route")(app);
require("./routes/booking.route")(app);
require("./routes/payment.route")(app);

app.listen(serverConfig.PORT, () => {
  console.log(`Application started on port ${serverConfig.PORT}`);
});
