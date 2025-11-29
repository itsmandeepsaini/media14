import React from 'react';

const NewsTicker: React.FC = () => {
  return (
    <div className="bg-brand-900 text-white text-xs py-2 overflow-hidden relative whitespace-nowrap z-50">
      <div className="absolute left-0 top-0 bottom-0 bg-brand-700 px-3 z-10 flex items-center font-bold uppercase tracking-wider shadow-md">
        Plantão
      </div>
      <div className="inline-block animate-marquee pl-32">
        <span className="mx-4">Mercados atingem recorde histórico com queda da inflação.</span>
        <span className="mx-4 text-brand-400">•</span>
        <span className="mx-4">Novo pacto climático assinado pelos líderes do G7.</span>
        <span className="mx-4 text-brand-400">•</span>
        <span className="mx-4">Setor de tecnologia cresce com novos avanços em IA.</span>
        <span className="mx-4 text-brand-400">•</span>
        <span className="mx-4">Esportes: City Rovers vencem campeonato em virada histórica.</span>
        <span className="mx-4 text-brand-400">•</span>
        <span className="mx-4">Cúpula global de saúde termina em Genebra.</span>
      </div>
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(100%); }
          100% { transform: translateX(-100%); }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default NewsTicker;