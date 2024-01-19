import {Router} from 'express'
import * as userController from "./Problem.Controller.js"

//import { auth } from '../../Middlware/Auth.js'
// auth(["Admin"]),
const router = Router()

router.post("/problem",userController.createProblem);
router.get('/problem/:id/status', userController.getUserProblem);

export default router;