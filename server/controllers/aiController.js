import { GoogleGenAI } from "@google/genai";
import sql from "../configs/db.js";
import { clerkClient } from "@clerk/express";
import axios from "axios";
import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import pdf from "pdf-parse/lib/pdf-parse.js";
import OpenAI from "openai";
// ======================================================
// GEMINI CONFIGURATION
// ======================================================
const ai = new GoogleGenAI({apiKey: process.env.GEMINI_API_KEY})
const groq = new OpenAI({
  apiKey: process.env.GROQ_API_KEY,
  baseURL: "https://api.groq.com/openai/v1",
});
// ======================================================
// GENERATE ARTICLE
// ======================================================
export const generateArticle = async (req, res) => {
  try {
    const { userId } = req.auth();
    const { prompt, length } = req.body;
    const { plan, free_usage } = req;

    if (plan !== "premium" && free_usage >= 10) {
      return res.json({
        success: false,
        message: "Limit reached. Upgrade to continue",
      });
    }

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: [
        {
          role: "user",
          parts: [{ text: prompt }],
        },
      ],
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: length,
      },
    });

    const content = response?.text || "No response from AI";

    await sql`INSERT INTO creations (user_id, prompt, content, type)
              VALUES (${userId}, ${prompt}, ${content}, 'article')`;

    if (plan !== "premium") {
      await clerkClient.users.updateUserMetadata(userId, {
        privateMetadata: {
          free_usage: free_usage + 1,
        },
      });
    }

    res.json({ success: true, content });
  } catch (error) {
    console.log("Article Error:", error);
    res.json({ success: false, message: error.message });
  }
};

// ======================================================
// GENERATE BLOG TITLE
// ======================================================
export const generateBlogTitle = async (req, res) => {
  try {
    const { userId } = req.auth();
    const { prompt } = req.body;
    const { plan, free_usage } = req;

    if (plan !== "premium" && free_usage >= 10) {
      return res.json({
        success: false,
        message: "Limit reached. Upgrade to continue",
      });
    }

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: [
        {
          role: "user",
          parts: [{ text: prompt }],
        },
      ],
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 100,
      },
    });

    const content = response?.text || "No response from AI";

    await sql`INSERT INTO creations (user_id, prompt, content, type)
              VALUES (${userId}, ${prompt}, ${content}, 'blog-title')`;

    if (plan !== "premium") {
      await clerkClient.users.updateUserMetadata(userId, {
        privateMetadata: {
          free_usage: free_usage + 1,
        },
      });
    }

    res.json({ success: true, content });
  } catch (error) {
    console.log("Blog Title Error:", error);
    res.json({ success: false, message: error.message });
  }
};

// ======================================================
// GENERATE IMAGE (CLIPDROP)
// ======================================================
export const generateImage = async (req, res) => {
  try {
    const { userId } = req.auth();
    const { prompt, publish } = req.body;
    const { plan } = req;

    if (plan !== "premium") {
      return res.json({
        success: false,
        message: "This feature is only available for premium subscriptions",
      });
    }

    const formData = new FormData();
    formData.append("prompt", prompt);

    const { data } = await axios.post(
      "https://clipdrop-api.co/text-to-image/v1",
      formData,
      {
        headers: {
          "x-api-key": process.env.CLIPDROP_API_KEY,
        },
        responseType: "arraybuffer",
      }
    );

    const base64Image = `data:image/png;base64,${Buffer.from(data).toString(
      "base64"
    )}`;

    const { secure_url } = await cloudinary.uploader.upload(base64Image);

    await sql`INSERT INTO creations (user_id, prompt, content, type, publish)
              VALUES (${userId}, ${prompt}, ${secure_url}, 'image', ${
      publish ?? false
    })`;

    res.json({ success: true, content: secure_url });
  } catch (error) {
    console.log("Generate Image Error:", error);
    res.json({ success: false, message: error.message });
  }
};

// ======================================================
// REMOVE IMAGE BACKGROUND
// ======================================================
export const removeImageBackground = async (req, res) => {
  try {
    const { userId } = req.auth();
    const image = req.file;
    const { plan } = req;

    if (plan !== "premium") {
      return res.json({
        success: false,
        message: "This feature is only available for premium subscriptions",
      });
    }

    const { secure_url } = await cloudinary.uploader.upload(image.path, {
      transformation: [
        {
          effect: "background_removal",
          background_removal: "remove_the_background",
        },
      ],
    });

    await sql`INSERT INTO creations (user_id, prompt, content, type)
              VALUES (${userId}, 'Remove background from image', ${secure_url}, 'image')`;

    res.json({ success: true, content: secure_url });
  } catch (error) {
    console.log("Remove BG Error:", error);
    res.json({ success: false, message: error.message });
  }
};

