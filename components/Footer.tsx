import React, { useState } from 'react';
import { Facebook, Youtube, Twitter, ArrowRight, Mic, PenTool, Search, Mail, Phone, Globe, ChevronRight } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { getLatestArticles } from '../services/newsService';

interface FooterProps {
  onSearch?: (query: string) => void;
}

const Footer: React.FC<FooterProps> = ({ onSearch }) => {
  const navigate = useNavigate();
  const recentArticles = getLatestArticles().slice(0, 3);
  const [localSearch, setLocalSearch] = useState('');
  const [email, setEmail] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (localSearch.trim()) {
      if (onSearch) {
        onSearch(localSearch);
      }
      navigate('/');
      window.scrollTo(0, 0);
      setLocalSearch('');
    }
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      alert(`Obrigado! ${email} foi inscrito na nossa newsletter.`);
      setEmail('');
    }
  };

  return (
    <footer className="bg-[#0a0a0a] text-gray-400 font-sans border-t-[6px] border-red-700 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-700 via-red-500 to-red-700 opacity-50"></div>
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-red-900/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="container mx-auto px-6 pt-16 pb-10 relative z-10">
        
        {/* --- PARTNERS HEADLINE SECTION --- */}
        <div className="flex flex-col xl:flex-row items-center justify-between border-b border-gray-800/80 pb-12 mb-16 gap-10 xl:gap-0">
          
          {/* Organization Logos - Styled for better visibility */}
          <div className="flex flex-wrap justify-center items-center gap-8 grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all duration-500">
             {/* SINJOTECS */}
             <div className="flex flex-col items-center group cursor-default">
                <span className="font-serif italic font-black text-3xl tracking-tighter text-gray-200 group-hover:text-white transition-colors">
                  SJT
                </span>
                <span className="text-[0.6rem] font-bold uppercase tracking-[0.2em] text-gray-600 mt-1">Sinjotecs</span>
             </div>

             <div className="h-8 w-px bg-gray-800 hidden md:block"></div>

             {/* AMPROCS */}
             <div className="flex items-center gap-2 group cursor-default">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-violet-900/30 text-violet-400 border border-violet-900/50">
                  <Mic size={18} />
                </div>
                <span className="font-bold text-sm tracking-wider hidden sm:block">AMPROCS</span>
             </div>

             <div className="h-8 w-px bg-gray-800 hidden md:block"></div>

             {/* MAWA */}
             <div className="font-black text-xl tracking-tight text-blue-600/80 hover:text-blue-500 transition-colors cursor-default">
               MAWA
             </div>

             <div className="h-8 w-px bg-gray-800 hidden md:block"></div>

             {/* OJGB */}
             <div className="relative group cursor-default">
                <div className="flex items-center space-x-1">
                   <div className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center">
                     <PenTool size={14} className="text-gray-400" />
                   </div>
                   <span className="font-black text-lg text-gray-500 group-hover:text-gray-300 transition-colors">OJGB</span>
                </div>
             </div>
          </div>

          {/* Main Title - BIG AND BOLD GREEN */}
          <div className="text-center flex-1 mx-4 order-first xl:order-none mb-8 xl:mb-0">
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-black text-[#22c55e] tracking-tighter uppercase leading-none transform hover:scale-105 transition-transform duration-300"
                style={{ textShadow: '0 4px 20px rgba(34, 197, 94, 0.2)' }}>
              ATORES DE MEDIA, GB
            </h2>
          </div>

          {/* Flags - Clean CSS implementation */}
          <div className="flex items-center gap-6">
             {/* Guinea-Bissau Flag */}
             <div className="flex flex-col items-center group">
               <div className="w-16 h-11 bg-white relative shadow-md overflow-hidden flex ring-1 ring-gray-700/50 group-hover:ring-green-500/50 transition-all">
                  <div className="w-1/3 h-full bg-[#ce1126] flex items-center justify-center relative">
                    <span className="text-black text-xl leading-none absolute" style={{top: '50%', left: '50%', transform: 'translate(-50%, -55%)'}}>★</span>
                  </div>
                  <div className="w-2/3 h-full flex flex-col">
                    <div className="h-1/2 bg-[#fcd116]"></div>
                    <div className="h-1/2 bg-[#009e49]"></div>
                  </div>
               </div>
               <span className="text-[0.6rem] font-bold text-gray-500 mt-2 tracking-widest uppercase">Guiné-Bissau</span>
             </div>

             {/* EU Flag */}
             <div className="flex flex-col items-center group">
               <div className="w-16 h-11 bg-[#003399] relative shadow-md flex items-center justify-center overflow-hidden ring-1 ring-gray-700/50 group-hover:ring-blue-500/50 transition-all">
                  <div className="grid grid-cols-4 gap-0.5 transform scale-75 rotate-12 opacity-80">
                     {[...Array(12)].map((_, i) => (
                       <span key={i} className="text-[#ffcc00] text-[5px] leading-none">★</span>
                     ))}
                  </div>
               </div>
               <span className="text-[0.6rem] font-bold text-gray-500 mt-2 tracking-widest uppercase text-center">Funded by EU</span>
             </div>
          </div>
        </div>


        {/* --- MAIN FOOTER CONTENT --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8">
          
          {/* Column 1: CONTATOS (4 cols) */}
          <div className="lg:col-span-4 space-y-8">
            <h3 className="text-white font-black text-lg uppercase tracking-wider flex items-center">
              <span className="w-1.5 h-6 bg-red-600 mr-3 rounded-sm"></span>
              Contatos Oficiais
            </h3>
            
            <div className="grid grid-cols-1 gap-4">
              {[
                { name: 'SINJOTECS', email: 'diamantino2018campus@gmail.com', tel: '+245-955 368 607', color: 'hover:border-red-900/50' },
                { name: 'AMPROCS', email: 'valeryimbenque@gmail.com', tel: '+245-955 364 450', color: 'hover:border-violet-900/50' },
                { name: 'RENARC', email: 'sanhademba@gmail.com', tel: '+245-955 300 049', color: 'hover:border-yellow-900/50' },
                { name: 'OJGB', email: 'angloria.nhaga@gmail.com', tel: '+245-955 751 689', color: 'hover:border-blue-900/50' }
              ].map((contact) => (
                <div key={contact.name} className={`bg-[#111] p-4 rounded-lg border border-gray-800 transition-all duration-300 group ${contact.color}`}>
                   <div className="flex justify-between items-start mb-2">
                      <strong className="text-white font-bold text-sm bg-gray-800 px-2 py-0.5 rounded text-[10px] uppercase tracking-wider group-hover:bg-gray-700 transition-colors">{contact.name}</strong>
                   </div>
                   <div className="space-y-1.5">
                      <div className="flex items-center text-xs text-gray-400 group-hover:text-gray-300">
                        <Mail size={12} className="mr-2 text-gray-600 group-hover:text-red-500 transition-colors" />
                        {contact.email}
                      </div>
                      <div className="flex items-center text-xs text-gray-400 group-hover:text-gray-300">
                        <Phone size={12} className="mr-2 text-gray-600 group-hover:text-green-500 transition-colors" />
                        {contact.tel}
                      </div>
                   </div>
                </div>
              ))}
            </div>

            <div className="flex gap-4 pt-2">
              {[
                  { Icon: Facebook, color: 'hover:bg-[#1877F2]' },
                  { Icon: Twitter, color: 'hover:bg-[#1DA1F2]' },
                  { Icon: Youtube, color: 'hover:bg-[#FF0000]' }
              ].map(({Icon, color}, i) => (
                  <a key={i} href="#" className={`w-10 h-10 bg-gray-900 rounded-full flex items-center justify-center text-gray-500 hover:text-white transition-all duration-300 transform hover:-translate-y-1 ${color}`}>
                      <Icon size={18} />
                  </a>
              ))}
            </div>
          </div>

          {/* Column 2: LINKS RÁPIDOS (2 cols) */}
          <div className="lg:col-span-2 space-y-8">
            <h3 className="text-white font-black text-lg uppercase tracking-wider flex items-center">
              <span className="w-1.5 h-6 bg-red-600 mr-3 rounded-sm"></span>
              Links
            </h3>
            <ul className="space-y-1">
              {['Sobre Nos', 'Publicações', 'O Que Fazemos', 'Parceiros', 'Contatos'].map((item) => (
                <li key={item}>
                  <Link to="/" className="group flex items-center py-2.5 px-3 rounded-lg hover:bg-gray-900 text-sm font-medium transition-colors">
                    <ChevronRight size={14} className="mr-2 text-gray-600 group-hover:text-red-500 transition-colors" />
                    <span className="group-hover:translate-x-1 transition-transform">{item}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: DEVE LER (3 cols) */}
          <div className="lg:col-span-3 space-y-8">
            <h3 className="text-white font-black text-lg uppercase tracking-wider flex items-center">
              <span className="w-1.5 h-6 bg-red-600 mr-3 rounded-sm"></span>
              Deve Ler
            </h3>
            <div className="space-y-5">
              {recentArticles.map(article => (
                <Link key={article.id} to={`/article/${article.id}`} className="flex group bg-[#111] hover:bg-gray-900 border border-transparent hover:border-gray-800 transition-all rounded-lg overflow-hidden pr-2">
                   <div className="w-20 h-20 flex-shrink-0 overflow-hidden">
                      <img src={article.imageUrl} alt="" className="w-full h-full object-cover grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500" />
                   </div>
                   <div className="p-3 flex flex-col justify-center">
                      <h4 className="font-bold text-gray-300 text-sm leading-tight mb-1.5 group-hover:text-red-500 transition-colors line-clamp-2">
                          {article.title}
                      </h4>
                      <div className="text-[10px] font-bold uppercase tracking-wider text-gray-600 flex items-center">
                          <span className="w-1.5 h-1.5 rounded-full bg-red-600/50 mr-2 group-hover:bg-red-600 transition-colors"></span>
                          {new Date(article.publishedAt).toLocaleDateString('pt-BR', { month: 'short', day: 'numeric' })}
                      </div>
                   </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Column 4: NEWSLETTER (3 cols) */}
          <div className="lg:col-span-3 space-y-8">
            <h3 className="text-white font-black text-lg uppercase tracking-wider flex items-center">
              <span className="w-1.5 h-6 bg-red-600 mr-3 rounded-sm"></span>
              Newsletter
            </h3>
            
            <div className="bg-gradient-to-br from-gray-900 to-[#111] p-6 rounded-xl border border-gray-800 shadow-xl">
              <p className="text-xs text-gray-400 mb-4 leading-relaxed">
                Receba análises exclusivas e resumos semanais diretamente na sua caixa de entrada.
              </p>
              
              <form onSubmit={handleSubscribe} className="space-y-3">
                <div className="relative">
                    <Mail size={16} className="absolute left-3 top-3.5 text-gray-500" />
                    <input 
                        type="email" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Seu e-mail profissional" 
                        className="w-full bg-black/50 text-white pl-10 pr-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-red-600 focus:border-red-600 rounded-lg border border-gray-700 transition-all placeholder-gray-600"
                        required
                    />
                </div>
                <button type="submit" className="w-full bg-red-700 text-white font-bold uppercase text-xs tracking-widest py-3 rounded-lg hover:bg-red-600 transition-all shadow-lg shadow-red-900/20 flex items-center justify-center group">
                    Inscrever-se <ArrowRight size={14} className="ml-2 group-hover:translate-x-1 transition-transform" />
                </button>
              </form>
            </div>

            <div className="pt-2">
                <form onSubmit={handleSearch} className="relative group">
                   <input 
                     type="text" 
                     value={localSearch}
                     onChange={(e) => setLocalSearch(e.target.value)}
                     className="w-full bg-[#111] text-gray-300 pl-4 pr-12 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-gray-600 rounded-lg border border-gray-800 group-hover:border-gray-700 transition-all placeholder-gray-600"
                     placeholder="Buscar no site..."
                   />
                   <button type="submit" className="absolute right-2 top-2 p-1.5 bg-gray-800 text-gray-500 rounded hover:text-white hover:bg-gray-700 transition-colors">
                     <Search size={16} />
                   </button>
                </form>
            </div>
          </div>

        </div>

        {/* Footer Bottom */}
        <div className="border-t border-gray-800 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500">
          <p className="flex items-center mb-4 md:mb-0">
             &copy; {new Date().getFullYear()} <span className="text-gray-300 font-bold mx-1">MediaGB</span>. Todos os direitos reservados.
          </p>
          <div className="flex flex-wrap justify-center space-x-6">
             <a href="#" className="hover:text-white transition-colors">Termos de Uso</a>
             <span className="text-gray-800">|</span>
             <a href="#" className="hover:text-white transition-colors">Política de Privacidade</a>
             <span className="text-gray-800">|</span>
             <a href="#" className="hover:text-white transition-colors">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;