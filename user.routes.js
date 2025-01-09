const express = require('express');
const router = express.Router();
const {body} = require('express-validator');
const usercontroller = require("../controllers/user.controller")
const authMiddlewares = require("../middlewares/auth.middlewares")


router.post("/register",
    [
    body('email').isEmail().withMessage('invalid email'),
    body('fullname.firstname').isLength({min:3}).withMessage('first namw will be musr 3 characters long'),
    body('password').isLength({min:6}).withMessage('password must be 6 characters long')
],
 usercontroller.registerUser
)

router.post("/login", [
    body('email').isEmail().withMessage('invalid email'),
    body('password').isLength({min:6}).withMessage('password must be 6 characters long')
],
  usercontroller.loginUser
)

router.get("/profile", authMiddlewares.authUser ,usercontroller.getUserProfile)
router.get("/logout",  authMiddlewares.authUser ,usercontroller. loggedOut)


module.exports = router