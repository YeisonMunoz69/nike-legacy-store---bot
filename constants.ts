import { Product } from './types';

// ==========================================
// DATABASE SIMULATION (30+ PRODUCTS)
// ==========================================

const BASE_IMAGES = {
  men_shorts: [
    "https://images.unsplash.com/photo-1591195853828-11db59a44f6b?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1539185441755-769473a23570?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1617317376997-8748e6862c01?auto=format&fit=crop&q=80&w=800"
  ],
  women_leggings: [
    "https://images.unsplash.com/photo-1506619216599-9d16d0903dfd?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1552196563-55cd4e45efb3?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1548690312-e3b507d8c110?auto=format&fit=crop&q=80&w=800"
  ],
  tops: [
    "https://images.unsplash.com/photo-1581655353564-df123a1eb820?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1518459031867-a89b944bffe4?auto=format&fit=crop&q=80&w=800"
  ],
  accessories: [
    "https://images.unsplash.com/photo-1556906781-9a412961c28c?auto=format&fit=crop&q=80&w=800", // Shoes/Accessory placeholder
    "https://images.unsplash.com/photo-1522335789203-abd7fe01d169?auto=format&fit=crop&q=80&w=800"  // Cap placeholder
  ]
};

export const PRODUCTS: Product[] = [
  // MEN SHORTS
  { id: 1, name: "Nike Pro Dri-FIT ADV", description: "Shorts de compresión avanzados con tecnología de absorción de sudor.", category: "shorts", gender: "men", price: 45000, image: BASE_IMAGES.men_shorts[0], isNew: true },
  { id: 2, name: "Nike Aeroswift Racing", description: "Ligereza máxima para maratón, diseñados para la velocidad.", category: "shorts", gender: "men", price: 52000, image: BASE_IMAGES.men_shorts[1] },
  { id: 3, name: "Nike Challenger Wild Run", description: "Versatilidad para todo terreno con bolsillos seguros.", category: "shorts", gender: "men", price: 38000, image: BASE_IMAGES.men_shorts[2], onSale: true },
  { id: 4, name: "Jordan Dri-FIT Sport", description: "Estilo baloncesto con rendimiento running híbrido.", category: "shorts", gender: "men", price: 48000, image: "https://images.unsplash.com/photo-1605296867304-6f2b5af929f8?auto=format&fit=crop&q=80&w=800" },
  { id: 5, name: "Nike Yoga Dri-FIT", description: "Tejido suave para movimiento fluido y estiramientos profundos.", category: "shorts", gender: "men", price: 42000, image: BASE_IMAGES.men_shorts[0] },
  { id: 6, name: "Nike Flex Stride", description: "Movimiento natural sin restricciones, ideal para entrenar.", category: "shorts", gender: "men", price: 46000, image: BASE_IMAGES.men_shorts[1] },
  { id: 7, name: "Nike Trail Second Skin", description: "Resistencia para montaña y senderos difíciles.", category: "shorts", gender: "men", price: 55000, image: BASE_IMAGES.men_shorts[2] },
  
  // WOMEN LEGGINGS
  { id: 10, name: "Nike Go Firm-Support", description: "Soporte firme que no se baja ni se enrolla.", category: "leggings", gender: "women", price: 89000, image: BASE_IMAGES.women_leggings[0], isNew: true },
  { id: 11, name: "Nike Zenvy Gentle", description: "Suavidad extrema para usar todo el día, sensación nube.", category: "leggings", gender: "women", price: 110000, image: BASE_IMAGES.women_leggings[1] },
  { id: 12, name: "Nike Pro 365", description: "Malla transpirable en pantorrillas para flujo de aire.", category: "leggings", gender: "women", price: 75000, image: BASE_IMAGES.women_leggings[2] },
  { id: 13, name: "Nike One Luxe", description: "Nuestra tela más versátil, no se transparenta.", category: "leggings", gender: "women", price: 95000, image: BASE_IMAGES.women_leggings[0] },
  { id: 14, name: "Nike Epic Fast", description: "Bolsillos múltiples y ajuste seguro con cordón.", category: "leggings", gender: "women", price: 82000, image: BASE_IMAGES.women_leggings[1], onSale: true },
  { id: 15, name: "Nike Yoga 7/8", description: "Corte al tobillo y cintura alta para soporte abdominal.", category: "leggings", gender: "women", price: 88000, image: BASE_IMAGES.women_leggings[2] },
  { id: 16, name: "Jordan Heatwave", description: "Diseño urbano y atrevido con estampados únicos.", category: "leggings", gender: "women", price: 92000, image: BASE_IMAGES.women_leggings[0] },
  
  // WOMEN SHORTS
  { id: 20, name: "Nike Tempo Luxe", description: "El clásico renovado con tela repelente al agua.", category: "shorts", gender: "women", price: 35000, image: "https://images.unsplash.com/photo-1548690312-e3b507d8c110?auto=format&fit=crop&q=80&w=800" },
  { id: 21, name: "Nike Pro 3-Inch", description: "Corte corto para máxima libertad de movimiento.", category: "shorts", gender: "women", price: 32000, image: BASE_IMAGES.women_leggings[2] },
  
  // MEN LEGGINGS (TIGHTS)
  { id: 30, name: "Nike Pro Warm", description: "Calor sin peso extra, ideal para capas base.", category: "leggings", gender: "men", price: 60000, image: "https://images.unsplash.com/photo-1518459031867-a89b944bffe4?auto=format&fit=crop&q=80&w=800" },
  { id: 31, name: "Nike Dri-FIT Challenger", description: "Mallas de running con bolsillos y cremalleras en tobillos.", category: "leggings", gender: "men", price: 65000, image: BASE_IMAGES.men_shorts[2] },

  // TOPS / UNISEX
  { id: 40, name: "Nike Miler Top", description: "Protección UV y tejido ultra ligero.", category: "tops", gender: "men", price: 40000, image: BASE_IMAGES.tops[0] },
  { id: 41, name: "Nike Element Half-Zip", description: "Capa intermedia perfecta con control de temperatura.", category: "tops", gender: "women", price: 55000, image: BASE_IMAGES.tops[1] },
  { id: 42, name: "Nike Windrunner", description: "Rompevientos icónico, repelente a la lluvia ligera.", category: "tops", gender: "unisex", price: 120000, image: BASE_IMAGES.tops[0], isNew: true },
  { id: 43, name: "Nike Tech Fleece", description: "Calidez premium sin volumen excesivo.", category: "tops", gender: "men", price: 110000, image: BASE_IMAGES.tops[1] },

  // ACCESSORIES
  { id: 50, name: "Nike Heritage Cap", description: "Estilo clásico de 6 paneles.", category: "accessories", gender: "unisex", price: 25000, image: BASE_IMAGES.accessories[1] },
  { id: 51, name: "Nike Elite Socks", description: "Pack x3 Pares con amortiguación zonal.", category: "accessories", gender: "unisex", price: 15000, image: BASE_IMAGES.accessories[0] }
];

