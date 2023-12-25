import {Router} from 'express'
import * as uploadjobController from "./Uploadjob.Controller.js"
import fileUpload, {fileValidation} from "../../Services/multer.js"

const router = Router() 

router.post("/uploadjob", fileUpload(fileValidation.pdf).single('image'), uploadjobController.uploadJob);
router.get("/uploadjob", uploadjobController.getAllJobs);

export default router;