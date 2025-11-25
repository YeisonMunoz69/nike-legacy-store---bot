export type Category = 'all' | 'men' | 'women' | 'new' | 'sale';

export interface Product {
  id: number;
  name: string;
  description: string;
  category: 'shorts' | 'leggings' | 'tops' | 'accessories';
  gender: 'men' | 'women' | 'unisex';
  price: number;
  image: string;
  isNew?: boolean;
  onSale?: boolean;
}

export interface CartItem extends Product {
  cartId: string;
  size: string;
}

export interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  actionButtons?: string[];
  relatedAction?: string; // e.g., 'OPEN_CART', 'FILTER_MEN'
}

export interface LogEntry {
  id: string;
  timestamp: string;
  userInput: string;
  intentDetected: string;
  regexUsed: string;
  matchData: string | null;
}

export interface ConversationContext {
  lastIntent?: string;           // Última intención detectada
  genderFilter?: 'men' | 'women' | null;  // Filtro de género activo
  productCategory?: string;       // Categoría de producto actual
  conversationStage?: 'greeting' | 'browsing' | 'product_selected' | 'checkout';
  selectedProductId?: number;     // ID del producto seleccionado
}