import joi from "joi"

export const UserSchema = {
body: joi.object({
    userName: joi.string().alphanum().required(),
    age: joi.number().max(50).min(18).required(),
    phone: joi.string().required().regex(/^05\d{8}$/),
    address: joi.string().required(),


})
}

