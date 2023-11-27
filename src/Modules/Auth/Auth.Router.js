import {Router} from 'express'
import * as controllerAuth from "./Auth.Controller.js"
import {asynHandler} from '../../Services/errorHandler.js'
import validation from '../../Services/Validation.js'
import {SignInSchema} from './Auth.Vaildation.js'
import {SignUpSchema} from './Auth.Vaildation.js'
const router = Router()

router.post("/signup", validation(SignUpSchema), asynHandler(controllerAuth.SignUp));
router.get("/signin", validation(SignInSchema), asynHandler(controllerAuth.SignIn));
router.get("/confirmEmail/:token", asynHandler(controllerAuth.ConfirmEmail));
router.patch("/SendCode", asynHandler(controllerAuth.SendCode))
router.patch("/forgetPassword", asynHandler(controllerAuth.forgetPassword))
export default router;