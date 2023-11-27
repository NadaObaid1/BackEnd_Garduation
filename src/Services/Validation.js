import { SignInSchema } from "../Modules/Auth/Auth.Vaildation.js";

const dataMethods = ['body','query', 'params', 'headers']
const validation = (schema) => {
    return (req,res,next) => {
        const validationArray = []; //لتجميع كل الاخطاء

        dataMethods.forEach((key)=>{
            if(schema[key]){
                const vaildationResult = schema[key].validate(req[key], {abortEarly: false});
                if(vaildationResult.error){
                    validationArray.push(vaildationResult.error.details)
                 }}
        })

        if(validationArray.length > 0){
            return res.json({meesage: "validation error", validationArray})
        }else{
            next();
        }}
   
}

export default validation