import mongoose, {Schema, model, Types} from "mongoose";

const UploadjobSchema = new Schema({
   

    user_id: {
        type: String,
        required: true,
      },

      salon_id: {
        type: String,
        required: true,
      },

      user_name: {
        type: String,
        required: true,
      },

     jobName:{
        required: true,
        type: String,

    },
 

     image: {
        type: Object,
        
    },


},
{ 
    timestamps : true
})

const UploadjobModel = model('Uploadjob', UploadjobSchema, 'uploadjobs')
export default UploadjobModel