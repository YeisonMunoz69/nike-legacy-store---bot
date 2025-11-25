# Nike Legacy Store & Bot - Sistema de Chatbot con Expresiones Regulares

<div align="center">
  <h3>Proyecto de E-commerce con Asistente Virtual Inteligente</h3>
  <p>Desarrollado con React, TypeScript y un motor de expresiones regulares avanzado</p>
</div>

---

## 1. Descripción del Proyecto

El **Nike Legacy Store & Bot** es una aplicación web de comercio electrónico que integra un chatbot conversacional diseñado para asistir a los usuarios en la navegación y compra de productos deportivos. El sistema funciona como una tienda virtual de Nike que permite a los clientes explorar un catálogo de más de 5 productos, filtrar por categorías (shorts, leggings, tops, accesorios) y género (hombre, mujer, unisex), realizar cálculos de precios con descuentos, y completar transacciones de compra.

El objetivo general del chatbot, denominado **N-BOT**, es proporcionar una experiencia de usuario fluida y natural mediante el reconocimiento de intenciones del usuario a través de expresiones regulares. El sistema puede interpretar consultas en lenguaje natural, responder preguntas frecuentes sobre envíos y devoluciones, calcular descuentos matemáticos, gestionar el carrito de compras, y mantener un contexto conversacional que permite respuestas más precisas y personalizadas según el historial de la interacción.

El proyecto demuestra la implementación práctica de procesamiento de lenguaje natural (NLP) básico utilizando expresiones regulares, sin depender de modelos de machine learning complejos, lo que lo hace eficiente y fácil de mantener. Además, incorpora un sistema de logging en tiempo real que permite visualizar cómo el bot procesa cada entrada del usuario, mostrando la intención detectada y la expresión regular utilizada.

---

## 2. Diseño de Expresiones Regulares

El sistema utiliza un conjunto extenso de expresiones regulares organizadas por prioridad y funcionalidad. A continuación se detalla cada intención reconocida:

### 2.1. Intención: Saludo (GREETING)

**Regex utilizada:**
```javascript
/\b(h?ola|buenas?(\s+(tardes|dias|noches))?|hey|que\s+(tal|mas|hace|hubo)|hi|hello|wena[sz]?|saludos|holi[sz]?|alo|buenos)\b/i
```

**Explicación:**
Esta expresión regular está diseñada para capturar variaciones comunes de saludos en español e inglés. Utiliza límites de palabra (`\b`) para evitar coincidencias parciales dentro de otras palabras. Incluye variantes como "hola", "buenos días", "buenas tardes", "hey", "qué tal", y sus equivalentes en inglés. La bandera `i` hace que la búsqueda sea insensible a mayúsculas y minúsculas, permitiendo reconocer "HOLA", "Hola", "hola" de la misma manera. El patrón también contempla abreviaciones informales como "wena" o "holis", comunes en comunicación digital.

**Casos que detecta correctamente:**
- "Hola"
- "Buenos días"
- "Buenas tardes"
- "Hey, qué tal"
- "Hello"
- "Saludos"
- "Qué más"

**Casos que NO debería detectar:**
- "Hola mundo" (aunque técnicamente lo detecta, el sistema puede manejarlo)
- "Buenos días laborales" (detecta "buenos días" pero el contexto adicional puede requerir procesamiento)
- Palabras que contengan "hola" como parte de otra palabra (el `\b` previene esto)

---

### 2.2. Intención: Lenguaje Ofensivo (OFFENSIVE)

**Regex utilizada:**
```javascript
/\b(mierd[a-z]*|put[az][a-z]*|caca|pendej[oa]|verga|malparid[oa]|gonorrea|imbecil|idiota|estupid[oa]|basura)\b/i
```

**Explicación:**
Esta expresión regular actúa como un filtro de seguridad de alta prioridad para detectar lenguaje ofensivo o inapropiado. Utiliza límites de palabra para evitar falsos positivos y permite variaciones de palabras ofensivas mediante el patrón `[a-z]*`, que captura cualquier combinación de letras después de la raíz. Por ejemplo, "mierda", "mierdas", "mierdoso" serían detectados. El sistema está diseñado para responder de manera educada pero firme cuando detecta este tipo de lenguaje, promoviendo un ambiente respetuoso.

**Casos que detecta correctamente:**
- "Mierda"
- "Pendejo"
- "Idiota"
- "Estúpido"
- "Basura"

**Casos que NO debería detectar:**
- Palabras que contengan estas raíces pero en contextos legítimos (el `\b` ayuda a prevenir esto)
- Expresiones que suenen similares pero no sean ofensivas

---

### 2.3. Intención: Navegación por Género - Hombre (GENDER_MAN)

