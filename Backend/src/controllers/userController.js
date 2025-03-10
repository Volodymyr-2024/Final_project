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
    const { username, bio } = req.body;
    const user = await User.findById(req.userId).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    if (username) user.username = username;
    if (bio) user.bio = bio;
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
