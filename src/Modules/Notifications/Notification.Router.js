import { Router } from "express";
import * as notificationController from "./Notification.Controller.js";

const router = Router({ mergeParams: true });

router.post("/notification", notificationController.createNotification);
router.get("/notifications", notificationController.getAllNotifications);
router.get('/userNotification', notificationController.getUserNotifications); 
router.delete('/notification/:id', notificationController.deleteNotification);
router.get("/managerNotification", notificationController.getSalonNotifications);



export default router;
