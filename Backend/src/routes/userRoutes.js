import { Router } from "express";
import {
  getAllProfile,
  getProfile,
  updateProfile,
  upload,
} from "../controllers/userController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = Router();
router.put("/", authMiddleware, upload.single("profileImage"), updateProfile);
router.get("/allusers", authMiddleware, getAllProfile);
router.get("/:id", getProfile);

export default router;
