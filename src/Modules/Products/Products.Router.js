import { Router } from "express";
import * as ProductController from './Products.Controller.js'
import fileUpload, {fileValidation} from "../../Services/multer.js"

const router = Router({mergeParams: true}); 

router.get('/getProducts', ProductController.getProducts)
router.get('/getBodyProducts', ProductController.getBodyProducts)
router.get('/getFaceProducts', ProductController.getFaceProducts)
router.post("/CreateProducts", fileUpload(fileValidation.image).single('image'), ProductController.CreateProducts);
router.delete('/hardDelete/:id', ProductController.hardDelete)
router.delete('/softDelete/:id', ProductController.softDelete)

export default router 