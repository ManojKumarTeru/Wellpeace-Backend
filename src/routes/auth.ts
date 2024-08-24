import { Router } from "express";
import { getUser, login, signup, updateUserImage, updateUserName } from "../controllers/auth";
import multer from 'multer'
import { verifyIdToken } from "../middlewares/auth";
const router = Router();
const storage=multer.memoryStorage()
const upload=multer({storage:storage})

router.post("/signup", signup);
router.post("/login", login);
router.patch("/updateUsername",verifyIdToken,updateUserName);
router.patch("/updateUserImage",verifyIdToken,upload.any(),updateUserImage)
router.get("/getUserInfo",getUser);

export default router;
