# Dirección visual de Ruiseñor

**Estado:** propuesta conceptual para aprobación. No es código ni diseño final implementado.

## Decisión principal

La web no debe parecer una landing genérica de chocolate. Debe sentirse como una extensión del empaque real de Ruiseñor: oscura, elegante, dorada, con un acento rojo reconocible y fotografías de producto como protagonistas.

La idea visual es:

> **Ruiseñor: una marca de origen presentada como una etiqueta de colección.**

Se descarta la dirección anterior con verde natural, ilustraciones inventadas, blobs y tarjetas excesivamente redondeadas. La personalidad debe salir del logo, los empaques y las fotografías que entregó el negocio.

## Recursos recibidos

| Recurso | Uso propuesto |
| --- | --- |
| Logo negro, dorado y rojo | Encabezado, portada, favicon y pie de página |
| Chocolate sobre fondo oscuro | Imagen principal de la portada |
| Caja naranja de chocolate | Producto destacado o línea de presentación |
| Tableta empacada | Detalle de producto y catálogo |
| Café molido | Línea de café molido |
| Café tostado | Línea de café en grano |
| Mascarillas empacadas | Producto adicional; mostrar solo si el dueño confirma que pertenece al catálogo actual |

## Dirección de color

Los colores son una aproximación visual tomada de los recursos recibidos. Antes de programar se debe confirmar con un selector de color sobre el logo original.

| Rol | Color aproximado | Uso |
| --- | --- | --- |
| Negro espresso | `#100E0D` | Fondos de portada, navegación y footer |
| Cacao oscuro | `#2B1A14` | Paneles, texto principal y bloques de producto |
| Dorado de marca | `#C59A3A` | Logo, líneas, precios, etiquetas y estados activos |
| Rojo del isotipo | `#C9002C` | Acento puntual: sellos, alertas, enlaces sociales |
| Marfil | `#F1EBE2` | Fondos claros, lectura y contraste |

Proporción recomendada: 55% oscuro/marrón, 30% marfil, 12% dorado y 3% rojo.

## Tipografía

- **Títulos:** serif de alto contraste, inspirada en la palabra `RUISEÑOR` del logo.
- **Texto y datos:** sans serif limpia y compacta.
- **Etiquetas:** mayúsculas pequeñas, espaciadas, como las etiquetas de los empaques.
- No usar tipografías manuscritas, infantiles o de cafetería genérica.

## Artefacto 1: mapa de la página de inicio

```text
┌────────────────────────────────────────────────────────────────┐
│ LOGO RUISEÑOR      CHOCOLATE   CAFÉ   FERIA   REDES   [WHATSAPP]│
├────────────────────────────────────────────────────────────────┤
│                                                                │
│  [IMAGEN REAL: chocolate sobre chocolate]                     │
│                                                                │
│  RUISEÑOR                                                      │
│  Chocolate y café de origen                                   │
│  Presentación breve de la marca                                │
│                              [VER CATÁLOGO] [PEDIR]            │
│                                                                │
├────────────────────────────────────────────────────────────────┤
│  DOS LÍNEAS DE PRODUCTO                                        │
│  [CHOCOLATE]                         [CAFÉ]                   │
│  Imagen de tableta/caja                Imagen de café          │
├────────────────────────────────────────────────────────────────┤
│  PRODUCTO DESTACADO                                            │
│  Imagen grande       Nombre / porcentaje / formato / precio    │
│                      [CONSULTAR POR WHATSAPP]                 │
├────────────────────────────────────────────────────────────────┤
│  LA HISTORIA DE RUISEÑOR                                       │
│  Texto corto + logo/isotipo + dato de origen                   │
├────────────────────────────────────────────────────────────────┤
│  PRÓXIMA FERIA                                                 │
│  Fecha / lugar / stand / QR / [CÓMO LLEGAR]                   │
├────────────────────────────────────────────────────────────────┤
│  SIGUE A RUISEÑOR                                              │
│  TikTok · Facebook · Instagram si existe                      │
├────────────────────────────────────────────────────────────────┤
│  CONTACTO / WHATSAPP                                           │
│  Número visible + horario + ciudad                             │
├────────────────────────────────────────────────────────────────┤
│ LOGO · redes · contacto · aviso legal                          │
└────────────────────────────────────────────────────────────────┘
```

## Artefacto 2: portada

La portada no tendrá una ilustración inventada ni un producto creado con CSS. Usará la fotografía real del chocolate como una imagen dominante, con tratamiento editorial:

1. Fondo oscuro completo.
2. Fotografía del chocolate ocupando el lado derecho o el fondo completo.
3. Capa negra suave para permitir lectura del texto.
4. Logo real arriba a la izquierda.
5. Título breve: `Chocolate y café de origen`.
6. Dos acciones: `Ver catálogo` y `Pedir por WhatsApp`.
7. Una línea dorada y un sello rojo como detalles del empaque.

La imagen debe conservar su textura real: chocolate, cacao y empaque. No se debe colocar encima una ilustración que compita con ella.

## Artefacto 3: selector de líneas

En vez de mostrar muchas tarjetas iguales, la web tendrá dos entradas principales:

### Chocolate

- Tabletas.
- Cajas.
- Presentaciones especiales.
- Porcentaje de cacao.
- Formato y precio.

### Café

- Café molido.
- Café tostado.
- Peso y presentación.
- Precio.

Visualmente serán dos bloques grandes con fotografías reales y una etiqueta de colección. El bloque de chocolate usará negro/cacao; el bloque de café podrá usar marfil, dorado y rojo.

