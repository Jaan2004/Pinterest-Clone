const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema({
  content: {
    type: String,
  },
  image: { // Add this line
    type: String,
},
  user: {
    type: Schema.Types.ObjectId,
    ref:'user1'
  },
  postDate: {
    type: Date,
    default: Date.now
  },
  likes: {
    type: Array,
    default: [],
  }
});

module.exports = mongoose.model('Post', postSchema);


