import { Router } from 'express';
import * as salonController from "./Salon.Controller.js";
import ProductRouter from "../Products/Products.Router.js"
import ServiceRouter from "../Services/Services.Router.js"
import PostRouter from "../Post/Post.Router.js"
import JobRouter from "../Job/Job.Router.js"
import UploadjobRouter from "../Uploadjob/Uploadjob.Router.js"
import EmployeeRouter from "../Employees/Employee.Router.js"
import AppointmentRouter from "../Appointments/Appointment.Router.js"


import {auth, roles} from "../../Middlware/Auth.js"

import fileUpload, {fileValidation} from "../../Services/multer.js"


const router = Router();

router.use("/:id/Product", ProductRouter)
router.use("/:id/services", ServiceRouter)
router.use("/:id/Post", PostRouter)
router.use("/:id/Job", JobRouter)
router.use("/:id/Uploadjob", UploadjobRouter)
router.use("/:id/Employee", EmployeeRouter)
router.use("/:id/Appointment", AppointmentRouter)

router.post('/salon',fileUpload(fileValidation.image).single('image'), salonController.createSalon);
router.get('/salon', auth([roles.Admin, roles.User]) ,salonController.getAllSalons);
router.get('/salon/:id/branches', salonController.getBranchesOfSalon);
router.get('/salon/:id', salonController.getSalonById);
router.put('/salon/:id', salonController.updateSalon);
router.delete('/salon/:id', salonController.deleteSalon);

export default router;
