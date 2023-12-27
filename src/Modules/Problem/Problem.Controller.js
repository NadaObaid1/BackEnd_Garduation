
import ProblemModel from "../../../DB/Model/Problem.Model.js"
//userID: req.user._id

export const createProblem = async(req, res)=>{
    const {problem} = req.body
    const createProb = await ProblemModel.create({problem })
    return res.status(201).json({message: "success", createProb})
    
    
 
}


