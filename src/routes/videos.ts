import {Router} from "express";
import {  getAllVideos, postVideo } from "../controllers/videos";
import { verifyIdToken } from "../middlewares/auth";

const router=Router();

router.post("/upload",verifyIdToken,postVideo);
router.get("/all",verifyIdToken,getAllVideos);

export default router