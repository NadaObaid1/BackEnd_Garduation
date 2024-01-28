import {Router} from 'express'
import * as profileController from "./Profile.Controller.js"
import {auth, roles} from "../../Middlware/Auth.js"


const router = Router()


router.put('/profile/:id', auth([roles.Admin, roles.User, roles.Manager]), profileController.updateProfile);


export default router;  