**Regex utilizada:**
```javascript
/\b(hombres?|caballeros?|chicos?|varon(es)?|men|man|niños?|masculino)\b/i
```

**Explicación:**
Esta expresión regular permite al sistema identificar cuando el usuario quiere filtrar productos para el género masculino. Incluye variaciones formales e informales, así como términos en inglés. El patrón `hombres?` permite reconocer tanto "hombre" como "hombres", mientras que `varon(es)?` captura "varón" y "varones". El sistema responde filtrando el catálogo y mostrando solo productos destinados a hombres, mejorando la experiencia de navegación.

**Casos que detecta correctamente:**
- "Hombre"
- "Hombres"
- "Caballeros"
- "Chicos"
- "Men"
- "Masculino"

**Casos que NO debería detectar:**
- "Hombrecito" (aunque técnicamente contiene "hombre", el `\b` puede permitir esto)
- Contextos donde "hombre" se use en otras frases no relacionadas con filtrado

---

### 2.4. Intención: Navegación por Género - Mujer (GENDER_WOMAN)

**Regex utilizada:**
```javascript
/\b(mujer(es)?|damas?|chicas?|femenin[oa]|woman|women|niñas?|se?or(a|ita)?)\b/i
```

**Explicación:**
Similar a la intención de género masculino, esta expresión regular identifica consultas relacionadas con productos para mujeres. Incluye variaciones como "mujer/mujeres", términos formales como "damas" y "señora/señorita", y también reconocimiento en inglés. El patrón `se?or(a|ita)?` es particularmente útil para capturar "señora" y "señorita" con sus variaciones de escritura.

**Casos que detecta correctamente:**
- "Mujer"
- "Mujeres"
- "Damas"
- "Chicas"
- "Women"
- "Señora"

**Casos que NO debería detectar:**
- Uso de "mujer" en contextos no relacionados con productos
- Frases donde "mujer" aparezca como parte de otra palabra

---

### 2.5. Intención: Búsqueda de Productos - Shorts (SHORTS)

**Regex utilizada:**
```javascript
/\b(short|pantalon(eta|cillo|cito|ucas)?s?|bermuda|cortos?|biker[s]?|bañador(es)?)\b/i
```

**Explicación:**
Esta expresión regular está diseñada para reconocer consultas relacionadas con shorts o pantalonetas. Incluye términos en inglés ("short"), variaciones en español como "pantaloneta", "pantaloncillo", "pantaloncito", y términos regionales como "bermuda" o "cortos". El patrón `pantalon(eta|cillo|cito|ucas)?s?` permite reconocer múltiples variaciones de la palabra "pantalón" con diferentes sufijos, y el `s?` opcional permite plurales.

**Casos que detecta correctamente:**
- "Short"
- "Shorts"
- "Pantaloneta"
- "Pantaloncillos"
- "Bermuda"
- "Cortos"
- "Bañador"

**Casos que NO debería detectar:**
- "Pantalón largo" (aunque contiene "pantalón", el contexto "largo" podría requerir procesamiento adicional)
- Términos similares que no se refieran a shorts

---

### 2.6. Intención: Búsqueda de Productos - Leggings (LEGGINGS)

**Regex utilizada:**
```javascript
/\b(legg|mall|licr|calz|legin|tight|yoga\s*pant)[a-z]*\b/i
```

**Explicación:**
Esta expresión regular utiliza un enfoque diferente, buscando raíces de palabras relacionadas con leggings, mallas y licras. El patrón `[a-z]*` después de cada raíz permite capturar variaciones como "leggings", "mallas", "licras", "calzas", "tight", y "yoga pants". El `\s*` en "yoga\s*pant" permite espacios opcionales entre "yoga" y "pant". Este enfoque es útil porque estas palabras tienen muchas variaciones y terminaciones.

**Casos que detecta correctamente:**
- "Leggings"
- "Mallas"
- "Licras"
- "Calzas"
- "Tight"
- "Yoga pants"

**Casos que NO debería detectar:**
- Palabras que contengan estas raíces pero en contextos diferentes
- Términos similares que no se refieran a leggings

---

### 2.7. Intención: Búsqueda de Productos - Tops (TOPS)

**Regex utilizada:**
```javascript
/\b(top|camis(a|eta)|remera|polera|sudadera|hoodie|buso|chaqueta|sueter|corte\s*v|tank|bra)\b[a-z]*/i
```

**Explicación:**
Esta expresión regular reconoce consultas relacionadas con prendas superiores. Incluye términos como "top", "camiseta", "remera", "sudadera", "hoodie", y variaciones regionales. El patrón `camis(a|eta)` permite reconocer tanto "camisa" como "camiseta", mientras que `corte\s*v` captura "corte v" o "cortev" (referencia a camisetas sin mangas). El `[a-z]*` al final permite variaciones como "hoodies" (plural).

