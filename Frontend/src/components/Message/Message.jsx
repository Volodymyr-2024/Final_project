import styles from "./Message.module.css";
import { useEffect, useState } from "react";
import io from "socket.io-client";
import { apiUrl, getMessages, sendMessage } from "../../constants/api";
import { useParams } from "react-router-dom";

const Message = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [socket, setSocket] = useState(null);

  // Получаем userId и targetUserId из URL
  const { userId: paramUserId, targetUserId: paramTargetUserId } = useParams();

  // Получаем ID текущего пользователя из localStorage
  const currentUserId = localStorage.getItem("userId");

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
  }, [currentUserId, paramTargetUserId]);

  // Функция для загрузки сообщений
  const fetchMessages = async () => {
    if (!currentUserId || !paramTargetUserId) return; // Проверяем, что ID определены
    try {
      const data = await getMessages(currentUserId, paramTargetUserId);
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
        sender_id: currentUserId,
        receiver_id: paramTargetUserId,
        message_text: newMessage,
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
              message.sender_id === currentUserId
                ? styles.myMessage
                : styles.otherMessage
            }
          >
            <strong>
              {message.sender_id === currentUserId ? "Вы" : "Собеседник"}:
            </strong>
            <p>{message.message_text}</p>
            <small>{new Date(message.create_at).toLocaleTimeString()}</small>
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
