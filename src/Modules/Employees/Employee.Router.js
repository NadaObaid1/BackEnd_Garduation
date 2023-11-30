// Employee.Router.js
import { Router } from 'express';
import * as employeeController from "./Employee.Controller.js";

const router = Router();

router.post('/employee', employeeController.createEmployee);
router.get('/employee', employeeController.getAllEmployees);
router.get('/employee/:id', employeeController.getEmployeeById);
router.put('/employee/:id', employeeController.updateEmployee);
router.delete('/employee/:id', employeeController.deleteEmployee);

export default router;
