import {Router} from 'express'
import * as userController from "./Problem.Controller.js"
import {asynHandler} from '../../Services/errorHandler.js'
import validation from '../../Services/Validation.js'
import { ProblemSchema } from './Problem.Validation.js'
//import { auth } from '../../Middlware/Auth.js'
// auth(["Admin"]) ,
const router = Router()

router.post("/problem", validation(ProblemSchema), asynHandler(userController.createProblem));

export default router;