import React from 'react';
import { NewsCategory } from '../types';

interface CategoryBadgeProps {
  category: string;
  className?: string;
  size?: 'sm' | 'md';
}

const getCategoryColor = (category: string): string => {
  const map: Record<string, string> = {
    [NewsCategory.Mundo]: 'bg-indigo-600 text-white dark:bg-indigo-500',
    [NewsCategory.Politica]: 'bg-red-600 text-white dark:bg-red-500',
    [NewsCategory.Negocios]: 'bg-slate-600 text-white dark:bg-slate-500',
    [NewsCategory.Tecnologia]: 'bg-violet-600 text-white dark:bg-violet-500',
    [NewsCategory.Ciencia]: 'bg-emerald-600 text-white dark:bg-emerald-500',
    [NewsCategory.Saude]: 'bg-teal-600 text-white dark:bg-teal-500',
    [NewsCategory.Esportes]: 'bg-orange-500 text-white dark:bg-orange-500',
    [NewsCategory.Entretenimento]: 'bg-pink-600 text-white dark:bg-pink-500',
  };

  return map[category] || 'bg-brand-600 text-white';
};

const CategoryBadge: React.FC<CategoryBadgeProps> = ({ category, className = '', size = 'sm' }) => {
  const colorClass = getCategoryColor(category);
  const sizeClass = size === 'sm' ? 'text-[10px] px-2 py-0.5' : 'text-xs px-3 py-1';
  
  return (
    <span className={`inline-block font-bold uppercase tracking-wider rounded-sm shadow-sm ${colorClass} ${sizeClass} ${className}`}>
      {category}
    </span>
  );
};

export default CategoryBadge;