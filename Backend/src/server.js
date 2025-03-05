import express from "express";
import "dotenv/config";
import { connectDB } from "./config/db.js";
import authRoutes from "./routers/authRoutes.js";
import userRoutes from "./routers/userRoutes.js";
import postRoutes from "./routers/postRoutes.js";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());

connectDB();
const PORT = process.env.PORT || 3333;

app.use("/auth", authRoutes);
app.use("/profile", userRoutes);
app.use("/posts", postRoutes);

app.use(express.json());

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
