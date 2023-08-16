const Movie = require("../models/movie.model");

exports.getAllMovies = async (req, res) => {
  const AllMovies = await Movies.find();
  try {
    if (AllMovies) {
      res.status(200).send(AllMovies);
    } else if (!AllMovies) {
      res.status(400).send({
        message: "No movies found in DB...",
      });
    }
  } catch (err) {
    res.status(500).send({
      message: "error occured in getAllMovies ..." + err.message,
    });
  }
};

exports.getMovieById = async (req, res) => {
  let givenMovieId = req.params.movieId;

  try {
    if (!givenMovieId) {
      return res.status(201).send({
        message: "Please provide a valid movieId for search a movie...",
      });
    } else {
      let findMovie = await Movie.find({ _id: givenMovieId });
      if (!findMovie) {
        res.status(201).send({
          message: "No movie found in DB with given movie Id...",
        });
      } else if (findMovie) {
        res.status(200).send(findMovie);
      }
    }
  } catch (err) {
    res.status(400).send({
      message: "Some error occured in find Movies By Id..." + err.message,
    });
  }
};

exports.createMovie = async (req, res) => {
  const movieObject = {
    name: req.body.name,
    description: req.body.description,
    casts: req.body.casts,
    director: req.body.director,
    trailerUrl: req.body.trailerUrl,
    language: req.body.language,
    posterUrl: req.body.posterUrl,
    releaseDate: req.body.releaseDate,
    releaseStatus: req.body.releaseStatus,
  };

  try {
    if (!movieObject) {
      res.status(200).send("please fill details to add a movie in DB...");
    } else if (movieObject) {
      await Movie.create(movieObject);
      res.status(500).send("A movie is successfully added in DB...");
    }
  } catch (err) {
    console.log("error occured in create Movies..." + err);
    return res.status(400).send({
      message: "Some error occured while creating the movie " + err,
    });
  }
};

exports.updateMovie = async (req, res) => {
  var savedMovie = await Movie.findOne({ _id: req.params.id });
  try {
    savedMovie = await Movie.findOne({ _id: req.params.id });
    if (!savedMovie) {
      return res.status(400).send({
        message: "The movie want to update doesn't exist in our database",
      });
    }
  } catch (err) {
    return res.status(500).send({
      message: "Something went wrong while fetching movie for update" + err,
    });
  }

  savedMovie.name =
    req.body.name != undefined ? req.body.name : savedMovie.name;
  savedMovie.description =
    req.body.description != undefined
      ? req.body.description
      : savedMovie.description;
  savedMovie.casts =
    req.body.casts != undefined ? req.body.casts : savedMovie.casts;
  savedMovie.director =
    req.body.director != undefined ? req.body.director : savedMovie.director;
  savedMovie.trailerUrl =
    req.body.trailerUrl != undefined
      ? req.body.trailerUrl
      : savedMovie.trailerUrl;
  savedMovie.posterUrl =
    req.body.posterUrl != undefined ? req.body.posterUrl : savedMovie.posterUrl;
  savedMovie.language =
    req.body.language != undefined ? req.body.language : savedMovie.language;
  savedMovie.releaseDate =
    req.body.releaseDate != undefined
      ? req.body.releaseDate
      : savedMovie.releaseDate;
  savedMovie.releaseStatus =
    req.body.releaseStatus != undefined
      ? req.body.releaseStatus
      : savedMovie.releaseStatus;

  try {
    const updateMOvies = await savedMovie.save();
    return res.status(200).send(updateMOvies);
  } catch (err) {
    return res.status(500).send({
      message: "Error while updating",
    });
  }
};

exports.deleteMovie = async (req, res) => {
  try {
    await Movie.deleteOne({
      _id: req.params.id,
    });
    return res.status(200).send({
      message: "Successfully deleted movie with id " + req.params.id + ".",
    });
  } catch (err) {
    console.log(err.message);
    return res.status(500).send({
      message: "Internal Server Error",
    });
  }
};
