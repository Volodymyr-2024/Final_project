import Comment from "../models/commentModel.js";
import Like from "../models/likeModel.js";
import Post from "../models/postModel.js";
import sharp from "sharp";

export const getPostsByUser = async (req, res) => {
  try {
    const posts = await Post.find({ author: req.userId });
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createPost = async (req, res) => {
  const { description } = req.body;
  if (!description) {
    return res.status(404).json({ message: "Description is a must!" });
  }
  let image = null;

  try {
    if (req.file) {
      const compressedImage = await sharp(req.file.buffer)
        .resize(404, 506, {
          fit: sharp.fit.cover,
        })
        .toBuffer();

      image = `data:${req.file.mimetype};base64,${compressedImage.toString(
        "base64"
      )}`;
    }
    const newPost = new Post({
      description,
      image,
      author: req.userId,
    });
    await newPost.save();
    res.status(201).json({ message: "Post created", newPost });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deletePost = async (req, res) => {
  const { id } = req.params;
  try {
    const post = await Post.findById(id);
    if (!post) {
      return res.status(404).json({ message: "The post was not found" });
    }
    if (post.author.toString() !== req.userId) {
      return res
        .status(403)
        .json({ message: "There are no permissions to delete this post" });
    }
    await post.remove();
    res.status(200).json({ message: "Post deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getPostById = async (req, res) => {
  const { id } = req.params;
  try {
    const post = await Post.findById(id).populate("author").exec();
    if (!post) {
      return res.status(404).json({ message: "The post was not found" });
    }
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updatePost = async (req, res) => {
  const { id } = req.params;
  const { description, image } = req.body;
  try {
    const post = await Post.findById(id);
    if (!post) {
      return res.status(404).json({ message: "The post was not found" });
    }
    if (post.author.toString() !== req.user.id) {
      return res
        .status(403)
        .json({ message: "There are no permissions to delete this post" });
    }
    post.description = description || post.description;
    post.image = image || post.image;
    await post.save();
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find()
      .populate("author", "username")
      .sort({ createdAt: -1 });
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getFourPosts = async (req, res) => {
  try {
    const { page = 1 } = req.query;
    const limit = 4;
    const skip = (page - 1) * limit;

    const posts = await Post.find()
      .populate("author", "username profileImage")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);
    const postsWithDetails = await Promise.all(
      posts.map(async (post) => {
        const [commentCount, comments, likeCount] = await Promise.all([
          Comment.countDocuments({ post: post._id }),
          Comment.find({ post: post._id })
            .populate("user", "username profileImage")
            .sort({ createdAt: -1 })
            .limit(3)
            .lean(),
          Like.countDocuments({ post: post._id }),
        ]);
        return {
          ...post,
          commentCount,
          likeCount,
          comments,
        };
      })
    );

    res.status(200).json(postsWithDetails);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
