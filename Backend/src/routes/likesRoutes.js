import { Router } from "express";
import {
  checkUserLike,
  getLikeCountByPost,
  getLikesUserByPost,
  toggleLike,
} from "../controllers/likeControllers.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = Router();
router.post("/like", authMiddleware, toggleLike);
router.post("/check", checkUserLike);
router.get("/likes-per-users/:postId", getLikesUserByPost);
router.get("/like/:postId", getLikeCountByPost);

export default router;
