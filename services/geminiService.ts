import { GoogleGenAI } from "@google/genai";

// Lazy initialization helper
// This prevents the app from crashing on startup if the API key is missing
// or if the library fails to load immediately.
let aiClient: GoogleGenAI | null = null;

const getAiClient = (): GoogleGenAI | null => {
  if (aiClient) return aiClient;

  // The API key must be obtained exclusively from the environment variable process.env.API_KEY
  const apiKey = process.env.API_KEY;
  
  if (!apiKey || apiKey.includes('YOUR_API_KEY')) {
    console.warn("MediaGB AI: API Key is missing. AI features will be disabled.");
    return null;
  }

  try {
    aiClient = new GoogleGenAI({ apiKey });
    return aiClient;
  } catch (e) {
    console.error("MediaGB AI: Failed to initialize GoogleGenAI", e);
    return null;
  }
};

export const generateArticleSummary = async (articleContent: string): Promise<string> => {
  try {
    const ai = getAiClient();
    if (!ai) return "O resumo inteligente está indisponível no momento (Chave de API não configurada).";

    const model = 'gemini-2.5-flash';
    const prompt = `
      Você é um editor de notícias experiente. Por favor, forneça um resumo conciso de 3 pontos do conteúdo do artigo a seguir.
      Responda EXCLUSIVAMENTE em Português (Brasil).
      Mantenha o tom profissional e jornalístico.
      
      Conteúdo do Artigo:
      ${articleContent}
    `;

    const response = await ai.models.generateContent({
      model: model,
      contents: prompt,
    });

    return response.text || "Resumo indisponível.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Não foi possível gerar o resumo no momento. Tente novamente mais tarde.";
  }
};

export const askAiAssistant = async (question: string, context: string): Promise<string> => {
  try {
    const ai = getAiClient();
    if (!ai) return "Desculpe, o assistente está offline no momento.";

    const model = 'gemini-2.5-flash';
    const prompt = `
      Contexto (Artigo Atual): ${context}
      
      Pergunta do Usuário: ${question}
      
      Responda à pergunta do usuário com base no contexto do artigo fornecido. Seja breve, útil e responda em Português (Brasil).
    `;
    
    const response = await ai.models.generateContent({
      model: model,
      contents: prompt,
    });

    return response.text || "Não consegui encontrar uma resposta para isso.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Desculpe, estou com problemas de conexão agora.";
  }
};