## Artefacto 4: catálogo

```text
CATÁLOGO RUISEÑOR

[ TODO ] [ CHOCOLATE ] [ CAFÉ ] [ REGALOS ]

┌─────────────┐  ┌─────────────┐  ┌─────────────┐
│ FOTO REAL   │  │ FOTO REAL   │  │ FOTO REAL   │
│ Producto    │  │ Producto    │  │ Producto    │
│ 70% cacao   │  │ Café molido │  │ Café tostado│
│ $ ___       │  │ $ ___       │  │ $ ___       │
│ [CONSULTAR] │  │ [CONSULTAR] │  │ [CONSULTAR] │
└─────────────┘  └─────────────┘  └─────────────┘
```

Cada producto debe mostrar información útil y verificable: nombre, foto real, formato, porcentaje o tipo, precio y disponibilidad. No inventaremos sabores, porcentajes ni precios.

## Artefacto 5: ficha de producto

```text
┌──────────────────────────────┐
│          FOTO REAL           │
├──────────────────────────────┤
│ RUISEÑOR / CHOCOLATE          │
│ Tableta __________            │
│                              │
│ Cacao: ______   Peso: _____  │
│ Precio: $_____               │
│                              │
│ [PEDIR POR WHATSAPP]         │
│ [VOLVER AL CATÁLOGO]         │
└──────────────────────────────┘
```

El botón de WhatsApp debe abrir un mensaje preparado con el producto, por ejemplo: `Hola, deseo información sobre [producto].`

## Artefacto 6: historia de marca

No usar una sección genérica de “nuestros valores” sin evidencia. La historia debe construirse con información que el dueño confirme:

- ¿De dónde proviene el cacao?
- ¿Dónde se elaboran los productos?
- ¿Qué significa el nombre Ruiseñor?
- ¿Qué representa el isotipo rojo y dorado?
- ¿Desde qué año existe la marca? El empaque muestra `1985`, pero debe confirmarse antes de publicarlo.

La sección se diseñará como una etiqueta editorial: una foto real, un texto breve, una fecha o dato confirmado y el isotipo como firma.

## Artefacto 7: feria y código QR

```text
┌─────────────────────────────────────┐
│       RUiseñor en la feria           │
│                                     │
│ Fecha: __________________________   │
│ Lugar: __________________________   │
│ Stand: __________________________   │
│                                     │
│ [QR]  Escanea y descubre:           │
│       catálogo + WhatsApp + redes   │
│                                     │
│ [CÓMO LLEGAR]  [VER CATÁLOGO]      │
└─────────────────────────────────────┘
```

El QR no debe llevar únicamente a la página de inicio. Debe abrir una página corta para la feria con catálogo, contacto, redes sociales y una promoción confirmada por el negocio.

## Artefacto 8: redes sociales

La sección de redes será visible, pero no como una fila de iconos sin contexto:

```text
SÍGUENOS EN EL DÍA A DÍA

┌─────────────────┐ ┌─────────────────┐ ┌─────────────────┐
│ TikTok          │ │ Facebook        │ │ Instagram       │
│ @ruisenor...    │ │ Página oficial  │ │ Solo si existe  │
│ [VER PERFIL]    │ │ [VER PÁGINA]    │ │ [VER PERFIL]    │
└─────────────────┘ └─────────────────┘ └─────────────────┘
```

Datos recibidos hasta ahora:

- TikTok: `@ruisenorchocolate`.
- Facebook: usar la página oficial, no dejar como enlace final el enlace temporal `/share/`.
- Instagram: confirmar si la marca tiene cuenta activa.

Se pueden mostrar 3 publicaciones reales como adelanto, pero no se deben inventar publicaciones ni usar capturas sin autorización.

## Artefacto 9: contacto y WhatsApp

El número de contacto debe aparecer en tres lugares:

1. Botón fijo o sticky en móvil.
2. Bloque de contacto antes del footer.
3. Footer junto a horarios, ciudad y redes.

El dueño debe confirmar:

- Número con código de Ecuador `+593`.
- Horario de atención.
- Ciudad o dirección.
- Si recibe pedidos, reservas o solo consultas.

## Reglas para que no se vea genérica

- Usar las fotografías reales como elemento principal, no como miniaturas decorativas.
- Mantener el logo sin modificar sus proporciones ni colores.
- Repetir recursos del empaque: líneas doradas, sellos, etiquetas, numeración y rojo puntual.
- Usar bordes rectos o radios pequeños; no convertir todo en cápsulas redondeadas.
- Evitar gradientes morados, blobs, ilustraciones de cacao inventadas y frases de marketing vacías.
- No usar una sección de testimonios si todavía no existen testimonios reales.
- No inventar precios, historia, porcentajes, certificaciones o ubicación.
- Priorizar producto, catálogo, contacto, feria y redes.

## Decisiones pendientes antes de programar

- [ ] Confirmar si la marca vende chocolate, café y mascarillas actualmente.
- [ ] Confirmar catálogo, precios, pesos y disponibilidad.
- [ ] Confirmar teléfono de WhatsApp.
- [ ] Confirmar Facebook oficial e Instagram.
- [ ] Confirmar fecha, lugar y número de stand de la feria.
- [ ] Confirmar qué significa `1985` en el empaque.
- [ ] Elegir una dirección: **Bosque de cacao**, **Archivo de origen** o **Etiqueta premium de producto**.

**Recomendación:** elegir **Etiqueta premium de producto** como dirección principal, porque es la que más respeta el logo y los empaques reales que recibimos.
