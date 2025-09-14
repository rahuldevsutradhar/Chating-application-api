const express = require('express')
const { allUserData, addToChat } = require('../../Controllers/massageController')
const massageRoute = express.Router()

massageRoute.get('/massageUser/:userId', allUserData)
massageRoute.post('/addToChat', addToChat)


module.exports = massageRoute
