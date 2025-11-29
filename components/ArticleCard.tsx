import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, User } from 'lucide-react';
import { Article } from '../types';
import CategoryBadge from './CategoryBadge';

interface ArticleCardProps {
  article: Article;
  compact?: boolean;
}

const ArticleCard: React.FC<ArticleCardProps> = ({ article, compact = false }) => {
  return (
    <Link to={`/article/${article.id}`} className="group block h-full flex flex-col bg-transparent transition-all duration-300">
      <div className={`relative overflow-hidden rounded-xl shadow-sm group-hover:shadow-md transition-shadow ${compact ? 'aspect-video mb-3' : 'aspect-[4/3] mb-5'}`}>
        <img 
          src={article.imageUrl} 
          alt={article.title} 
          className="object-cover w-full h-full transform group-hover:scale-105 transition-transform duration-700 ease-out"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors"></div>
        <div className="absolute top-3 left-3">
          <CategoryBadge category={article.category} className="shadow-sm" />
        </div>
      </div>
      <div className="flex-1 flex flex-col">
        <h3 className={`font-serif font-bold text-gray-900 dark:text-gray-100 group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors leading-tight ${compact ? 'text-lg mb-2' : 'text-xl md:text-2xl mb-3'}`}>
          {article.title}
        </h3>
        {!compact && (
          <p className="text-gray-600 dark:text-gray-400 text-sm md:text-base line-clamp-3 mb-4 flex-1 leading-relaxed">
            {article.excerpt}
          </p>
        )}
        <div className="mt-auto flex items-center justify-between text-xs text-gray-500 dark:text-gray-500 pt-2 border-t border-gray-100 dark:border-gray-800/50">
            <div className="flex items-center space-x-3">
              <span className="font-bold text-gray-700 dark:text-gray-300 flex items-center">
                 {article.author}
              </span>
              <span className="text-gray-300 dark:text-gray-600">•</span>
              <span className="flex items-center text-gray-400">
                <Clock size={12} className="mr-1" />
                {article.readTime} min
              </span>
            </div>
        </div>
      </div>
    </Link>
  );
};

export default ArticleCard;