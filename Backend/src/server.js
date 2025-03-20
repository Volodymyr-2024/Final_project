import { createServer } from "http";
import { Server } from "socket.io";
import app from "./app.js";

const PORT = process.env.PORT || 3333;
const userSockets = new Map();

const httpServer = createServer(app);

const io = new Server(httpServer, {
  cors: {
    origin: "*",
  },
});

app.use((req, res, next) => {
  req.io = io;
  req.userSockets = userSockets;
  next();
});

io.on("connection", (socket) => {
  console.log("Новый пользователь подключился:", socket.id);

  // Регистрация пользователя
  socket.on("registerUser", (userId) => {
    userSockets.set(userId, socket.id);
    console.log(
      `Пользователь ${userId} зарегистрирован с socket.id = ${socket.id}`
    );
  });

  // Вход в комнату
  socket.on("joinRoom", (userId) => {
    userSockets.set(userId, socket.id);
    socket.join(userId);
    console.log(`User ${userId} logged into the chat room`);
  });

  // Отправка сообщения
  socket.on("sendMessage", ({ senderId, receiverId, messageText }) => {
    if (!senderId || !receiverId || !messageText) {
      console.error("Ошибка: не хватает данных для отправки сообщения");
      return;
    }

    const messageData = { senderId, messageText, createAt: new Date() };
    console.log("Сообщение отправлено через WebSocket:", messageData);

    // Отправляем сообщение получателю
    socket.to(receiverId).emit("receiveMessage", messageData);

    // Отправляем сообщение обратно отправителю
    socket.emit("receiveMessage", messageData);

    io.to(receiverId).emit("receiveMessage", messageData);
  });

  // Обработка отключения
  socket.on("disconnect", () => {
    // Удаляем userId из карты при отключении
    for (const [userId, socketId] of userSockets.entries()) {
      if (socketId === socket.id) {
        userSockets.delete(userId);
        console.log(`Пользователь ${userId} отключился`);
        break;
      }
    }
  });
});

httpServer.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
