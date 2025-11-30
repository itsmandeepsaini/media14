import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Article } from '../types';
import CategoryBadge from './CategoryBadge';
import { Clock, ArrowRight } from 'lucide-react';

interface HeroSectionProps {
  articles: Article[];
}

const HeroSection: React.FC<HeroSectionProps> = ({ articles }) => {
  const [mainImgSrc, setMainImgSrc] = useState(articles.length > 0 ? articles[0].imageUrl : '');
  
  if (articles.length === 0) return null;

  const mainArticle = articles[0];
  const subArticles = articles.slice(1, 3);

  return (
    <section className="container mx-auto px-4 py-8 md:py-12 animate-fade-in-up">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Main Featured Article - 8 cols */}
        <div className="lg:col-span-8 relative group overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 cursor-pointer h-full min-h-[500px]">
          <Link to={`/article/${mainArticle.id}`} className="block h-full relative aspect-[16/10] md:aspect-auto">
             <img 
               src={mainImgSrc} 
               onError={() => setMainImgSrc('https://placehold.co/1200x800?text=Imagem+Indisponível')}
               alt={mainArticle.title} 
               className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-1000 ease-out will-change-transform"
               loading="eager" 
             />
             
             {/* Sophisticated Gradient Overlay */}
             <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-90 transition-opacity duration-500"></div>
             
             <div className="absolute bottom-0 left-0 p-8 md:p-12 w-full md:w-5/6 flex flex-col justify-end h-full">
                <div className="mb-6 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500 ease-out flex items-center space-x-3">
                   <CategoryBadge category={mainArticle.category} size="md" className="shadow-lg backdrop-blur-md bg-opacity-100" />
                   <span className="text-white/90 text-xs font-bold uppercase tracking-widest border-l border-white/40 pl-3">Destaque do Dia</span>
                </div>
                
                <h1 className="text-3xl md:text-5xl lg:text-6xl font-serif font-black text-white leading-[1.05] mb-6 drop-shadow-md tracking-tight">
                  {mainArticle.title}
                </h1>
                
                <p className="text-gray-200 text-lg line-clamp-2 mb-8 hidden md:block font-medium leading-relaxed max-w-2xl opacity-90">
                  {mainArticle.excerpt}
                </p>
                
                <div className="flex items-center text-white/90 text-xs uppercase tracking-widest font-bold border-t border-white/20 pt-6">
                  <span className="text-brand-300 mr-2">{mainArticle.author}</span>
                  <span className="text-white/40 mx-2">•</span>
                  <span>{new Date(mainArticle.publishedAt).toLocaleDateString('pt-BR')}</span>
                  <div className="ml-auto flex items-center text-brand-300 group-hover:text-white transition-colors">
                     <span className="mr-2">Ler Artigo</span>
                     <ArrowRight size={16} className="transform group-hover:translate-x-1 transition-transform duration-300" />
                  </div>
                </div>
             </div>
          </Link>
        </div>

        {/* Sub Featured Articles - 4 cols */}
        <div className="lg:col-span-4 flex flex-col space-y-8">
          {subArticles.map((article) => (
            <SubArticleCard key={article.id} article={article} />
          ))}
        </div>
      </div>
    </section>
  );
};

const SubArticleCard: React.FC<{ article: Article }> = ({ article }) => {
  const [imgSrc, setImgSrc] = useState(article.imageUrl);

  return (
    <Link to={`/article/${article.id}`} className="group flex-1 flex flex-col bg-white dark:bg-[#111] rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-800 overflow-hidden relative">
        <div className="relative h-48 overflow-hidden">
          <img 
            src={imgSrc} 
            onError={() => setImgSrc('https://placehold.co/800x600?text=Imagem+Indisponível')}
            alt={article.title} 
            className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-out"
            loading="lazy"
          />
          <div className="absolute top-4 left-4">
            <CategoryBadge category={article.category} className="shadow-lg" />
          </div>
          <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors"></div>
        </div>
        <div className="p-6 flex-1 flex flex-col justify-center relative">
          <h2 className="text-xl font-serif font-bold text-gray-900 dark:text-gray-100 leading-tight mb-3 group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors line-clamp-3">
            {article.title}
          </h2>
          <div className="mt-auto pt-4 flex items-center justify-between text-xs font-medium text-gray-500 dark:text-gray-400 border-t border-gray-100 dark:border-gray-800/50">
            <span className="flex items-center"><Clock size={12} className="mr-1.5" /> {article.readTime} min</span>
            <ArrowRight size={14} className="text-gray-300 group-hover:text-brand-600 transition-colors" />
          </div>
        </div>
    </Link>
  );
};

export default HeroSection;