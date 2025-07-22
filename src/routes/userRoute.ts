import { Router } from "express";
import { registerUser,loginUser, fetchUserData,mapUserToGym, fetchUserProfile, fetchUserFeed } from "../controllers/userController";
import { protect } from "../middleware/authMiddleware";

const router=Router();

router.post('/register',registerUser);
router.post('/login',loginUser);
router.get('/userdetails',protect, fetchUserData);
router.post('/maptogym',protect, mapUserToGym)
router.get('/fetchprofile',protect, fetchUserProfile)
router.get('/fetchfeed',protect, fetchUserFeed)

export default router;