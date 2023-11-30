import {Router} from 'express'
import * as ServicesController from './Services.Controller.js'
import fileUpload, {fileValidation} from "../../Services/multer.js"

const router = Router()

router.get("/getServices", ServicesController.getServices);
router.post("/CreateServices", fileUpload(fileValidation.image).single('image'), ServicesController.CreateServices);

export default router