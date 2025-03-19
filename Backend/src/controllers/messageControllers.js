import Message from "../models/messageModel.js";
import User from "../models/userModel.js";

export const getMessages = async (req, res) => {
  const userId = req.userId;
  const { targetUserId } = req.params;
  try {
    const messages = await Message.find({
      $or: [
        { senderId: userId, receiverId: targetUserId },
        { senderId: targetUserId, receiverId: userId },
      ],
    }).sort({ createdAt: 1 });
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ message: "Error receiving a message" });
  }
};

export const sendMessage = async (req, res) => {
  const userId = req.userId;
  const { targetUserId } = req.params;
  const { messageText } = req.body;
  try {
    const user = await User.findById(userId);
    const targetUser = await User.findById(targetUserId);
    if (!user || !targetUser) {
      return res.status(404).json({ message: "User not found" });
    }

    const message = new Message({
      senderId: userId,
      receiverId: targetUserId,
      messageText,
      createdAt: new Date(),
    });

    await message.save();
    console.log("Сообщение сохранено в базе данных:", message);

    // Отправляем сообщение через сокет
    const targetSocketId = req.userSockets
      ? req.userSockets.get(targetUserId)
      : undefined;
    if (targetSocketId) {
      req.io.to(targetSocketId).emit("receiveMessage", {
        senderId: userId,
        messageText: messageText,
        createdAt: message.createdAt,
      });
    } else {
      console.log(`Пользователь ${targetUserId} не подключен`);
    }

    res.status(201).json(message);
  } catch (error) {
    console.error("Error sending a message:", error);
    res.status(500).json({ message: "Error sending a message" });
  }
};
