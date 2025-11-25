import React, { useState, useRef } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ProductGrid from './components/ProductGrid';
import Chatbot, { ChatbotRef } from './components/Chatbot';
import DebugPanel from './components/DebugPanel';
import CartDrawer from './components/CartDrawer';
import ProductModal from './components/ProductModal';
import { LogEntry, Product, CartItem, Category } from './types';

function App() {
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [category, setCategory] = useState<Category>('all');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const chatbotRef = useRef<ChatbotRef>(null);

  const addLog = (log: LogEntry) => {
    setLogs((prev) => [...prev, log]);
  };

  const clearLogs = () => {
    setLogs([]);
  };

  const addToCart = (product: Product) => {
    const newItem: CartItem = {
      ...product,
      cartId: Date.now().toString(),
      size: 'M' // Default size for demo
    };
    setCartItems(prev => [...prev, newItem]);
    setIsCartOpen(true); // Auto open cart to show feedback
  };

  const removeFromCart = (cartId: string) => {
    setCartItems(prev => prev.filter(item => item.cartId !== cartId));
  };

  const handlePurchase = () => {
    if (cartItems.length === 0) return;

    // Preparar datos de productos para el mensaje
    const products = cartItems.map(item => ({
      name: item.name,
      price: item.price
    }));

    // Calcular total
    const total = cartItems.reduce((acc, item) => acc + item.price, 0);

    // Enviar mensaje de confirmación al chatbot
    if (chatbotRef.current) {
      chatbotRef.current.addPurchaseMessage(products, total);
    }

    // Limpiar carrito
    setCartItems([]);
    
    // Cerrar drawer
    setIsCartOpen(false);
  };

  // Callback for Chatbot to control App State
  const handleChatAction = (action: string) => {
    switch (action) {
      case 'FILTER_MEN':
        setCategory('men');
        document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' });
        break;
      case 'FILTER_WOMEN':
        setCategory('women');
        document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' });
        break;
      case 'FILTER_NEW':
        setCategory('new');
        document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' });
        break;
      case 'OPEN_CART':
        setIsCartOpen(true);
        break;
      case 'RESET':
        setCategory('all');
        document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' });
        break;
      case 'CLOSE_CHAT':
        // Optional logic if we wanted to minimize chat programmatically
        break;
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-green-500 selection:text-black font-sans">
      <Navbar 
        cartCount={cartItems.length} 
        onOpenCart={() => setIsCartOpen(true)}
        currentCategory={category}
        setCategory={setCategory}
      />
      
      <CartDrawer 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
        items={cartItems} 
        onRemove={removeFromCart}
        onPurchase={handlePurchase}
      />

      {/* Product Detail Modal */}
      <ProductModal 
        product={selectedProduct} 
        onClose={() => setSelectedProduct(null)} 
        onAddToCart={addToCart} 
      />

      <main>
        <Hero setCategory={setCategory} />
        <ProductGrid 
          category={category} 
          onAddToCart={addToCart} 
          onProductClick={setSelectedProduct}
        />
      </main>

      <footer className="bg-black py-12 border-t border-gray-900 mt-20 pb-72 md:pb-20">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center text-gray-600 gap-6">
          <div className="text-center md:text-left">
             <p className="mb-2 text-xs tracking-widest uppercase font-bold text-white">Nike Legacy Project</p>
             <p className="text-xs">Diseñado para demostrar el poder de Regex y React.</p>
          </div>
          <div className="flex gap-6 text-sm font-bold uppercase tracking-wider text-gray-400">
            <a href="#" className="hover:text-white">Tiendas</a>
            <a href="#" className="hover:text-white">Ayuda</a>
            <a href="#" className="hover:text-white">Privacidad</a>
          </div>
        </div>
      </footer>

      <Chatbot ref={chatbotRef} addLog={addLog} onAction={handleChatAction} />
      <DebugPanel logs={logs} onClear={clearLogs} />
    </div>
  );
}

export default App;