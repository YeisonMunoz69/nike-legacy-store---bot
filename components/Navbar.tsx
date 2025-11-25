import React from 'react';
import { ShoppingBag, Menu, Search, User } from 'lucide-react';
import { Category } from '../types';

interface NavbarProps {
  cartCount: number;
  onOpenCart: () => void;
  currentCategory: Category;
  setCategory: (cat: Category) => void;
}

const Navbar: React.FC<NavbarProps> = ({ cartCount, onOpenCart, currentCategory, setCategory }) => {
  
  const isActive = (cat: Category) => 
    currentCategory === cat ? "text-white bg-white/10" : "text-gray-400 hover:text-white";

  return (
    <nav className="fixed top-0 w-full z-40 bg-black/80 backdrop-blur-xl border-b border-white/5 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo */}
          <div 
            className="flex-shrink-0 flex items-center gap-2 cursor-pointer group"
            onClick={() => setCategory('all')}
          >
            <svg className="w-8 h-8 text-white group-hover:scale-110 transition-transform duration-300" viewBox="0 0 24 24" fill="currentColor">
               <path d="M21 8.25c-1.31-1.25-3.32-2.12-5.75-2.12-5.5 0-9.25 4-9.25 4s3.25 1.5 6.5 2c2.5.38 5.75.25 8.5-3.88z"/>
            </svg>
            <span className="text-2xl font-black tracking-tighter italic text-white group-hover:text-gray-300 transition-colors">
              NIKE<span className="text-gray-500">LEGACY</span>
            </span>
          </div>
          
          {/* Center Categories */}
          <div className="hidden md:block">
            <div className="flex items-baseline space-x-2">
              <button onClick={() => setCategory('new')} className={`px-4 py-2 rounded-full text-sm font-bold uppercase tracking-wide transition-all ${isActive('new')}`}>
                Novedades
              </button>
              <button onClick={() => setCategory('men')} className={`px-4 py-2 rounded-full text-sm font-bold uppercase tracking-wide transition-all ${isActive('men')}`}>
                Hombre
              </button>
              <button onClick={() => setCategory('women')} className={`px-4 py-2 rounded-full text-sm font-bold uppercase tracking-wide transition-all ${isActive('women')}`}>
                Mujer
              </button>
              <button onClick={() => setCategory('sale')} className={`px-4 py-2 rounded-full text-sm font-bold uppercase tracking-wide transition-all ${isActive('sale')}`}>
                Ofertas
              </button>
            </div>
          </div>

          {/* Icons */}
          <div className="flex items-center gap-6">
            <div className="relative hidden sm:block">
               <input 
                 type="text" 
                 placeholder="Buscar..." 
                 className="bg-white/5 border border-white/10 rounded-full py-2 pl-10 pr-4 text-sm text-white focus:outline-none focus:bg-white/10 w-32 focus:w-48 transition-all"
               />
               <Search className="h-4 w-4 text-gray-500 absolute left-3 top-2.5" />
            </div>

            <button onClick={onOpenCart} className="text-white hover:text-gray-300 transition-colors relative group">
              <ShoppingBag className="h-6 w-6" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-green-500 text-[10px] font-bold text-black ring-2 ring-black">
                  {cartCount}
                </span>
              )}
            </button>
            
            <div className="-mr-2 flex md:hidden">
              <button className="text-gray-300 hover:text-white p-2">
                <Menu className="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;