import PostModel from "../../../DB/Model/Post.Model.js"

export const createPost = async(req, res)=>{
    const {textPost} = req.body
    const createP = await PostModel.create({textPost, userID: req.user._id})
    return res.status(201).json({message: "success"})
    
    
}

export const getPost = async(req, res)=>{
    
    const posts = await PostModel.find({}).populate({path: "userID", select: "userName -_id"})
    return res.status(201).json({post: posts})
    
    
}