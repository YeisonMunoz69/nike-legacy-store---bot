import React, { useState } from 'react';
import { X, ShoppingBag, Star, Share2, Heart } from 'lucide-react';
import { Product } from '../types';

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product) => void;
}

const ProductModal: React.FC<ProductModalProps> = ({ product, onClose, onAddToCart }) => {
  const [selectedSize, setSelectedSize] = useState('M');
  const [isClosing, setIsClosing] = useState(false);

  if (!product) return null;

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsClosing(false);
      onClose();
    }, 300);
  };

  const handleAddToCart = () => {
    onAddToCart(product);
    handleClose();
  };

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 ${isClosing ? 'animate-fadeOut' : 'animate-fadeIn'}`}>
      
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-md transition-opacity"
        onClick={handleClose}
      />

      {/* Modal Content */}
      <div className={`relative w-full max-w-5xl bg-[#111] rounded-2xl shadow-2xl overflow-hidden border border-white/10 flex flex-col md:flex-row ${isClosing ? 'animate-scaleOut' : 'animate-scaleIn'}`}>
        
        {/* Close Button Mobile */}
        <button 
          onClick={handleClose}
          className="absolute top-4 right-4 z-20 bg-black/50 p-2 rounded-full text-white md:hidden"
        >
          <X size={24} />
        </button>

        {/* Image Section */}
        <div className="w-full md:w-1/2 bg-[#1a1a1a] relative group h-[400px] md:h-auto">
           <img 
             src={product.image} 
             alt={product.name} 
             className="w-full h-full object-cover object-center"
           />
           <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/80 to-transparent p-6">
              <div className="flex gap-2 mb-2">
                {product.isNew && <span className="bg-white text-black text-xs font-black uppercase px-2 py-1">Nuevo</span>}
                {product.onSale && <span className="bg-red-600 text-white text-xs font-black uppercase px-2 py-1">Oferta</span>}
              </div>
           </div>
        </div>

        {/* Details Section */}
        <div className="w-full md:w-1/2 p-6 md:p-10 flex flex-col justify-between bg-[#111]">
          <div>
             <div className="flex justify-between items-start mb-2">
                <h2 className="text-3xl md:text-4xl font-black italic text-white uppercase tracking-tighter leading-none">
                  {product.name}
                </h2>
                <button onClick={handleClose} className="text-gray-400 hover:text-white hidden md:block">
                  <X size={28} />
                </button>
             </div>
             
             <div className="flex items-center gap-4 mb-6">
               <span className="text-2xl font-mono text-green-400">${product.price.toLocaleString()}</span>
               <div className="flex text-yellow-500">
                 <Star size={16} fill="currentColor" />
                 <Star size={16} fill="currentColor" />
                 <Star size={16} fill="currentColor" />
                 <Star size={16} fill="currentColor" />
                 <Star size={16} fill="currentColor" className="opacity-50" />
                 <span className="text-xs text-gray-500 ml-2 font-sans">(4.8)</span>
               </div>
             </div>

             <p className="text-gray-300 leading-relaxed mb-8 border-l-2 border-white/20 pl-4">
               {product.description} <br/>
               Diseñado para {product.gender === 'men' ? 'hombres' : product.gender === 'women' ? 'mujeres' : 'todos'} que buscan rendimiento sin comprometer el estilo. Tecnología Dri-FIT integrada para máxima transpirabilidad.
             </p>

             {/* Size Selector (Visual Only) */}
             <div className="mb-8">
               <h3 className="text-xs font-bold uppercase text-gray-500 mb-3 tracking-widest">Seleccionar Talla</h3>
               <div className="flex gap-3">
                 {['XS', 'S', 'M', 'L', 'XL'].map((size) => (
                   <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`w-12 h-12 flex items-center justify-center border ${selectedSize === size ? 'bg-white text-black border-white' : 'border-white/20 text-gray-400 hover:border-white'} transition-all font-bold`}
                   >
                     {size}
                   </button>
                 ))}
               </div>
             </div>
          </div>

          {/* Actions */}
          <div className="flex gap-4 flex-col sm:flex-row">
            <button 
              onClick={handleAddToCart}
              className="flex-1 bg-white text-black font-black uppercase py-4 hover:bg-gray-200 transition-all flex items-center justify-center gap-2 group"
            >
              <ShoppingBag className="group-hover:scale-110 transition-transform" /> Agregar al Carrito
            </button>
            <div className="flex gap-2">
               <button className="p-4 border border-white/20 text-white hover:bg-white/10 transition-all" title="Guardar en favoritos">
                 <Heart size={20} />
               </button>
               <button className="p-4 border border-white/20 text-white hover:bg-white/10 transition-all" title="Compartir">
                 <Share2 size={20} />
               </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ProductModal;