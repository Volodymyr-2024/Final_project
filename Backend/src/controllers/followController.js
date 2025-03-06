import Follow from "../models/followModel.js";

export const getFollowers = async (req, res) => {
  try {
    const followers = await Follow.find({ following: req.params.id }).populate(
      "follower",
      "username fullname profileImage"
    );
    res.json(followers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getFollowing = async (req, res) => {
  try {
    const following = await Follow.find({ follower: req.params.id }).populate(
      "following",
      "username fullname profileImage"
    );
    res.json(following);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const followUser = async (req, res) => {
  try {
    const { followerId, followingId } = req.body;
    if (followerId === followingId) {
      return res
        .status(400)
        .json({ message: "You can't subscribe to yourself" });
    }
    const existingFollow = await Follow.findOne({
      follower: followerId,
      following: followingId,
    });
    if (existingFollow) {
      return res.status(400).json({ message: "You're already subscribed" });
    }
    const newFollow = await Follow({
      follower: followerId,
      following: followingId,
    });
    await newFollow.save();
    res.status(201).json(newFollow);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const unfollowUser = async (req, res) => {
  try {
    const { followerId, followingId } = req.body;
    await Follow.findOneAndDelete({
      follower: followerId,
      following: followingId,
    });
    res.json({ message: "The unsubscribe is success" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getUserFeed = async (req, res) => {
  try {
    const { userId } = req.params;
    const following = await Follow.find({ follower: userId }).select(
      "following"
    );
    const followingIds = following.map((f) => f.following);

    const posts = await Post.find({ author: { $in: followingIds } }).sort({
      createdAt: -1,
    });
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: "Ошибка сервера", error });
  }
};
