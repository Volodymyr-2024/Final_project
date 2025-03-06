import Message from "../models/messageModel.js";
import User from "../models/userModel.js";

export const getMessages = async (req, res) => {
  const userId = req.user.id;
  const { targetUserId } = req.params;
  try {
    const messages = await Message.find({
      $or: [
        { sender_id: userId, receiver_id: targetUserId },
        { sender_id: targetUserId, receiver_id: userId },
      ],
    }).sort({ create_at: 1 });
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ message: "Error receiving a message" });
  }
};

export const sendMessage = async (req, res) => {
  const userId = req.user.id;
  const { targetUserId } = req.params;
  const { message_text } = req.body;
  try {
    const user = await User.findById(userId);
    const targetUser = await User.findById(targetUserId);
    if (!user || !targetUser) {
      return res.status(404).json({ message: "User not found" });
    }
    const message = new Message({
      sender_id: userId,
      receiver_id: targetUserId,
      message_text,
      create_at: new Date(),
    });

    await message.save();

    req.io.to(targetUserId).emit("receiveMessage", {
      senderId: userId,
      messageText: message_text,
      createdAt: message.created_at,
    });
    res.status(201).json(message);
  } catch (error) {
    res.status(500).json({ message: "Error sending a message" });
  }
};
