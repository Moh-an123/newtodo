const mongoose=require('mongoose')
const todoScheme=new mongoose.Schema({
    task:String,
    finish: { type: Boolean, default: false }

});
const todomodel=mongoose.model('todos',todoScheme)
module.exports=todomodel;