const express =  require('express')
const authRoute = require('./api/auth')
const massageRoute = require('./api/massage')
const route = express.Router()


route.use('/auth', authRoute)
route.use('/massage', massageRoute)


module.exports = route