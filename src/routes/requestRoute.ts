import express from 'express';
import { addRequest } from '../controllers/requestController';
import { protect } from '../middleware/authMiddleware';
import { acceptRequest, viewReqeusts } from '../controllers/requestController';



const requestRouter=express.Router();

requestRouter.post('/add',protect,addRequest);
requestRouter.post('/accept',protect,acceptRequest);
requestRouter.post('/view',protect,viewReqeusts)

export default requestRouter;
