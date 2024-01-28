import {Router} from 'express'
import * as postController from "./Post.Controller.js"
import fileUpload, {fileValidation} from "../../Services/multer.js"
import {auth, roles} from "../../Middlware/Auth.js"


const router = Router({mergeParams: true}); 



router.post("/post", auth([roles.Admin, roles.Manager]),fileUpload(fileValidation.image).single('image'), postController.createPost);
router.get("/post", auth([roles.Admin, roles.User, roles.Manager]),postController.getAllPosts);
router.get('/post/:id', auth([roles.Admin, roles.User, roles.Manager]),postController.getPostById);
router.put('/post/:id', auth([roles.Admin, roles.Manager]),postController.updatePost);
router.delete('/post/:id', auth([roles.Admin, roles.Manager]),postController.deletePost);
router.post('/post/:id/:Id', postController.increaseLikesController);

 
export default router; 