import React from 'react';
import { Users, Globe, Award, Shield } from 'lucide-react';

const About: React.FC = () => {
  return (
    <div className="bg-white dark:bg-gray-900 min-h-screen">
      {/* Hero Section */}
      <div className="relative bg-gray-900 py-32 px-4 overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 opacity-20 z-0">
            <img src="https://images.unsplash.com/photo-1504711434969-e33886168f5c?q=80&w=2070&auto=format&fit=crop" className="w-full h-full object-cover" alt="Background" />
        </div>
        
        {/* Animated Bubbles (Blobs) */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-1/4 w-72 h-72 bg-brand-500 rounded-full mix-blend-overlay filter blur-3xl opacity-30 animate-blob"></div>
          <div className="absolute top-0 right-1/4 w-72 h-72 bg-purple-500 rounded-full mix-blend-overlay filter blur-3xl opacity-30 animate-blob" style={{ animationDelay: '2s' }}></div>
          <div className="absolute -bottom-8 left-1/3 w-72 h-72 bg-pink-500 rounded-full mix-blend-overlay filter blur-3xl opacity-30 animate-blob" style={{ animationDelay: '4s' }}></div>
        </div>

        <div className="relative z-10 container mx-auto max-w-4xl text-center text-white">
           <span className="text-brand-400 font-bold tracking-widest uppercase text-sm mb-4 block animate-fade-in-down">Nossa Missão</span>
           <h1 className="text-4xl md:text-7xl font-serif font-black mb-8 leading-tight animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
             Redefinindo o Jornalismo para a Era Digital
           </h1>
           <p className="text-xl md:text-2xl text-gray-300 leading-relaxed max-w-3xl mx-auto animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
             No MediaGB, combinamos a integridade jornalística tradicional com tecnologia de ponta para entregar notícias que importam, com a profundidade que você merece.
           </p>
        </div>
      </div>

      {/* Stats Section */}
      <div className="container mx-auto px-4 py-16 -mt-20 relative z-20">
         <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
            {[
              { label: 'Leitores Mensais', value: '2M+', icon: Users },
              { label: 'Países Alcançados', value: '150+', icon: Globe },
              { label: 'Prêmios de Jornalismo', value: '24', icon: Award },
              { label: 'Anos de História', value: '15', icon: Shield },
            ].map((stat, i) => (
              <div 
                key={i} 
                className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl text-center border-b-4 border-brand-500 transform hover:-translate-y-2 transition-transform duration-300 animate-fade-in-up"
                style={{ animationDelay: `${0.6 + i * 0.1}s` }}
              >
                 <div className="w-14 h-14 mx-auto bg-brand-50 dark:bg-gray-700 text-brand-600 rounded-full flex items-center justify-center mb-4 shadow-inner">
                   <stat.icon size={28} />
                 </div>
                 <div className="text-3xl md:text-4xl font-black text-gray-900 dark:text-white mb-2">{stat.value}</div>
                 <div className="text-xs text-gray-500 font-bold uppercase tracking-wider">{stat.label}</div>
              </div>
            ))}
         </div>
      </div>

      {/* Content Section */}
      <div className="container mx-auto px-4 py-20 max-w-6xl">
         <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div className="animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
               <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 dark:text-white mb-6 relative inline-block">
                 Jornalismo com Propósito
                 <span className="absolute bottom-0 left-0 w-1/3 h-1.5 bg-brand-500 rounded-full"></span>
               </h2>
               <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed mb-6">
                 Fundado com a crença de que a informação livre é a base de uma sociedade democrática, o MediaGB cresceu de um pequeno blog local para uma potência de mídia global.
               </p>
               <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed mb-8">
                 Nossa equipe diversificada de repórteres, analistas e tecnólogos trabalha 24 horas por dia para trazer fatos verificados e análises aprofundadas sobre política, economia, tecnologia e cultura.
               </p>
               <div className="flex items-start space-x-4 bg-gray-50 dark:bg-gray-800/50 p-6 rounded-xl border border-gray-100 dark:border-gray-700">
                  <div className="w-1 h-full min-h-[40px] bg-brand-500 rounded-full"></div>
                  <p className="italic text-gray-600 dark:text-gray-400 font-medium text-lg">
                    "A verdade não tem lado. Nós buscamos os fatos onde quer que eles levem."
                    <span className="block mt-2 font-bold text-brand-600 not-italic text-sm uppercase tracking-wider">— Editor Chefe</span>
                  </p>
               </div>
            </div>
            <div className="relative rounded-2xl overflow-hidden shadow-2xl group animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
               <div className="absolute inset-0 bg-brand-900/20 group-hover:bg-transparent transition-colors duration-500 z-10"></div>
               <img src="https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070&auto=format&fit=crop" alt="Office Team" className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700" />
            </div>
         </div>
      </div>

      {/* Values Section */}
      <div className="bg-gray-50 dark:bg-gray-800 py-24 relative overflow-hidden">
        {/* Subtle background blobs for this section too */}
        <div className="absolute top-10 right-10 w-64 h-64 bg-brand-200 dark:bg-brand-900/20 rounded-full filter blur-3xl opacity-30 animate-blob"></div>
        <div className="absolute bottom-10 left-10 w-64 h-64 bg-indigo-200 dark:bg-indigo-900/20 rounded-full filter blur-3xl opacity-30 animate-blob" style={{ animationDelay: '3s' }}></div>

        <div className="container mx-auto px-4 max-w-6xl relative z-10">
           <div className="text-center mb-16 animate-fade-in-up">
              <span className="text-brand-600 font-bold tracking-widest uppercase text-xs mb-2 block">Nossos Princípios</span>
              <h2 className="text-3xl md:text-5xl font-serif font-bold text-gray-900 dark:text-white">O Que Nos Move</h2>
           </div>
           
           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { title: 'Verdade Inegociável', desc: 'Verificamos cada fato. Se não pudermos confirmar, não publicamos.' },
                { title: 'Independência', desc: 'Somos financiados pelos leitores, não por interesses corporativos ou políticos.' },
                { title: 'Inovação', desc: 'Usamos IA e dados para aprofundar histórias, não para substituí-las.' }
              ].map((val, i) => (
                <div 
                  key={i} 
                  className="bg-white dark:bg-gray-700 p-8 rounded-xl shadow-sm border border-gray-100 dark:border-gray-600 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 animate-fade-in-up"
                  style={{ animationDelay: `${0.2 * i}s` }}
                >
                   <div className="w-12 h-12 bg-brand-100 dark:bg-brand-900/50 text-brand-700 dark:text-brand-300 rounded-2xl flex items-center justify-center mb-6 font-black text-xl shadow-sm transform rotate-3 group-hover:rotate-0 transition-transform">
                      {i + 1}
                   </div>
                   <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{val.title}</h3>
                   <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{val.desc}</p>
                </div>
              ))}
           </div>
        </div>
      </div>
    </div>
  );
};

export default About;