const Users = require("./../models/users.model");
const jwt = require("jsonwebtoken");
const bcryptJs = require("bcryptjs");
const Constants = require("./../utils/constants")
const configSecret = require("./../configs/auth.config")

const SignUp = async (req,res) => {

    let userTypes = req.body.userType ; 
    let userStatus = req.body.userStatus ;

    if (!userTypes) {
        
         userTypes == Constants.userTypesObject.userTypes.customer &&
         userStatus == Constants.userTypesObject.userStatus.approved

    } else if ( userTypes == Constants.userTypesObject.userTypes.engineer ) {
         userStatus == Constants.userTypesObject.userStatus.pending
    } else if (userTypes == Constants.userTypesObject.userTypes.admin) {
         userStatus == Constants.userTypesObject.userStatus.approved
    }
     
    let signUpObject = {
         
        name : req.body.name,
        userId : req.body.userId,
        email : req.body.email,
        password : bcryptJs.hashSync(req.body.password, 8),
        userType :userTypes,
        userStatus : userStatus
    }
  
    try {

        if (!signUpObject) {
            res.send("Please enter all field with appropriate value for successfully SignUp...").status(400)
       } else {
         
            let user = await Users.create(signUpObject);
            res.send("welcome To this Movie Portal.." + user.name).status(200)
            console.log(user.name + " just completed the signUp Process...");
       }

    } catch (error) {
          res.send("Error Occured in SignUp Process" + error.message).status(500)
    }
    
}

const SignIn =  async (req,res) => {
      
    const userId = req.body.userId;
    const password = req.body.password;

    try{

        if(!userId) {
            res.send("Please Enter A Valid userId for successfully signIn...").status(400)
       } else {
            let foundUser = await Users.findOne( { userId : userId } )
            if ( !foundUser ) {
                res.send("No User Found Against entered userId.please enter a valid userId for successfully logIn...").status(400)
            } else if (foundUser) {
                let checkForPasword = bcryptJs.compareSync(password , foundUser.password);
                if (!checkForPasword) {
                    res.send("entered password is incorrect...").status(400)
                }
               let token = jwt.sign({ id: foundUser.userId }, configSecret.secretKey, {
                   expiresIn: 86400 
                 });
                 res.status(200).send({
                   name : foundUser.name,
                   userType : foundUser.userType,
                   userStatus : foundUser.userStatus,
                   Token : token
                 })
                 console.log(foundUser.name + " just loggedIn...")
            }
       }
    } catch (error) {
          res.send("Error Occured In SignIn..." + error.message).status(500)
    }

    
}

module.exports = {SignUp , SignIn}