/* 
   ==========================================================================
   ADVANCED REGEX ENGINE - WORLD CLASS MATCHING
   ==========================================================================
*/

// 1. OFFENSIVE (Robust Blocker)
export const REGEX_OFFENSIVE = /\b(mierd[a-z]*|put[az][a-z]*|caca|pendej[oa]|verga|malparid[oa]|gonorrea|imbecil|idiota|estupid[oa]|basura)\b/i;

// 2. GREETING (Conversational)
export const REGEX_GREETING = /\b(h?ola|buenas?(\s+(tardes|dias|noches))?|hey|que\s+(tal|mas|hace|hubo)|hi|hello|wena[sz]?|saludos|holi[sz]?|alo|buenos)\b/i;

// 3. MENU / CATALOG / DISCOVERY
export const REGEX_MENU = /\b(ver|mirar|buscar|explorar|tienes|quiero|mostrar|enseñame)?\s*(el|los|las|mis|tus)?\s*(cat[aá]log[oa]s?|men[uú]|opci[oó]ne?s?|art[ií]culos|ropas?|colecci[oó]n|productos|stock|inventario|lista|todo|cosas?|tienda)\b/i;

// 4. GENDER FILTER
export const REGEX_GENDER_MAN = /\b(hombres?|caballeros?|chicos?|varon(es)?|men|man|niños?|masculino)\b/i;
export const REGEX_GENDER_WOMAN = /\b(mujer(es)?|damas?|chicas?|femenin[oa]|woman|women|niñas?|se?or(a|ita)?)\b/i;

