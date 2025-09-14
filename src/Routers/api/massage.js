const express = require('express')
const { allUserData, add_To_Chat, getchat_userList } = require('../../Controllers/massageController')
const massageRoute = express.Router()

massageRoute.get('/massageUser/:userId', allUserData)
massageRoute.post('/addToChat', add_To_Chat)
massageRoute.get('/userList/:userId', getchat_userList)


module.exports = massageRoute
