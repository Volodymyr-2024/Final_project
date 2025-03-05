import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import {
  createPost,
  deletePost,
  getAllPosts,
  getPostById,
  getPostsByUser,
  updatePost,
} from "../controllers/postCotroller.js";

const router = Router();
router.get("/allposts", getAllPosts);
router.get("/", authMiddleware, getPostsByUser);
router.post("/", authMiddleware, createPost);
router.delete("/:id", authMiddleware, deletePost);
router.get("/:id", getPostById);
router.put("/:id", authMiddleware, updatePost);

export default router;
