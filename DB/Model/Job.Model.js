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

    image: {
        type: Object,
        
    },

    userID: {
        type: Types.ObjectId,
        ref: "Employee"
    } 


},
{ 
    timestamps : true
})

const JobModel = model('Job', JobSchema, 'jobs')
export default JobModel