import mongoose, {Schema, model, Types} from "mongoose";

const ProblemSchema = new Schema({
   
    problem:{
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

const ProblemModel = model('Problem', ProblemSchema)
export default ProblemModel