import { Router } from "express";
import {
  createNotification,
  getNotofocation,
  markAsRead,
} from "../controllers/notificationController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = Router();
router.get("/", authMiddleware, getNotofocation);
router.post("/", createNotification);
router.patch("/:id/read", authMiddleware, markAsRead);

export default router;
