const userController = require("./../controllers/user.controller");


module.exports = function (app) {
     app.get("/movieBooking/api/v1/Users" , userController.getAllUsers);
     app.get("/movieBooking/api/v1/Users/:userId" , userController.getUserById);
     app.put("/movieBooking/api/v1/Users/:userId" , userController.updateUseerDetails);
     app.delete("/movieBooking/api/v1/Users/:userId" , userController.deleteUser);
}