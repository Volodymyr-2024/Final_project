import styles from "./Message.module.css";
import { useEffect, useState } from "react";
import io from "socket.io-client";
import { apiUrl, getMessages, sendMessage } from "../../constants/api";
import { useParams } from "react-router-dom";

const Message = ({ currentUserId, targetUserId }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [socket, setSocket] = useState(null);

  // Инициализация сокета
  useEffect(() => {
    const newSocket = io(apiUrl); // Подключаемся к серверу
    setSocket(newSocket);

    // Слушаем событие получения нового сообщения
    newSocket.on("receiveMessage", (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    // Закрываем сокет при размонтировании компонента
    return () => newSocket.close();
  }, []);

  // Загрузка сообщений при изменении userId или targetUserId
  useEffect(() => {
    fetchMessages();
  }, [currentUserId, targetUserId]);

  // Функция для загрузки сообщений
  const fetchMessages = async () => {
    if (!currentUserId || !targetUserId) return; // Проверяем, что ID определены
    try {
      const data = await getMessages(currentUserId, targetUserId);
      setMessages(data);
    } catch (error) {
      console.error("Ошибка при загрузке сообщений:", error);
      setMessages([]);
    }
  };

  // Функция для отправки сообщения
  const handleSendMessage = async () => {
    if (!newMessage.trim()) return; // Не отправляем пустое сообщение
    try {
      // Отправляем сообщение через сокет
      socket.emit("sendMessage", {
        senderId: currentUserId,
        receiverId: targetUserId,
        messageText: newMessage,
      });
      setNewMessage(""); // Очищаем поле ввода
    } catch (error) {
      console.error("Ошибка при отправке сообщения:", error);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.messages}>
        {messages.map((message) => (
          <div
            key={message._id}
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
            <small>{new Date(message.createAt).toLocaleTimeString()}</small>
          </div>
        ))}
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
