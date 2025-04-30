import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import express from "express";

import { connectDB } from "./lib/db.js";
import authRoute from "./routes/auth.route.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoute);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  connectDB();
});
