import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { customAlphabet } from 'nanoid'
import { sendEmail } from "../../Services/Email.js"
import UserModel from "../../../DB/Model/User.Model.js"

export const SignUp = async(req, res)=>{
        const{userName, email, phone, address, age, password, confirmpassword} = req.body;
        const User = await UserModel.findOne({email})
        if(User){
         return res.status(404).json({message: "email already exists"})
        }
        const hashedpassword = bcrypt.hashSync(password, parseInt(process.env.SALT_ROUND));
        if (password !== confirmpassword) {
            return res.status(400).json({ message: "Passwords do not match" });
        }
        const token = jwt.sign({email}, process.env.ConfirmEmailSecure)
        await sendEmail(email, "confirm email", `<a href="${req.protocol}://${req.headers.host}/auth/confirmEmail/${token}">Verfiy</a>`)
        const createUser = await UserModel.create({userName, email, phone, address, age, confirmpassword: true, password:hashedpassword})
        return res.status(201).json({message: "success", user: createUser})
}

export const SignIn = async(req, res, next)=>{
    const{email, password} = req.body;
    const user = await UserModel.findOne({email})
    if(!user){
        return res.status(404).json({message: "data invaid"});
    }
    const match = bcrypt.compareSync(password, user.password)
    if(!match){
        return res.status(404).json({message: "data invaid"});
    }

    const token = jwt.sign({id:user._id, role: user.role}, process.env.LOGINSINGURE, {expiresIn: '1h'})//عشان موضوع السيكورتي وما يصير في تعديل ع الداتا 
    const refreshToken = jwt.sign({id:user._id, role: user.role}, process.env.LOGINSINGURE, {expiresIn:  60*60*24*30})
    return res.status(200).json({message: "success", token, refreshToken});
}

export const ConfirmEmail = async(req, res)=>{
    const token = req.params.token;
    const decoded = jwt.verify(token, process.env.ConfirmEmailSecure);
     if(! decoded){
        return res.status(404) .json({message:"invalid token"});
     }
    const user =await UserModel.findOneAndUpdate({email: decoded.email, confirmEmail: false}, {confirmEmail: true})
    if(!user){
        return res.status(400).json({message:"invalid verify your email or your email is verified"})
    }
        return res.status(200).json({message:"your email is verified"});
}

export const SendCode = async(req, res)=>{ 
    const {email} = req.body
    let code = customAlphabet('1234567890', 4)
    code = code()
    const user = await UserModel.findOneAndUpdate({email}, {sendCode: code}, {new:true}); //من خلال  الايميل غيرلي الكود من نل للقيمة الجديدة وعدل البيانات
    const html = `<h2>code is : ${code} </h2>`
    await sendEmail(email, `Resetpassword`, html);
    //return res.redirect(process.env.REDICTPAGE)
    return res.status(200).json({message:"success", user});
}

export const forgetPassword = async(req, res)=>{
    const {email, password, code} = req.body;
    const user = await UserModel.findOne({email});
    if(!user){
        return res.status(404).json({message:"not register account"});
    }
    if(user.sendCode != code) {
        return res.status(400).json({message:"invalid code"});
    }
    let match = await bcrypt.compare(password, user.password);
    if(match){
        return res.status(409).json({message:"same password"});
    }
    user.password = await bcrypt.hash(password, parseInt(process.env.SALT_ROUND));
    user.sendCode=null;
    await user. save();
    return res.status(200).json({message: "success"});       
}
