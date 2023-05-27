

const mongoose = require('mongoose');


const userSchema = mongoose.Schema({
  username : {

    type:String,
    required:true
  },
  fullname : {

    type:String,
    required:true
  },
  email : {

    type:String,
    required:true
  },
  role: {
    type: String,
    required: true,
    enum: ["admin", "owner", "client"]
  },
  
  password: {
    type: String, 
    required: true},

    
    joinedAt: {
      type: Date,
      default: Date.now
    }
  
})
const User = mongoose.model('User', userSchema)

module.exports = User;