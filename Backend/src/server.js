import { createServer } from "http";
import { Server } from "socket.io";
import app from "./app.js";

const PORT = process.env.PORT || 3333;

const httpServer = createServer(app);

const io = new Server(httpServer, {
  cors: {
    origin: "*",
  },
});

app.use((req, res, next) => {
  req.io = io;
  next();
});

io.on("connection", (socket) => {
  console.log("User Connected:", socket.id);

  socket.on("joinRoom", (userId) => {
    socket.join(userId);
    console.log(`User ${userId} logged into the chat room`);
  });

  socket.on("sendMessage", ({ senderId, receiverId, messageText }) => {
    const messageData = { senderId, messageText, createdAt: new Date() };
    io.to(receiverId).emit("receiveMessage", messageData);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

httpServer.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
