const mongoose = require("mongoose")
const { ObjectId } = mongoose.Schema.Types

const pageSchema = new mongoose.Schema({
    pageTitle: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true,
    }
});

const commentSchema = new mongoose.Schema({
    user: {
        _id: {
            type: ObjectId,
            ref: "User",
            required: true
        },
        username: {
            type: String,
            required: true
        },
        profilResmi: {
            type: String
        }
    },
    content: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const bookSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    shortDesc:{
        type: String,
        required: true
    },
    category:{
        type: String,
        required: true
    },
    kapakResmi:{
        type: String,
        required: true
    },
    pages: [pageSchema],
    views: {
        type: Number,
        default: 0,
    },
    likes:[{
        type: ObjectId, 
        ref: "User",
    }],
    author:{
        type: ObjectId,
        ref: "User"
    },
    comments: [commentSchema]
})

mongoose.model("Book", bookSchema)