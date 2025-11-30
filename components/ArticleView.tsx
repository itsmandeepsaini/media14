import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getArticleById, getRelatedArticles } from '../services/newsService';
import { Calendar, Clock, Share2, Bookmark, Check, ArrowLeft } from 'lucide-react';
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
  const [imgSrc, setImgSrc] = useState('');
  
  // Scroll to top happens in App.tsx now via ScrollToTop component, 
  // but we keep image state reset here
  useEffect(() => {
    setIsSaved(false);
    if (article) {
        setImgSrc(article.imageUrl);
    }
  }, [id, article]);

  if (!article) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-[#050505]">
        <div className="text-center p-8">
          <div className="text-6xl mb-4">😕</div>
          <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Artigo não encontrado</h2>
          <Link to="/" className="text-brand-600 hover:underline font-medium">Voltar ao Início</Link>
        </div>
      </div>
    );
  }

  const relatedArticles = getRelatedArticles(article.category, article.id);

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
      <div className="bg-white dark:bg-[#050505] min-h-screen pb-16 animate-fade-in-up">
        {/* Breadcrumb / Back */}
        <div className="container mx-auto px-4 pt-6 max-w-4xl">
           <Link to="/" className="inline-flex items-center text-gray-500 hover:text-brand-600 text-sm font-medium transition-colors mb-6 group">
             <ArrowLeft size={16} className="mr-1 transform group-hover:-translate-x-1 transition-transform" /> Voltar para Home
           </Link>
        </div>

        {/* Article Header */}
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="flex items-center space-x-3 text-sm font-bold mb-6">
             <CategoryBadge category={article.category} size="md" />
             <span className="text-gray-300 dark:text-gray-700">•</span>
             <span className="text-gray-500 dark:text-gray-400 uppercase tracking-widest text-xs font-bold">
               {new Date(article.publishedAt).getFullYear()}
             </span>
          </div>

          <h1 className="text-3xl md:text-5xl lg:text-6xl font-serif font-black text-gray-900 dark:text-gray-50 leading-[1.1] mb-8 tracking-tight">
            {article.title}
          </h1>

          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 leading-relaxed font-serif mb-10 pl-6 border-l-4 border-brand-500 dark:border-brand-600 italic">
            {article.excerpt}
          </p>

          <div className="flex flex-col md:flex-row md:items-center justify-between border-y border-gray-100 dark:border-gray-800 py-6 mb-10">
            <div className="flex items-center space-x-4 mb-6 md:mb-0">
               <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-brand-500 to-indigo-500 flex items-center justify-center text-white font-bold text-lg shadow-md ring-4 ring-gray-50 dark:ring-gray-900">
                  {article.author.charAt(0)}
               </div>
               <div>
                  <div className="font-bold text-gray-900 dark:text-white text-lg leading-none mb-1">{article.author}</div>
                  <div className="flex items-center text-xs font-medium text-gray-500 dark:text-gray-400 space-x-3">
                     <span className="flex items-center"><Calendar size={12} className="mr-1"/> {new Date(article.publishedAt).toLocaleDateString('pt-BR')}</span>
                     <span className="flex items-center"><Clock size={12} className="mr-1"/> {article.readTime} min de leitura</span>
                  </div>
               </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <button 
                onClick={handleShare}
                className="flex items-center space-x-2 px-5 py-2.5 rounded-full border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 hover:border-brand-300 transition-all text-gray-700 dark:text-gray-300 text-sm font-bold group"
              >
                <Share2 size={18} className="group-hover:text-brand-600 transition-colors" />
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
           <div className="relative rounded-none md:rounded-2xl overflow-hidden shadow-2xl">
              <img 
                src={imgSrc} 
                onError={() => setImgSrc('https://placehold.co/1200x800?text=Imagem+Indisponível')}
                alt={article.title} 
                className="w-full h-auto object-cover max-h-[700px]" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none"></div>
           </div>
           <figcaption className="text-center text-xs text-gray-500 mt-3 font-medium uppercase tracking-wide">
              Foto de Destaque / MediaGB Global Press
           </figcaption>
        </div>

        {/* Article Body */}
        <div className="container mx-auto px-4 max-w-3xl">
          <article 
            className="prose prose-lg dark:prose-invert prose-headings:font-serif prose-headings:font-bold prose-p:text-gray-700 dark:prose-p:text-gray-300 prose-a:text-brand-600 hover:prose-a:text-brand-500 prose-img:rounded-xl prose-img:shadow-lg max-w-none first-letter:text-5xl first-letter:font-black first-letter:text-brand-600 first-letter:mr-3 first-letter:float-left first-letter:leading-[0.8]"
            dangerouslySetInnerHTML={createMarkup()} 
          />
          
          <div className="mt-20 pt-10 border-t border-gray-200 dark:border-gray-800">
             <div className="flex items-center justify-between mb-8">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white font-serif flex items-center">
                  <span className="w-2 h-8 bg-brand-600 mr-3 rounded-sm"></span>
                  Continue Lendo
                </h3>
                <Link to="/" className="text-brand-600 font-bold hover:text-brand-800 dark:hover:text-brand-400 hover:underline uppercase text-sm tracking-wide">Ver todas</Link>
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