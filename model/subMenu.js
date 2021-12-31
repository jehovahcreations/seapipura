const mongoose = require('mongoose')
const Schema = mongoose.Schema


const subMenu = new Schema({
    mainmenu:String,
    menuName:String,
    menuID:String,
    image:String,
    url:String,
    data: String,
    points:Number,
    
    date:{
        type:Date,
        default:Date.now(Date.UTC)}
},
{strict:false })




module.exports = mongoose.model('subMenu', subMenu)