// ======================================================
// REMOVE OBJECT FROM IMAGE
// ======================================================
export const removeImageObject = async (req, res) => {
  try {
    const { userId } = req.auth();
    const { object } = req.body;
    const image = req.file;
    const { plan } = req;

    if (plan !== "premium") {
      return res.json({
        success: false,
        message: "This feature is only available for premium subscriptions",
      });
    }

    const { public_id } = await cloudinary.uploader.upload(image.path);

    const imageUrl = cloudinary.url(public_id, {
      secure: true,
      transformation: [{ effect: `gen_remove:${object}` }],
    });

    await sql`INSERT INTO creations (user_id, prompt, content, type)
              VALUES (${userId}, ${`Removed ${object} from image`}, ${imageUrl}, 'image')`;

    res.json({ success: true, content: imageUrl });
  } catch (error) {
    console.log("Remove Object Error:", error);
    res.json({ success: false, message: error.message });
  }
};

// ======================================================
// RESUME REVIEW
// ======================================================
export const resumeReview = async (req, res) => {
  try {
    const { userId } = req.auth();
    const resume = req.file;
    const { plan } = req;

    if (plan !== "premium") {
      return res.json({
        success: false,
        message: "This feature is only available for premium subscriptions",
      });
    }

    if (resume.size > 5 * 1024 * 1024) {
      return res.json({
        success: false,
        message: "Resume file size exceeds allowed size (5MB).",
      });
    }

    const dataBuffer = fs.readFileSync(resume.path);
    const pdfData = await pdf(dataBuffer);

    const prompt = `Review the following resume and give strengths, weaknesses and improvements:

${pdfData.text}`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: [
        {
          role: "user",
          parts: [{ text: prompt }],
        },
      ],
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 1000,
      },
    });

    const content = response?.text || "No response from AI";

    await sql`INSERT INTO creations (user_id, prompt, content, type)
              VALUES (${userId}, 'Review the uploaded resume', ${content}, 'resume-review')`;

    res.json({ success: true, content });
  } catch (error) {
    console.log("Resume Review Error:", error);
    res.json({ success: false, message: error.message });
  }
};

// ======================================================
// AI ROADMAP GENERATOR
// ======================================================
export const generateRoadmap = async (req, res) => {
  try {
    const { userId } = req.auth();
    const { topic, level } = req.body;
    const { plan, free_usage } = req;

    if (plan !== "premium" && free_usage >= 10) {
      return res.json({
        success: false,
        message: "Limit reached. Upgrade to continue",
      });
    }

    const prompt = `
    Create a detailed step-by-step learning roadmap for ${topic}.
    Skill level: ${level}.
    Include:
    - Beginner to Advanced phases
    - Tools to learn
    - Projects to build
    - Recommended resources
    Format in clean markdown.
    `;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: [{ role: "user", parts: [{ text: prompt }] }],
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 1200,
      },
    });

    const content = response?.text || "No response from AI";

    await sql`
      INSERT INTO creations (user_id, prompt, content, type)
      VALUES (${userId}, ${prompt}, ${content}, 'roadmap')
    `;

    res.json({ success: true, content });
  } catch (error) {
    console.log("Roadmap Error:", error);
    res.json({ success: false, message: error.message });
  }
};
// ======================================================
// AI TECH QUIZ GENERATOR
// ======================================================
export const generateQuiz = async (req, res) => {
  try {
    const { userId } = req.auth();
    const { topic, difficulty } = req.body;
    const { plan, free_usage } = req;

    if (plan !== "premium" && free_usage >= 10) {
      return res.json({
        success: false,
        message: "Limit reached. Upgrade to continue",
      });
    }

    const prompt = `
    Generate 10 multiple choice questions for ${topic}.
    Difficulty: ${difficulty}.
    Each question must include:
    - Question
    - 4 options (A,B,C,D)
    - Correct answer
    - Short explanation
    Format cleanly in markdown.
    `;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: [{ role: "user", parts: [{ text: prompt }] }],
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 1500,
      },
    });

    const content = response?.text || "No response from AI";

    await sql`
      INSERT INTO creations (user_id, prompt, content, type)
      VALUES (${userId}, ${prompt}, ${content}, 'quiz')
    `;

    res.json({ success: true, content });
  } catch (error) {
    console.log("Quiz Error:", error);
    res.json({ success: false, message: error.message });
  }
};

