import { Router } from 'express';
import * as employeeController from "./Employee.Controller.js";
import fileUpload, {fileValidation} from "../../Services/multer.js"


const router = Router({mergeParams: true}); 

router.post('/employee',fileUpload(fileValidation.image).single('image'), employeeController.createEmployee);
router.get('/employee', employeeController.getAllEmployees);
router.get('/employee/:id', employeeController.getEmployeeById);
router.put('/employee/:id', employeeController.updateEmployee);
router.delete('/employee/:id', employeeController.deleteEmployee);

export default router;
