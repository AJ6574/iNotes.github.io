const jwt = require('jsonwebtoken');
const fs = require('fs')
const path = require('path')

const jwtAuth = process.env.AUTH_TOKEN//fetching jwt signing token
const fetchuser = (req, res, next) => {
    try {
        const auth_token = req.header('auth-token')//fetching auth token sent by header
        const data = jwt.verify(auth_token, jwtAuth)//verifying jwt token
        req.user = data.User//sending the user data to the server
        next()
    } catch (error) {
        res.status(404).json("Sorry, Something went wrong.")
    }
}

module.exports = fetchuser