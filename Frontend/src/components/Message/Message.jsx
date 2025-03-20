import styles from "./Message.module.css";
import { useEffect, useState } from "react";
import io from "socket.io-client";
import {
  apiUrl,
  getMessages,
  getUserData,
  sendMessage,
} from "../../constants/api";
import { useNavigate } from "react-router-dom";

const Message = ({ targetUserId }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [socket, setSocket] = useState(null);
  const [targetUserData, setTargetUserData] = useState("");
  const [userData, setUserData] = useState("");
  const navigate = useNavigate();
  const currentUserId = localStorage.getItem("userId");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const targetUserData = await getUserData(targetUserId);
        const userData = await getUserData(currentUserId);
        setTargetUserData(targetUserData);
        setUserData(userData);
      } catch (error) {
        console.error("Error: ", error.message);
      }
    };
    fetchUserData();
  }, [targetUserId]);

  useEffect(() => {
    const newSocket = io(apiUrl);
    setSocket(newSocket);

    newSocket.on("receiveMessage", (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => newSocket.close();
  }, []);

  useEffect(() => {
    if (!currentUserId || !targetUserId) return;

    const abortController = new AbortController();

    const fetchData = async () => {
      try {
        const data = await getMessages(currentUserId, targetUserId, {
          signal: abortController.signal,
        });
        setMessages(data);
      } catch (error) {
        if (error.name !== "AbortError") {
          console.error("Ошибка при загрузке сообщений:", error);
          setMessages([]);
        }
      }
    };

    fetchData();

    return () => {
      abortController.abort();
    };
  }, [currentUserId, targetUserId]);

  const handleSendMessage = async () => {
    if (!newMessage.trim() || !socket) return;
    try {
      // const message = await sendMessage(
      //   currentUserId,
      //   targetUserId,
      //   newMessage
      // );

      socket.emit("sendMessage", {
        senderId: currentUserId,
        receiverId: targetUserId,
        messageText: newMessage,
      });
      // setMessages((prev) => [...prev, message]);
      setNewMessage("");
    } catch (error) {
      console.error("Ошибка при отправке сообщения:", error);
    }
  };

  const handleClick = (targetUserId) => {
    navigate(`/other-profile/${targetUserId}`);
  };

  return (
    <div className={styles.container}>
      <div className={styles.user_wrapper}>
        <div className={styles.img_wrapper}>
          <img src={targetUserData.profileImage} alt="" />
        </div>
        <p>{targetUserData.username}</p>
      </div>

      <div className={styles.content_wrapper}>
        <div className={styles.user_info_wrapper}>
          <div className={styles.img_info_wrapper}>
            <img
              src={
                targetUserData.profileImage || "/path/to/default-profile.png"
              }
              alt="user_icon"
            />
          </div>
          <p>{targetUserData.username}</p>
          <span>{targetUserData.username} ICHgram</span>
          <div className={styles.btn_container}>
            <button
              onClick={() => {
                handleClick(targetUserId);
              }}
            >
              View profile
            </button>
          </div>
          <span>{targetUserData.createdAt}</span>
        </div>

        <div className={styles.messages}>
          {messages.length === 0 ? (
            <p>Message not found</p>
          ) : (
            messages.map((message, index) => (
              <div
                key={index}
                className={`${styles.img_text_wrapper} ${
                  message.senderId === currentUserId
                    ? styles.myimg_text_wrapper
                    : styles.otherimg_text_wrapper
                }`}
              >
                <div className={styles.img_wrapper}>
                  {message.senderId === currentUserId ? (
                    <img
                      src={
                        userData.profileImage || "/path/to/default-profile.png"
                      }
                      alt="user_icon"
                    />
                  ) : (
                    <img
                      src={
                        targetUserData.profileImage ||
                        "/path/to/default-profile.png"
                      }
                      alt="user_icon"
                    />
                  )}
                </div>
                <div
                  className={`${styles.message_wrapper} ${
                    message.senderId === currentUserId
                      ? styles.myMessage
                      : styles.otherMessage
                  }`}
                >
                  <p
                    className={
                      message.senderId === currentUserId
                        ? styles.myMessage
                        : styles.otherMessage
                    }
                  >
                    {message.messageText}
                  </p>
                </div>
                <span>
                  {message.createdAt
                    ? new Date(message.createdAt).toLocaleTimeString()
                    : "Time undefined"}
                </span>
              </div>
            ))
          )}
        </div>
        <div className={styles.inputArea}>
          <textarea
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Write message"
          />
          <button onClick={handleSendMessage}>Отправить</button>
        </div>
      </div>
    </div>
  );
};

export default Message;
