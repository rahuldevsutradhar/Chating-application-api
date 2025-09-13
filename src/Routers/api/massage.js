const express =  require('express')
const allUserData = require('../../Controllers/massageController')
const massageRoute = express.Router()

massageRoute.get('/massageUser/:userId', allUserData)


module.exports = massageRoute