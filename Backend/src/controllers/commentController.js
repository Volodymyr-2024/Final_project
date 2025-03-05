import { Comment } from "../models/commentModel.js";

export const addComment = async (req, res) => {
  try {
    const { userId, postId, text } = req.body;
    if (!text.trim()) {
      return res.status(400).json({ message: "A comment cannot be empty" });
    }
    const newComment = new Comment({ user: userId, post: postId, text });
    await newComment.save();
    res.status(201).json({ message: "Comment added", comment: newComment });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getCommentByPost = async (req, res) => {
  try {
    const { postId } = req.params;
    const comments = await Comment.find({ post: postId }).populate(
      "user",
      "username"
    );
    res.json(comments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
