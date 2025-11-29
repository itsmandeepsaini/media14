import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getArticleById, getRelatedArticles } from '../services/newsService';
import { Calendar, User, Clock, Share2, Bookmark, Check } from 'lucide-react';
import GeminiAssistant from './GeminiAssistant';
import ArticleCard from './ArticleCard';
import CategoryBadge from './CategoryBadge';

interface ArticleViewProps {
  showToast: (msg: string, type: 'success' | 'info' | 'error') => void;
}

const ArticleView: React.FC<ArticleViewProps> = ({ showToast }) => {
  const { id } = useParams<{ id: string }>();
  const article = getArticleById(id || '');
  const [isSaved, setIsSaved] = React.useState(false);
  
  // Scroll to top when article changes
  useEffect(() => {
    window.scrollTo(0, 0);
    setIsSaved(false);
  }, [id]);

  if (!article) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Artigo não encontrado</h2>
          <Link to="/" className="text-brand-600 hover:underline">Voltar ao Início</Link>
        </div>
      </div>
    );
  }

  const relatedArticles = getRelatedArticles(article.category, article.id);

  // Helper to safely set HTML content
  const createMarkup = () => {
    return { __html: article.content };
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    showToast("Link copiado para a área de transferência!", "success");
  };

  const handleSave = () => {
    setIsSaved(!isSaved);
    if (!isSaved) {
      showToast("Artigo salvo na sua lista de leitura.", "success");
    } else {
      showToast("Artigo removido da lista.", "info");
    }
  };

  return (
    <>
      <div className="bg-white dark:bg-gray-900 min-h-screen pb-16">
        {/* Article Header */}
        <div className="container mx-auto px-4 pt-10 md:pt-14 max-w-4xl">
          <div className="flex items-center space-x-3 text-sm font-bold mb-6">
             <CategoryBadge category={article.category} />
             <span className="text-gray-300">•</span>
             <span className="text-gray-500 uppercase tracking-wider text-xs">Notícias</span>
          </div>

          <h1 className="text-3xl md:text-5xl lg:text-6xl font-serif font-black text-gray-900 dark:text-gray-100 leading-tight mb-8">
            {article.title}
          </h1>

          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 leading-relaxed font-serif mb-10 border-l-4 border-brand-500 pl-6 italic">
            {article.excerpt}
          </p>

          <div className="flex flex-col md:flex-row md:items-center justify-between border-y border-gray-100 dark:border-gray-800 py-6 mb-10">
            <div className="flex items-center space-x-4 mb-4 md:mb-0">
               <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-brand-500 to-indigo-500 flex items-center justify-center text-white font-bold text-lg shadow-md">
                  {article.author.charAt(0)}
               </div>
               <div>
                  <div className="font-bold text-gray-900 dark:text-white text-lg">{article.author}</div>
                  <div className="flex items-center text-xs text-gray-500 dark:text-gray-400 space-x-3 mt-1">
                     <span className="flex items-center"><Calendar size={12} className="mr-1"/> {new Date(article.publishedAt).toLocaleDateString('pt-BR')}</span>
                     <span className="flex items-center"><Clock size={12} className="mr-1"/> {article.readTime} min de leitura</span>
                  </div>
               </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <button 
                onClick={handleShare}
                className="flex items-center space-x-2 px-5 py-2.5 rounded-full border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 hover:border-brand-300 transition-all text-gray-700 dark:text-gray-300 text-sm font-bold"
              >
                <Share2 size={18} />
                <span>Compartilhar</span>
              </button>
              <button 
                onClick={handleSave}
                className={`flex items-center space-x-2 px-5 py-2.5 rounded-full border transition-all text-sm font-bold ${isSaved ? 'bg-brand-50 border-brand-200 text-brand-700 dark:bg-brand-900/20 dark:border-brand-800 dark:text-brand-400' : 'border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300'}`}
              >
                {isSaved ? <Check size={18} /> : <Bookmark size={18} />}
                <span>{isSaved ? 'Salvo' : 'Salvar'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Featured Image */}
        <div className="container mx-auto px-0 md:px-4 max-w-6xl mb-16">
           <img src={article.imageUrl} alt={article.title} className="w-full h-auto md:rounded-2xl shadow-2xl" />
        </div>

        {/* Article Body */}
        <div className="container mx-auto px-4 max-w-3xl">
          <article 
            className="prose prose-lg dark:prose-invert prose-headings:font-serif prose-headings:font-bold prose-a:text-brand-600 hover:prose-a:text-brand-500 max-w-none first-letter:text-5xl first-letter:font-black first-letter:text-brand-600 first-letter:mr-3 first-letter:float-left first-letter:leading-[0.8]"
            dangerouslySetInnerHTML={createMarkup()} 
          />
          
          <div className="mt-16 pt-10 border-t border-gray-200 dark:border-gray-800">
             <div className="flex items-center justify-between mb-8">
                <h3 className="text-2xl font-bold dark:text-white font-serif">Histórias Relacionadas</h3>
                <Link to="/" className="text-brand-600 font-bold hover:underline">Ver todas</Link>
             </div>
             <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {relatedArticles.map(rel => (
                  <ArticleCard key={rel.id} article={rel} compact />
                ))}
             </div>
          </div>
        </div>
      </div>
      
      {/* Floating Gemini AI Button */}
      <GeminiAssistant articleContent={article.title + "\n" + article.excerpt + "\n" + article.content.replace(/<[^>]*>?/gm, '')} />
    </>
  );
};

export default ArticleView;