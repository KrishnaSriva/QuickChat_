import express from "express";
import { chatWithAI, transcribeAudio } from "../controllers/geminiController.js";
import { protectRoute } from "../middleware/auth.js";

import multer from "multer";

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.post("/chat", protectRoute, chatWithAI);
router.post("/transcribe", protectRoute, upload.single("audio"), transcribeAudio);

export default router;
