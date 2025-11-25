import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Category } from '../types';

interface HeroProps {
  setCategory: (cat: Category) => void;
}

const Hero: React.FC<HeroProps> = ({ setCategory }) => {
  return (
    <div className="relative h-[85vh] w-full overflow-hidden">
      {/* Dynamic Background based on mood (Static for now but premium) */}
      <div className="absolute inset-0">
        <img
          className="w-full h-full object-cover scale-105 animate-pulse-slow opacity-60"
          src="https://images.unsplash.com/photo-1552674605-46d538e12c71?auto=format&fit=crop&q=80&w=2000"
          alt="Nike Runner"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
      </div>

      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-center pt-20">
        <div className="max-w-3xl animate-slide-up">
          <div className="flex items-center gap-4 mb-6">
             <span className="bg-green-500 text-black px-3 py-1 text-xs font-black uppercase tracking-widest">Nueva Temporada YJMG</span>
             <span className="text-gray-300 font-mono text-xs tracking-widest">// COLECCIÓN DE VERANO 2025</span>
          </div>
          
          <h1 className="text-6xl md:text-8xl font-black tracking-tighter text-white uppercase italic leading-[0.9] mb-6">
            Beyond <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-600">Limits</span>
          </h1>
          <p className="mt-4 text-lg text-gray-300 max-w-xl font-light leading-relaxed border-l-2 border-green-500 pl-6">
            Descubre la ingeniería textil diseñada para el atleta moderno. 
            Transpirabilidad extrema, compresión inteligente y estilo implacable.
          </p>
          
          <div className="mt-10 flex flex-wrap gap-4">
            <button
              onClick={() => setCategory('men')}
              className="group relative inline-flex items-center px-8 py-4 text-base font-bold text-black bg-white rounded-none hover:bg-gray-200 transition-all"
            >
              <span className="relative z-10 flex items-center gap-2 uppercase tracking-wider">
                Comprar Hombre <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform"/>
              </span>
            </button>
            <button 
              onClick={() => setCategory('women')}
              className="px-8 py-4 rounded-none border border-white text-white font-bold hover:bg-white hover:text-black uppercase tracking-wider transition-all"
            >
              Comprar Mujer
            </button>
          </div>
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50 animate-bounce">
        <span className="text-[10px] uppercase tracking-widest">Scroll</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-white to-transparent"></div>
      </div>
    </div>
  );
};

export default Hero;