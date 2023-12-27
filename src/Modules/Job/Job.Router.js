import {Router} from 'express'
import * as jobController from "./Job.Controller.js"
import fileUpload, {fileValidation} from "../../Services/multer.js"

//import { auth } from '../../Middlware/Auth.js'
// auth(["Admin"]),

const router = Router() 

router.post("/job", fileUpload(fileValidation.image).single('image'), jobController.createJob);
router.get("/job", jobController.getAllJobs);
router.get('/job/:id', jobController.getJobById);
router.put('/job/:id', jobController.updateJob);
router.delete('/job/:id', jobController.deleteJob);

export default router;