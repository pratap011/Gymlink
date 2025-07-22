import { Router } from "express";
import { addGymData,fetchGymData,listGyms } from "../controllers/gymController";
import { protect } from "../middleware/authMiddleware";

const gymrouter=Router();

gymrouter.post('/add',protect, addGymData);
gymrouter.get('/search',protect,fetchGymData);
gymrouter.get('/list',protect,listGyms)

export default gymrouter;