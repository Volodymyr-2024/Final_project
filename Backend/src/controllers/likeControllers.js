import Like from "../models/likeModel.js";

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
    res.status(200).json({ message: "Like added", like: newLike });
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
