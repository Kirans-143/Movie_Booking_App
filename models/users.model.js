



const mongoose = require("mongoose");

const UserModel = new mongoose.Schema(
    {
        name : {
            type : String,
            required : true
        } , 
        userId : {
            type : String,
            required : true 
        } , 
        email : {
            type : String,
            required : true,
            minLength: 5 , 
            unique: true
        },
        password : {
            type : String,
            required : true 
        } , 
        userType : {
            type : String,
            required : true,
            default : "CUSTOMER"
        } , 
        userStatus : {
            type : String,
            required : true,
            default : "APPROVED"
        }
    }
)

module.exports = mongoose.model("Users" , UserModel)