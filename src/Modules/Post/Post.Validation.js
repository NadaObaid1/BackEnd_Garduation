import joi from "joi"

export const PostSchema = {
    body: joi.object({
        textPost: joi.string().required(),
    
    })
    }