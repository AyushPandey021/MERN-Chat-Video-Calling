import express from "express";
import { protectRoute } from "../middleware/auth.middleware";
import { getStreamToken } from "../controllers/chat.controllers";

const router = express.Router();

router.get("/token", protectRoute, getStreamToken);

export default router;