**Casos que detecta correctamente:**
- "Top"
- "Camiseta"
- "Remera"
- "Sudadera"
- "Hoodie"
- "Buso"
- "Chaqueta"

**Casos que NO debería detectar:**
- Uso de estos términos en contextos no relacionados con ropa
- Palabras compuestas que contengan estos términos pero con significados diferentes

---

### 2.8. Intención: Cálculos Matemáticos (MATH)

**Regex utilizada:**
```javascript
/(?:cuanto\s+es\s+|precio\s+|calcul[ao]\s+|costo\s+)?(\d[\d\.,]*)\s*(?:-|menos|desc[a-z]*|rebaja|off|con\s+el)\s*(\d+)\s*(%|por\s*ciento|off)?/i
```

**Explicación:**
Esta es una de las expresiones regulares más complejas del sistema, diseñada para reconocer solicitudes de cálculo de precios con descuentos. El patrón utiliza grupos de captura para extraer el precio base y el descuento. La parte `(?:cuanto\s+es\s+|precio\s+|calcul[ao]\s+|costo\s+)?` es un grupo no capturador opcional que permite frases introductorias. El patrón `(\d[\d\.,]*)` captura números que pueden incluir comas o puntos como separadores de miles. La parte final `(%|por\s*ciento|off)?` determina si el descuento es porcentual o fijo.

**Casos que detecta correctamente:**
- "50000 menos 20%"
- "Cuánto es 100000 menos 15000"
- "50000 - 20%"

**Casos que NO debería detectar:**
- Expresiones matemáticas que no sigan el patrón precio-descuento
- Números que no representen precios válidos
- Frases que contengan números pero no sean solicitudes de cálculo

---

### 2.9. Intención: Información de Envíos (SHIPPING)

**Regex utilizada:**
```javascript
/\b(envi[oa]s?|despach[oa]s?|entregas?|domicilio|llega[nr]?|costo\s+envio|shipping|delivery|transporte)\b/i
```

**Explicación:**
Esta expresión regular identifica consultas relacionadas con información de envío y entrega. Incluye variaciones como "envío/envíos", "despacho/despachos", "entrega/entregas", y términos en inglés como "shipping" y "delivery". El patrón `llega[nr]?` captura "llega" y "llegan", mientras que `costo\s+envio` permite espacios opcionales entre palabras.

**Casos que detecta correctamente:**
- "Envíos"
- "Despacho"
- "Entrega"
- "Domicilio"
- "Shipping"
- "Delivery"
- "Costo envío"

**Casos que NO debería detectar:**
- Uso de estos términos en contextos no relacionados con compras
- Frases donde aparezcan estas palabras pero con otros significados

---

### 2.10. Intención: Política de Devoluciones (RETURNS)

**Regex utilizada:**
```javascript
/\b(devoluci[oó]n(es)?|cambios?|garant[ií]a|reembolso|retornar|plazo|regresar|money\s*back)\b/i
```

**Explicación:**
Esta expresión regular reconoce consultas sobre políticas de devolución, cambios y garantías. Incluye variaciones con y sin tilde (`devoluci[oó]n`), plurales opcionales, y términos en inglés como "money back". El patrón es flexible para capturar diferentes formas en que los usuarios pueden preguntar sobre devoluciones.

**Casos que detecta correctamente:**
- "Devolución"
- "Devoluciones"
- "Cambios"
- "Garantía"
- "Reembolso"
- "Money back"

**Casos que NO debería detectar:**
- Uso de estos términos en contextos no relacionados con compras
- Frases donde "cambio" se refiera a cambio de dinero o moneda

---

### 2.11. Intención: Acciones del Carrito (CART)

**Regex utilizada:**
```javascript
/\b(carrito|cesta|bolsa|pagar|checkout|finalizar|compra|llevarmel[oa]|cobrame)\b/i
```

**Explicación:**
Esta expresión regular identifica cuando el usuario quiere acceder al carrito de compras o finalizar una compra. Incluye términos comunes como "carrito", "cesta", "bolsa", y acciones como "pagar", "checkout", "finalizar compra". También captura expresiones coloquiales como "llevarmelo" o "cobrame".

**Casos que detecta correctamente:**
- "Carrito"
- "Bolsa"
- "Pagar"
- "Checkout"
- "Finalizar compra"
- "Llevarmelo"

**Casos que NO debería detectar:**
- Uso de "bolsa" en contextos no relacionados con compras
- Frases donde "pagar" aparezca en otros contextos

---

### 2.12. Intención: Compra/Adquisición (PURCHASE)

