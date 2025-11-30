import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Clock } from 'lucide-react';
import { Article } from '../types';
import CategoryBadge from './CategoryBadge';

interface ArticleCardProps {
  article: Article;
  compact?: boolean;
}

const ArticleCard: React.FC<ArticleCardProps> = ({ article, compact = false }) => {
  const [imgSrc, setImgSrc] = useState(article.imageUrl);

  return (
    <Link to={`/article/${article.id}`} className="group block h-full flex flex-col bg-transparent transition-all duration-300">
      <div className={`relative overflow-hidden rounded-xl shadow-sm group-hover:shadow-xl transition-all duration-500 ${compact ? 'aspect-video mb-4' : 'aspect-[4/3] mb-5'}`}>
        <img 
          src={imgSrc} 
          alt={article.title} 
          onError={() => setImgSrc('https://placehold.co/800x600?text=Imagem+Indisponível')}
          className="object-cover w-full h-full transform group-hover:scale-105 transition-transform duration-700 ease-out"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors duration-500"></div>
        
        <div className="absolute top-4 left-4 z-10">
          <CategoryBadge category={article.category} className="shadow-lg backdrop-blur-sm" />
        </div>
      </div>
      
      <div className="flex-1 flex flex-col">
        <h3 className={`font-serif font-bold text-gray-900 dark:text-gray-100 group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors leading-[1.2] ${compact ? 'text-lg mb-2' : 'text-2xl mb-3'}`}>
          {article.title}
        </h3>
        
        {!compact && (
          <p className="text-gray-600 dark:text-gray-400 text-base line-clamp-3 mb-5 flex-1 leading-relaxed opacity-90">
            {article.excerpt}
          </p>
        )}
        
        <div className="mt-auto flex items-center justify-between text-xs text-gray-500 dark:text-gray-500 pt-4 border-t border-gray-100 dark:border-gray-800">
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 rounded-full bg-brand-50 dark:bg-brand-900/30 flex items-center justify-center text-brand-700 dark:text-brand-300 font-bold text-[10px] ring-1 ring-brand-100 dark:ring-brand-900">
                 {article.author.charAt(0)}
              </div>
              <span className="font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wide text-[10px]">
                 {article.author}
              </span>
            </div>
            
            <div className="flex items-center space-x-3">
              <span className="text-gray-400 dark:text-gray-600 font-medium">
                {new Date(article.publishedAt).toLocaleDateString('pt-BR', {day: '2-digit', month: 'short'})}
              </span>
              <span className="flex items-center text-gray-400">
                <Clock size={12} className="mr-1.5" />
                {article.readTime} min
              </span>
            </div>
        </div>
      </div>
    </Link>
  );
};

export default ArticleCard;