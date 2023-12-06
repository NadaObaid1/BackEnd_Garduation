import joi from "joi"

export const ProblemSchema = {
body: joi.object({
    problem: joi.string().required(),

})
}



  
