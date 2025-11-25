import {
  REGEX_OFFENSIVE,
  REGEX_GREETING,
  REGEX_MENU,
  REGEX_GENDER_MAN,
  REGEX_GENDER_WOMAN,
  REGEX_SHORTS,
  REGEX_LEGGINGS,
  REGEX_TOPS,
  REGEX_ACCESSORIES,
  REGEX_MATH,
  REGEX_SHIPPING,
  REGEX_RETURNS,
  REGEX_CART,
  REGEX_PURCHASE,
  REGEX_BUTTON_HOMBRE,
  REGEX_BUTTON_MUJER,
  REGEX_BUTTON_SHORTS,
  REGEX_BUTTON_LEGGINGS,
  REGEX_BUTTON_TOPS,
  REGEX_BUTTON_NOVEDADES,
  REGEX_BUTTON_OFERTAS,
  REGEX_BUTTON_CATALOGO,
  REGEX_BUTTON_AYUDA,
  REGEX_BUTTON_VOLVER,
  REGEX_BUTTON_CARRITO,
  REGEX_BUTTON_ACCESORIOS,
  REGEX_BUTTON_DEPORTIVOS,
  REGEX_BUTTON_CASUALES,
  REGEX_BUTTON_COMPRESION,
  REGEX_BUTTON_SEGUIR_COMPRANDO,
  REGEX_BUTTON_VOLVER_COMPRAR,
  REGEX_BUTTON_EMPEZAR_NUEVO,
  REGEX_NEWS,
  REGEX_STORE_INFO,
  REGEX_GRATITUDE,
  REGEX_CONFUSION,
  REGEX_ANGER,
  REGEX_DISMISSAL,
} from "../constants";
import { LogEntry, ConversationContext } from "../types";

interface ResponseData {
  text: string;
  buttons?: string[];
  action?: string; // Valid actions: 'FILTER_MEN', 'FILTER_WOMEN', 'FILTER_NEW', 'OPEN_CART', 'RESET', etc.
}

