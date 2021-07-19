const mongoose = require('mongoose');
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  userName:{
    type: String,
    required: true
  },
  password:{
    type: String,
    required: true
  },
  registered: {
    type: Date,
    default: Date.now
  },

},{
  toJSON: {
    transform(doc, ret){
      delete ret.password
    }
  }
})

userSchema.pre('save', function(next){
  let user = this
  if(user.isModified('password')){
    let hash = bcrypt.hashSync(user.password, 10);
    user.password = hash
    next()
  } else {
    next()
  }
})

const User = mongoose.model('User', userSchema)

module.exports = User;