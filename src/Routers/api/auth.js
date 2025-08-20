const express =  require('express')
const { registrationController, otpVerification, reSendOtp, loginController } = require('../../Controllers/authController')
const authRoute = express.Router()


authRoute.post('/registration', registrationController)
authRoute.post('/otp', otpVerification)
authRoute.post('/reSendOtp', reSendOtp)
authRoute.post('/login', loginController)


module.exports = authRoute