const express =  require('express')
const { registrationController, otpVerification, reSendOtp } = require('../../Controllers/authController')
const authRoute = express.Router()


authRoute.post('/registration', registrationController)
authRoute.post('/otp', otpVerification)
authRoute.post('/reSendOtp', reSendOtp)


module.exports = authRoute