const authController = require('./../controllers/auth.controller')

module.exports = function(app){
    app.post('/movieBooking/api/v1/signup',authController.SignUp)
    app.post('/movieBooking/api/v1/signin',authController.SignIn)

}