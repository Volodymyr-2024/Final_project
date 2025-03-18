import { useEffect, useState } from "react";
import styles from "./Notifications.module.css";
import { getNotifications, markAsRead } from "../../constants/api";

function Notifications(props) {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getNotifications();
        const notificationWithoutTrue = data.filter(
          (notification) => notification.isRead === false
        );
        setNotifications(notificationWithoutTrue);
      } catch (error) {
        console.error("Failed to fetch notifications:", error);
      }
    }
    fetchData();
  }, []);

  const handleNotificationClick = async (notificationId) => {
    try {
      await markAsRead(notificationId);
      setNotifications((prevNotifications) =>
        prevNotifications.filter((notif) => notif._id !== notificationId)
      );
    } catch (error) {
      console.error("Failed to mark notification as read:", error);
    }
  };

  return (
    <div className={styles.wrapper}>
      <h2>Notifications</h2>
      <p>New</p>
      {notifications.length === 0 ? (
        <p>No new notifications</p>
      ) : (
        <ul className={styles.list}>
          {notifications.map((notif) => (
            <li
              key={notif._id}
              className={styles.item}
              onClick={() => handleNotificationClick(notif._id)}
            >
              <img
                src={notif.userId?.profileImage || "/default-avatar.png"}
                alt={notif.userId?.username}
                className={styles.avatar}
              />
              <div className={styles.description}>
                <div className={styles.content}>
                  <h4>{notif.userId?.username}</h4>
                  <p>
                    {notif.type === "like"
                      ? "liked your post"
                      : notif.type === "comment"
                      ? "commented on your post"
                      : notif.type === "follow"
                      ? "started following you"
                      : "stopped following you"}
                  </p>
                </div>
                <div className={styles.date}>
                  {new Date(notif.createdAt).toLocaleString()}
                </div>
              </div>
              {notif.postId?.image && (
                <img
                  src={notif.postId.image}
                  alt="Post"
                  className={styles.postImage}
                />
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Notifications;
