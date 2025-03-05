import { Router } from "express";
import {
  getProfile,
  updateProfile,
  upload,
} from "../controllers/userController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = Router();
router.get("/:id", getProfile);
router.put("/", authMiddleware, upload.single("profileImage"), updateProfile);

export default router;
