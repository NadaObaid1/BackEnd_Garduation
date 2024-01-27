import { Router } from 'express';
import * as managerController from "./Manager.Controller.js";



const router = Router({mergeParams: true});      


router.post('/manager',managerController.createManager);
router.get('/manager', managerController.getAllManagers);
router.get('/manager/:id', managerController.getManagerById);
router.put('/manager/:id', managerController.updateManager);
router.delete('/manager/:id', managerController.deleteManager);

export default router;