**Regex utilizada:**
```javascript
/\b(comprar|compr[ao]|llevar|adquirir|agregar\s+al\s+carrito|añadir|buy|purchase|quiero\s+este|me\s+lo\s+llevo)\b/i
```

**Explicación:**
Esta expresión regular identifica intenciones de compra o adquisición de productos. Incluye verbos de acción como "comprar", "llevar", "adquirir", y frases específicas como "agregar al carrito" o "quiero este". El patrón `compr[ao]` captura tanto "comprar" como "compro" (presente del verbo).

**Casos que detecta correctamente:**
- "Comprar"
- "Compro"
- "Llevar"
- "Agregar al carrito"
- "Buy"
- "Quiero este"

**Casos que NO debería detectar:**
- Uso de "comprar" en contextos hipotéticos o de conversación general
- Frases donde "llevar" se refiera a transportar algo físicamente

---

### 2.13. Intención: Gratitud (GRATITUDE)

**Regex utilizada:**
```javascript
/\b(gracias?|te\s+agradezco|thx|ty|tysm|grax|grac|vale|ok\s+gracias|muy\s+amable|eres\s+(un\s+)?crack|genial|excelente|super|chevere)\b/i
```

**Explicación:**
Esta expresión regular forma parte del sistema de "inteligencia emocional" del bot, diseñado para reconocer expresiones de gratitud y feedback positivo. Incluye formas formales e informales de agradecimiento, abreviaciones comunes en comunicación digital ("thx", "ty"), y expresiones coloquiales de aprobación como "eres un crack" o "chevere". El sistema responde de manera amigable y puede ofrecer continuar ayudando.

**Casos que detecta correctamente:**
- "Gracias"
- "Te agradezco"
- "Thx"
- "Muy amable"
- "Eres un crack"
- "Genial"

**Casos que NO debería detectar:**
- Uso sarcástico de estas expresiones (difícil de detectar sin contexto adicional)
- Palabras que contengan estas raíces pero con otros significados

---

### 2.14. Intención: Confusión/Ayuda (CONFUSION)

**Regex utilizada:**
```javascript
/\b(no\s+entiendo|me\s+perd[ií]|que\s+dices|no\s+se|como\s+funciona|que\s+hago|ayuda|soporte|human[oa]|persona|agente|error|problema|socorro|help)\b/i
```

**Explicación:**
Esta expresión regular identifica cuando el usuario está confundido o necesita ayuda. Captura expresiones de confusión como "no entiendo", "me perdí", y solicitudes directas de ayuda. También reconoce cuando el usuario solicita hablar con un agente humano. El sistema responde ofreciendo guía y opciones claras para continuar.

**Casos que detecta correctamente:**
- "No entiendo"
- "Me perdí"
- "Ayuda"
- "Soporte"
- "Humano"
- "Help"
- "Problema"

**Casos que NO debería detectar:**
- Uso de "ayuda" en contextos donde se ofrezca ayuda a otros
- Frases donde "problema" aparezca en contextos no relacionados con dificultades del usuario

---

### 2.15. Intención: Frustración/Enojo (ANGER)

**Regex utilizada:**
```javascript
/\b(in[uú]til|mal[oa]|p[eé]sim[oa]|lent[oa]|torpe|no\s+sirve[s]?|servicio\s+horrible|no\s+me\s+gusta|feo|tonto)\b/i
```

**Explicación:**
Esta expresión regular forma parte del sistema de inteligencia emocional, diseñada para detectar frustración o enojo del usuario con el servicio. Es distinta de la intención OFENSIVE porque se enfoca en quejas sobre la calidad del servicio más que en lenguaje grosero. El sistema responde con empatía y ofrece soluciones, como transferir a un agente humano o intentar nuevamente.

**Casos que detecta correctamente:**
- "Inútil"
- "Malo"
- "Pésimo"
- "No sirve"
- "Servicio horrible"
- "No me gusta"

**Casos que NO debería detectar:**
- Uso de estos términos para describir productos (no el servicio)
- Expresiones donde "malo" se use en otros contextos

---

### 2.16. Intención: Despedida/Cierre (DISMISSAL)

**Regex utilizada:**
```javascript
/\b(chao|adi[oó]s|bai|bye|nada|no\s+quiero|dejalo|olvidalo|luego|hasta\s+luego|ya\s+no|cancelar|salir)\b/i
```

**Explicación:**
Esta expresión regular identifica cuando el usuario quiere terminar la conversación o cancelar una acción. Incluye despedidas formales e informales, y expresiones de cancelación. El sistema responde de manera amigable y puede ofrecer estar disponible si el usuario cambia de opinión.

