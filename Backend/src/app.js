import express from "express";
import "dotenv/config";
import cors from "cors";
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

const app = express();

app.use(express.json());
app.use(cors());

connectDB();

app.use("/auth", authRoutes);
app.use("/profile", userRoutes);
app.use("/posts", postRoutes);
app.use("/", likeRoutes);
app.use("/", commentRoutes);
app.use("/search", searchRoutes);
app.use("/messages", messageRoutes);
app.use("/followers", followRoutes);
app.use("/notifications", notificationRoutes);

export default app;
