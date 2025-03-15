import { Router } from "express";
import {
  checkUserLike,
  getLikesUserByPost,
  toggleLike,
} from "../controllers/likeControllers.js";

const router = Router();
router.post("/like", toggleLike);
router.post("/likes/check", checkUserLike);
router.get("/:postId/likes-per-users", getLikesUserByPost);

export default router;
