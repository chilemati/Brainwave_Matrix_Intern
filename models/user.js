const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  email: {
    type: String,
    required: [true,'Please provide a valid email'],
    unique: [true,'A user with this email already exist']
  }, 
  password: {
    type: String,
    required: [true,'Please provide a valid password'],
  }, 
  firstName: {
    type: String,
    required: [true,'Please provide a your firstName'],
  }, 
  lastName: {
    type: String,
    required: [true,'Please provide a your lastName'],
  }, 
  role: {
    type: String,
    required: [true,'role required'],
  }, 
  token: {
    type: String,
    required: false,
  }, 
  
},{timestamps:true});

const User = mongoose.model('User', userSchema);
module.exports= User