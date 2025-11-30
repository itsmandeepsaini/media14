import React, { useState, useEffect, Suspense } from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import NewsTicker from './components/NewsTicker';
import HeroSection from './components/HeroSection';
import ArticleCard from './components/ArticleCard';
import Sidebar from './components/Sidebar';
import Toast from './components/Toast';
import Modal from './components/Modal';
import { getFeaturedArticles, getLatestArticles, getAllArticles, searchArticles } from './services/newsService';
import { Article } from './types';

// Lazy Load Heavy Components
const ArticleView = React.lazy(() => import('./components/ArticleView'));
const Contact = React.lazy(() => import('./components/Contact'));
const About = React.lazy(() => import('./components/About'));

// Scroll to top on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

// Elegant Loading Spinner Component
const PageLoader = () => (
  <div className="min-h-[70vh] flex flex-col items-center justify-center bg-gray-50 dark:bg-[#050505] transition-colors">
    <div className="relative w-12 h-12 mb-6">
      <div className="absolute inset-0 rounded-full border-[3px] border-gray-200 dark:border-gray-800"></div>
      <div className="absolute inset-0 rounded-full border-[3px] border-brand-600 border-t-transparent animate-spin"></div>
    </div>
    <span className="text-gray-400 text-xs font-bold uppercase tracking-widest animate-pulse">Carregando Conteúdo</span>
  </div>
);

// Home Page Component
const Home: React.FC<{ 
  searchQuery: string, 
  showToast: (m: string, t: any) => void 
}> = ({ searchQuery, showToast }) => {
  const [displayedArticles, setDisplayedArticles] = useState<Article[]>([]);
  const [featuredArticles, setFeaturedArticles] = useState<Article[]>([]);
  const allArticles = getAllArticles();

  useEffect(() => {
    if (searchQuery) {
      const results = searchArticles(searchQuery);
      setDisplayedArticles(results);
      setFeaturedArticles([]); // Hide hero on search
    } else {
      setFeaturedArticles(getFeaturedArticles());
      setDisplayedArticles(getLatestArticles());
    }
  }, [searchQuery]);

  return (
    <main className="animate-fade-in-up">
      {!searchQuery && <NewsTicker />}
      {!searchQuery && <HeroSection articles={featuredArticles} />}
      
      {searchQuery && (
        <div className="container mx-auto px-4 py-12">
           <div className="flex items-center mb-8">
             <div className="w-1 h-8 bg-brand-600 rounded-full mr-4"></div>
             <h2 className="text-3xl font-serif font-bold text-gray-900 dark:text-white">
               Resultados para <span className="text-brand-600 italic">"{searchQuery}"</span>
             </h2>
           </div>
           {displayedArticles.length === 0 && (
             <div className="text-center py-20 bg-gray-100 dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
               <p className="text-gray-500 font-medium">Nenhum artigo encontrado com este termo.</p>
               <button onClick={() => window.location.reload()} className="mt-4 text-brand-600 font-bold hover:underline">Limpar busca</button>
             </div>
           )}
        </div>
      )}

      <div className="container mx-auto px-4 py-8 md:py-16">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-16">
          {/* Main Content Column */}
          <div className="lg:w-2/3">
             {!searchQuery && (
                <div className="flex items-end justify-between mb-10 pb-4 border-b border-gray-200 dark:border-gray-800">
                    <h2 className="text-2xl md:text-3xl font-serif font-black text-gray-900 dark:text-white flex items-center tracking-tight">
                        <span className="bg-gradient-to-tr from-brand-600 to-indigo-600 w-2 h-8 mr-3 rounded-sm"></span>
                        Últimas Notícias
                    </h2>
                    <button className="text-xs font-bold text-brand-600 hover:text-brand-800 dark:hover:text-brand-400 hover:underline tracking-widest uppercase transition-colors">
                      Ver Arquivo
                    </button>
                </div>
             )}
             
             <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-14">
               {displayedArticles.map(article => (
                 <ArticleCard key={article.id} article={article} />
               ))}
             </div>

             {!searchQuery && displayedArticles.length > 0 && (
                 <div className="mt-20 text-center">
                    <button className="group relative px-10 py-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-full font-bold text-gray-700 dark:text-gray-200 hover:border-brand-300 dark:hover:border-brand-700 transition-all shadow-sm hover:shadow-lg overflow-hidden">
                      <span className="relative z-10 group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">Carregar Mais Histórias</span>
                      <div className="absolute inset-0 bg-brand-50 dark:bg-brand-900/20 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></div>
                    </button>
                 </div>
             )}
          </div>

          {/* Sidebar Column */}
          <aside className="lg:w-1/3 space-y-8">
             <Sidebar articles={allArticles} showToast={showToast} />
          </aside>
        </div>
      </div>
    </main>
  );
};

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  
  // UI State
  const [toast, setToast] = useState<{message: string, type: 'success' | 'info' | 'error'} | null>(null);
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  const showToast = (message: string, type: 'success' | 'info' | 'error' = 'info') => {
    setToast({ message, type });
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoginOpen(false);
    showToast("Bem-vindo de volta! Login realizado.", "success");
  };

  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen flex flex-col bg-white dark:bg-[#050505] font-sans transition-colors duration-300">
        <Header 
          onOpenLogin={() => setIsLoginOpen(true)}
          setSearchQuery={setSearchQuery}
          showToast={showToast}
        />
        
        <div className="flex-grow">
          <Suspense fallback={<PageLoader />}>
            <Routes>
              <Route path="/" element={<Home searchQuery={searchQuery} showToast={showToast} />} />
              <Route path="/article/:id" element={<ArticleView showToast={showToast} />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/about" element={<About />} />
            </Routes>
          </Suspense>
        </div>
        
        <Footer onSearch={setSearchQuery} />

        {/* Global UI Overlay Components */}
        {toast && (
          <Toast 
            message={toast.message} 
            type={toast.type} 
            onClose={() => setToast(null)} 
          />
        )}

        <Modal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} title="Acesse sua Conta">
          <form onSubmit={handleLoginSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-bold mb-1.5 text-gray-700 dark:text-gray-300">E-mail</label>
              <input type="email" className="w-full px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-brand-500 focus:border-transparent outline-none transition-all" placeholder="seu@email.com" required />
            </div>
            <div>
              <label className="block text-sm font-bold mb-1.5 text-gray-700 dark:text-gray-300">Senha</label>
              <input type="password" className="w-full px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-brand-500 focus:border-transparent outline-none transition-all" placeholder="••••••••" required />
            </div>
            <button type="submit" className="w-full bg-brand-600 text-white font-bold py-3.5 rounded-xl hover:bg-brand-700 transition-colors shadow-lg shadow-brand-500/30 transform active:scale-95 duration-200">
              Entrar
            </button>
            <div className="text-center text-sm text-gray-500 pt-2">
              <a href="#" className="hover:text-brand-600 font-medium transition-colors">Esqueceu a senha?</a>
            </div>
          </form>
        </Modal>

      </div>
    </Router>
  );
}

export default App;