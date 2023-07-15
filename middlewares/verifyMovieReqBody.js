 const constants = require('../utils/constants')
 
 const validateMovieReqBody = async(req,res,next) =>{

    //validate if the movie name is provided - if fail return HTTP-400
    if(!req.body.name){
        return res.status(400).send({
            message:"Failed! movie name is not provided"
        })
    }

    //validate if releaseStatus has been provided - if fail return HTTP-400 
    if(!req.body.releaseStatus){
        return res.status(400).send({
            message:"Failed! movie release status is not provided"
        })
    }

    //validate the release Status of the movie:"RELEASED","BLOCKED","UNRELEASED" - if fail return HTTP-400
    const releaseStatus = req.body.releaseStatus
    const releaseStatusType = [constants.releaseStatus.unreleased, constants.releaseStatus.released, constants.releaseStatus.blocked]
    if(!releaseStatusType.includes(releaseStatus)){
        return res.status(400).send({
            message:"Failed! movie release status provided is invalid. Valid values are UNRELEASED | RELEASED | BLOCKED"
        })
    }

    //validate release Date is provided - if fail return HTTP-400
    if(!req.body.releaseDate){
        return res.status(400).send({
            message:"Failed! movie release date is nbot porovided"
        })
    }

    //validate if director is provided - if fail return HTTP-400
    if(!req.body.director){
        return res.status(400).send({
            message:"Movie director is not provided"
        })
    }

    next();
}


const varifyMovieReqBody ={
    validateMovieReqBody : validateMovieReqBody
}


module.exports = varifyMovieReqBody