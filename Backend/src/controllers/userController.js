import multer from "multer";
import sharp from "sharp";
import User from "../models/userModel.js";

const storage = multer.memoryStorage();
export const upload = multer({ storage: storage });

export const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const { username, bio, website, password } = req.body;
    const user = await User.findById(req.userId).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    if (username) user.username = username;
    if (bio) user.bio = bio;
    if (website) {
      user.website = website;
    }
    if (password) {
      if (password.length < 5) {
        return res
          .status(400)
          .json({ message: "Password must be at least 5 characters long" });
      }
      user.password = password;
    }

    if (req.file) {
      const compressedImage = await sharp(req.file.buffer)
        .resize(150, 150, {
          fit: sharp.fit.cover,
        })
        .toBuffer();

      user.profileImage = `data:${
        req.file.mimetype
      };base64,${compressedImage.toString("base64")}`;
    }
    await user.save();
    res.json({ message: "Profile updated", user });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const getAllProfile = async (req, res) => {
  try {
    const userId = req.userId;
    const users = await User.find({ _id: { $ne: userId } }).select("-password");
    if (!users || users.length === 0) {
      return res.status(404).json({ message: "Users not found" });
    }
    const userProfiles = users.map((user) => ({
      username: user.username,
      userImage: user.profileImage,
    }));
    res.json(userProfiles);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
