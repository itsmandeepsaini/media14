import React, { useState, useEffect, Suspense } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
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

// Loading Spinner Component
const PageLoader = () => (
  <div className="min-h-[60vh] flex flex-col items-center justify-center">
    <div className="w-10 h-10 border-4 border-brand-200 border-t-brand-600 rounded-full animate-spin mb-4"></div>
    <span className="text-gray-400 text-sm font-medium">Carregando conteúdo...</span>
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
    <main>
      {!searchQuery && <NewsTicker />}
      {!searchQuery && <HeroSection articles={featuredArticles} />}
      
      {searchQuery && (
        <div className="container mx-auto px-4 py-8">
           <h2 className="text-2xl font-bold mb-4">Resultados para: <span className="text-brand-600">"{searchQuery}"</span></h2>
           {displayedArticles.length === 0 && <p className="text-gray-500">Nenhum artigo encontrado.</p>}
        </div>
      )}

      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
          {/* Main Content Column */}
          <div className="lg:w-2/3">
             {!searchQuery && (
                <div className="flex items-center justify-between mb-8 pb-4 border-b border-gray-100 dark:border-gray-800">
                    <h2 className="text-2xl font-serif font-bold text-gray-900 dark:text-white flex items-center">
                        <span className="bg-brand-600 w-1.5 h-6 mr-3 rounded-full"></span>
                        Últimas Notícias
                    </h2>
                    <button className="text-sm font-bold text-brand-600 hover:text-brand-700 hover:underline tracking-wide">VER TUDO</button>
                </div>
             )}
             
             <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-12">
               {displayedArticles.map(article => (
                 <ArticleCard key={article.id} article={article} />
               ))}
             </div>

             {!searchQuery && displayedArticles.length > 0 && (
                 <div className="mt-16 text-center">
                    <button className="px-10 py-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-full font-bold text-gray-700 dark:text-gray-200 hover:bg-brand-50 dark:hover:bg-gray-700 hover:text-brand-600 hover:border-brand-200 transition-all shadow-sm hover:shadow-md">
                      Carregar Mais Artigos
                    </button>
                 </div>
             )}
          </div>

          {/* Sidebar Column */}
          <aside className="lg:w-1/3">
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
      <div className="min-h-screen flex flex-col bg-white dark:bg-gray-900 font-sans transition-colors duration-200">
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
              <input type="email" className="w-full px-4 py-3 border rounded-xl dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:ring-2 focus:ring-brand-500 outline-none transition-shadow" placeholder="seu@email.com" required />
            </div>
            <div>
              <label className="block text-sm font-bold mb-1.5 text-gray-700 dark:text-gray-300">Senha</label>
              <input type="password" className="w-full px-4 py-3 border rounded-xl dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:ring-2 focus:ring-brand-500 outline-none transition-shadow" placeholder="••••••••" required />
            </div>
            <button type="submit" className="w-full bg-brand-600 text-white font-bold py-3.5 rounded-xl hover:bg-brand-700 transition-colors shadow-lg shadow-brand-500/30">
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