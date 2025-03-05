import { Router } from "express";
import { getLikesByPost, toggleLike } from "../controllers/likeControllers.js";

const router = Router();
router.post("/like", toggleLike);
router.get("/likes/:postId", getLikesByPost);

export default router;
