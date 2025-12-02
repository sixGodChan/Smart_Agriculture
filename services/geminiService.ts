import { GoogleGenAI, Type } from "@google/genai";
import { AnalysisResult } from "../types";

// Initialize the Gemini Client
// CRITICAL: The API key is injected via process.env.API_KEY
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const MODEL_NAME = "gemini-2.5-flash";

export const analyzeCropImage = async (base64Image: string, mimeType: string): Promise<AnalysisResult> => {
  try {
    // 1. Prepare the image part
    // Extract actual base64 data if it includes the prefix (e.g., "data:image/jpeg;base64,")
    const base64Data = base64Image.split(',')[1] || base64Image;

    const imagePart = {
      inlineData: {
        mimeType: mimeType,
        data: base64Data,
      },
    };

    // 2. Prepare the prompt
    // Explicitly ask for Simplified Chinese response
    const prompt = "你是一位专业的农业植物病理学家。请分析这张图片。判断它是否为植物。如果是，请识别植物种类，诊断具体的病害或虫害（如果是健康的也请确认），并提供详细的治疗建议。请使用简体中文（Simplified Chinese）返回所有文本内容。";

    // 3. call generateContent with schema
    const response = await ai.models.generateContent({
      model: MODEL_NAME,
      contents: {
        parts: [imagePart, { text: prompt }],
      },
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            isPlant: { type: Type.BOOLEAN, description: "True if the image contains a plant, crop, or leaf." },
            plantName: { type: Type.STRING, description: "The common name of the plant in Chinese." },
            condition: { type: Type.STRING, description: "The name of the disease, pest, or '健康' (Healthy) in Chinese." },
            confidence: { type: Type.NUMBER, description: "Confidence level of diagnosis from 0 to 100." },
            description: { type: Type.STRING, description: "A brief explanation of the condition in Chinese." },
            symptoms: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "List of visible symptoms in Chinese."
            },
            treatment: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "Step-by-step treatment recommendations in Chinese."
            },
            prevention: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "Tips to prevent future outbreaks in Chinese."
            },
          },
          required: ["isPlant", "plantName", "condition", "confidence", "description", "symptoms", "treatment", "prevention"],
        },
      },
    });

    // 4. Parse and return result
    if (response.text) {
      return JSON.parse(response.text) as AnalysisResult;
    } else {
      throw new Error("No data returned from Gemini.");
    }
  } catch (error) {
    console.error("Gemini Analysis Error:", error);
    throw new Error("图片分析失败，请重试。");
  }
};