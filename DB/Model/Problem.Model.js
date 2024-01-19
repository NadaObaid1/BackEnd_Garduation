import mongoose, {Schema, model, Types} from "mongoose";

const ProblemSchema = new Schema({
   
    problem:{
        required: true,
        type: String,

    }, 
    user_id: {
        type: String, 
        required: true,
      },
},
{ 
    timestamps : true
})

const ProblemModel = model('Problem', ProblemSchema)
export default ProblemModel