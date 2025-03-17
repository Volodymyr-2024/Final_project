import { useEffect, useState } from "react";
import styles from "./Notifications.module.css";
import { getNotifications } from "../../constants/api";

function Notifications(props) {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getNotifications();
        setNotifications(data);
      } catch (error) {
        console.error("Failed to fetch notifications:", error);
      }
    }
    fetchData();
  }, []);

  return (
    <div className={styles.wrapper}>
      <h2>Notifications</h2>
      <p>New</p>
      {notifications.length === 0 ? (
        <p>No new notifications</p>
      ) : (
        <ul className={styles.list}>
          {notifications.map((notif) => (
            <li key={notif._id} className={styles.item}>
              <img
                src={notif.userId?.profileImage || "/default-avatar.png"}
                alt={notif.userId?.username}
                className={styles.avatar}
              />
              <div className={styles.description}>
                <div className={styles.content}>
                  <h4>{notif.userId?.username}</h4>
                  <p>
                    {notif.type === "like" ? "liked" : "commented on"} your post
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
