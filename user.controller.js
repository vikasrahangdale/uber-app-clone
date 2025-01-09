const userModel = require("../models/user.model")
const userService = require('../service/user.service');
const {validationResult} = require("express-validator")
const backlistTokenModel = require("../models/blacklistToken.model")



module.exports.registerUser = async function(req, res, next){

    const error = validationResult(req)
    if(!error.isEmpty()){
   return res.status(400).json({errors: error.array()})
    }

    const {fullname, email, password} = req.body
   const userAready = await userModel.findOne({email})

   if(userAready){
    return res.status(400).json({errors: [{msg: "Email already registered"}]})
    
   }

    const hashPassword = await userModel.hashPassword(password)
    const user = await userService.createUser({
        firstname: fullname.firstname,
        lastname: fullname.lastname,
        email,
        password: hashPassword
    })

    const token = user.generateAuthToken();
    res.status(201).json({user, token})
}


module.exports.loginUser = async function(req,res,next){
    
    const error = validationResult(req)
    if(!error.isEmpty()){
   return res.status(400).json({errors: error.array()})
    }
    const {email, password} = req.body
    const user = await userModel.findOne({email}).select('+password')
    if(!user){
        return res.status(401).json({errors: [{msg: "Invalid email or password"}]})
    }
    const isMatch = await user.comparePassword(password)
    if(!isMatch) {
        return res.status(402).json({errors: [{msg: "Invalid email or password"}]})
    }

    const token = user.generateAuthToken();
    res.cookie('token', token)
    res.status(200).json({user, token})
}

module.exports.getUserProfile = async function(req,res,next){
    res.status(200).json({req,user})
}

module.exports.loggedOut = async function(req, res, next) {
    console.log('Cookies:', req.cookies);
    const token = req.cookies?.token || req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(400).json({ msg: 'Token is missing or invalid' });
    }

    res.clearCookie('token', { httpOnly: true, secure: true });  
    await backlistTokenModel.create({ token });

    res.status(200).json({ msg: 'Logged out successfully' });
}
