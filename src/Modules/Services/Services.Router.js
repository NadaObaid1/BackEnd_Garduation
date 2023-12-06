import {Router} from 'express'
import * as ServicesController from './Services.Controller.js'
import fileUpload, {fileValidation} from "../../Services/multer.js"
//import { endPoint } from './Services.endPoint.js';

const router = Router()

router.get("/getServices", ServicesController.getServices);
router.post("/CreateServices", fileUpload(fileValidation.image).single('image'), ServicesController.CreateServices);
router.put("/updateServices/:id", fileUpload(fileValidation.image).single('image'), ServicesController.updateServices);
router.patch('/softDelete/:id', ServicesController.softDelete) //patch لانه تعديل ع حقل واحد بس
router.patch('/restore/:id', ServicesController.restore)
router.delete('/hardDelete/:id', ServicesController.hardDelete)

export default router