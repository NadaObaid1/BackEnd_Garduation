import mongoose, {Schema, model, Types} from "mongoose";

const JobSchema = new Schema({
   
    jobName:{
        required: true,
        type: String,

    },

    jobDescription: {
        required: true,
        type: String,

    },

    userID: {
        type: Types.ObjectId,
        ref: "User"
    }


},
{ 
    timestamps : true
})

const JobModel = model('Job', JobSchema)
export default JobModel