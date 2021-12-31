const mongoose = require('mongoose')
const Schema = mongoose.Schema


const Bank = new Schema({
    user:String,
    parent:String,
    name:String,
    phone:String,
    email:String,
    url:String,
    isActive: Number,
    status:Number,
    point:Number,
    image: String,
    mainMenu:String,
    subMenu:String,
    date:{
        type:Date,
        default:Date.now(Date.UTC)}
})




module.exports = mongoose.model('Bank', Bank)