import {Router} from 'express'
import * as FavoriteController from './Favorite.Controller.js'
import { auth } from '../../Middlware/Auth.js';
import { endPoint } from './Favorite.endPoint.js';

const router = Router();

router.post('/',auth(endPoint.create), FavoriteController.AddFavorite);
router.patch('/removeItem',auth(endPoint.delete), FavoriteController.removeItem);
router.get('/getFavorite',auth(endPoint.get), FavoriteController.getFavorite);
router.patch('/clearFavorite',auth(endPoint.clear), FavoriteController.clearFavorite); 

export default router