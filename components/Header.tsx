import React, { useState } from 'react';
import { Menu, Search, X, Moon, Sun, User, Bell } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { NewsCategory } from '../types';

interface HeaderProps {
  onOpenLogin: () => void;
  setSearchQuery: (query: string) => void;
  showToast: (message: string, type: 'info') => void;
}

const Header: React.FC<HeaderProps> = ({ onOpenLogin, setSearchQuery, showToast }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [localSearch, setLocalSearch] = useState('');
  const location = useLocation();
  const navigate = useNavigate();

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setLocalSearch(query);
    setSearchQuery(query);
    if (query && location.pathname !== '/') {
        navigate('/');
    }
  };

  const handleNotification = () => {
    showToast("Você está atualizado com as últimas notícias.", 'info');
  };

  const formattedDate = new Date().toLocaleDateString('pt-BR', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });

  const dateStr = formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);

  return (
    <header className="sticky top-0 z-40 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 shadow-sm transition-colors duration-200">
      <div className="container mx-auto px-4">
        {/* Top Utility Bar (Desktop) */}
        <div className="hidden md:flex justify-between items-center py-2 text-xs text-gray-500 dark:text-gray-400 border-b border-gray-100 dark:border-gray-800">
          <div className="flex space-x-4">
            <span className="font-medium">{dateStr}</span>
            <span className="text-brand-600 font-bold bg-brand-50 dark:bg-brand-900/20 px-2 py-0.5 rounded">São Paulo, BR 22°C</span>
          </div>
          <div className="flex space-x-5 items-center font-medium">
            <Link to="/about" className="hover:text-brand-600 transition-colors">Sobre Nós</Link>
            <div className="border-l border-gray-300 h-3 mx-1"></div>
            <Link to="/contact" className="hover:text-brand-600 transition-colors">Contato</Link>
            <div className="border-l border-gray-300 h-3 mx-1"></div>
            <button onClick={toggleDarkMode} className="flex items-center space-x-1 hover:text-brand-600 transition-colors">
              {isDarkMode ? <Sun size={14} /> : <Moon size={14} />}
              <span>{isDarkMode ? 'Claro' : 'Escuro'}</span>
            </button>
          </div>
        </div>

        {/* Main Header Area */}
        <div className="flex justify-between items-center py-4">
          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Logo */}
          <Link to="/" className="text-3xl font-serif font-black tracking-tighter text-gray-900 dark:text-white flex items-center group" onClick={() => setSearchQuery('')}>
            Media<span className="text-brand-600 group-hover:text-brand-500 transition-colors">GB</span>
            <div className="w-2 h-2 bg-red-500 rounded-full ml-1 mt-3 animate-pulse"></div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex space-x-6 lg:space-x-8 text-sm font-bold uppercase tracking-wide text-gray-700 dark:text-gray-300">
            <Link to="/" onClick={() => setSearchQuery('')} className="hover:text-brand-600 transition-colors py-2 border-b-2 border-transparent hover:border-brand-600">Home</Link>
            {Object.values(NewsCategory).slice(0, 5).map((cat) => (
              <button 
                key={cat} 
                onClick={() => {
                  setSearchQuery(cat); 
                  if(location.pathname !== '/') navigate('/');
                }} 
                className="hover:text-brand-600 transition-colors py-2 border-b-2 border-transparent hover:border-brand-600 uppercase"
              >
                {cat}
              </button>
            ))}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center space-x-2">
             <div className="relative hidden sm:block group">
                <input 
                  type="text" 
                  value={localSearch}
                  onChange={handleSearchChange}
                  placeholder="Buscar notícias..." 
                  className="pl-9 pr-4 py-2 rounded-full bg-gray-100 dark:bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 text-gray-800 dark:text-gray-200 w-36 focus:w-56 transition-all border border-transparent focus:bg-white dark:focus:bg-gray-900"
                />
                <Search size={16} className="absolute left-3 top-2.5 text-gray-400 group-focus-within:text-brand-500 transition-colors" />
             </div>
             <button onClick={handleNotification} className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-300 transition-colors relative">
               <Bell size={20} />
               <span className="absolute top-1.5 right-2 w-2 h-2 bg-brand-500 rounded-full border-2 border-white dark:border-gray-900"></span>
             </button>
             <button onClick={onOpenLogin} className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-300 transition-colors">
               <User size={20} />
             </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMenuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 absolute w-full shadow-lg z-50 animate-fade-in-down">
          <div className="p-4 space-y-4">
             <div className="relative">
                <input 
                  type="text" 
                  value={localSearch}
                  onChange={handleSearchChange}
                  placeholder="Buscar..." 
                  className="w-full pl-9 pr-4 py-3 rounded-lg bg-gray-100 dark:bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 dark:text-white"
                />
                <Search size={16} className="absolute left-3 top-3.5 text-gray-400" />
             </div>
             
             <nav className="flex flex-col space-y-1">
                <Link to="/" className="px-4 py-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 font-bold text-gray-800 dark:text-gray-200" onClick={() => setIsMenuOpen(false)}>Home</Link>
                {Object.values(NewsCategory).map((cat) => (
                  <button 
                    key={cat} 
                    onClick={() => {
                        setSearchQuery(cat); 
                        setIsMenuOpen(false);
                        if(location.pathname !== '/') navigate('/');
                    }} 
                    className="text-left px-4 py-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 font-bold text-gray-800 dark:text-gray-200"
                  >
                    {cat}
                  </button>
                ))}
                <div className="border-t border-gray-100 dark:border-gray-800 my-2"></div>
                <Link to="/about" className="px-4 py-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 font-medium text-gray-600 dark:text-gray-400" onClick={() => setIsMenuOpen(false)}>
                  Sobre Nós
                </Link>
                <Link to="/contact" className="px-4 py-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 font-medium text-gray-600 dark:text-gray-400" onClick={() => setIsMenuOpen(false)}>
                  Fale Conosco
                </Link>
             </nav>
             
             <div className="flex justify-between items-center pt-2 px-2 border-t border-gray-100 dark:border-gray-800 mt-2">
               <button onClick={toggleDarkMode} className="flex items-center space-x-2 text-sm font-medium text-gray-600 dark:text-gray-400 py-2">
                 {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
                 <span>{isDarkMode ? 'Modo Claro' : 'Modo Escuro'}</span>
               </button>
               <button onClick={() => {onOpenLogin(); setIsMenuOpen(false);}} className="text-brand-600 font-bold text-sm bg-brand-50 dark:bg-brand-900/20 px-4 py-2 rounded-lg">
                 Entrar
               </button>
             </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;