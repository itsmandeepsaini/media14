import { GoogleGenAI } from "@google/genai";

// Initialize the client. 
// NOTE: We assume process.env.API_KEY is available. 
// In a real production build, this would be injected via environment variables.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateArticleSummary = async (articleContent: string): Promise<string> => {
  try {
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