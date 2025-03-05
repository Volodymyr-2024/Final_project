import { Router } from "express";
import {
  loginUser,
  registerUser,
  resetPassword,
} from "../controllers/authController.js";

const router = Router();
router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/reset", resetPassword);

export default router;
