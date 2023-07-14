 const validateMovieReqBody = async(req,res,next) =>{

    //validate if the movie name is provided - if fail return HTTP-400

    //validate if releaseStatus has been provided - if fail return HTTP-400 

    //validate the release Status of the movie:"RELEASED","BLOCKED","UNRELEASED" - if fail return HTTP-400

    //validate release Date is provided - if fail return HTTP-400

    //validate if director is provided - if fail return HTTP-400

    next();
}


const varifyMovieReqBody ={
    validateMovieReqBody : validateMovieReqBody
}


module.exports = varifyMovieReqBody