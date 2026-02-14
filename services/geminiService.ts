import { GoogleGenAI, Type, Schema } from "@google/genai";
import { PromptResponse, Language } from "../types";

const getSystemInstruction = (language: Language) => {
  const isVietnamese = language === 'vi';
  
  const roleDef = isVietnamese 
    ? `- **Vai trò:** Bạn là một Giám đốc Sáng tạo (Creative Director) và Chuyên gia Prompt Engineering với 15 năm kinh nghiệm.
       - **Nhiệm vụ:** Chuyển đổi ý tưởng marketing thành các PROMPT tạo ảnh chuẩn xác cho Midjourney/Stable Diffusion.`
    : `- **Role:** You are a Creative Director and Prompt Engineering Expert with 15 years of experience.
       - **Task:** Transform marketing ideas into precise image generation PROMPTS for Midjourney/Stable Diffusion.`;

  const logic = isVietnamese
    ? `# 2. Tư duy xử lý & Phân loại phong cách
       Bạn phải tự động xác định phong cách dựa trên ngành hàng.
       **Yêu cầu đặc biệt:**
       - **Bố cục (Composition):** Ưu tiên tạo khoảng trống (negative space) rộng rãi để chèn text quảng cáo. Sử dụng quy tắc 1/3 hoặc bất đối xứng.
       - **Nội dung chữ (Text Content):** Bắt buộc viết Headline tập trung vào LỢI ÍCH (benefit-driven) và phải có một lời kêu gọi hành động (CTA) cụ thể (ví dụ: Shop Now, Mua Ngay).
       - **Ánh sáng (Lighting):** Mô tả chi tiết hướng sáng và tâm trạng (mood), ví dụ: "dramatic volumetric lighting from side".
       - **Phong cách (Art Style):** Cụ thể hóa kỹ thuật, ví dụ: "cinematic 3D render", "flat vector illustration", không dùng từ chung chung.`
    : `# 2. Logic & Style Classification
       You must automatically determine the style based on the industry.
       **Specific Requirements:**
       - **Composition:** Prioritize ample negative space for ad copy. Use rule of thirds or asymmetry.
       - **Text Content:** Headlines must be BENEFIT-DRIVEN and must include a specific Call-to-Action (CTA) phrase (e.g., Shop Now, Learn More).
       - **Lighting:** Elaborate on direction and mood, e.g., "dramatic volumetric lighting from side".
       - **Art Style:** Be specific about the medium/technique, e.g., "cinematic 3D render", "flat vector illustration", avoid generic terms.`;

  const structure = isVietnamese
    ? `# 3. Cấu trúc dữ liệu đầu ra (JSON)
       Trả về JSON gồm:
       - strategy: Object chứa 11 trường thông tin phân tích (Viết bằng Tiếng Việt).
       - finalPrompt: Chuỗi prompt tiếng Anh chuẩn (Midjourney style).
       - suggestions: 3 câu gợi ý (Tiếng Việt).`
    : `# 3. Output Data Structure (JSON)
       Return JSON containing:
       - strategy: Object with 11 analysis fields (Written in English).
       - finalPrompt: Standard English prompt string (Midjourney style).
       - suggestions: 3 suggestions (English).`;

  return `${roleDef}\n\n${logic}\n\n${structure}`;
};

const RESPONSE_SCHEMA: Schema = {
  type: Type.OBJECT,
  properties: {
    strategy: {
      type: Type.OBJECT,
      properties: {
        concept: { type: Type.STRING, description: "1. Concept / Ý tưởng" },
        composition: { type: Type.STRING, description: "2. Composition / Bố cục (Negative space, Rule of thirds)" },
        colorPalette: { type: Type.STRING, description: "3. Palette / Màu sắc" },
        product: { type: Type.STRING, description: "4. Product / Sản phẩm" },
        background: { type: Type.STRING, description: "5. Background / Bối cảnh" },
        typography: { type: Type.STRING, description: "6. Typography" },
        textContent: { type: Type.STRING, description: "7. Text Content / Nội dung chữ (Benefit + CTA)" },
        lighting: { type: Type.STRING, description: "8. Lighting / Ánh sáng (Direction, Mood)" },
        props: { type: Type.STRING, description: "9. Props / Đạo cụ" },
        artStyle: { type: Type.STRING, description: "10. Art Style / Phong cách (Specific technique)" },
        techSpecs: { type: Type.STRING, description: "11. Specs / Thông số kỹ thuật" },
      },
      required: [
        "concept", "composition", "colorPalette", "product", "background", 
        "typography", "textContent", "lighting", "props", "artStyle", "techSpecs"
      ],
    },
    finalPrompt: {
      type: Type.STRING,
      description: "Prompt tiếng Anh chuẩn / Standard English Prompt.",
    },
    suggestions: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: "3 suggestions / 3 gợi ý.",
    },
  },
  required: ["strategy", "finalPrompt", "suggestions"],
};

export const generateCreativePrompt = async (userInput: string, language: Language = 'en'): Promise<PromptResponse> => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    throw new Error("API Key is missing.");
  }

  const ai = new GoogleGenAI({ apiKey });

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: userInput,
      config: {
        systemInstruction: getSystemInstruction(language),
        responseMimeType: "application/json",
        responseSchema: RESPONSE_SCHEMA,
        temperature: 0.7,
      },
    });

    const text = response.text;
    if (!text) throw new Error("No response from Gemini");

    return JSON.parse(text) as PromptResponse;
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw error;
  }
};
