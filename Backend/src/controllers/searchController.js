import Post from "../models/postModel.js";
import User from "../models/userModel.js";

export const searchUsers = async (req, res) => {
  try {
    const { query } = req.query;
    if (!query)
      return res.status(400).json({ message: "The request is empty" });
    const users = await User.find({
      $or: [
        { username: new RegExp(query, "i") },
        { name: new RegExp(query, "i") },
      ],
    });
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const searchPosts = async (req, res) => {
  try {
    const posts = await Post.aggregate([{ $sample: { size: 10 } }]);
    res.json(posts);
  } catch (error) {
    req.status(500).json({ message: error.message });
  }
};