// 5. PRODUCTS
export const REGEX_SHORTS = /\b(short|pantalon(eta|cillo|cito|ucas)?s?|bermuda|cortos?|biker[s]?|bañador(es)?)\b/i;
export const REGEX_LEGGINGS = /\b(legg|mall|licr|calz|legin|tight|yoga\s*pant)[a-z]*\b/i;
export const REGEX_TOPS = /\b(top|camis(a|eta)|remera|polera|sudadera|hoodie|buso|chaqueta|sueter|corte\s*v|tank|bra)\b[a-z]*/i;
export const REGEX_ACCESSORIES = /\b(accesorios?|gorr[as]|cachucha|medias?|calcetin(es)?|balon(es)?|bols[oa]s?|mochilas?|zapas?|tenis|zapatillas?)\b/i;

// 6. MATH
export const REGEX_MATH = /(?:cuanto\s+es\s+|precio\s+|calcul[ao]\s+|costo\s+)?(\d[\d\.,]*)\s*(?:-|menos|desc[a-z]*|rebaja|off|con\s+el)\s*(\d+)\s*(%|por\s*ciento|off)?/i;

// 7. SHIPPING & RETURNS
export const REGEX_SHIPPING = /\b(envi[oa]s?|despach[oa]s?|entregas?|domicilio|llega[nr]?|costo\s+envio|shipping|delivery|transporte)\b/i;
export const REGEX_RETURNS = /\b(devoluci[oó]n(es)?|cambios?|garant[ií]a|reembolso|retornar|plazo|regresar|money\s*back)\b/i;

// 8. CART ACTIONS
export const REGEX_CART = /\b(carrito|cesta|bolsa|pagar|checkout|finalizar|compra|llevarmel[oa]|cobrame)\b/i;

// 8.5. PURCHASE / BUY ACTION
export const REGEX_PURCHASE = /\b(comprar|compr[ao]|llevar|adquirir|agregar\s+al\s+carrito|añadir|buy|purchase|quiero\s+este|me\s+lo\s+llevo)\b/i;

