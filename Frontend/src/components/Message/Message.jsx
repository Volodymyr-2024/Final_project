import styles from "./Message.module.css";
import { useEffect, useState } from "react";
import io from "socket.io-client";
import { apiUrl, getMessages, sendMessage } from "../../constants/api";

const Message = ({ targetUserId }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [socket, setSocket] = useState(null);
  const currentUserId = localStorage.getItem("userId");

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
      const message = await sendMessage(
        currentUserId,
        targetUserId,
        newMessage
      );
      console.log(message);

      socket.emit("sendMessage", {
        senderId: currentUserId,
        receiverId: targetUserId,
        messageText: newMessage,
      });
      setMessages((prev) => [...prev, message]);
      setNewMessage("");
    } catch (error) {
      console.error("Ошибка при отправке сообщения:", error);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.messages}>
        {messages.length === 0 ? (
          <p>Нет сообщений</p>
        ) : (
          messages.map((message, index) => (
            <div
              key={index}
              className={
                message.senderId === currentUserId
                  ? styles.myMessage
                  : styles.otherMessage
              }
            >
              <strong>
                {message.senderId === currentUserId ? "Вы" : "Собеседник"}:
              </strong>
              <p>{message.messageText}</p>
              <small>{new Date(message.createdAt).toLocaleTimeString()}</small>
            </div>
          ))
        )}
      </div>
      <div className={styles.inputArea}>
        <textarea
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Введите ваше сообщение..."
        />
        <button onClick={handleSendMessage}>Отправить</button>
      </div>
    </div>
  );
};

export default Message;
