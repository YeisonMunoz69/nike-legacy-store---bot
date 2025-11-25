import React, { useMemo } from 'react';
import { PRODUCTS } from '../constants';
import { Plus, Zap, Tag } from 'lucide-react';
import { Category, Product } from '../types';

interface ProductGridProps {
  category: Category;
  onAddToCart: (product: Product) => void;
  onProductClick: (product: Product) => void;
}

const ProductGrid: React.FC<ProductGridProps> = ({ category, onAddToCart, onProductClick }) => {
  
  // Filter Logic
  const filteredProducts = useMemo(() => {
    if (category === 'all') return PRODUCTS;
    if (category === 'new') return PRODUCTS.filter(p => p.isNew);
    if (category === 'sale') return PRODUCTS.filter(p => p.onSale);
    return PRODUCTS.filter(p => p.gender === category || p.gender === 'unisex');
  }, [category]);

  // Title mapping
  const titles: Record<Category, string> = {
    all: "Inventario Completo",
    men: "Colección Hombre",
    women: "Colección Mujer",
    new: "Nuevos Lanzamientos",
    sale: "Ofertas Exclusivas"
  };

  return (
    <div id="products" className="bg-nike-black py-24 relative min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-4 border-b border-white/10 pb-8">
          <div>
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-white uppercase italic mb-2">
              {titles[category]}
            </h2>
            <p className="text-gray-500 font-mono text-sm">
              {filteredProducts.length} ARTÍCULOS ENCONTRADOS // ORDENADO POR RELEVANCIA
            </p>
          </div>
          <div className="flex gap-2">
            {/* Visual filters tags */}
            {['Shorts', 'Leggings', 'Tops'].map(tag => (
              <span key={tag} className="px-3 py-1 border border-white/20 rounded-full text-[10px] uppercase text-gray-400 hover:border-white cursor-pointer transition-colors">
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-y-12 gap-x-8">
          {filteredProducts.map((product) => (
            <div 
              key={product.id} 
              className="group relative flex flex-col cursor-pointer"
              onClick={() => onProductClick(product)}
            >
              
              {/* Image Container */}
              <div className="aspect-[3/4] relative overflow-hidden bg-[#1a1a1a] mb-4">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-center object-cover group-hover:scale-105 transition-transform duration-700 ease-in-out opacity-90 group-hover:opacity-100"
                  loading="lazy"
                />
                
                {/* Badges */}
                <div className="absolute top-2 left-2 flex flex-col gap-2">
                  {product.isNew && (
                     <span className="bg-white text-black text-[10px] font-black uppercase px-2 py-1 tracking-wider">Nuevo</span>
                  )}
                  {product.onSale && (
                     <span className="bg-red-600 text-white text-[10px] font-black uppercase px-2 py-1 tracking-wider">Oferta</span>
                  )}
                </div>

                {/* Quick Add Button (Stops propagation to not open modal) */}
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    onAddToCart(product);
                  }}
                  className="absolute bottom-0 right-0 bg-white text-black w-12 h-12 flex items-center justify-center hover:bg-green-400 transition-colors z-10"
                  title="Añadir al carrito rápidamente"
                >
                  <Plus size={24} />
                </button>
              </div>

              {/* Info */}
              <div>
                <h3 className="text-base font-bold text-white leading-tight mb-1 group-hover:text-gray-300 transition-colors">
                  {product.name}
                </h3>
                <p className="text-xs text-gray-500 mb-2 line-clamp-1">{product.description}</p>
                
                <div className="flex items-center justify-between">
                   <p className="text-sm font-medium text-white font-mono">${product.price.toLocaleString()}</p>
                   <div className="flex gap-1">
                      {product.category === 'shorts' && <span className="w-2 h-2 rounded-full bg-blue-500"></span>}
                      {product.category === 'leggings' && <span className="w-2 h-2 rounded-full bg-pink-500"></span>}
                   </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Load More (Simulated) */}
        {filteredProducts.length > 8 && (
          <div className="mt-20 text-center">
            <button className="px-10 py-3 border border-white/20 text-white uppercase font-bold text-xs tracking-widest hover:bg-white hover:text-black transition-all">
              Cargar Más Productos
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductGrid;