import Comment from "../models/commentModel.js";

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
    const newComment = await new Comment({
      user: userId,
      post: postId,
      text,
    }).save();
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
