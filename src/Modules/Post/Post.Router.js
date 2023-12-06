import {Router} from 'express'
import * as postController from "./Post.Controller.js"
import {asynHandler} from '../../Services/errorHandler.js'
import { PostSchema } from './Post.Validation.js'
import { auth } from '../../Middlware/Auth.js'

const router = Router()


router.post("/post", auth(["Admin"]),  asynHandler(postController.createPost));
router.get("/post", auth(["Admin", "User"]), asynHandler(postController.getPost));

export default router;