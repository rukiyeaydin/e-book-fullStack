const mongoose = require("mongoose")
const { ObjectId } = mongoose.Schema.Types

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  profilResmi: {
    type: String,
    default: "https://arayorum.com/images/profilbg.jpg",
  }, 
  followers: [{
    type: ObjectId,
    ref: "User"
  }],
  following: [{
    type: ObjectId,
    ref: "User"
  }],
  booksRead: [{
    book: {
      type: ObjectId,
      ref: "Book"
    },
    progress: {
      type: Number,
      default: 0
    }
  }]
});

mongoose.model("User", UserSchema)