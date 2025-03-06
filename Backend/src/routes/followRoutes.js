import { Router } from "express";
import {
  followUser,
  getFollowers,
  getFollowing,
  unfollowUser,
} from "../controllers/followController.js";

const router = Router();
router.post("/follow", followUser);
router.post("/unfollow", unfollowUser);
router.get("/:id/followers", getFollowers);
router.get("/:id/following", getFollowing);

export default router;
