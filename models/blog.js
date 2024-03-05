const mongoose=require("mongoose");
const blogSchema=mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    snippet:{
        type: String,
        required: true
    },
    body:{
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    }
},{timestamps:true})

const Blog= mongoose.model('newBlog',blogSchema);
module.exports= Blog