**Casos que detecta correctamente:**
- "Chao"
- "Adiós"
- "Bye"
- "No quiero"
- "Cancelar"
- "Hasta luego"

**Casos que NO debería detectar:**
- Uso de "nada" en contextos donde no signifique rechazo
- Frases donde "salir" se refiera a salir de un lugar físico

---

### 2.17. Intención: Información de la Tienda (STORE_INFO)

**Regex utilizada:**
```javascript
/\b(d[oó]nde\s+(est[aá]n|queda)|ubicaci[oó]n|direcci[oó]n|local|tienda\s+f[ií]sica|horarios?|abiert[oa]|cerrad[oa]|hora\s+de\s+atenci[oó]n)\b/i
```

**Explicación:**
Esta expresión regular identifica consultas sobre la ubicación física de la tienda, horarios de atención, y información relacionada. Incluye variaciones con y sin tildes, y diferentes formas de preguntar por ubicación. El sistema responde proporcionando la dirección y horarios de la tienda física.

**Casos que detecta correctamente:**
- "Dónde está"
- "Ubicación"
- "Dirección"
- "Horarios"
- "Tienda física"
- "Hora de atención"

**Casos que NO debería detectar:**
- Uso de "dirección" en contextos de navegación o instrucciones
- Frases donde "horario" se refiera a otros tipos de horarios

---

### 2.18. Intención: Novedades/Lanzamientos (NEWS)

**Regex utilizada:**
```javascript
/\b(nuev[oa]s?|novedad(es)?|lanzamientos?|ultim[oa]|recie?n|moda|tendencia|new|arrival)\b/i
```

**Explicación:**
Esta expresión regular identifica cuando el usuario quiere ver productos nuevos o lanzamientos recientes. Incluye términos como "nuevo/nueva", "novedades", "lanzamientos", y palabras relacionadas con tendencias. El sistema responde filtrando productos marcados como nuevos en el catálogo.

**Casos que detecta correctamente:**
- "Nuevos"
- "Novedades"
- "Lanzamientos"
- "Último"
- "New"
- "Tendencia"

**Casos que NO debería detectar:**
- Uso de "nuevo" para describir productos específicos no relacionados con lanzamientos
- Frases donde "tendencia" se use en otros contextos

---

### 2.19. Intención: Menú/Catálogo General (MENU)

**Regex utilizada:**
```javascript
/\b(ver|mirar|buscar|explorar|tienes|quiero|mostrar|enseñame)?\s*(el|los|las|mis|tus)?\s*(cat[aá]log[oa]s?|men[uú]|opci[oó]ne?s?|art[ií]culos|ropas?|colecci[oó]n|productos|stock|inventario|lista|todo|cosas?|tienda)\b/i
```

**Explicación:**
Esta es una de las expresiones regulares más complejas, diseñada para reconocer solicitudes generales de ver el catálogo o menú de productos. Incluye verbos de acción opcionales al inicio, artículos opcionales, y múltiples términos que pueden referirse al catálogo. El patrón es flexible para capturar diferentes formas de solicitar ver todos los productos disponibles.

**Casos que detecta correctamente:**
- "Ver catálogo"
- "Mostrar productos"
- "Quiero ver todo"
- "Menú"
- "Inventario"
- "Lista"

**Casos que NO debería detectar:**
- Solicitudes específicas de productos (que tienen sus propias intenciones)
- Uso de "todo" en contextos no relacionados con productos

---

## 3. Diseño del Menú y Flujo de Conversación

### 3.1. Menú Inicial después del Saludo

Cuando el usuario inicia una conversación con un saludo, el sistema responde con un mensaje de bienvenida y presenta un menú de opciones principales mediante botones interactivos. El mensaje inicial es:

> "¡Hola! Soy N-BOT, tu asistente de equipo. ⚡ \nEstoy aquí para ayudarte a encontrar tu próxima equipación o resolver dudas."

**Opciones disponibles en el menú inicial:**
- **Ver Hombre**: Filtra el catálogo para mostrar solo productos masculinos
- **Ver Mujer**: Filtra el catálogo para mostrar solo productos femeninos
- **Novedades**: Muestra los productos más recientes o lanzamientos
- **Ayuda**: Proporciona información sobre cómo usar el bot y qué puede hacer

### 3.2. Flujo de Navegación por Categorías

Una vez que el usuario selecciona un género (hombre o mujer), el sistema presenta opciones más específicas relacionadas con ese género. Por ejemplo, si el usuario selecciona "Ver Hombre", el bot responde:

> "Filtrando catálogo exclusivo para HOMBRE. Potencia y resistencia."

