import {Router} from 'express'
import * as jobController from "./Job.Controller.js"
import fileUpload, {fileValidation} from "../../Services/multer.js"
import {auth, roles} from "../../Middlware/Auth.js"




const router = Router({mergeParams: true});      
  

router.post("/job", auth([roles.Admin, roles.Manager]),fileUpload(fileValidation.image).single('image'), jobController.createJob);
router.get("/job", auth([roles.Admin, roles.User, roles.Manager]),jobController.getAllJobs);
router.get('/job/:id', auth([roles.Admin, roles.User, roles.Manager]),jobController.getJobById);
router.put('/job/:id', auth([roles.Admin, roles.Manager]),jobController.updateJob);
router.delete('/job/:id', auth([roles.Admin, roles.Manager]),jobController.deleteJob); 

export default router; 