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
});

mongoose.model("User", UserSchema)