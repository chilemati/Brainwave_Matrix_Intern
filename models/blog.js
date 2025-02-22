const mongoose = require('mongoose');
const { Schema } = mongoose;
const { TandD } = require("../services/getTimeAndDate");

const blogSchema = new Schema({
  title: {
    type: String,
    required: [true,'Please provide a blog title'],
  },
  email: {
    type: String,
    required: [true,'Please provide a valid email'],
  }, 
  body: {
    type: String,
    required: [true,'Please provide a blog content'],
  },
  author: {
    type: String,
    required: [true, "please provide the blog author"],
    text: true,
  },
  date: {
    type: String,
    default: TandD(),
    text: true,
  },
  like: {
    type: Array,
    required: false,
    default: [],
  },
  dislike: {
    type: Array,
    required: false,
    default: [],
  },
  comments: {
    type: Array,
    required: false,
    default: [],
  },
 
},{timestamps:true});

const Blog = mongoose.model('Blog', blogSchema);
module.exports = Blog;