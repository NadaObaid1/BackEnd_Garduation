import {Router} from 'express'
import * as profileController from "./Profile.Controller.js"


const router = Router()


router.put('/profile/:id', profileController.updateProfile);


export default router;  