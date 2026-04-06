import express from "express";
import { auth } from "../middlewares/auth.js";
import {
  generateArticle,
  generateBlogTitle,
  generateImage,
  removeImageBackground,
  removeImageObject,
  resumeReview,
  generateRoadmap,
  generateQuiz,
    startMockInterview,
  nextMockInterview,
  startsVoiceInterview,
  nextsVoiceInterview,
  generateCodingQuestions
  
} from "../controllers/aiController.js";
import { upload } from "../configs/multer.js";

const aiRouter = express.Router();

aiRouter.post("/generate-article", auth, generateArticle);
aiRouter.post("/generate-blog-title", auth, generateBlogTitle);
aiRouter.post("/generate-image", auth, generateImage);
aiRouter.post("/generate-roadmap", auth, generateRoadmap);
aiRouter.post("/generate-quiz", auth, generateQuiz);
aiRouter.post(
  "/remove-image-background",
  upload.single("image"),
  auth,
  removeImageBackground
);
aiRouter.post(
  "/remove-image-object",
  upload.single("image"),
  auth,
  removeImageObject
);

aiRouter.post("/resume-review", upload.single("resume"), auth, resumeReview);
aiRouter.post("/mock/start", auth, startMockInterview);
aiRouter.post("/mock/next", auth, nextMockInterview);
aiRouter.post("/voice/start", auth, startsVoiceInterview);
aiRouter.post("/voice/next", auth, nextsVoiceInterview);
aiRouter.post("/coding/start", auth, generateCodingQuestions);

export default aiRouter;
