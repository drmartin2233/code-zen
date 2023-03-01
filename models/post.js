const mongoose = require('mongoose');
// Shortcut to the mongoose.Schema class
const Schema = mongoose.Schema;

const commentSchema = new Schema({
  content: {
    type: String,
    required: true
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
    userName: String,
    userAvatar: String
}, {
  timestamps: true
});


const postSchema = new Schema({
    title: {
      type: String,
      required: true
    },
    
    postContent: {
      type: String,
      required: true
    },
   
    comments: [commentSchema]
  }, {
    timestamps: true
  });
  
  module.exports = mongoose.model('Post', postSchema);