Y presenta botones como:
- **Ver Shorts**: Muestra pantalonetas para hombre
- **Ver Mallas**: Muestra leggings/mallas para hombre
- **Comprar**: Abre el carrito de compras
- **Volver**: Regresa al menú principal

### 3.3. Transacción Seleccionada

Cuando el usuario expresa interés en comprar (mediante palabras como "comprar", "llevar", "agregar al carrito"), el sistema responde abriendo el carrito de compras. Si el usuario hace clic en el botón "Pagar Ahora" dentro del carrito, se completa la transacción.

### 3.4. Mensaje de Confirmación

Después de completar una compra, el sistema genera un mensaje de confirmación detallado que incluye:

```
✅ ¡COMPRA EXITOSA! 🎉

Has comprado X productos:

   1. [Nombre del producto] - $[Precio]
   2. [Nombre del producto] - $[Precio]
   ...

━━━━━━━━━━━━━━━━━━━━━━━━━━━━
💰 TOTAL: $[Total]
━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📦 Tu pedido será procesado y enviado en 24-48 horas.
📧 Recibirás un correo de confirmación con los detalles de envío.
📱 Te notificaremos cuando tu pedido esté en camino.

¡Gracias por elegir Nike Legacy! ⚡
Just Do It. 🏃‍♂️💨
```

**Opciones después de la compra:**
- **Volver a comprar**: Reinicia la navegación para realizar otra compra
- **Ver Novedades**: Muestra productos nuevos disponibles
- **Empezar de nuevo**: Limpia el contexto y reinicia la conversación desde el inicio

### 3.5. Cierre de la Consulta

El usuario puede cerrar la consulta de varias maneras:
- Expresando despedida ("adiós", "chao", "hasta luego")
- Seleccionando "Cancelar" o "No quiero"
- Cerrar la ventana del chat manualmente

Cuando el usuario se despide, el sistema responde:

> "¡Entendido! Estaré por aquí si cambias de opinión. \nRecuerda: Just Do It. ✔️"

---

## 4. Conjunto de Pruebas del Estudiante

### 4.1. Mensajes que Deberían Clasificarse Correctamente

| # | Mensaje del Usuario | Intención Detectada | Regex Utilizada |
|---|---------------------|---------------------|-----------------|
| 1 | "Hola, buenos días" | GREETING | `REGEX_GREETING` |
| 2 | "Quiero ver shorts de hombre" | SEARCH_SHORTS + NAV_MEN | `REGEX_SHORTS` + `REGEX_GENDER_MAN` |
| 3 | "Cuánto es 50000 menos 20%" | MATH_CALCULATION | `REGEX_MATH` |
| 4 | "Tienen envíos a Bogotá?" | FAQ_SHIPPING | `REGEX_SHIPPING` |
| 5 | "Quiero comprar estos leggings" | PURCHASE_ACTION | `REGEX_PURCHASE` |
| 6 | "Gracias por la ayuda" | EMOTION_GRATITUDE | `REGEX_GRATITUDE` |
| 7 | "Dónde está la tienda física?" | STORE_INFO | `REGEX_STORE_INFO` |
| 8 | "Ver novedades para mujer" | NAV_NEWS + NAV_WOMEN | `REGEX_NEWS` + `REGEX_GENDER_WOMAN` |
| 9 | "Abrir carrito" | CART_ACTION | `REGEX_CART` |
| 10 | "No entiendo cómo funciona" | HELP_CONFUSION | `REGEX_CONFUSION` |

### 4.2. Mensajes que Podrían Generar Falsos Positivos o Requieren Atención

| # | Mensaje del Usuario | Intención Detectada | Observación |
|---|---------------------|---------------------|-------------|
| 1 | "Hola mundo, cómo estás?" | GREETING | Detecta "hola" correctamente, pero "mundo" no se procesa |
| 2 | "El hombre llegó tarde" | NAV_MEN (posible) | Podría detectar "hombre" aunque no es intención de filtrado |
| 3 | "Quiero cambiar de opinión" | FAQ_RETURNS (posible) | Podría detectar "cambio" aunque se refiere a cambio de opinión |
| 4 | "La mujer del vecino compró zapatos" | NAV_WOMEN (posible) | Podría detectar "mujer" en contexto no relacionado |
| 5 | "No quiero nada malo" | EMOTION_ANGER (posible) | Podría detectar "malo" aunque no es queja del servicio |
| 6 | "El servicio de entrega es bueno" | FAQ_SHIPPING | Detecta "entrega" correctamente, pero el contexto es positivo |
| 7 | "Tengo un problema matemático" | HELP_CONFUSION | Detecta "problema" aunque no es sobre el bot |
| 8 | "Voy a salir de casa" | EMOTION_DISMISSAL (posible) | Podría detectar "salir" aunque no es cierre de chat |
| 9 | "La nueva película es buena" | NAV_NEWS (posible) | Podría detectar "nueva" aunque no se refiere a productos |
| 10 | "Quiero ver todo el catálogo de zapatos" | MENU_GENERAL | Detecta "catálogo" pero "zapatos" no está en el sistema |

