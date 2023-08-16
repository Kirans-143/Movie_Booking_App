const userController = require("./../controllers/user.controller");
const authJwt = require("../middlewares/authJwt");

module.exports = function (app) {
  app.get(
    "/movieBooking/api/v1/Users",
    [authJwt.isAdmin, authJwt.verifyToken],
    userController.getAllUsers
  );
  app.get(
    "/movieBooking/api/v1/Users/:userId",
    [authJwt.verifyToken],
    userController.getUserById
  );
  app.put(
    "/movieBooking/api/v1/Users/:userId",
    [authJwt.isAdmin, authJwt.verifyToken],
    userController.updateUseerDetails
  );
  app.delete(
    "/movieBooking/api/v1/Users/:userId",
    [authJwt.isAdmin, authJwt.verifyToken],
    userController.deleteUser
  );
};
