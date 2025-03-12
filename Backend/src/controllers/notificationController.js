import Notification from "../models/notificationModel.js";

export const getNotofocation = async (req, res) => {
  try {
    const notification = await Notification.find({ userId: req.user.id })
      .sort({
        createdAt: -1,
      })
      .populate("userId", "username profileImage")
      .populate("postId", "image");
    res.json(notification);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createNotification = async (req, res) => {
  try {
    const notification = new Notification({ userId, type, message });
    await notification.save();
    res.status(201).json(notification);
    res;
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const markAsRead = async (req, res) => {
  try {
    await Notification.findByIdAndUpdate(req.params.id, { isRead: true });
    res.json({ message: "The notification is marked as read" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
