import React, { useState } from 'react';
import { Sparkles, MessageSquare, Loader2, ChevronRight, X } from 'lucide-react';
import { generateArticleSummary, askAiAssistant } from '../services/geminiService';

interface GeminiAssistantProps {
  articleContent: string;
}

const GeminiAssistant: React.FC<GeminiAssistantProps> = ({ articleContent }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [summary, setSummary] = useState<string | null>(null);
  const [isLoadingSummary, setIsLoadingSummary] = useState(false);
  const [chatInput, setChatInput] = useState("");
  const [chatHistory, setChatHistory] = useState<{role: 'user' | 'ai', text: string}[]>([]);
  const [isChatLoading, setIsChatLoading] = useState(false);

  const handleSummarize = async () => {
    if (summary) return;
    setIsLoadingSummary(true);
    const result = await generateArticleSummary(articleContent);
    setSummary(result);
    setIsLoadingSummary(false);
  };

  const handleChatSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    const userMessage = chatInput;
    setChatHistory(prev => [...prev, { role: 'user', text: userMessage }]);
    setChatInput("");
    setIsChatLoading(true);

    const answer = await askAiAssistant(userMessage, articleContent);
    
    setChatHistory(prev => [...prev, { role: 'ai', text: answer }]);
    setIsChatLoading(false);
  };

  if (!isOpen) {
    return (
      <button 
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 flex items-center bg-gradient-to-r from-brand-600 to-indigo-600 text-white px-5 py-3 rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 group"
      >
        <Sparkles size={20} className="mr-2 animate-pulse" />
        <span className="font-medium">Assistente IA</span>
      </button>
    );
  }

  return (
    <div className="fixed inset-y-0 right-0 z-50 w-full sm:w-96 bg-white dark:bg-gray-900 shadow-2xl transform transition-transform duration-300 border-l border-gray-200 dark:border-gray-800 flex flex-col">
      {/* Header */}
      <div className="p-4 bg-gradient-to-r from-brand-600 to-indigo-600 text-white flex justify-between items-center shadow-md">
        <div className="flex items-center space-x-2">
           <Sparkles size={20} />
           <h3 className="font-bold text-lg">Assistente MediaGB</h3>
        </div>
        <button onClick={() => setIsOpen(false)} className="hover:bg-white/20 p-1 rounded transition-colors">
          <X size={24} />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {/* Summary Section */}
        <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4 border border-gray-100 dark:border-gray-700">
          <h4 className="font-bold text-gray-800 dark:text-gray-100 mb-3 flex items-center">
            <span className="w-1 h-5 bg-brand-500 rounded-full mr-2"></span>
            Resumo Inteligente
          </h4>
          
          {!summary && !isLoadingSummary && (
            <button 
              onClick={handleSummarize}
              className="w-full py-2 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-sm font-medium text-brand-600 dark:text-brand-400 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors flex justify-center items-center"
            >
              <Sparkles size={14} className="mr-2" />
              Gerar Resumo
            </button>
          )}

          {isLoadingSummary && (
             <div className="flex justify-center py-4">
               <Loader2 size={24} className="animate-spin text-brand-600" />
             </div>
          )}

          {summary && (
            <div className="prose prose-sm dark:prose-invert text-gray-600 dark:text-gray-300 leading-relaxed whitespace-pre-wrap">
              {summary}
            </div>
          )}
        </div>

        {/* Chat Section */}
        <div className="space-y-4">
          <h4 className="font-bold text-gray-800 dark:text-gray-100 flex items-center">
            <MessageSquare size={18} className="mr-2 text-gray-400" />
            Pergunte sobre este artigo
          </h4>
          
          <div className="space-y-3">
            {chatHistory.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] p-3 rounded-lg text-sm ${
                  msg.role === 'user' 
                    ? 'bg-brand-100 dark:bg-brand-900/30 text-brand-900 dark:text-brand-100 rounded-br-none' 
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-bl-none'
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}
             {isChatLoading && (
                <div className="flex justify-start">
                  <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-lg rounded-bl-none">
                    <Loader2 size={16} className="animate-spin text-gray-400" />
                  </div>
                </div>
             )}
          </div>
        </div>
      </div>

      {/* Input Area */}
      <div className="p-4 border-t border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900">
        <form onSubmit={handleChatSubmit} className="relative">
          <input
            type="text"
            value={chatInput}
            onChange={(e) => setChatInput(e.target.value)}
            placeholder="Ex: Quais são os pontos principais?"
            className="w-full pl-4 pr-10 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 dark:text-white"
          />
          <button 
            type="submit"
            disabled={!chatInput.trim() || isChatLoading}
            className="absolute right-2 top-2 p-1.5 bg-brand-600 text-white rounded-lg hover:bg-brand-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronRight size={18} />
          </button>
        </form>
      </div>
    </div>
  );
};

export default GeminiAssistant;