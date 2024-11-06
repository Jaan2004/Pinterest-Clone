const mongoose= require("mongoose");
 
mongoose.connect('mongodb://localhost:27017/pinterest');

const plm= require("passport-local-mongoose")

const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String
  },
  image:{
    type: String
  },
  posts: [
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post' // Assuming you have a Post model
    }
  ],
  dp: {
    type: String
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  fullname: {
    type: String,
    required: true
  }
});

userSchema.plugin(plm)
module.exports=mongoose.model('user1',userSchema)

