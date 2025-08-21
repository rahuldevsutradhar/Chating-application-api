const express =  require('express')
const { registrationController, otpVerification, reSendOtp, loginController, updateProfileController } = require('../../Controllers/authController')
const tokenVerify = require('../../../middelWares/tokenVerify')
const authRoute = express.Router()


authRoute.post('/registration', registrationController)
authRoute.post('/otp', otpVerification)
authRoute.post('/reSendOtp', reSendOtp)
authRoute.post('/login', loginController)
authRoute.post('/updateProfile', tokenVerify,  updateProfileController)


module.exports = authRoute