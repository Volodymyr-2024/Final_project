import { Like } from "../models/likeModel.js";

export const toggleLike = async (req, res) => {
  try {
    const { userId, postId } = req.body;
    const existingLike = await Like.findOne({ user: userId, post: postId });
    if (existingLike) {
      await Like.findByIdAndDelete(existingLike._id);
      return res.json({ message: "Like deleted" });
    }
    const newLike = new Like({ user: userId, post: postId });
    await newLike.save();
    res.status(201).json({ message: "Like added", like: newLike });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getLikesByPost = async (req, res) => {
  try {
    const { postId } = req.body;
    const likes = await Like.find({ post: postId }).populate("user", "username");
    res.json(likes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
