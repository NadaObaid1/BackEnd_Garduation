import mongoose, {Schema, model, Types} from "mongoose";

const PostSchema = new Schema({
   
    textPost:{
        required: true,
        type: String,

    },

    userID: {
        type: Types.ObjectId,
        ref: "Employee"
    },

    image: {
        type: Object,
        
    },
    
    likes: {
        type: Number,
        default: 0,
    },



},
{ 
    timestamps : true
})

const PostModel = model('Post', PostSchema, 'posts')
export default PostModel