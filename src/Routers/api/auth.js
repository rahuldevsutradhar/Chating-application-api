const express =  require('express')
const { registrationController, otpVerification } = require('../../Controllers/authController')
const authRoute = express.Router()


authRoute.post('/registration', registrationController)
authRoute.post('/otp', otpVerification)


module.exports = authRoute