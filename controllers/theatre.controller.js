const Movie = require('../models/movie.model')
const Theatre = require('../models/theatre.model')
const mongoose = require('mongoose')


exports.addTheatre = async (req,res) => {

    let theatreObject = {
        name: req.body.name,
        city: req.body.city,
        description: req.body.description,
        pinCode: req.body.pinCode
    }

    

    try {

        if(!theatreObject) {
            res.send("Please fill all fields to add a theatre...").status(400)

       } else if (theatreObject) {
            Theatre.create(theatreObject);
            res.send("A Theatre is added successfully..." + theatreObject).status(200)
       }

    } catch(error) {
         res.send("error occured in add a theatre..." + error.message).status(500)
    }
    
}

exports.createTheatre = async(req,res)=>{
    const theatreObject = {
        name:req.body.name,
        city:req.body.city,
        description: req.body.description,
        pinCode: req.body.pinCode
    }
    try{
        const theatre = await Theatre.create(theatreObject)
        return res.status(200).send(theatre)
    }catch(err){
        return res.status(500).send({
            message:"Some error occured while creating the theatre " + err
        })
    }


}


exports.getAllTheatre = async(req,res)=>{
    const queryObject = {}
    if(req.query.name != undefined){
        queryObject.name =req.query.name
    }

    if(req.query.city != undefined ){
        queryObject.city = req.query.city
    }

    if(req.query.pinCode != undefined ){
        queryObject.pinCode = req.query.pinCode
    }

    try{
        var theatres = await Theatre.find(queryObject)
        if(req.query.movieId != undefined){
            theatres = theatres.filter(t=> t.movies.includes(req.query.movieId))
        }
        return res.status(200).send(theatres)
    }catch(err){
        return res.status(500).send({
            message:"Some error occured during getting the theatres " + err
        })
    }

}


exports.getTheatreById = async(req,res)=>{
    const theatre = await Theatre.findOne({
        _id: req.params.id
    })
    return res.status(200).send(theatre)
}


exports.updateTheatre = async(req,res)=>{
    const savedTheatre = await Theatre.findOne({_id:req.params.id})

    if(!savedTheatre){
        return res.status(400).send({
            message:"The theatre you want to update is not exist!"
        })
    }
    savedTheatre.name = req.body.name != undefined ? req.body.name : savedTheatre.name
    savedTheatre.description = req.body.description != undefined ? req.body.description : savedTheatre.description
    savedTheatre.city = req.body.city != undefined ? req.body.city : savedTheatre.city
    savedTheatre.pinCode = req.body.pinCode != undefined ? req.body.pinCode : savedTheatre.pinCode

    var updatedTheatre = await savedTheatre.save()

    res.status(200).send(updatedTheatre)
}


exports.deleteTheatre = async(req,res)=>{
    await Theatre.deleteOne({
        _id:req.params.id
    })
    res.status(200).send({
        message:"Successfully deleted thetare with id " + req.params.id 
    })
}


exports.addMoviesToTheatre = async (req,res)=>{
    var movieIds= []
    var validMovieIds=[]
    try{
        //Check if the theatre exist
        const savedTheatre = await Theatre.findOne({_id: req.params.id})

        if(!savedTheatre){
            return res.status(400).send({
                message:"The theatre where you want to add movies is not exist"
            })
        }

        //Add only those movies which are in the syatset
        validMovieIds = await getValidMovies(req.body.movieIds)

        if(validMovieIds.length>0){
            savedTheatre.movies = validMovieIds
            const updatedTheatre = await savedTheatre.save()
            return res.status(200).send(updatedTheatre)
        }else{
            return res.status(400).send({
                message:"No valid movie to be added to the theatre"
            })
        }
    }catch(err){
        return res.status(500).send({
            messge:"Some error occured while adding movie to theatre " + err
        })
    }
}


getValidMovies = async (movieIds)=>{
    var validMovieIds=[]

    if(movieIds != null && movieIds.length>0){
        for(let i=0;i<movieIds.length;i++){
            const savedMovie = await Movie.findOne({_id:movieIds[i]})
            if(savedMovie){
                validMovieIds.push(movieIds[i])
            }
        }
    }
    return validMovieIds
}

exports.checkMovieInATheatre = async(req,res)=>{
    const savedTheatre = await Theatre.findOne({_id:req.params.theatreId})

    if(!savedTheatre){
        return res.status(400).send({
            message:"Theatre where you want to check the movie is not exist"
        })
    }

    const savedMovie = await Movie.findOne({_id:req.params.movieId})

    if(!savedMovie){
        return res.status(400).send({
            messagae:"The Movie you are looking for doesn't exist"
        })
    }

    return res.status(200).send({
        message: savedTheatre.movies.includes(req.params.movieId) ? "Movie is prersent" : "Movie is not present"
    })
}