const movieController = require('../controllers/movie.controller')
const {verifyMovieReqBody, authJwt} = require('../middlewares')

module.exports = function(app){
    app.get("/movieBooking/api/v1/movies",[authJwt.verifyToken], movieController.getAllMovies)
    app.get("/movieBooking/api/v1/movies/:id",[authJwt.verifyToken] ,movieController.getMovieById)
    app.post("/movieBooking/api/v1/movies", [verifyMovieReqBody.validateMovieReqBody] ,[authJwt.verifyToken, authJwt.isAdmin], movieController.createMovie )
    app.put("/movieBooking/api/v1/movies/:id",[verifyMovieReqBody.validateMovieReqBody],[authJwt.verifyToken, authJwt.isAdmin], movieController.updateMovie)
    app.delete("/movieBooking/api/v1/movies/:id",[authJwt.verifyToken, authJwt.isAdmin], movieController.deleteMovie)
}