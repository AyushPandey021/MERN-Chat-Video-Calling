import cookieParser from "cookie-parser";
import cors from "cors";
import "dotenv/config";
import express from "express";
import path from "path";

import { connectDB } from "./lib/db.js";

import authRoute from "./routes/auth.route.js";
import chatRoute from "./routes/chat.route.js";
import userRoute from "./routes/user.route.js";

const app = express();
const PORT = process.env.PORT || 5000;

const __dirname = path.resolve();

app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: "https://fullstack-chat-video-calling-app-rg.vercel.app",
    credentials: true,
  })
);

app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/chat", chatRoute);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../client", "dist", "index.html"));
  });
}

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  connectDB();
});
