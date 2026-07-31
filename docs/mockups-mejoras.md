# Mockups de texto: mejoras prioritarias de Ruiseñor

Estos wireframes describen las secciones implementadas sin recurrir a imágenes generadas. Conservan la dirección **Etiqueta premium de producto**: fondos espresso/cacao, marfil para lectura, dorado para jerarquía y rojo solo para la acción principal.

## 1. Feria: pantalla que abre el QR

```text
┌──────────────────────────────────────────────┐
│ RUISEÑOR                                      │
│ EXPERIENCIA DE FERIA                          │
│                                                │
│ Encuentra qué probar en tres respuestas.      │
│                                                │
│ Menos de un minuto · sin registro              │
│                                                │
│ ━━━━ 01 Interés   ─── 02 Formato   ─── 03 Ocasión │
│                                                │
│ ¿Qué te gustaría descubrir hoy?               │
│                                                │
│ ┌──────────────────────────────────────────┐ │
│ │ Chocolate                                │ │
│ │ Quiero descubrir una presentación cacao. │ │
│ └──────────────────────────────────────────┘ │
│ ┌──────────────────────────────────────────┐ │
│ │ Café                                     │ │
│ │ Quiero conocer una opción para preparar.  │ │
│ └──────────────────────────────────────────┘ │
└──────────────────────────────────────────────┘
```

En móvil las opciones se presentan en una columna, con objetivos táctiles amplios. En escritorio aparecen en dos columnas sin cambiar el orden de lectura.

## 2. Resultado de la feria

```text
┌──────────────────────────────────────────────────────────┐
│ EXPERIENCIA DE FERIA        │ TU SELECCIÓN RUISEÑOR       │
│ Encuentra qué probar        │ [FOTO REAL DEL PRODUCTO]    │
│ en tres respuestas.         │ Chocolate                   │
│                              │ Tableta de cacao            │
│ Sin datos personales.        │ Por qué encaja contigo…     │
│                              │ [CONSULTAR RECOMENDACIÓN]   │
│                              │ Ver catálogo · Repetir      │
└──────────────────────────────────────────────────────────┘
```

La foto procede del catálogo actual; no se inventan porcentajes, sabores ni presentaciones. Cuando se confirme el número de WhatsApp en `src/config/brand.ts`, el botón abrirá un mensaje ya preparado con el producto recomendado.

## 3. Panel privado: lectura útil de la feria

```text
┌──────────────────────────────────────────────────────────┐
│ DASHBOARD RUISEÑOR                          [7 días][30]  │
│                                                          │
│ EMBUDO DE FERIA                                          │
│ Qué ocurre después de escanear el QR                     │
│                                                          │
│ 01 Iniciaron perfil  ──►  02 Recomendación  ──►  03 WhatsApp │
│        42                     31                    9    │
│                                                          │
│ 74% completa las tres respuestas                         │
└──────────────────────────────────────────────────────────┘
```

Este bloque se suma a las métricas existentes y permite saber si el problema está en el QR, las preguntas o la consulta final. Las cifras son datos de ejemplo del mockup; el panel muestra datos reales de Supabase.

## 4. Navegación móvil

```text
┌────────────────────────────────────────┐
│ [logo]                         [menú]   │
├────────────────────────────────────────┤
│ DESCUBRE TU PRODUCTO                    │
│ Inicio             Líneas                │
│ Catálogo           Feria                 │
│ Redes                                  │
└────────────────────────────────────────┘
```

La nueva entrada destaca la feria sin ocultar el resto de la web. El menú se cierra al elegir un destino.