export const processInput = (
  input: string,
  addLog: (log: LogEntry) => void,
  context?: ConversationContext
): ResponseData => {
  const now = new Date();

  // Helper to log attempts
  const logMatch = (
    intentName: string,
    regex: RegExp,
    match: RegExpExecArray | null
  ) => {
    addLog({
      id: Math.random().toString(36).substr(2, 9),
      timestamp: now.toLocaleTimeString(),
      userInput: input,
      intentDetected: intentName,
      regexUsed: regex.toString(),
      matchData: match ? JSON.stringify(match) : "null",
    });
  };

  // =========================================
  // HIGH PRIORITY (Blockers & Emotion)
  // =========================================

  // 1. OFFENSIVE (Blocker)
  const offensiveMatch = REGEX_OFFENSIVE.exec(input);
  if (offensiveMatch) {
    logMatch("OFFENSIVE", REGEX_OFFENSIVE, offensiveMatch);
    return {
      text: "⚠️ Lenguaje no permitido. En Nike Legacy promovemos el respeto y el espíritu deportivo.",
    };
  }

  // 2. ANGER / FRUSTRATION (De-escalation)
  const angerMatch = REGEX_ANGER.exec(input);
  if (angerMatch) {
    logMatch("EMOTION_ANGER", REGEX_ANGER, angerMatch);
    return {
      text: "Lamento que estés teniendo una mala experiencia. 😔\nMi objetivo es ayudarte. ¿Te gustaría que te transfiera con un agente humano o intentamos buscar el producto nuevamente?",
      buttons: ["Contactar Humano", "Intentar de nuevo"],
    };
  }

  // 3. GRATITUDE (Politeness)
  const gratitudeMatch = REGEX_GRATITUDE.exec(input);
  if (gratitudeMatch) {
    logMatch("EMOTION_GRATITUDE", REGEX_GRATITUDE, gratitudeMatch);
    
    // Si hay contexto de género o categoría, sugerencias más específicas
    if (context?.genderFilter === 'men') {
      return {
        text: "¡De nada! Es un placer ayudarte. ⚡\n¿Quieres seguir viendo productos para HOMBRE o necesitas algo más?",
        buttons: ["Ver Shorts", "Ver Mallas", "Ver Tops", "Comprar", "Ver Todo"],
      };
    } else if (context?.genderFilter === 'women') {
      return {
        text: "¡De nada! Es un placer ayudarte. ⚡\n¿Quieres seguir viendo productos para MUJER o necesitas algo más?",
        buttons: ["Ver Leggings", "Ver Tops", "Ver Shorts", "Comprar", "Ver Todo"],
      };
    } else if (context?.productCategory) {
      return {
        text: "¡De nada! Es un placer ayudarte. ⚡\n¿Quieres seguir explorando o ver otras categorías?",
        buttons: ["Seguir viendo", "Ver Otras Categorías", "Comprar", "Ver Todo"],
      };
    }
    
    return {
      text: "¡De nada! Es un placer ayudarte a encontrar tu mejor versión. ⚡\n¿Necesitas algo más?",
      buttons: ["Ver Novedades", "Ir al Carrito", "Ver Catálogo"],
    };
  }

  // 4. DISMISSAL (Closing)
  const dismissalMatch = REGEX_DISMISSAL.exec(input);
  if (dismissalMatch) {
    logMatch("EMOTION_DISMISSAL", REGEX_DISMISSAL, dismissalMatch);
    return {
      text: "¡Entendido! Estaré por aquí si cambias de opinión. \nRecuerda: Just Do It. ✔️",
      action: "CLOSE_CHAT", // Optional: Could minimize chat
    };
  }

  // 5. CONFUSION / HELP (Guidance)
  const confusionMatch = REGEX_CONFUSION.exec(input);
  if (confusionMatch) {
    logMatch("HELP_CONFUSION", REGEX_CONFUSION, confusionMatch);
    
    // Si hay contexto, dar ayuda más específica
    if (context?.genderFilter === 'men') {
      return {
        text: "No te preocupes, estoy aquí para guiarte. 🧭\n\nEstás viendo productos para HOMBRE. Puedes pedirme:\n• 'Ver shorts' - Ver pantalonetas\n• 'Ver mallas' - Ver leggings\n• 'Comprar' - Ir al carrito\n• 'Volver' - Ver todo el catálogo",
        buttons: ["Ver Shorts", "Ver Mallas", "Comprar", "Volver"],
      };
    } else if (context?.genderFilter === 'women') {
      return {
        text: "No te preocupes, estoy aquí para guiarte. 🧭\n\nEstás viendo productos para MUJER. Puedes pedirme:\n• 'Ver leggings' - Ver mallas y licras\n• 'Ver tops' - Ver camisetas\n• 'Comprar' - Ir al carrito\n• 'Volver' - Ver todo el catálogo",
        buttons: ["Ver Leggings", "Ver Tops", "Comprar", "Volver"],
      };
    } else if (context?.productCategory) {
      return {
        text: `No te preocupes, estoy aquí para guiarte. 🧭\n\nEstás viendo ${context.productCategory}. Puedes pedirme:\n• 'Ver hombre' o 'Ver mujer' - Filtrar por género\n• 'Comprar' - Ir al carrito\n• 'Ver todo' - Ver todo el catálogo`,
        buttons: ["Ver Hombre", "Ver Mujer", "Comprar", "Ver Todo"],
      };
    }
    
    return {
      text: "No te preocupes, estoy aquí para guiarte. 🧭\n\nPuedes pedirme:\n• Ver productos: 'Shorts hombre', 'Leggings mujer'.\n• Información: 'Envíos', 'Devoluciones'.\n• Calcular: 'Precio de 50000 menos 20%'.",
      buttons: ["Ver Catálogo", "Ver Ofertas", "Ayuda"],
    };
  }

  // =========================================
  // FUNCTIONAL INTENTS
  // =========================================

  // 6. STORE INFO
  const storeMatch = REGEX_STORE_INFO.exec(input);
  if (storeMatch) {
    logMatch("STORE_INFO", REGEX_STORE_INFO, storeMatch);
    return {
      text: "📍 Estamos ubicados en la Zona T, Bogotá.\n🕐 Horario de atención:\nLunes a Sábado: 10:00 AM - 8:00 PM\nDomingos: 11:00 AM - 6:00 PM.",
      buttons: ["Ver Mapa", "Seguir comprando"],
    };
  }

  // 7. CART / CHECKOUT
  const cartMatch = REGEX_CART.exec(input);
  if (cartMatch) {
    logMatch("CART_ACTION", REGEX_CART, cartMatch);
    
    // Si hay contexto de navegación, mensaje más personalizado
    if (context?.conversationStage === 'browsing' && context?.productCategory) {
      return {
        text: `Abriendo tu bolsa de compras. ¡Estás a un paso de mejorar tu equipo! 🛒\n¿Quieres seguir viendo ${context.productCategory} o finalizar tu compra?`,
        buttons: ["Seguir viendo", "Finalizar compra"],
        action: "OPEN_CART",
      };
    }
    
    return {
      text: "Abriendo tu bolsa de compras. ¡Estás a un paso de mejorar tu equipo!",
      action: "OPEN_CART",
    };
  }

  // 7.5. PURCHASE / BUY
  const purchaseMatch = REGEX_PURCHASE.exec(input);
  if (purchaseMatch) {
    // Si hay un producto seleccionado, respuesta más específica
    if (context?.conversationStage === 'product_selected' && context?.selectedProductId) {
      logMatch('PURCHASE_PRODUCT_SELECTED', REGEX_PURCHASE, purchaseMatch);
      return {
        text: `¡Perfecto! Agregando el producto #${context.selectedProductId} a tu carrito. 🛒\n¿Quieres agregar más productos o finalizar tu compra?`,
        buttons: ["Agregar más", "Ver Carrito", "Finalizar compra"],
        action: 'OPEN_CART'
      };
    }
    
    // Si está navegando, respuesta genérica
    logMatch('PURCHASE_ACTION', REGEX_PURCHASE, purchaseMatch);
    return {
      text: "¡Excelente elección! 🛒\nAbre el carrito para ver tus productos y finalizar tu compra.",
      buttons: ["Ver Carrito", "Seguir comprando"],
      action: 'OPEN_CART'
    };
  }

  // 7.6. BUTTON ACTIONS (Reconocer clicks en botones)

  if (REGEX_BUTTON_HOMBRE.exec(input)) {
    logMatch(
      "BUTTON_HOMBRE",
      REGEX_BUTTON_HOMBRE,
      REGEX_BUTTON_HOMBRE.exec(input)
    );
    return {
      text: "Filtrando catálogo exclusivo para HOMBRE. Potencia y resistencia.",
      buttons: ["Ver Shorts", "Ver Mallas", "Comprar", "Volver"],
      action: "FILTER_MEN",
    };
  }

  if (REGEX_BUTTON_MUJER.exec(input)) {
    logMatch(
      "BUTTON_MUJER",
      REGEX_BUTTON_MUJER,
      REGEX_BUTTON_MUJER.exec(input)
    );
    
    // Si ya estaba viendo productos de mujer Y una categoría específica
    if (context?.genderFilter === 'women' && context?.productCategory === 'leggings') {
      return {
        text: "Ya estás viendo leggings para mujer. ¿Quieres ver otra categoría?",
        buttons: ["Ver Shorts", "Ver Tops", "Ver Accesorios", "Comprar", "Volver"],
        action: "FILTER_WOMEN",
      };
    } else if (context?.genderFilter === 'women' && context?.productCategory === 'tops') {
      return {
        text: "Ya estás viendo tops para mujer. ¿Quieres ver otra categoría?",
        buttons: ["Ver Leggings", "Ver Shorts", "Ver Accesorios", "Comprar", "Volver"],
        action: "FILTER_WOMEN",
      };
    }
    
    // Si ya estaba en mujer pero sin categoría específica
    if (context?.genderFilter === 'women') {
      return {
        text: "Ya estás en la sección de MUJER. ¿Qué te interesa?",
        buttons: ["Ver Leggings", "Ver Tops", "Ver Shorts", "Comprar", "Ver Todo"],
        action: "FILTER_WOMEN",
      };
    }
    
    return {
      text: "Filtrando catálogo exclusivo para MUJER. Diseño y confort.",
      buttons: ["Ver Leggings", "Ver Tops", "Comprar", "Volver"],
      action: "FILTER_WOMEN",
    };
  }

  if (REGEX_BUTTON_SHORTS.exec(input)) {
    logMatch(
      "BUTTON_SHORTS",
      REGEX_BUTTON_SHORTS,
      REGEX_BUTTON_SHORTS.exec(input)
    );
    
    // Si hay contexto de género, respuesta más específica
    if (context?.genderFilter === 'men') {
      return {
        text: "Perfecto, aquí tienes shorts para HOMBRE. Tenemos opciones deportivas, casuales y de compresión.",
        buttons: ["Ver Shorts", "Ver Mallas", "Comprar", "Volver"],
        action: "FILTER_MEN",
      };
    } else if (context?.genderFilter === 'women') {
      return {
        text: "Aquí tienes shorts para MUJER. Tenemos cortos, midi y de yoga.",
        buttons: ["Ver Shorts", "Ver Mallas", "Comprar", "Volver"],
        action: "FILTER_WOMEN",
      };
    }
    
    return {
      text: "Explorando nuestra colección de Shorts y Pantalonetas de alto rendimiento.",
      buttons: ["Shorts Hombre", "Shorts Mujer", "Comprar"],
      action: "RESET",
    };
  }

  if (REGEX_BUTTON_LEGGINGS.exec(input)) {
    logMatch(
      "BUTTON_LEGGINGS",
      REGEX_BUTTON_LEGGINGS,
      REGEX_BUTTON_LEGGINGS.exec(input)
    );
    
    // Si el usuario ya estaba viendo shorts, sugerir complementos
    if (context?.productCategory === 'shorts') {
      return {
        text: "Excelente combinación. Los leggings complementan perfectamente los shorts. ¿Buscas para entrenar o para yoga?",
        buttons: ["Entrenamiento", "Yoga", "Ambos", "Comprar"],
        action: "RESET",
      };
    }
    
    // Si hay contexto de género
    if (context?.genderFilter === 'women') {
      return {
        text: "Mostrando Leggings para MUJER con tecnología Dri-FIT. Tenemos opciones de soporte firme, suaves y para yoga.",
        buttons: ["Soporte Firme", "Suaves", "Yoga", "Comprar", "Volver"],
        action: "FILTER_WOMEN",
      };
    } else if (context?.genderFilter === 'men') {
      return {
        text: "Mostrando Mallas para HOMBRE con tecnología Dri-FIT. Perfectas para running y entrenamiento.",
        buttons: ["Mallas", "Shorts", "Comprar", "Volver"],
        action: "FILTER_MEN",
      };
    }
    
    return {
      text: "Mostrando Leggings, Mallas y Licras con tecnología Dri-FIT.",
      buttons: ["Leggings Mujer", "Mallas Hombre", "Comprar"],
      action: "RESET",
    };
  }

  if (REGEX_BUTTON_TOPS.exec(input)) {
    logMatch("BUTTON_TOPS", REGEX_BUTTON_TOPS, REGEX_BUTTON_TOPS.exec(input));
    
    // Si hay contexto de género
    if (context?.genderFilter === 'men') {
      return {
        text: "Aquí tienes nuestra selección de partes superiores para HOMBRE: Camisetas, Hoodies y Tops deportivos.",
        buttons: ["Camisetas", "Tops Deportivos", "Comprar", "Volver"],
        action: "FILTER_MEN",
      };
    } else if (context?.genderFilter === 'women') {
      return {
        text: "Aquí tienes nuestra selección de partes superiores para MUJER: Tops, Camisetas y Hoodies.",
        buttons: ["Tops", "Camisetas", "Hoodies", "Comprar", "Volver"],
        action: "FILTER_WOMEN",
      };
    }
    
    return {
      text: "Aquí tienes nuestra selección de partes superiores: Camisetas, Hoodies y Tops.",
      buttons: ["Tops Mujer", "Camisetas Hombre", "Comprar"],
      action: "RESET",
    };
  }

  if (REGEX_BUTTON_NOVEDADES.exec(input)) {
    logMatch(
      "BUTTON_NOVEDADES",
      REGEX_BUTTON_NOVEDADES,
      REGEX_BUTTON_NOVEDADES.exec(input)
    );
    
    // Si hay contexto de género, mostrar novedades específicas
    if (context?.genderFilter === 'men') {
      return {
        text: "Estos son los últimos 'Drops' para HOMBRE de la temporada. 🔥",
        buttons: ["Comprar", "Ver Shorts", "Ver Mallas", "Ver Todo"],
        action: "FILTER_NEW",
      };
    } else if (context?.genderFilter === 'women') {
      return {
        text: "Estos son los últimos 'Drops' para MUJER de la temporada. 🔥",
        buttons: ["Comprar", "Ver Leggings", "Ver Tops", "Ver Todo"],
        action: "FILTER_NEW",
      };
    }
    
    return {
      text: "Estos son los últimos 'Drops' de la temporada. 🔥",
      buttons: ["Comprar", "Ver Todo"],
      action: "FILTER_NEW",
    };
  }

  if (REGEX_BUTTON_CATALOGO.exec(input)) {
    logMatch(
      "BUTTON_CATALOGO",
      REGEX_BUTTON_CATALOGO,
      REGEX_BUTTON_CATALOGO.exec(input)
    );
    
    // Si hay contexto, sugerir continuar desde donde estaba
    if (context?.genderFilter === 'men') {
      return {
        text: "Acceso total al inventario Nike Legacy. ¿Quieres seguir viendo HOMBRE o explorar otras categorías?",
        buttons: ["Seguir Hombre", "Ver Mujer", "Novedades", "Ofertas", "Comprar"],
        action: "RESET",
      };
    } else if (context?.genderFilter === 'women') {
      return {
        text: "Acceso total al inventario Nike Legacy. ¿Quieres seguir viendo MUJER o explorar otras categorías?",
        buttons: ["Seguir Mujer", "Ver Hombre", "Novedades", "Ofertas", "Comprar"],
        action: "RESET",
      };
    }
    
    return {
      text: "Acceso total al inventario Nike Legacy. ¿Qué categoría prefieres?",
      buttons: ["Hombre", "Mujer", "Novedades", "Ofertas", "Comprar"],
      action: "RESET",
    };
  }

  if (REGEX_BUTTON_AYUDA.exec(input)) {
    logMatch(
      "BUTTON_AYUDA",
      REGEX_BUTTON_AYUDA,
      REGEX_BUTTON_AYUDA.exec(input)
    );
    return {
      text: "No te preocupes, estoy aquí para guiarte. 🧭\n\nPuedes pedirme:\n• Ver productos: 'Shorts hombre', 'Leggings mujer'.\n• Información: 'Envíos', 'Devoluciones'.\n• Calcular: 'Precio de 50000 menos 20%'.",
      buttons: ["Ver Catálogo", "Ver Ofertas", "Comprar"],
    };
  }

  if (REGEX_BUTTON_VOLVER.exec(input)) {
    logMatch(
      "BUTTON_VOLVER",
      REGEX_BUTTON_VOLVER,
      REGEX_BUTTON_VOLVER.exec(input)
    );
    
    // Si había contexto, ofrecer volver a donde estaba o al inicio
    if (context?.genderFilter) {
      return {
        text: "Volviendo al catálogo principal. ¿Quieres explorar desde cero o volver a donde estabas?",
        buttons: ["Ver Todo", "Volver a " + (context.genderFilter === 'men' ? 'Hombre' : 'Mujer'), "Novedades", "Comprar"],
        action: "RESET",
      };
    }
    
    return {
      text: "Volviendo al catálogo principal.",
      buttons: ["Hombre", "Mujer", "Novedades", "Comprar"],
      action: "RESET",
    };
  }

  if (REGEX_BUTTON_CARRITO.exec(input)) {
    logMatch(
      "BUTTON_CARRITO",
      REGEX_BUTTON_CARRITO,
      REGEX_BUTTON_CARRITO.exec(input)
    );
    return {
      text: "Abriendo tu bolsa de compras. ¡Estás a un paso de mejorar tu equipo!",
      action: "OPEN_CART",
    };
  }

  if (REGEX_BUTTON_SEGUIR_COMPRANDO.exec(input)) {
    logMatch(
      "BUTTON_SEGUIR_COMPRANDO",
      REGEX_BUTTON_SEGUIR_COMPRANDO,
      REGEX_BUTTON_SEGUIR_COMPRANDO.exec(input)
    );
    
    // Si hay contexto, sugerir continuar desde donde estaba
    if (context?.genderFilter === 'men') {
      return {
        text: "¡Perfecto! Sigamos explorando productos para HOMBRE. ¿Qué te interesa?",
        buttons: ["Ver Shorts", "Ver Mallas", "Ver Tops", "Comprar", "Ver Todo"],
        action: "FILTER_MEN",
      };
    } else if (context?.genderFilter === 'women') {
      return {
        text: "¡Perfecto! Sigamos explorando productos para MUJER. ¿Qué te interesa?",
        buttons: ["Ver Leggings", "Ver Tops", "Ver Shorts", "Comprar", "Ver Todo"],
        action: "FILTER_WOMEN",
      };
    } else if (context?.productCategory) {
      return {
        text: `¡Perfecto! Sigamos explorando ${context.productCategory}. ¿Qué más te interesa?`,
        buttons: ["Ver Hombre", "Ver Mujer", "Novedades", "Comprar", "Ver Todo"],
        action: "RESET",
      };
    }
    
    return {
      text: "¡Perfecto! Sigamos explorando. ¿Qué categoría te interesa?",
      buttons: ["Hombre", "Mujer", "Novedades", "Ofertas", "Comprar"],
      action: "RESET",
    };
  }

  if (REGEX_BUTTON_VOLVER_COMPRAR.exec(input)) {
    logMatch(
      "BUTTON_VOLVER_COMPRAR",
      REGEX_BUTTON_VOLVER_COMPRAR,
      REGEX_BUTTON_VOLVER_COMPRAR.exec(input)
    );
    return {
      text: "¡Excelente! Vamos a encontrar más productos increíbles para ti. 🛍️\n¿Qué categoría te interesa?",
      buttons: ["Hombre", "Mujer", "Novedades", "Ofertas", "Ver Todo"],
      action: "RESET",
    };
  }

  if (REGEX_BUTTON_EMPEZAR_NUEVO.exec(input)) {
    logMatch(
      "BUTTON_EMPEZAR_NUEVO",
      REGEX_BUTTON_EMPEZAR_NUEVO,
      REGEX_BUTTON_EMPEZAR_NUEVO.exec(input)
    );
    return {
      text: "¡Perfecto! Empecemos de nuevo. 🚀\n\n¡Hola! Soy N-BOT, tu asistente de equipo. ⚡\nEstoy aquí para ayudarte a encontrar tu próxima equipación o resolver dudas.\n\n¿En qué puedo ayudarte hoy?",
      buttons: ["Ver Hombre", "Ver Mujer", "Novedades", "Ver Todo"],
      action: "RESET",
    };
  }

  // 8. SPECIFIC PRODUCTS

  if (REGEX_SHORTS.exec(input)) {
    // Si ya hay un filtro de género activo, dar respuesta más específica
    if (context?.genderFilter === 'men') {
      logMatch('SEARCH_SHORTS_MEN', REGEX_SHORTS, REGEX_SHORTS.exec(input));
      return {
        text: "Perfecto, aquí tienes shorts para HOMBRE. Tenemos opciones deportivas, casuales y de compresión.",
        buttons: ["Deportivos", "Casuales", "Compresión", "Comprar", "Volver"],
        action: 'FILTER_MEN'
      };
    } else if (context?.genderFilter === 'women') {
      logMatch('SEARCH_SHORTS_WOMEN', REGEX_SHORTS, REGEX_SHORTS.exec(input));
      return {
        text: "Aquí tienes shorts para MUJER. Tenemos cortos, midi y de yoga.",
        buttons: ["Cortos", "Midi", "Yoga", "Comprar", "Volver"],
        action: 'FILTER_WOMEN'
      };
    }
    
    // Si NO hay contexto de género, respuesta genérica (código existente)
    logMatch('SEARCH_SHORTS', REGEX_SHORTS, REGEX_SHORTS.exec(input));
    return {
      text: "Explorando nuestra colección de Shorts y Pantalonetas de alto rendimiento.",
      buttons: ["Shorts Hombre", "Shorts Mujer", "Comprar"],
      action: 'RESET'
    };
  }

  if (REGEX_LEGGINGS.exec(input)) {
    // Si el usuario ya estaba viendo shorts, sugerir complementos
    if (context?.productCategory === 'shorts') {
      logMatch('SEARCH_LEGGINGS_AFTER_SHORTS', REGEX_LEGGINGS, REGEX_LEGGINGS.exec(input));
      return {
        text: "Excelente combinación. Los leggings complementan perfectamente los shorts. ¿Buscas para entrenar o para yoga?",
        buttons: ["Entrenamiento", "Yoga", "Ambos", "Comprar"],
        action: 'RESET'
      };
    }
    
    // Respuesta normal si no hay contexto
    logMatch('SEARCH_LEGGINGS', REGEX_LEGGINGS, REGEX_LEGGINGS.exec(input));
    return {
      text: "Mostrando Leggings, Mallas y Licras con tecnología Dri-FIT.",
      buttons: ["Leggings Mujer", "Mallas Hombre", "Comprar"],
      action: 'RESET'
    };
  }

  if (REGEX_TOPS.exec(input)) {
    // Si hay contexto de género, respuesta más específica
    if (context?.genderFilter === 'men') {
      logMatch('SEARCH_TOPS_MEN', REGEX_TOPS, REGEX_TOPS.exec(input));
      return {
        text: "Aquí tienes nuestra selección de partes superiores para HOMBRE: Camisetas, Hoodies y Tops deportivos.",
        buttons: ["Camisetas", "Hoodies", "Tops Deportivos", "Comprar", "Volver"],
        action: 'FILTER_MEN'
      };
    } else if (context?.genderFilter === 'women') {
      logMatch('SEARCH_TOPS_WOMEN', REGEX_TOPS, REGEX_TOPS.exec(input));
      return {
        text: "Aquí tienes nuestra selección de partes superiores para MUJER: Tops, Camisetas y Hoodies.",
        buttons: ["Tops", "Camisetas", "Hoodies", "Comprar", "Volver"],
        action: 'FILTER_WOMEN'
      };
    }
    
    logMatch("SEARCH_TOPS", REGEX_TOPS, REGEX_TOPS.exec(input));
    return {
      text: "Aquí tienes nuestra selección de partes superiores: Camisetas, Hoodies y Tops.",
      buttons: ["Tops Mujer", "Camisetas Hombre", "Comprar"],
      action: "RESET",
    };
  }

  if (REGEX_ACCESSORIES.exec(input)) {
    // Si hay contexto de género o categoría, sugerir complementos específicos
    if (context?.genderFilter === 'men' && context?.productCategory === 'shorts') {
      logMatch('SEARCH_ACCESSORIES_MEN_SHORTS', REGEX_ACCESSORIES, REGEX_ACCESSORIES.exec(input));
      return {
        text: "Perfecto complemento para tus shorts. Tenemos gorras, calcetines y más accesorios para HOMBRE.",
        buttons: ["Gorras", "Calcetines", "Ver Todo Accesorios", "Comprar", "Volver"],
        action: 'FILTER_MEN'
      };
    } else if (context?.genderFilter === 'women' && context?.productCategory === 'leggings') {
      logMatch('SEARCH_ACCESSORIES_WOMEN_LEGGINGS', REGEX_ACCESSORIES, REGEX_ACCESSORIES.exec(input));
      return {
        text: "Perfecto complemento para tus leggings. Tenemos gorras, calcetines y más accesorios para MUJER.",
        buttons: ["Gorras", "Calcetines", "Ver Todo Accesorios", "Comprar", "Volver"],
        action: 'FILTER_WOMEN'
      };
    } else if (context?.genderFilter) {
      logMatch('SEARCH_ACCESSORIES_GENDER', REGEX_ACCESSORIES, REGEX_ACCESSORIES.exec(input));
      return {
        text: `Complementa tu outfit con nuestros accesorios para ${context.genderFilter === 'men' ? 'HOMBRE' : 'MUJER'}.`,
        buttons: ["Gorras", "Calcetines", "Ver Todo", "Comprar", "Volver"],
        action: context.genderFilter === 'men' ? 'FILTER_MEN' : 'FILTER_WOMEN'
      };
    }
    
    logMatch(
      "SEARCH_ACCESSORIES",
      REGEX_ACCESSORIES,
      REGEX_ACCESSORIES.exec(input)
    );
    return {
      text: "Complementa tu outfit con nuestros accesorios pro.",
      buttons: ["Ver Todo", "Comprar"],
      action: "RESET",
    };
  }



  // 9. GENDER NAVIGATION
  const menMatch = REGEX_GENDER_MAN.exec(input);
  if (menMatch) {
    // Si ya estaba viendo productos de hombre Y una categoría específica
    if (context?.genderFilter === 'men' && context?.productCategory === 'shorts') {
      logMatch('NAV_MEN_SHORTS_CONTEXT', REGEX_GENDER_MAN, menMatch);
      return {
        text: "Ya estás viendo shorts para hombre. ¿Quieres ver otra categoría?",
        buttons: ["Ver Mallas", "Ver Tops", "Ver Accesorios", "Comprar", "Volver"],
        action: 'FILTER_MEN'
      };
    }
    
    // Si ya estaba en hombre pero sin categoría específica
    if (context?.genderFilter === 'men') {
      logMatch('NAV_MEN_ALREADY', REGEX_GENDER_MAN, menMatch);
      return {
        text: "Ya estás en la sección de HOMBRE. ¿Qué te interesa?",
        buttons: ["Ver Shorts", "Ver Mallas", "Ver Tops", "Comprar", "Ver Todo"],
        action: 'FILTER_MEN'
      };
    }
    
    // Primera vez seleccionando hombre (código existente)
    logMatch('NAV_MEN', REGEX_GENDER_MAN, menMatch);
    return {
      text: "Filtrando catálogo exclusivo para HOMBRE. Potencia y resistencia.",
      buttons: ["Ver Shorts", "Ver Mallas", "Comprar", "Volver"],
      action: 'FILTER_MEN'
    };
  }

  const womenMatch = REGEX_GENDER_WOMAN.exec(input);
  if (womenMatch) {
    // Si ya estaba viendo productos de mujer Y una categoría específica
    if (context?.genderFilter === 'women' && context?.productCategory === 'leggings') {
      logMatch('NAV_WOMEN_LEGGINGS_CONTEXT', REGEX_GENDER_WOMAN, womenMatch);
      return {
        text: "Ya estás viendo leggings para mujer. ¿Quieres ver otra categoría?",
        buttons: ["Ver Shorts", "Ver Tops", "Ver Accesorios", "Comprar", "Volver"],
        action: 'FILTER_WOMEN'
      };
    } else if (context?.genderFilter === 'women' && context?.productCategory === 'tops') {
      logMatch('NAV_WOMEN_TOPS_CONTEXT', REGEX_GENDER_WOMAN, womenMatch);
      return {
        text: "Ya estás viendo tops para mujer. ¿Quieres ver otra categoría?",
        buttons: ["Ver Leggings", "Ver Shorts", "Ver Accesorios", "Comprar", "Volver"],
        action: 'FILTER_WOMEN'
      };
    }
    
    // Si ya estaba en mujer pero sin categoría específica
    if (context?.genderFilter === 'women') {
      logMatch('NAV_WOMEN_ALREADY', REGEX_GENDER_WOMAN, womenMatch);
      return {
        text: "Ya estás en la sección de MUJER. ¿Qué te interesa?",
        buttons: ["Ver Leggings", "Ver Tops", "Ver Shorts", "Comprar", "Ver Todo"],
        action: 'FILTER_WOMEN'
      };
    }
    
    logMatch("NAV_WOMEN", REGEX_GENDER_WOMAN, womenMatch);
    return {
      text: "Filtrando catálogo exclusivo para MUJER. Diseño y confort.",
      buttons: ["Ver Leggings", "Ver Tops", "Comprar", "Volver"],
      action: "FILTER_WOMEN",
    };
  }

  // 10. NOVELTIES
  const newsMatch = REGEX_NEWS.exec(input);
  if (newsMatch) {
    // Si hay contexto de género, mostrar novedades específicas
    if (context?.genderFilter === 'men') {
      logMatch('NAV_NEWS_MEN', REGEX_NEWS, newsMatch);
      return {
        text: "Estos son los últimos 'Drops' para HOMBRE de la temporada. 🔥",
        buttons: ["Comprar", "Ver Shorts", "Ver Mallas", "Ver Todo"],
        action: "FILTER_NEW",
      };
    } else if (context?.genderFilter === 'women') {
      logMatch('NAV_NEWS_WOMEN', REGEX_NEWS, newsMatch);
      return {
        text: "Estos son los últimos 'Drops' para MUJER de la temporada. 🔥",
        buttons: ["Comprar", "Ver Leggings", "Ver Tops", "Ver Todo"],
        action: "FILTER_NEW",
      };
    }
    
    logMatch("NAV_NEWS", REGEX_NEWS, newsMatch);
    return {
      text: "Estos son los últimos 'Drops' de la temporada. 🔥",
      buttons: ["Comprar", "Ver Todo"],
      action: "FILTER_NEW",
    };
  }

  // 11. MENU / CATALOG (General)
  const menuMatch = REGEX_MENU.exec(input);
  if (menuMatch) {
    // Si hay contexto, sugerir continuar desde donde estaba
    if (context?.genderFilter === 'men') {
      logMatch('MENU_MEN_CONTEXT', REGEX_MENU, menuMatch);
      return {
        text: "Acceso total al inventario Nike Legacy. ¿Quieres seguir viendo HOMBRE o explorar otras categorías?",
        buttons: ["Seguir Hombre", "Ver Mujer", "Novedades", "Ofertas", "Comprar"],
        action: "RESET",
      };
    } else if (context?.genderFilter === 'women') {
      logMatch('MENU_WOMEN_CONTEXT', REGEX_MENU, menuMatch);
      return {
        text: "Acceso total al inventario Nike Legacy. ¿Quieres seguir viendo MUJER o explorar otras categorías?",
        buttons: ["Seguir Mujer", "Ver Hombre", "Novedades", "Ofertas", "Comprar"],
        action: "RESET",
      };
    } else if (context?.productCategory) {
      logMatch('MENU_CATEGORY_CONTEXT', REGEX_MENU, menuMatch);
      return {
        text: `Acceso total al inventario Nike Legacy. Estás viendo ${context.productCategory}. ¿Quieres seguir aquí o explorar otras categorías?`,
        buttons: ["Seguir viendo", "Ver Hombre", "Ver Mujer", "Novedades", "Comprar"],
        action: "RESET",
      };
    }
    
    logMatch("MENU_GENERAL", REGEX_MENU, menuMatch);
    return {
      text: "Acceso total al inventario Nike Legacy. ¿Qué categoría prefieres?",
      buttons: ["Hombre", "Mujer", "Novedades", "Ofertas", "Comprar"],
      action: "RESET",
    };
  }

  // 12. MATH
  const mathMatch = REGEX_MATH.exec(input);
  if (mathMatch) {
    logMatch("MATH_CALCULATION", REGEX_MATH, mathMatch);
    const rawBase = mathMatch[1].replace(/[.,]/g, "");
    const base = parseInt(rawBase);
    const sub = parseInt(mathMatch[2]);
    const isPct = !!mathMatch[3];

    let res = 0;
    let exp = "";

    if (isPct) {
      const disc = base * (sub / 100);
      res = base - disc;
      exp = `$${base.toLocaleString()} - ${sub}% ($${disc.toLocaleString()})`;
    } else {
      res = base - sub;
      exp = `$${base.toLocaleString()} - $${sub.toLocaleString()}`;
    }

    // Si hay contexto de navegación, sugerencias más específicas
    if (context?.genderFilter === 'men') {
      return {
        text: `💳 Simulador de Precios:\n${exp} = $${res.toLocaleString()}.\n\n¿Te gustaría añadir productos para HOMBRE al carrito con este valor?`,
        buttons: ["Ir al Carrito", "Seguir viendo Hombre", "Ver Todo"],
      };
    } else if (context?.genderFilter === 'women') {
      return {
        text: `💳 Simulador de Precios:\n${exp} = $${res.toLocaleString()}.\n\n¿Te gustaría añadir productos para MUJER al carrito con este valor?`,
        buttons: ["Ir al Carrito", "Seguir viendo Mujer", "Ver Todo"],
      };
    } else if (context?.productCategory) {
      return {
        text: `💳 Simulador de Precios:\n${exp} = $${res.toLocaleString()}.\n\n¿Te gustaría añadir ${context.productCategory} al carrito con este valor?`,
        buttons: ["Ir al Carrito", "Seguir viendo", "Ver Todo"],
      };
    }

    return {
      text: `💳 Simulador de Precios:\n${exp} = $${res.toLocaleString()}.\n\n¿Te gustaría añadir productos al carrito con este valor?`,
      buttons: ["Ir al Carrito", "Seguir viendo"],
    };
  }

  // 13. FAQs
  if (REGEX_SHIPPING.test(input)) {
    logMatch("FAQ_SHIPPING", REGEX_SHIPPING, REGEX_SHIPPING.exec(input));
    
    // Si hay contexto de navegación, ofrecer continuar
    if (context?.conversationStage === 'browsing') {
      return {
        text: "🚚 ENVÍOS NIKE:\n• Estándar: 3-5 días hábiles (Gratis > $150k).\n• Express: 24-48 horas en ciudades principales.\n\n¿Quieres seguir viendo productos?",
        buttons: ["Seguir viendo", "Comprar", "Ver Todo"],
      };
    }
    
    return {
      text: "🚚 ENVÍOS NIKE:\n• Estándar: 3-5 días hábiles (Gratis > $150k).\n• Express: 24-48 horas en ciudades principales.",
      buttons: ["Ver Catálogo", "Comprar"],
    };
  }

  if (REGEX_RETURNS.test(input)) {
    logMatch("FAQ_RETURNS", REGEX_RETURNS, REGEX_RETURNS.exec(input));
    
    // Si hay contexto de navegación, ofrecer continuar
    if (context?.conversationStage === 'browsing') {
      return {
        text: "🔄 POLÍTICA DE RETORNO:\nTienes 30 días para probar tu producto. Si no te convence, lo devuelves gratis (debe tener etiquetas).\n\n¿Quieres seguir viendo productos?",
        buttons: ["Seguir viendo", "Comprar", "Ver Todo"],
      };
    }
    
    return {
      text: "🔄 POLÍTICA DE RETORNO:\nTienes 30 días para probar tu producto. Si no te convence, lo devuelves gratis (debe tener etiquetas).",
      buttons: ["Ver Catálogo", "Comprar"],
    };
  }

  // 14. GREETING
  const greetingMatch = REGEX_GREETING.exec(input);
  if (greetingMatch) {
    // Si ya había interactuado antes, saludo más personalizado
    if (context?.genderFilter || context?.productCategory) {
      logMatch('GREETING_RETURNING', REGEX_GREETING, greetingMatch);
      const genderText = context.genderFilter === 'men' ? 'HOMBRE' : context.genderFilter === 'women' ? 'MUJER' : '';
      const categoryText = context.productCategory ? context.productCategory : '';
      const contextText = [genderText, categoryText].filter(Boolean).join(' - ');
      
      return {
        text: `¡Hola de nuevo! 👋\nVeo que estabas viendo ${contextText || 'productos'}. ¿Quieres continuar desde donde estabas o explorar algo nuevo?`,
        buttons: ["Continuar", "Ver Todo", "Novedades", "Ayuda"],
      };
    }
    
    logMatch("GREETING", REGEX_GREETING, greetingMatch);
    return {
      text: "¡Hola! Soy N-BOT, tu asistente de equipo. ⚡ \nEstoy aquí para ayudarte a encontrar tu próxima equipación o resolver dudas.",
      buttons: ["Ver Hombre", "Ver Mujer", "Novedades", "Ayuda"],
    };
  }

  // FALLBACK
  logMatch("UNKNOWN", /.*/, null);
  
  // Si hay contexto, sugerencias más específicas
  if (context?.genderFilter === 'men') {
    return {
      text: "No estoy seguro de entender eso. 🤔\nEstás viendo productos para HOMBRE. Prueba con:\n• 'Ver shorts'\n• 'Ver mallas'\n• 'Comprar'\n• 'Volver'",
      buttons: ["Ver Shorts", "Ver Mallas", "Comprar", "Volver", "Ayuda"],
    };
  } else if (context?.genderFilter === 'women') {
    return {
      text: "No estoy seguro de entender eso. 🤔\nEstás viendo productos para MUJER. Prueba con:\n• 'Ver leggings'\n• 'Ver tops'\n• 'Comprar'\n• 'Volver'",
      buttons: ["Ver Leggings", "Ver Tops", "Comprar", "Volver", "Ayuda"],
    };
  } else if (context?.productCategory) {
    return {
      text: `No estoy seguro de entender eso. 🤔\nEstás viendo ${context.productCategory}. Prueba con:\n• 'Ver hombre' o 'Ver mujer'\n• 'Comprar'\n• 'Ver todo'`,
      buttons: ["Ver Hombre", "Ver Mujer", "Comprar", "Ver Todo", "Ayuda"],
    };
  }
  
  return {
    text: "No estoy seguro de entender eso. 🤔\nPrueba con:\n• 'Ver shorts de hombre'\n• '¿Tienen envíos?'\n• 'Precio de 80000 menos 20%'",
    buttons: ["Ver Todo", "Ayuda"],
  };
};
