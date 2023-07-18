const theatreController = require('../controllers/theatre.controller')

module.exports = function(app){
    app.get("/movieBooking/api/v1/theatres", theatreController.getAllTheatre)
    app.get("/movieBooking/api/v1/theatres/:id", theatreController.getTheatreById)
    app.post("/movieBooking/api/v1/theatres", theatreController.createTheatre)
    app.put("/movieBooking/api/v1/theatres/:id", theatreController.updateTheatre)
    app.delete("/movieBooking/api/v1/theatres/:id", theatreController.deleteTheatre)
    app.put("/movieBooking/api/v1/theatres/:id/movies", theatreController.addMoviesToTheatre)
    app.get("/movieBooking/api/v1/theatres/:theatreId/movies/:movieId", theatreController.checkMovieInATheatre)
}