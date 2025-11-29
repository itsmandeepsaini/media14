import React, { useState } from 'react';
import { TrendingUp, Mail, Check, Zap } from 'lucide-react';
import { Article } from '../types';
import { Link } from 'react-router-dom';
import CategoryBadge from './CategoryBadge';

interface SidebarProps {
  articles: Article[];
  showToast: (msg: string, type: 'success' | 'info' | 'error') => void;
}

const Sidebar: React.FC<SidebarProps> = ({ articles, showToast }) => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    setIsSubscribed(true);
    showToast("Bem-vindo à nossa comunidade!", "success");
    setEmail('');
  };

  return (
    <div className="space-y-10 sticky top-24">
      {/* Trending Section */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
        <h3 className="flex items-center text-lg font-bold text-gray-900 dark:text-white mb-6 pb-4 border-b border-gray-100 dark:border-gray-700 font-serif tracking-tight">
          <TrendingUp size={20} className="mr-2 text-brand-600" />
          Em Alta Agora
        </h3>
        <div className="space-y-7">
          {articles.slice(0, 5).map((article, index) => (
            <Link key={article.id} to={`/article/${article.id}`} className="group flex items-start">
               <span className="text-4xl font-black text-gray-100 dark:text-gray-700 mr-4 leading-none group-hover:text-brand-100 dark:group-hover:text-brand-900 transition-colors w-6 text-center -mt-1 font-serif">
                 {index + 1}
               </span>
               <div className="flex-1">
                  <div className="mb-1.5 flex items-center">
                    <CategoryBadge category={article.category} size="sm" className="scale-90 origin-left opacity-80" />
                    <span className="text-[10px] text-gray-400 ml-2 uppercase font-bold tracking-wider">
                      {article.readTime} min
                    </span>
                  </div>
                  <h4 className="font-bold text-gray-800 dark:text-gray-200 leading-snug group-hover:text-brand-600 transition-colors text-sm md:text-base">
                    {article.title}
                  </h4>
               </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Newsletter Signup - Updated Design */}
      <div className="relative bg-brand-900 text-white p-8 rounded-2xl shadow-xl overflow-hidden">
         <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-3xl transform translate-x-10 -translate-y-10"></div>
         <div className="absolute bottom-0 left-0 w-24 h-24 bg-brand-500/20 rounded-full blur-2xl transform -translate-x-5 translate-y-5"></div>
         
         {!isSubscribed ? (
           <div className="relative z-10">
             <div className="flex items-center space-x-2 mb-4 text-brand-300 text-xs font-bold uppercase tracking-widest">
                <Zap size={14} />
                <span>Newsletter Gratuita</span>
             </div>
             <h3 className="font-serif font-bold text-2xl mb-3 leading-tight">O essencial do dia, direto no seu e-mail.</h3>
             <p className="text-brand-100 text-sm mb-6 leading-relaxed opacity-90">
               Junte-se a 50.000+ leitores e comece o dia bem informado em 5 minutos.
             </p>
             <form onSubmit={handleSubscribe} className="space-y-3">
               <input 
                 type="email" 
                 value={email}
                 onChange={(e) => setEmail(e.target.value)}
                 placeholder="seu@email.com" 
                 required
                 className="w-full px-4 py-3 rounded-xl border border-transparent bg-white/10 text-white placeholder-brand-200 focus:bg-white/20 focus:ring-2 focus:ring-brand-400 focus:outline-none transition-all text-sm backdrop-blur-sm" 
               />
               <button type="submit" className="w-full bg-white text-brand-900 font-bold py-3 rounded-xl hover:bg-brand-50 transition-all shadow-lg transform hover:-translate-y-0.5 text-sm flex items-center justify-center">
                 <span>Entrar na Lista VIP</span>
                 <Mail size={16} className="ml-2" />
               </button>
             </form>
             <p className="text-[10px] text-brand-300 mt-4 text-center opacity-70">Livre de spam. Cancele quando quiser.</p>
           </div>
         ) : (
           <div className="py-10 text-center relative z-10 animate-fade-in-up">
              <div className="w-16 h-16 bg-white/10 text-brand-300 rounded-full flex items-center justify-center mx-auto mb-4 backdrop-blur-md">
                <Check size={32} />
              </div>
              <h3 className="font-bold text-xl mb-2">Quase lá!</h3>
              <p className="text-sm text-brand-100">Verifique seu e-mail para confirmar.</p>
           </div>
         )}
      </div>
    </div>
  );
};

export default Sidebar;