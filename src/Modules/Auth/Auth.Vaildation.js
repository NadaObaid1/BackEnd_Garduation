import joi from "joi"

export const SignUpSchema = {
body: joi.object({
    userName: joi.string().alphanum().required(),
    email : joi.string().email(),
    age: joi.number().max(50).min(18).required(),
    phone: joi.string().required().regex(/^05\d{8}$/),
    address: joi.string().required(),
    password : joi.string().required().min(5),
    confirmpassword : joi.string().valid(joi.ref('password')).required()

})
}
export const SignInSchema = joi.object({
    email: joi.string().email().messages({
        'string.empty': "email is requried",
        'string.email' : "plz enter avalid email"
    }),
    password: joi.string().required().min(5).messages({
        'string.empty': "password is requried",
    })
})
