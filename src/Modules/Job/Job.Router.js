import {Router} from 'express'
import * as jobController from "./Job.Controller.js"
import {asynHandler} from '../../Services/errorHandler.js'
import validation from '../../Services/Validation.js'
import { JobSchema } from './Job.Validation.js'
import { auth } from '../../Middlware/Auth.js'

const router = Router()

router.post("/job", auth(["Admin"]), asynHandler(jobController.createJob));

export default router;