// ======================================================
// AI MOCK INTERVIEW - START
// ======================================================
export const startMockInterview = async (req, res) => {
  try {
    const { topic, difficulty } = req.body;

    const prompt = `
You are a professional interviewer.

Topic: ${topic}
Difficulty: ${difficulty}

Ask ONLY ONE interview question.
`;

    const completion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile", // ✅ FIXED
      messages: [{ role: "user", content: prompt }],
    });

    const question = completion.choices[0].message.content;

    res.json({ success: true, question });

  } catch (error) {
    console.log("Mock Start Error:", error);
    res.json({ success: false, message: error.message });
  }
};

// ======================================================
// AI MOCK INTERVIEW - NEXT STEP
// ======================================================
export const nextMockInterview = async (req, res) => {
  try {
    const { topic, difficulty, answer } = req.body;

    const prompt = `
You are an interviewer.

Topic: ${topic}
Difficulty: ${difficulty}

Candidate Answer:
"${answer}"

Give STRICT format:

Feedback: (2-3 lines)
<h1>Score: (number out of 10)</h1>
Next Question: (only next question)
`;

    const completion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile", // ✅ FIXED
      messages: [{ role: "user", content: prompt }],
    });

    const content = completion.choices[0].message.content;

    const scoreMatch = content.match(/Score:\s*(\d+)/i);
    const score = scoreMatch ? parseInt(scoreMatch[1]) : 0;

    res.json({
      success: true,
      content,
      score,
    });

  } catch (error) {
    console.log("Mock Next Error:", error);

    res.json({
      success: true,
      content: `Feedback: Good attempt, improve clarity.
Score: 6
Next Question: Explain abstraction in OOP.`,
      score: 6,
    });
  }
};
// ======================================================
// VOICE + VIDEO AI INTERVIEW (COMMON ENGINE)
// ======================================================

// Start Interview
export const startsVoiceInterview = async (req, res) => {
  try {
    const { topic, difficulty } = req.body;

    const prompt = `
    You are a professional interviewer.

    Start an interview on:
    Topic: ${topic}
    Difficulty: ${difficulty}

    Ask ONLY ONE question.
    `;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: [{ role: "user", parts: [{ text: prompt }] }],
    });

    res.json({
      success: true,
      question: response.text,
    });

  } catch (err) {
    res.json({ success: false, message: err.message });
  }
};


// Next Step (feedback + next question)
export const nextsVoiceInterview = async (req, res) => {
  try {
    const { topic, difficulty, answer } = req.body;

   const prompt = `
You are an interviewer.

Topic: ${topic}
Difficulty: ${difficulty}

User Answer:
${answer}

If multiple answers are given:
- Evaluate overall performance
<h1>- Give total score out of 50</h1>
- Give improvement tips

Else:
- Give feedback
<h1>- Give score out of 10</h1>
- Ask next question

Format:
Feedback:
Score:
Next Question:
`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: [{ role: "user", parts: [{ text: prompt }] }],
    });

    res.json({
      success: true,
      content: response.text,
    });

  } catch (err) {
    res.json({ success: false, message: err.message });
  }
};
// ======================================================
// AI CODING PRACTICE GENERATOR (GROQ)
// ======================================================

export const generateCodingQuestions = async (req, res) => {
  try {
    const { topic, difficulty } = req.body;

    const prompt = `
You are a senior FAANG coding interviewer.

Generate EXACTLY 3 coding questions for interview practice.

Rules:
- 1 Easy, 1 Medium, 1 Hard (or Mixed if difficulty = Mixed)
- Must include real-world coding problems similar to LeetCode, GFG, Naukri
- Each question must be unique and practical

Return ONLY valid JSON (no markdown, no explanation)

Format:
{
  "questions": [
    {
      "title": "string",
      "description": "string (detailed problem statement)",
      "difficulty": "Easy | Medium | Hard",
      "topic": "${topic}",
      "platform": "LeetCode | GeeksforGeeks | Naukri",
      "link": "https://leetcode.com or https://practice.geeksforgeeks.org or https://www.naukri.com/code360"
    }
  ]
}

Topic: ${topic}
Difficulty Preference: ${difficulty}
`;

    const completion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        {
          role: "system",
          content:
            "You are an expert coding interview question generator. Always return strict JSON only.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.7,
    });

    let content = completion.choices[0].message.content;

    // ✅ SAFE JSON PARSE (important fix)
    let json;
    try {
      json = JSON.parse(content);
    } catch (err) {
      console.log("Raw AI Response:", content);

      return res.json({
        success: false,
        message: "AI returned invalid JSON",
      });
    }

    return res.json({
      success: true,
      questions: json.questions,
    });

  } catch (error) {
    console.log("Coding Generator Error:", error);
    res.json({
      success: false,
      message: error.message,
    });
  }
};


