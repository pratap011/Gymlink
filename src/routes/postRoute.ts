import {Request,Response} from 'express';
import { upload } from '../middleware/upload';
import { protect } from '../middleware/authMiddleware';
import express from 'express'
import { handleCreatePost,handleLikes } from '../controllers/postController';

const postRouter = express.Router();

postRouter.post(
  '/upload',
  protect,
  upload.single('image'),
  handleCreatePost

);

postRouter.post('/addlike',protect,handleLikes)

export default postRouter;