import Comment from "../models/commentModel.js";
import Post from "../models/postModel.js";
import User from "../models/userModel.js";
import Notification from "../models/notificationModel.js";

export const addComment = async (req, res) => {
  try {
    const { userId, postId, text } = req.body;
    if (!text.trim()) {
      return res.status(400).json({ message: "A comment cannot be empty" });
    }
    if (!userId || !postId) {
      return res
        .status(400)
        .json({ message: "User ID and Post ID are required" });
    }
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    const newComment = await new Comment({
      user: userId,
      post: postId,
      text,
    }).save();

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const notification = new Notification({
      userId: post.author,
      type: "comment",
      postId: postId,
      message: `${user.username} commented on your post: "${text}"`,
    });
    await notification.save();

    const populatedComment = await Comment.findById(newComment._id).populate({
      path: "user",
      select: "profileImage username",
    });
    res.status(201).json({
      message: "Comment added",
      comment: {
        user: populatedComment.user.username,
        image: populatedComment.user.profileImage,
        text: populatedComment.text,
        likeCount: 0,
        createdAt: populatedComment.createdAt,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getCommentByPost = async (req, res) => {
  try {
    const { postId } = req.params;
    const comments = await Comment.find({ post: postId }).populate("user");
    const result = comments.map((comment) => ({
      image: comment.user.profileImage,
      user: comment.user.username,
      text: comment.text,
      createdAt: comment.createdAt,
    }));
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
