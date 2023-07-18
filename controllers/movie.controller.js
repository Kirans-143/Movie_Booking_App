const Movie = require('../models/movie.model')

exports.getAllMovies = async(req,res) =>{
  const queryObject = {}

  const movies = await Movie.find(queryObject)
  return res.status(200).send(movies)
}

exports.getMovieById = async(req,res) =>{
    const queryObject = {
        _id:req.params.id
    }

    const movie = await Movie.findOne(queryObject)
    return res.status(200).send(movie)
}

exports.createMovie = async(req,res) =>{
    const movieObject = {
        name: req.body.name,
        description: req.body.description,
        casts:req.body.casts,
        director:req.body.director,
        trailerUrl:req.body.trailerUrl,
        language:req.body.language,
        posterUrl:req.body.posterUrl,
        releaseDate:req.body.releaseDate,
        releaseStatus:req.body.releaseStatus
    }

    try{
        const movie = await Movie.create(movieObject)
        return res.status(200).send(movie)
    }catch(err){
        return res.status(500).send({
            message:"Some error occured while creating the movie " + err
        })
    }
}

exports.updateMovie = async(req,res) =>{
    var savedMovie = null
    try{
        savedMovie = await Movie.findOne({_id:req.params.id})
        if(!savedMovie) {
            return res.status(400).send({
                message:"The mmovie want to update doesn't exist in our database"
            })
        }
    }catch(err){
        return res.status(500).send({
            message:"Something went wrong while fetching movie for update" + err
        })
    }

  
   
    savedMovie.name = req.body.name != undefined ? req.body.name : savedMovie.name;
    savedMovie.description = req.body.description != undefined ? req.body.description : savedMovie.description;
    savedMovie.casts = req.body.casts != undefined ? req.body.casts : savedMovie.casts;
    savedMovie.director = req.body.director != undefined ? req.body.director : savedMovie.director;
    
    savedMovie.trailerUrl = req.body.trailerUrl != undefined ? req.body.trailerUrl : savedMovie.trailerUrl;
    savedMovie.posterUrl = req.body.posterUrl != undefined ? req.body.posterUrl : savedMovie.posterUrl;
    savedMovie.language = req.body.language != undefined ? req.body.language : savedMovie.language;
    savedMovie.releaseDate = req.body.releaseDate != undefined ? req.body.releaseDate : savedMovie.releaseDate;
    savedMovie.releaseStatus = req.body.releaseStatus != undefined ? req.body.releaseStatus : savedMovie.releaseStatus;

    try{
        const updateMOvies = await savedMovie.save()
        return res.status(200).send(updateMOvies)
    }catch(err){
        return res.status(500).send({
            message:"Error while updateing"
        })
    }
}

exports.deleteMovie = async(req,res) =>{
    await Movie.deleteOne({
        _id:req.params.id
    })
    return res.status(200).send({
        message:"Successfully deleted movie with id " + req.params.id
    })
}