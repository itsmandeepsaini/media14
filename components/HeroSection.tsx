import React from 'react';
import { Link } from 'react-router-dom';
import { Article } from '../types';
import CategoryBadge from './CategoryBadge';
import { Clock } from 'lucide-react';

interface HeroSectionProps {
  articles: Article[];
}

const HeroSection: React.FC<HeroSectionProps> = ({ articles }) => {
  if (articles.length === 0) return null;

  const mainArticle = articles[0];
  const subArticles = articles.slice(1, 3);

  return (
    <section className="container mx-auto px-4 py-8 md:py-10">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Main Featured Article - 8 cols */}
        <div className="lg:col-span-8 relative group overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500">
          <Link to={`/article/${mainArticle.id}`} className="block h-full relative aspect-[16/10] md:aspect-auto">
             <img 
               src={mainArticle.imageUrl} 
               alt={mainArticle.title} 
               className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-1000 ease-out"
             />
             <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500"></div>
             
             <div className="absolute bottom-0 left-0 p-6 md:p-10 w-full md:w-5/6 flex flex-col justify-end h-full">
                <div className="mb-4 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500 ease-out">
                   <CategoryBadge category={mainArticle.category} size="md" className="shadow-lg" />
                </div>
                <h1 className="text-2xl md:text-4xl lg:text-5xl font-serif font-black text-white leading-tight mb-4 drop-shadow-md tracking-tight">
                  {mainArticle.title}
                </h1>
                <p className="text-gray-200 text-base md:text-lg line-clamp-2 mb-6 hidden md:block opacity-90 font-medium leading-relaxed max-w-2xl">
                  {mainArticle.excerpt}
                </p>
                <div className="flex items-center text-white/90 text-xs uppercase tracking-widest font-bold">
                  <span className="text-brand-400 mr-2">{mainArticle.author}</span>
                  <span className="text-white/40 mx-2">•</span>
                  <span>{new Date(mainArticle.publishedAt).toLocaleDateString('pt-BR')}</span>
                </div>
             </div>
          </Link>
        </div>

        {/* Sub Featured Articles - 4 cols */}
        <div className="lg:col-span-4 flex flex-col space-y-8">
          {subArticles.map((article) => (
            <Link key={article.id} to={`/article/${article.id}`} className="group flex-1 flex flex-col bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700 overflow-hidden">
               <div className="relative h-48 overflow-hidden">
                 <img 
                   src={article.imageUrl} 
                   alt={article.title} 
                   className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                 />
                 <div className="absolute top-4 left-4">
                   <CategoryBadge category={article.category} />
                 </div>
                 <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors"></div>
               </div>
               <div className="p-6 flex-1 flex flex-col justify-center">
                  <h2 className="text-xl font-serif font-bold text-gray-900 dark:text-white leading-tight mb-3 group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors line-clamp-3">
                    {article.title}
                  </h2>
                  <div className="mt-auto pt-3 flex items-center justify-between text-xs font-medium text-gray-500 dark:text-gray-400 border-t border-gray-100 dark:border-gray-700">
                    <span className="flex items-center"><Clock size={12} className="mr-1" /> {article.readTime} min</span>
                    <span className="text-brand-600 dark:text-brand-400 group-hover:underline">Ler agora</span>
                  </div>
               </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;