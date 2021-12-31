const mongoose = require('mongoose')
const Schema = mongoose.Schema


const User = new Schema({
    phone:String,
    parent:String,
    
})




module.exports = mongoose.model('User', User)