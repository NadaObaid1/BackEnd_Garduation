import joi from "joi"




export const JobSchema = {
        body: joi.object({
            jobName: joi.string().required(),
            jobDescription: joi.string().required(),

        
        })
        }    
