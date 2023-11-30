import {Router} from 'express'
import * as userController from "./Problem.Controller.js"
import {asynHandler} from '../../Services/errorHandler.js'
import validation from '../../Services/Validation.js'
import { ProblemSchema } from './Problem.Validation.js'
import { auth } from '../../Middlware/Auth.js'

const router = Router()

router.post("/problem", auth(["Admin"]) ,validation(ProblemSchema), asynHandler(userController.createProblem));

export default router;