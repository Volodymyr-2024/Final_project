import { Router } from "express";
import {
  addComment,
  getCommentByPost,
} from "../controllers/commentController.js";

const router = Router();
router.post("/comment", addComment);
router.get("/comments/:postId", getCommentByPost);

export default router;
