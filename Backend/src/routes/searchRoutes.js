import { Router } from "express";
import { searchPosts, searchUsers } from "../controllers/searchController.js";

const router = Router();
router.get("/users", searchUsers);
router.get("/explore", searchPosts);

export default router;
