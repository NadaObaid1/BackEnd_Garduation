
import mongoose, {Schema, model, Types} from "mongoose";

const PostSchema = new Schema({
   
    textPost:{
        required: true,
        type: String,

    },

    salonID: {
        type: Types.ObjectId,
        ref: "Salon"
    },

 
    image: {
        type: Object,
        
    },
    
    likes:  [{type: Types.ObjectId, ref: "User"}],


},
{ 
    timestamps : true
})

const PostModel = model('Post', PostSchema, 'posts')
export default PostModel