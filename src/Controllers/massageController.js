const authModel = require('../Models/authModel')
const chatUserList = require('../Models/chatUserList')


// ------------- get all user controller -----------------
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


// ------------- add to chat user controller -----------------
const add_To_Chat = async (req,res)=>{
    const {adderId, addingId} = req.body

    if(!adderId) return res.status(404).send('adder id required')
    if(!addingId) return res.status(404).send('adding id required')

        await new chatUserList({adderId , addingId}).save()

        res.status(200).send('user add to chat')

}

// ------------- add to chat userlist controller -----------------
const  getchat_userList =async (req,res)=>{
    const currentUserId = req.params.userId
    const allUserList =  await chatUserList.find(
      { 
        $or: [ { adderId:currentUserId}, { addingId:currentUserId } ] 
      }
      ).populate('adderId' , 'userName , avater')
       .populate('addingId' , 'userName , avater')
    res.status(200).send(allUserList)
}


module.exports = {allUserData , add_To_Chat , getchat_userList} 