import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

export const registerUser = async (req, res) => {
  try {
    const { email, fullname, username, password } = req.body;
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      return res.status(400).json({ message: "User already exist" });
    }
    if (password.length < 5) {
      return res
        .status(400)
        .json({ message: "Password must contain at least 5 characters" });
    }
    const newUser = new User({ email, fullname, username, password });
    await newUser.save();
    res.status(201).json({ message: "User was registred", newUser });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, username, password } = req.body;
    const existingUser = email
      ? await User.findOne({ email })
      : await User.findOne({ username });
    if (!existingUser) {
      return res.status(401).json({ message: "User not found" });
    }
    const isPasswordValid = await existingUser.comparePassword(password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Incorrect password" });
    }
    const token = jwt.sign(
      { userId: existingUser._id },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    res.status(200).json({
      message: "Login is successfully!",
      token,
    });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ error: error.message });
  }
};
export const resetPassword = async (req, res) => {
  try {
    const { email, username } = req.body;
    const existingUser = email
      ? await User.findOne({ email })
      : await User.findOne({ username });
    if (!existingUser) {
      return res.status(401).json({ message: "User not found" });
    }
    const newPassword = Math.random().toString(36).slice(-5);
    existingUser.password = newPassword;
    await existingUser.save();
    res.status(200).json({
      message: "New password has been generated and sent!",
      newPassword,
    });
  } catch (error) {
    console.error("Password reset error:", error);
    return res.status(500).json({ error: error.message });
  }
};
