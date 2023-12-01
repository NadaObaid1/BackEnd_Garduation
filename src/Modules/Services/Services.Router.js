import {Router} from 'express'
import * as ServicesController from './Services.Controller.js'
import fileUpload, {fileValidation} from "../../Services/multer.js"
//import { auth } from '../../MiddelWare/Auth.js';
import { endPoint } from './Services.endPoint.js';

const router = Router()

router.get("/getServices", endPoint.getServices, ServicesController.getServices);
router.get("/getDetailsServices", endPoint.getDetailsServices, ServicesController.getDetailsServices);
router.post("/CreateServices", endPoint.create, fileUpload(fileValidation.image).single('image'), ServicesController.CreateServices);
router.put("/updateServices/:id", endPoint.update, fileUpload(fileValidation.image).single('image'), ServicesController.updateServices);
router.patch('/softDelete/:id', endPoint.softDelete, ServicesController.softDelete) //patch لانه تعديل ع حقل واحد بس
router.patch('/restore/:id', endPoint.restore, ServicesController.restore)
router.delete('/hardDelete/:id', endPoint.hardDelete, ServicesController.hardDelete)

export default router