**Nota sobre falsos positivos:** El sistema utiliza límites de palabra (`\b`) y contexto conversacional para minimizar falsos positivos. Sin embargo, algunos casos pueden requerir procesamiento adicional o mejoras en las expresiones regulares para mayor precisión.

---

## 5. Registro de Logs del Sistema

El sistema incluye un panel de depuración (Debug Panel) que muestra en tiempo real todos los intentos de procesamiento del chatbot. Cada entrada del usuario genera un log que contiene:

- **Timestamp**: Hora exacta de la interacción
- **User Input**: Texto ingresado por el usuario
- **Intent Detected**: Intención clasificada por el sistema
- **Regex Used**: Expresión regular que hizo match
- **Match Data**: Datos capturados por la expresión regular (si aplica)

### Ejemplo de Logs del Sistema:

```
┌─────────────────────────────────────────────────────────┐
│ SYSTEM LOGS // REGEX ENGINE                             │
├─────────────────────────────────────────────────────────┤
│ 14:23:15                                                │
│ Intent: GREETING                                        │
│ Input: "Hola, buenos días"                              │
│ Regex: /\b(h?ola|buenas?(\s+(tardes|dias|noches))?...)/
│ Match: ["Hola", "Hola"]                                 │
├─────────────────────────────────────────────────────────┤
│ 14:23:45                                                │
│ Intent: SEARCH_SHORTS                                   │
│ Input: "Quiero ver shorts"                              │
│ Regex: /\b(short|pantalon(eta|cillo|cito|ucas)?s?...)/
│ Match: ["shorts", "shorts"]                             │
├─────────────────────────────────────────────────────────┤
│ 14:24:10                                                │
│ Intent: MATH_CALCULATION                                │
│ Input: "50000 menos 20%"                                │
│ Regex: /(?:cuanto\s+es\s+|precio\s+...)(\d[\d\.,]*)\s*.../
│ Match: ["50000 menos 20%", "50000", "20", "%"]         │
├─────────────────────────────────────────────────────────┤
│ 14:24:35                                                │
│ Intent: PURCHASE_ACTION                                 │
│ Input: "Comprar"                                         │
│ Regex: /\b(comprar|compr[ao]|llevar|adquirir...)/
│ Match: ["Comprar", "Comprar"]                           │
└─────────────────────────────────────────────────────────┘
```

El panel de logs permite a los desarrolladores y usuarios técnicos entender cómo el sistema procesa cada entrada, facilitando la depuración y el mejoramiento continuo de las expresiones regulares.

---

## 6. Conclusiones del Estudiante

### 6.1. Qué se Aprendió del Reto

Este proyecto proporcionó una experiencia valiosa en el desarrollo de sistemas de procesamiento de lenguaje natural utilizando expresiones regulares. Se aprendió que, aunque las expresiones regulares no son tan sofisticadas como modelos de machine learning avanzados, pueden ser extremadamente efectivas para casos de uso específicos y acotados, como un chatbot de e-commerce.

Una de las lecciones más importantes fue la importancia del orden de evaluación de las expresiones regulares. Algunas intenciones deben tener prioridad sobre otras (por ejemplo, detectar lenguaje ofensivo antes que otras intenciones) para garantizar respuestas apropiadas. También se aprendió sobre la complejidad de manejar variaciones del lenguaje natural, incluyendo diferentes formas de escribir la misma palabra (con o sin tildes), plurales, y variaciones regionales.

El sistema de contexto conversacional demostró cómo mantener estado entre interacciones puede mejorar significativamente la experiencia del usuario, permitiendo respuestas más relevantes y personalizadas. Además, se comprendió la importancia de un sistema de logging robusto para depuración y análisis del comportamiento del sistema.

### 6.2. Qué se Mejoraría

Si se tuviera la oportunidad de mejorar el proyecto, se consideraría implementar las siguientes mejoras:

1. **Sistema de sinónimos más robusto**: Aunque las expresiones regulares actuales cubren muchas variaciones, un sistema de sinónimos podría mejorar el reconocimiento de intenciones para términos menos comunes.

2. **Análisis de sentimiento más sofisticado**: El sistema actual detecta emociones básicas (gratitud, enojo, confusión), pero podría beneficiarse de un análisis más profundo del tono y contexto emocional.

3. **Manejo de frases compuestas**: Actualmente, algunas frases complejas podrían no procesarse correctamente si contienen múltiples intenciones. Un sistema de priorización más inteligente podría ayudar.

