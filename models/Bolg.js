const mongoose =require("mongoose");
const  Schema = mongoose.Schema;
const blogSchema = new Schema({

    title:{
        type: String,
        require:true
    },
    content:{
        type: String,
        require:true
    },
    category :{
        type: String,
        require:true
    },

    createdOn:{
        type:Date,
        default :Date.now
    }
    
})



const blog = module.exports = mongoose.model("blogPosts",blogSchema);