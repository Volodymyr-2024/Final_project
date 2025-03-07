import express from "express";
import "dotenv/config";
import { Server } from "socket.io";
import { createServer } from "http";
import { connectDB } from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import postRoutes from "./routes/postRoutes.js";
import likeRoutes from "./routes/likesRoutes.js";
import commentRoutes from "./routes/commentRoutes.js";
import searchRoutes from "./routes/searchRoutes.js";
import messageRoutes from "./routes/messageRoutes.js";
import followRoutes from "./routes/followRoutes.js";
import notificationRoutes from "./routes/notificationRoutes.js";
import cors from "cors";

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "*",
  },
});
app.use(express.json());
app.use((req, res, next) => {
  req.io = io;
  next();
});

app.use(cors());

connectDB();
const PORT = process.env.PORT || 3333;

app.use("/auth", authRoutes);
app.use("/profile", userRoutes);
app.use("/posts", postRoutes);
app.use("/", likeRoutes);
app.use("/", commentRoutes);
app.use("/search", searchRoutes);
app.use("/messages", messageRoutes);
app.use("/", followRoutes);
app.use("/notifications", notificationRoutes);

io.on("connection", (socket) => {
  console.log("User Connected:", socket.id);

  socket.on("joinRoom", (userId) => {
    socket.join(userId); // Добавляем пользователя в комнату с его userId
    console.log(`Гыук ${userId} logged into the chat room`);
  });

  socket.on("sendMessage", ({ senderId, receiverId, messageText }) => {
    const messageData = { senderId, messageText, createdAt: new Date() };
    io.to(receiverId).emit("receiveMessage", messageData);
  });

  socket.on("disconnect", () => {
    console.log("The user disconnected:", socket.id);
  });
});

httpServer.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
