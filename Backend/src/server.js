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
  socket.on(
    "sendMessage",
    ({ senderId, receiverId, messageText }, callback) => {
      if (!senderId || !receiverId || !messageText) {
        console.error("Missing data for sending message");
        return callback({ status: "error", message: "Invalid data" });
      }

      const messageData = {
        senderId,
        messageText,
        createdAt: new Date().toISOString(),
      };
      console.log("Сообщение отправлено через WebSocket:", messageData);

      // Отправляем сообщение получателю
      const receiverSocketId = userSockets.get(receiverId);
      if (receiverSocketId) {
        io.to(receiverSocketId).emit("receiveMessage", messageData);
      } else {
        console.error(`Пользователь ${receiverId} не в сети`);
      }
      if (callback) {
        callback({ status: "ok" });
      }
    }
  );

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
