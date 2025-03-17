import Like from "../models/likeModel.js";
import Notification from "../models/notificationModel.js";
import Post from "../models/postModel.js";
import User from "../models/userModel.js";

export const toggleLike = async (req, res) => {
  try {
    const { postId } = req.body;
    if (!req.userId) {
      return res.status(401).json({ message: "User not authenticated" });
    }

    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    const existingLike = await Like.findOne({
      user: req.userId,
      post: postId,
    });

    if (existingLike) {
      await Like.findByIdAndDelete(existingLike._id);
      await Notification.findOneAndDelete({
        userId: post.author,
        type: "like",
        postId: postId,
      });

      const likeCount = await Like.countDocuments({ post: postId });
      return res.status(200).json({
        message: "Like deleted",
        like: existingLike,
        likeCount,
        isLiked: false,
      });
    }

    const newLike = new Like({ user: req.userId, post: postId });
    await newLike.save();
    const notification = new Notification({
      userId: post.author,
      type: "like",
      postId: postId,
      message: `${user.username} liked your post`,
    });
    await notification.save();

    const likeCount = await Like.countDocuments({ post: postId });
    res
      .status(200)
      .json({ message: "Like added", like: newLike, likeCount, isLiked: true });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getLikesUserByPost = async (req, res) => {
  try {
    const { postId } = req.params;
    const likes = await Like.find({ post: postId }).populate(
      "user",
      "username"
    );
    const likeCounts = likes.reduce((acc, like) => {
      const username = like.user.username;
      acc[username] = (acc[username] || 0) + 1;
      return acc;
    }, {});
    const result = Object.entries(likeCounts).map(([user, likeCount]) => ({
      user,
      likeCount,
    }));
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const checkUserLike = async (req, res) => {
  try {
    const { userId, postId } = req.body;
    if (!userId || !postId) {
      return res
        .status(400)
        .json({ message: "userId and postId are required" });
    }
    const existingLike = await Like.findOne({ user: userId, post: postId });
    res.status(200).json({ isLiked: !!existingLike });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getLikeCountByPost = async (req, res) => {
  try {
    const { postId } = req.params;
    if (!postId) {
      return res.status(400).json({ message: "postId is required" });
    }
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    const likeCount = await Like.countDocuments({ post: postId });
    res.status(200).json({ postId, likeCount, createdAt: post.createdAt });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
