
import ProblemModel from "../../../DB/Model/Problem.Model.js"


export const createProblem = async(req, res)=>{
    const {problem} = req.body
    const createProb = await ProblemModel.create({problem, userID: req.user._id})
    return res.status(201).json({message: "success", createProb})
    
    

}