4. **Integración con base de datos real**: El sistema actual utiliza datos simulados. Una integración con una base de datos real permitiría búsquedas más dinámicas y actualizaciones en tiempo real del inventario.

5. **Sistema de aprendizaje**: Aunque fuera del alcance de este proyecto, un sistema que aprenda de las interacciones del usuario podría mejorar continuamente la precisión del reconocimiento de intenciones.

6. **Manejo de errores más granular**: Mejorar el manejo de casos edge y proporcionar mensajes de error más informativos cuando el sistema no puede procesar una entrada.

### 6.3. Dificultades Encontradas

Durante el desarrollo del proyecto, se encontraron varias dificultades que fueron valiosas para el aprendizaje:

1. **Balance entre precisión y cobertura**: Fue un desafío encontrar el equilibrio entre expresiones regulares que capturen la mayor cantidad de variaciones posibles sin generar demasiados falsos positivos. Algunas expresiones regulares iniciales eran demasiado permisivas, mientras que otras eran demasiado restrictivas.

2. **Manejo de contexto conversacional**: Implementar un sistema de contexto que recordara el estado de la conversación sin volverse demasiado complejo requirió varias iteraciones. Decidir qué información mantener en el contexto y cuándo limpiarlo fue un proceso de prueba y error.

3. **Priorización de intenciones**: Determinar el orden correcto de evaluación de las expresiones regulares fue crucial. Algunas intenciones, como el lenguaje ofensivo, deben evaluarse primero, mientras que otras pueden tener prioridades más flexibles.

4. **Variaciones regionales del español**: El español tiene muchas variaciones regionales, y capturar todas las formas en que los usuarios pueden expresar la misma intención fue desafiante. Por ejemplo, "pantaloneta" vs "short" vs "bermuda" para referirse al mismo tipo de producto.

5. **Testing exhaustivo**: Probar todas las posibles combinaciones de entradas del usuario fue difícil debido a la naturaleza combinatoria del lenguaje natural. Se requirió un enfoque sistemático para identificar casos edge.

6. **Integración de múltiples componentes**: Coordinar el flujo de datos entre el chatbot, el carrito de compras, el sistema de filtrado de productos, y el panel de logs requirió una arquitectura cuidadosa para evitar bugs y mantener el código mantenible.

A pesar de estas dificultades, el proyecto resultó en un sistema funcional que demuestra el potencial de las expresiones regulares para crear interfaces conversacionales efectivas en contextos específicos y acotados.

---

## 7. Tecnologías Utilizadas

- **React 19.2.0**: Framework de JavaScript para construir la interfaz de usuario
- **TypeScript 5.8.2**: Superset de JavaScript que añade tipado estático
- **Vite 6.2.0**: Herramienta de construcción y desarrollo
- **Tailwind CSS**: Framework de CSS para estilos
- **Lucide React**: Biblioteca de iconos

## 8. Instalación y Uso

### Prerrequisitos
- Node.js (versión 18 o superior)
- npm o yarn

### Pasos de Instalación

1. Clonar el repositorio:
```bash
git clone [url-del-repositorio]
cd nike-legacy-store-&-bot
```

2. Instalar dependencias:
```bash
npm install
```

3. Ejecutar el proyecto en modo desarrollo:
```bash
npm run dev
```

4. Abrir el navegador en `http://localhost:3001` (o el puerto que indique la terminal)

### Nota Importante
Si el nombre de la carpeta contiene el carácter "&", puede haber problemas en Windows. Se recomienda renombrar la carpeta o usar los scripts modificados en `package.json` que ejecutan Vite directamente con Node.

---

## 9. Estructura del Proyecto

```
nike-legacy-store-&-bot/
├── components/
│   ├── Chatbot.tsx          # Componente principal del chatbot
│   ├── CartDrawer.tsx       # Drawer del carrito de compras
│   ├── DebugPanel.tsx       # Panel de logs del sistema
│   ├── ProductGrid.tsx      # Grid de productos
│   └── ...
├── utils/
│   └── chatbotLogic.ts      # Lógica principal de procesamiento
├── constants.ts              # Expresiones regulares y datos
├── types.ts                  # Definiciones de tipos TypeScript
└── App.tsx                   # Componente raíz de la aplicación
```

---

## 10. Agradecimientos

Este proyecto fue desarrollado como parte de un taller académico sobre procesamiento de lenguaje natural y expresiones regulares. Agradecimientos especiales a la comunidad de desarrolladores de React y TypeScript por las herramientas y recursos disponibles.

---

**Desarrollado con ❤️ usando React, TypeScript y Expresiones Regulares**
