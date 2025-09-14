const mongoose = require ('mongoose')

const chatUserSchema = new mongoose.Schema({
    adderId:{
        type:mongoose.Schema.ObjectId,
        ref:'auth',
        required:true
    },
    addingId:{
        type:mongoose.Schema.ObjectId,
        ref:'auth',
        required:true
    },
    lastMassage:{
        type:String,
        default:null
    },
},{timestamps:true})

module.exports = mongoose.model('chatUser', chatUserSchema)