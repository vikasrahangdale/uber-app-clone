const userModel = require("../models/user.model")
const userService = require("../service/user.service")
const {validationResult} = require("express-validator")


module.exports.createUser = ({firstname,lastname,email,password}) => {
    console.log("create", {firstname,lastname,email,password})
    if( !firstname || !email || !password){
        throw new Error("All fields are required")
    }

   const user = userModel.create({
    fullname: {
        firstname,
        lastname
    },
    email,
    password
   })
   return user


}