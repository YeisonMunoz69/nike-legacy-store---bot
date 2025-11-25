import React, { useState, useRef, useEffect, useImperativeHandle, forwardRef } from 'react';
import { MessageCircle, X, Send, Sparkles, Terminal, Trash2 } from 'lucide-react';
import { Message, LogEntry, ConversationContext } from '../types';
import { processInput } from '../utils/chatbotLogic';
// En Chatbot.tsx, después de la línea 4:
import { REGEX_SHORTS, REGEX_LEGGINGS, REGEX_TOPS, REGEX_ACCESSORIES, REGEX_PURCHASE } from '../constants';

interface ChatbotProps {
  addLog: (log: LogEntry) => void;
  onAction: (action: string) => void; // Callback for app-level actions
}

export interface ChatbotRef {
  addPurchaseMessage: (products: Array<{ name: string; price: number }>, total: number) => void;
}

const Chatbot = forwardRef<ChatbotRef, ChatbotProps>(({ addLog, onAction }, ref) => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [conversationContext, setConversationContext] = useState<ConversationContext>({});
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'init',
      text: "¡Hola! Soy N-BOT. 🤖\nEscribe 'Hombres', 'Novedades' o 'Ver todo' para navegar.\nTambién puedo calcular descuentos.",
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) scrollToBottom();
  }, [messages, isOpen, isTyping]);

  const handleSendMessage = (textOverride?: string) => {
    const textToSend = textOverride || inputValue;
    if (!textToSend.trim()) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      text: textToSend,
      sender: 'user',
      timestamp: new Date()
    };
    setMessages(prev => [...prev, userMsg]);
    setInputValue("");
    setIsTyping(true);

    setTimeout(() => {
      // PASAR el contexto actual a processInput
      const response = processInput(textToSend, addLog, conversationContext);

      const botMsg: Message = {
        id: (Date.now() + 1).toString(),
        text: response.text,
        sender: 'bot',
        timestamp: new Date(),
        actionButtons: response.buttons
      };

      setMessages(prev => [...prev, botMsg]);
      setIsTyping(false);

      // ACTUALIZAR el contexto según la acción
      if (response.action === 'FILTER_MEN') {
        setConversationContext(prev => ({ 
          ...prev, 
          genderFilter: 'men',
          conversationStage: 'browsing',
          lastIntent: 'FILTER_MEN'
        }));
      } else if (response.action === 'FILTER_WOMEN') {
        setConversationContext(prev => ({ 
          ...prev, 
          genderFilter: 'women',
          conversationStage: 'browsing',
          lastIntent: 'FILTER_WOMEN'
        }));
      } else if (response.action === 'RESET') {
        setConversationContext({}); // Limpiar contexto
      }
      
      if (REGEX_SHORTS.test(textToSend)) {
        setConversationContext(prev => ({ 
          ...prev, 
          productCategory: 'shorts',
          conversationStage: 'browsing'
        }));
      }
      
      // Agregar más categorías
      if (REGEX_LEGGINGS.test(textToSend)) {
        setConversationContext(prev => ({ 
          ...prev, 
          productCategory: 'leggings',
          conversationStage: 'browsing'
        }));
      }
      
      if (REGEX_TOPS.test(textToSend)) {
        setConversationContext(prev => ({ 
          ...prev, 
          productCategory: 'tops',
          conversationStage: 'browsing'
        }));
      }

      if (REGEX_ACCESSORIES.test(textToSend)) {
        setConversationContext(prev => ({ 
          ...prev, 
          productCategory: 'accessories',
          conversationStage: 'browsing'
        }));
      }
      
      // Si el usuario dice "comprar", actualizar etapa
      if (REGEX_PURCHASE.test(textToSend)) {
        setConversationContext(prev => ({ 
          ...prev, 
          conversationStage: 'checkout'
        }));
      }

      if (response.action) {
        onAction(response.action);
      }
    }, 800);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSendMessage();
  };

  const clearMessages = () => {
    setMessages([
      {
        id: 'init',
        text: "¡Hola! Soy N-BOT. 🤖\nEscribe 'Hombres', 'Novedades' o 'Ver todo' para navegar.\nTambién puedo calcular descuentos.",
        sender: 'bot',
        timestamp: new Date()
      }
    ]);
    // Limpiar también el contexto cuando se limpia el chat
    setConversationContext({});
  };

  // Función para agregar mensaje de compra completada
  const addPurchaseMessage = (products: Array<{ name: string; price: number }>, total: number) => {
    // Abrir el chat si está cerrado
    if (!isOpen) {
      setIsOpen(true);
    }

    // Mensaje del usuario (simulado)
    const userMsg: Message = {
      id: Date.now().toString(),
      text: "Comprar",
      sender: 'user',
      timestamp: new Date()
    };

    // Construir mensaje de confirmación
    const productList = products.map((p, idx) => 
      `   ${idx + 1}. ${p.name} - $${p.price.toLocaleString()}`
    ).join('\n');

    const productCount = products.length === 1 ? 'producto' : 'productos';
    const confirmationText = `✅ ¡COMPRA EXITOSA! 🎉

Has comprado ${products.length} ${productCount}:

${productList}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━
💰 TOTAL: $${total.toLocaleString()}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📦 Tu pedido será procesado y enviado en 24-48 horas.
📧 Recibirás un correo de confirmación con los detalles de envío.
📱 Te notificaremos cuando tu pedido esté en camino.

¡Gracias por elegir Nike Legacy! ⚡
Just Do It. 🏃‍♂️💨`;

    const botMsg: Message = {
      id: (Date.now() + 1).toString(),
      text: confirmationText,
      sender: 'bot',
      timestamp: new Date(),
      actionButtons: ["Volver a comprar", "Ver Novedades", "Empezar de nuevo"]
    };

    setMessages(prev => [...prev, userMsg, botMsg]);
    
    // Limpiar contexto después de compra
    setConversationContext({});
    
    // Scroll al final
    setTimeout(() => scrollToBottom(), 100);
  };

  // Exponer función al componente padre
  useImperativeHandle(ref, () => ({
    addPurchaseMessage
  }));

  return (
    <>
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-8 right-8 bg-white hover:bg-gray-200 text-black p-4 rounded-full shadow-[0_0_30px_rgba(255,255,255,0.2)] hover:scale-110 transition-all duration-300 z-40 flex items-center justify-center group"
        >
          <MessageCircle className="w-8 h-8 group-hover:rotate-12 transition-transform" />
          <span className="absolute top-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-black animate-pulse"></span>
        </button>
      )}

      {isOpen && (
        <div className="fixed bottom-6 right-6 w-[380px] h-[600px] flex flex-col z-40 font-sans animate-slide-up">
          <div className="w-full h-full bg-[#111]/95 backdrop-blur-2xl rounded-2xl shadow-2xl flex flex-col border border-white/10 overflow-hidden">

            {/* Header */}
            <div className="bg-[#0a0a0a] p-4 flex justify-between items-center border-b border-white/5">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-lg">
                    <svg viewBox="0 0 24 24" className="w-5 h-5 fill-black"><path d="M21 8.25c-1.31-1.25-3.32-2.12-5.75-2.12-5.5 0-9.25 4-9.25 4s3.25 1.5 6.5 2c2.5.38 5.75.25 8.5-3.88z" /></svg>
                  </div>
                  <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border border-black"></div>
                </div>
                <div>
                  <h3 className="font-bold text-white text-sm tracking-wide">NIKE SUPPORT</h3>
                  <span className="text-[10px] text-gray-400 flex items-center gap-1">
                    <Sparkles size={10} className="text-green-500" /> Online
                  </span>
                </div>
              </div>
              {/* Botón para limpiar chat - similar al de DebugPanel */}
              <button
                onClick={clearMessages}
                className="text-gray-400 hover:text-red-500 transition-colors p-1"
                title="Limpiar Chat"
              >
                <Trash2 size={16} />
              </button>
              <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-white transition-all">
                <X size={20} />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-5 space-y-6 scrollbar-hide bg-black/20">
              {messages.map((msg) => (
                <div key={msg.id} className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}>
                  <div className={`flex gap-3 max-w-[90%] ${msg.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                    {msg.sender === 'bot' && (
                      <div className="w-8 h-8 rounded-full bg-[#1a1a1a] flex-shrink-0 flex items-center justify-center border border-white/10 mt-1">
                        <Terminal size={14} className="text-gray-400" />
                      </div>
                    )}

                    <div>
                      <div className={`px-5 py-3.5 text-sm leading-relaxed shadow-sm whitespace-pre-line ${msg.sender === 'user'
                          ? 'bg-white text-black rounded-2xl rounded-tr-none font-bold'
                          : 'bg-[#1a1a1a] text-gray-200 rounded-2xl rounded-tl-none border border-white/5'
                        }`}>
                        {msg.text}
                      </div>

                      {msg.sender === 'bot' && msg.actionButtons && (
                        <div className="flex flex-wrap gap-2 mt-3">
                          {msg.actionButtons.map((btn, idx) => (
                            <button
                              key={idx}
                              onClick={() => handleSendMessage(btn)}
                              className="text-xs bg-black border border-white/20 text-white px-4 py-2 rounded hover:bg-white hover:text-black transition-all duration-200 uppercase font-bold tracking-wider"
                            >
                              {btn}
                            </button>
                          ))}
                        </div>
                      )}

                      <span className={`text-[10px] text-gray-600 mt-1 block ${msg.sender === 'user' ? 'text-right' : 'text-left'}`}>
                        {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex items-center gap-2 text-gray-500 text-xs ml-12">
                  <span className="animate-bounce">●</span>
                  <span className="animate-bounce delay-75">●</span>
                  <span className="animate-bounce delay-150">●</span>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 bg-[#0a0a0a] border-t border-white/5">
              <div className="relative flex items-center">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Escribe tu consulta..."
                  className="w-full bg-[#151515] text-white rounded-none pl-4 pr-12 py-4 text-sm focus:outline-none border-b border-white/20 focus:border-white transition-all placeholder-gray-600"
                />
                <button
                  onClick={() => handleSendMessage()}
                  disabled={!inputValue.trim()}
                  className="absolute right-2 text-white hover:text-green-500 transition-colors disabled:opacity-30"
                >
                  <Send size={18} />
                </button>
              </div>
            </div>

          </div>
        </div>
      )}
    </>
  );
});

Chatbot.displayName = 'Chatbot';

export default Chatbot;