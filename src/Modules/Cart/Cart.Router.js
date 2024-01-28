import {Router} from 'express'
import * as CartController from './Cart.Controller.js'
import { auth } from '../../Middlware/Auth.js';
import { endPoint } from './Cart.endPoint.js';

const router = Router();

router.post('/',auth(endPoint.create), CartController.CreateCart);
router.patch('/removeItem',auth(endPoint.delete), CartController.removeItem);
router.patch('/clearCart',auth(endPoint.clear), CartController.clearCart);
router.get('/getCart',auth(endPoint.get), CartController.getCart); 
router.put('/increaseQuantity',auth(endPoint.put), CartController.increaseQuantity);
router.put('/decreaseQuantity',auth(endPoint.put), CartController.decreaseQuantity);
router.get('/calculateTotalPrice',auth(endPoint.get), CartController.calculateTotalPrice);

export default router