// 8.6. BUTTON ACTIONS (Reconocer textos de botones)
export const REGEX_BUTTON_HOMBRE = /\b(hombre|hombres|men|masculino|caballero|ver\s+hombre)\b/i;
export const REGEX_BUTTON_MUJER = /\b(mujer|mujeres|women|femenino|dama|ver\s+mujer)\b/i;
export const REGEX_BUTTON_SHORTS = /\b(shorts?\s+hombre|shorts?\s+mujer|shorts?|ver\s+shorts?)\b/i;
export const REGEX_BUTTON_LEGGINGS = /\b(leggings?\s+mujer|mallas?\s+hombre|leggings?|mallas?|ver\s+leggings?|ver\s+mallas?)\b/i;
export const REGEX_BUTTON_TOPS = /\b(tops?\s+mujer|camisetas?\s+hombre|tops?|camisetas?|ver\s+tops?|ver\s+camisetas?)\b/i;
export const REGEX_BUTTON_NOVEDADES = /\b(novedades?|nuevos?|lanzamientos?|ver\s+novedades?)\b/i;
export const REGEX_BUTTON_OFERTAS = /\b(ofertas?|descuentos?|rebajas?|sale|ver\s+ofertas?)\b/i;
export const REGEX_BUTTON_CATALOGO = /\b(cat[aá]logo|ver\s+todo|todo|productos|ver\s+cat[aá]logo)\b/i;
export const REGEX_BUTTON_AYUDA = /\b(ayuda|help|soporte|asistencia)\b/i;
export const REGEX_BUTTON_VOLVER = /\b(volver|atr[aá]s|regresar|back)\b/i;
export const REGEX_BUTTON_CARRITO = /\b(carrito|bolsa|cesta|ver\s+carrito|ir\s+al\s+carrito|ver\s+bolsa)\b/i;
export const REGEX_BUTTON_ACCESORIOS = /\b(accesorios?|ver\s+accesorios?)\b/i;
export const REGEX_BUTTON_DEPORTIVOS = /\b(deportivos?|ver\s+deportivos?)\b/i;
export const REGEX_BUTTON_CASUALES = /\b(casuales?|ver\s+casuales?)\b/i;
export const REGEX_BUTTON_COMPRESION = /\b(compresi[oó]n|ver\s+compresi[oó]n)\b/i;
export const REGEX_BUTTON_SEGUIR_COMPRANDO = /\b(seguir\s+comprando|seguir\s+viendo|continuar\s+comprando|seguir|continuar)\b/i;
export const REGEX_BUTTON_VOLVER_COMPRAR = /\b(volver\s+a\s+comprar|comprar\s+mas|comprar\s+otra\s+vez)\b/i;
export const REGEX_BUTTON_EMPEZAR_NUEVO = /\b(empezar\s+de\s+nuevo|empezar\s+nuevo|reiniciar|nuevo\s+chat|limpiar)\b/i;

// 9. NEWS / NOVELTIES
export const REGEX_NEWS = /\b(nuev[oa]s?|novedad(es)?|lanzamientos?|ultim[oa]|recie?n|moda|tendencia|new|arrival)\b/i;

// 10. STORE LOCATION
export const REGEX_STORE_INFO = /\b(d[oó]nde\s+(est[aá]n|queda)|ubicaci[oó]n|direcci[oó]n|local|tienda\s+f[ií]sica|horarios?|abiert[oa]|cerrad[oa]|hora\s+de\s+atenci[oó]n)\b/i;

// ==========================================
// EMOTIONAL INTELLIGENCE REGEX
// ==========================================

// 11. GRATITUDE (Positive Feedback)
// Matches: "Gracias", "Te agradezco", "Muy amable", "Thx", "Crack", "Genial"
export const REGEX_GRATITUDE = /\b(gracias?|te\s+agradezco|thx|ty|tysm|grax|grac|vale|ok\s+gracias|muy\s+amable|eres\s+(un\s+)?crack|genial|excelente|super|chevere)\b/i;

// 12. CONFUSION / HELP (Neutral/Anxious Feedback)
// Matches: "No entiendo", "Me perdi", "Que es esto", "Ayuda", "¿Como?", "Humano"
export const REGEX_CONFUSION = /\b(no\s+entiendo|me\s+perd[ií]|que\s+dices|no\s+se|como\s+funciona|que\s+hago|ayuda|soporte|human[oa]|persona|agente|error|problema|socorro|help)\b/i;

// 13. ANGER / FRUSTRATION (Negative Feedback)
// Matches: "Inutil", "No sirves", "Malo", "Pesimo", "Lento", "Odio"
// Note: Distinct from OFFENSIVE. These are complaints about service/quality.
export const REGEX_ANGER = /\b(in[uú]til|mal[oa]|p[eé]sim[oa]|lent[oa]|torpe|no\s+sirve[s]?|servicio\s+horrible|no\s+me\s+gusta|feo|tonto)\b/i;

// 14. DISMISSAL / CLOSING (Ending interaction)
// Matches: "Chao", "Adios", "Nada", "No quiero", "Dejalo asi", "Bye"
export const REGEX_DISMISSAL = /\b(chao|adi[oó]s|bai|bye|nada|no\s+quiero|dejalo|olvidalo|luego|hasta\s+luego|ya\s+no|cancelar|salir)\b/i;