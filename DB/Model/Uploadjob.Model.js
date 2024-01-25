import mongoose, {Schema, model, Types} from "mongoose";

const UploadjobSchema = new Schema({
   




    user_name: {
        type: String,
        required: true,
      },

    jobName:{
        required: true,
        type: String, 

    },
 

    cvFile: { 
        type: Object,
        
    },

    SalonId:{type: Types.ObjectId, ref: 'Salon', required: true},
    createdBy:{type: Types.ObjectId, ref: 'User'},
    updatedBy: {type: Types.ObjectId, ref: 'User'},


},
{ 
    timestamps : true
})

const UploadjobModel = model('Uploadjob', UploadjobSchema, 'uploadjobs')
export default UploadjobModel