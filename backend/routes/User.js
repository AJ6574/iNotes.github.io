const express = require('express')
const bodyParser = require('body-parser')
const {body, validationResult} = require('express-validator')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const fs = require('fs')
const path = require('path')
const User = require('../models/userModel')
const fetchuser = require('../middleware/fetchuser')
const router = express.Router()

//setting up body parser
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

//Routes: 1 creates new user
router.post('/new-user', [
    //checking if the post request is valid
    body('uname', "Username must be atleast 3 characters").isLength({min: 3}),
    body('email', "Enter a valid email.").isEmail(),
    body('password', "Password must be atleast 8 characters").isLength({min: 8})
], async (req, res) => {
    const errors = validationResult(req) //catches any validation errors according to the previous conditions
    if(!errors.isEmpty()) //sending validation errors if any occurs
        res.json(errors)
    else
    {
        const {uname, email, password}  = req.body //fetching data from request body
        try {
            const userExist = await User.findOne({Username: uname}) //checking if any user exist with that username
            if(!userExist)//if unsername does not exist
            {
                const salt = await bcrypt.genSalt(10)//generating a random salt
                const secPassword = await bcrypt.hash(password, salt)//hashing password
                const user = await User.create({ //creating user
                    Username: uname,
                    Email: email,
                    Password: secPassword
                })
                //generating auth token for user
                const jwtData = {//sending user id as data in auth token
                    User:{
                        Id: user.id
                    }
                }
                //fetching signature data from key file
                const jwtAuth = fs.readFileSync(path.join(__dirname, '../auth_token.key'))
                const jwtToken = jwt.sign(jwtData, jwtAuth) //generating auth token
                res.json({jwtToken})
            }
            else
            {
                const msg = "Sorry, Username already exists."
                res.status(404).json({msg})
            }
        } catch (error) {
            const msg = "Sorry, Something went wrong."
            res.status(404).json({msg})
        }
    }
})

//Routes: 2 Endpoint for user login
router.post('/user-login', [
    //checking if the post request is valid
    body('uname', "Username must be atleast 3 characters").isLength({min: 3}),
    body('password', "Password must be atleast 8 characters").isLength({min: 8})
], async (req, res) => {
    const errors = validationResult(req) //catches any validation errors according to the previous conditions
    if(!errors.isEmpty()) //sending validation errors if any occurs
        res.json(errors)
    else
    {
        const {uname, password}  = req.body //fetching data from request body
        try {
            const user = await User.findOne({Username: uname}) //checking if any user exist with that username
            if(user)//if user does exist
            {
                const authenticate = await bcrypt.compare(password, user.Password)//comparing input password and original password
                if(authenticate)//if password true
                {
                    //generating auth token for user
                    const jwtData = {//sending user id as data in auth token
                        User:{
                            Id: user.id
                        }
                    }
                    //fetching signature data from key file
                    const jwtAuth = fs.readFileSync(path.join(__dirname, '../auth_token.key'))
                    const jwtToken = jwt.sign(jwtData, jwtAuth) //generating auth token
                    res.json({jwtToken})
                }
                else
                {
                    const msg = "Sorry, Username or Password is wrong."
                    res.status(404).json({msg})
                }
            }
            else
            {
                const msg = "Sorry, Username or Password is wrong."
                res.status(404).json({msg})
            }
        } catch (error) {
            const msg = "Sorry, Something went wrong."
            res.status(404).json({msg})
        }
    }
})

//Routes: 2 getting an authenticate user details
router.post('/get-user', fetchuser, async (req, res) => {
        try {
            const userId = req.user.Id //fetching data from middleware
            const user = await User.findById(userId).select('-Password')//fetching user details from database except password
            res.json({user})
        } catch (error) {
            const msg = "Sorry, Something went wrong."
            res.status(404).json({msg})
        }
    }
)



module.exports = router