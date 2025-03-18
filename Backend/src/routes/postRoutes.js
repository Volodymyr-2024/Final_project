import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import {
  createPost,
  deletePost,
  getAllPosts,
  getFourPosts,
  getPostById,
  getPostsByUser,
  updatePost,
} from "../controllers/postController.js";
import { upload } from "../controllers/userController.js";

const router = Router();
router.get("/allposts", getAllPosts);
router.get("/fourposts", getFourPosts);
router.get("/", authMiddleware, getPostsByUser);
router.post("/", authMiddleware, upload.single("image"), createPost);
router.delete("/:id", authMiddleware, deletePost);
router.get("/:id", authMiddleware, getPostById);
router.put("/:id", authMiddleware, upload.single("image"), updatePost);

export default router;
