import { useEffect, useState } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:3000");

const Chat = ({ userId, targetUserId, token }) => {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");

  useEffect(() => {
    socket.emit("joinRoom", userId);

    fetch(`http://localhost:3000/api/messages/${userId}/${targetUserId}`, {
      headers: { Authorization: `Bearer ${token}` }, // Передаем токен
    })
      .then((res) => res.json())
      .then((data) => setMessages(data));

    socket.on("receiveMessage", (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    return () => {
      socket.off("receiveMessage");
    };
  }, [userId, targetUserId, token]);

  const sendMessage = () => {
    if (text.trim()) {
      const messageData = {
        senderId: userId,
        receiverId: targetUserId,
        messageText: text,
      };
      socket.emit("sendMessage", messageData);

      setMessages((prev) => [
        ...prev,
        { senderId: userId, messageText: text, createdAt: new Date() },
      ]);
      setText("");

      fetch(`http://localhost:3000/api/messages/${userId}/${targetUserId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Передаем токен
        },
        body: JSON.stringify({ message_text: text }),
      });
    }
  };

  return (
    <div>
      <h2>Чат</h2>
      <ul>
        {messages.map((msg, index) => (
          <li key={index}>
            {msg.senderId === userId ? "Вы" : "Собеседник"}: {msg.messageText}
          </li>
        ))}
      </ul>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Input message..."
      />
      <button onClick={sendMessage}>Отправить</button>
    </div>
  );
};

export default Chat;
