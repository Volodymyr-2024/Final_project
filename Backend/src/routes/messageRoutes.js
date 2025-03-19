import { Router } from "express";
import { getMessages, sendMessage } from "../controllers/messageControllers.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = Router();
router.get("/:userId/:targetUserId", authMiddleware, getMessages);
router.post("/:userId/:targetUserId", authMiddleware, sendMessage);

export default router;
