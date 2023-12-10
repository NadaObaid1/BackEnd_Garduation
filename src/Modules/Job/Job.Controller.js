import JobModel from "../../../DB/Model/Job.Model.js"

export const createJob = async(req, res)=>{
    const {jobName, jobDescription} = req.body
    const createJ = await JobModel.create({jobName, jobDescription, userID: req.user._id})
    return res.status(201).json({message: "success"})
    
    
}