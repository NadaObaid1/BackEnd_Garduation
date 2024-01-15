import jwt from "jsonwebtoken";
import userModel from "../../DB/Model/User.Model.js"

export const roles = {
   Admin: 'Admin', User:'User'
}

export const auth = ()=>{
    return async (req, res, next)=>{

    let {token} = req.headers;
       if(!token?.startsWith(process.env.BEARERKEY)){
        return res.status(400).json({message:"Invalid Berar"});
       }
       token = token.split(process.env.BEARERKEY)[1];//splitحولي اياه لاري وقص من عند البيررر كي
       const decoded = jwt.verify(token, process.env.LOGINSINGURE); //بواسطة ال jwt
       if(!decoded) {
        return res.status(400).json({message:"Invalid token"});
       }
       const user = await userModel.findById(decoded.id).select("userName role");
        if(!user){
        return res.status(404).json({message:"not registerd user"});
       }
      //  if(!accessRole.includes(user.role)){
      //   return res.status(403).json({message:"Unauthorized"});
      //  }
       req.user = user
       next()
       
    }}

   

    