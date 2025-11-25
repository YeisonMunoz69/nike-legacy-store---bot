import React from 'react';
import { X, Trash2, ArrowRight, ShoppingBag } from 'lucide-react';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onRemove: (cartId: string) => void;
  onPurchase?: () => void; // Callback cuando se completa la compra
}

const CartDrawer: React.FC<CartDrawerProps> = ({ isOpen, onClose, items, onRemove, onPurchase }) => {
  const total = items.reduce((acc, item) => acc + item.price, 0);

  return (
    <>
      {/* Overlay */}
      <div 
        className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-50 transition-opacity duration-500 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      />

      {/* Drawer */}
      <div className={`fixed top-0 right-0 h-full w-full sm:w-[400px] bg-[#111] border-l border-white/10 z-50 transform transition-transform duration-500 ease-out shadow-2xl flex flex-col ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        
        {/* Header */}
        <div className="p-6 border-b border-white/10 flex justify-between items-center">
          <h2 className="text-xl font-black italic uppercase tracking-tighter flex items-center gap-2">
            <ShoppingBag className="text-green-500" /> Tu Bolsa ({items.length})
          </h2>
          <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors">
            <X size={24} />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-gray-500 gap-4">
              <ShoppingBag size={48} className="opacity-20" />
              <p>Tu bolsa está vacía</p>
              <button onClick={onClose} className="text-white underline decoration-green-500 decoration-2 underline-offset-4">
                Ir a comprar
              </button>
            </div>
          ) : (
            items.map((item) => (
              <div key={item.cartId} className="flex gap-4 bg-white/5 p-4 rounded-lg border border-white/5">
                <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-md" />
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <h3 className="font-bold text-sm text-white">{item.name}</h3>
                    <button onClick={() => onRemove(item.cartId)} className="text-gray-500 hover:text-red-500 transition-colors">
                      <Trash2 size={16} />
                    </button>
                  </div>
                  <p className="text-xs text-gray-400 mt-1">{item.gender === 'men' ? 'Hombre' : 'Mujer'} • {item.size}</p>
                  <p className="font-medium text-white mt-2">${item.price.toLocaleString()}</p>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="p-6 border-t border-white/10 bg-[#0a0a0a]">
            <div className="flex justify-between items-center mb-4 text-lg font-bold">
              <span>Total Estimado</span>
              <span>${total.toLocaleString()}</span>
            </div>
            <button 
              onClick={() => {
                if (onPurchase) {
                  onPurchase();
                }
              }}
              className="w-full bg-white text-black font-black uppercase py-4 rounded-full hover:bg-gray-200 transition-all flex items-center justify-center gap-2 group"
            >
              Pagar Ahora <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </button>
            <p className="text-center text-[10px] text-gray-500 mt-4">
              Envío e impuestos calculados al finalizar.
            </p>
          </div>
        )}
      </div>
    </>
  );
};

export default CartDrawer;