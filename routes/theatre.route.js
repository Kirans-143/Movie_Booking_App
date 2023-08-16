const theatreController = require("../controllers/theatre.controller");
const { authJwt } = require("../middlewares");

module.exports = function (app) {
  app.get(
    "/movieBooking/api/v1/theatres",
    [authJwt.verifyToken],
    theatreController.getAllTheatre
  );
  app.get(
    "/movieBooking/api/v1/theatres/:id",
    [authJwt.verifyToken],
    theatreController.getTheatreById
  );
  app.post(
    "/movieBooking/api/v1/theatres",
    [authJwt.verifyToken, authJwt.isAdminOrClient],
    theatreController.createTheatre
  );
  app.put(
    "/movieBooking/api/v1/theatres/:id",
    [authJwt.verifyToken, authJwt.isAdminOrClient],
    theatreController.updateTheatre
  );
  app.delete(
    "/movieBooking/api/v1/theatres/:id",
    [authJwt.verifyToken, authJwt.isAdminOrClient],
    theatreController.deleteTheatre
  );
  app.put(
    "/movieBooking/api/v1/theatres/:id/movies",
    [authJwt.verifyToken, authJwt.isAdmin],
    theatreController.addMoviesToTheatre
  );
  app.get(
    "/movieBooking/api/v1/theatres/:theatreId/movies/:movieId",
    theatreController.checkMovieInATheatre
  );
};
