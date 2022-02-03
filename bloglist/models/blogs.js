const mongoose = require('mongoose');



const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    minLength: 5,
    required: true
  },
  author: {
    type: String,
    minLength: 5,
    required: true
  },
  url: {
    type: String,
    minLength: 10,
    required: true
  },
  likes: Number,
  user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
});


module.exports = mongoose.model('Blog', blogSchema);