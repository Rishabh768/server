const mongoose=require('mongoose')

const message = new mongoose.Schema({
    name: String,
    email:String,
    message:String
  });

  const Contact=mongoose.model('Contact',message)
  module.exports=Contact