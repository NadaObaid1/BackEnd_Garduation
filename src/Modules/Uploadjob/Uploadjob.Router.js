import {Router} from 'express'
import * as uploadjobController from "./Uploadjob.Controller.js"
import fileUpload, {fileValidation} from "../../Services/multer.js"
import {auth, roles} from "../../Middlware/Auth.js"


const router = Router({mergeParams: true}); 
 

router.post("/uploadjob", auth([roles.Admin, roles.User]),fileUpload(fileValidation.pdf).single('cvFile'), uploadjobController.uploadJob);
router.get("/uploadjob", auth(roles.Admin),uploadjobController.getAllJobs);

export default router;  