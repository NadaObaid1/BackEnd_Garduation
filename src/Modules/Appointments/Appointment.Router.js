import { Router } from 'express';
import * as appointmentController from "./Appointment.Controller.js";



const router = Router({mergeParams: true});      


router.post('/appointment',appointmentController.createAppointment);
router.get('/appointment', appointmentController.getAllAppointments);
router.get('/appointment/:id/info', appointmentController.getUserById);
router.get('/appointment/:id', appointmentController.getAppointmentById);
router.put('/appointment/:id', appointmentController.updateAppointment);
router.delete('/appointment/:id', appointmentController.deleteAppointment);

export default router;
