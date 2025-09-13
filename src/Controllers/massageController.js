const authModel = require('../Models/authModel')

const allUserData = async (req, res) => {
  try {
    const currentUserId = req.params.userId

    const users = await authModel.find()

    const allUserInfo = users
      .filter((item) => item._id.toString() !== currentUserId) 
      .map((item) => ({
        userId: item._id,
        userName: item.userName,
        email: item.email,
        avater: item.avater, 
      }))

    res.status(200).json(allUserInfo)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Server error", error })
  }
}

module.exports = allUserData
