import { Router } from "express";
import {
  addComment,
  getCommentByPost,
} from "../controllers/commentController.js";

const router = Router();
router.post("/comment", addComment);
router.get("/comment/:postId", getCommentByPost);

export default router;
