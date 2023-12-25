import mongoose, {Schema, model, Types} from "mongoose";

const UploadjobSchema = new Schema({
   
    jobName:{
        required: true,
        type: String,

    },
 

    cvFile: {
        type: Object,
        
    },

    userID: {
        type: Types.ObjectId,
        ref: "User"
    } 


},
{ 
    timestamps : true
})

const UploadjobModel = model('Uploadjob', UploadjobSchema, 'uploadjobs')
export default UploadjobModel