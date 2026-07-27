# Ruiseñor Chocolate — sitio web

Sitio web oficial para presentar la marca, contar su historia, mostrar el catálogo de chocolates y facilitar pedidos por WhatsApp. También incluirá una experiencia mediante código QR para las ferias y eventos.

**Estado:** base técnica en desarrollo.

## Objetivos

- Comunicar la identidad artesanal y ecuatoriana de Ruiseñor Chocolate.
- Mostrar productos, formatos, ingredientes y disponibilidad.
- Llevar al cliente desde la web hasta WhatsApp con un mensaje preparado.
- Promocionar la participación de la marca en ferias.
- Mantener una base preparada para crecer hacia un catálogo administrable.

## Stack tecnológico

- React 19 + TypeScript.
- Vite 8 para desarrollo y compilación.
- Supabase para base de datos, Storage y futuras funciones.
- Tailwind CSS v4 para utilidades, responsive y estados.
- CSS Modules y variables CSS para estilos especiales y tokens de marca.
- Git y GitHub para control de versiones.
- Despliegue previsto: Vercel, Netlify o Cloudflare Pages.

## Decisión de estilos: Tailwind + tokens de marca

Usaremos Tailwind para construir rápidamente layouts responsive, botones, tarjetas y estados visuales. La identidad de Ruiseñor se conservará mediante tokens propios definidos en `src/index.css` con `@theme`:

- `cacao`: `#542D1C`.
- `dorado`: `#E5B651`.
- `crema`: `#FFF8ED`.
- `verde-natural`: `#3E6B45`.

Reglas de uso:

- Tailwind para layout, responsive, espaciado y estados comunes.
- CSS Modules para animaciones o estilos complejos de un componente.
- CSS variables para colores, tipografías, sombras y radios de la marca.
- No usar estilos inline extensos ni valores arbitrarios repetidos.

## Librerías aprobadas

No se instalarán librerías innecesarias. La primera fase utilizará:

| Librería | Uso | Instalación |
| --- | --- | --- |
| `tailwindcss` | Utilidades de estilos, responsive y estados | `npm install tailwindcss @tailwindcss/vite` |
| `motion` | Animaciones de entrada, hover, modal y transiciones | `npm install motion` |
| `lucide-react` | Iconos SVG consistentes y accesibles | `npm install lucide-react` |
| `@supabase/supabase-js` | Conexión con Supabase | Ya instalada |

Se agregarán únicamente cuando la funcionalidad lo requiera:

- `@tanstack/react-query`: caché y estados de consultas cuando el catálogo viva en Supabase.
- `react-hook-form` + `zod`: formularios de contacto o panel administrativo.
- `react-router-dom`: cuando existan rutas reales como `/catalogo` y `/producto/:slug`.
- `qrcode.react`: solo si el QR debe generarse dinámicamente desde la aplicación.
- `vitest` + Testing Library: pruebas de componentes y funcionalidades críticas.

No se usará `framer-motion`; el nombre actual del paquete es `motion` y se importa desde `motion/react`.

## Instalación

```bash
npm install
npm install tailwindcss @tailwindcss/vite motion lucide-react
npm run dev
```

Comandos de calidad:

```bash
npm run lint
npm run build
npm run preview
```

## Variables de entorno

Crear `.env.local` a partir de `.env.example` (PowerShell):

```powershell
Copy-Item .env.example .env.local
```

```env
VITE_SUPABASE_URL=
VITE_SUPABASE_PUBLISHABLE_KEY=
```

`.env.local` nunca debe subirse a GitHub. La clave `service_role` nunca se coloca en React ni en el navegador; las tablas públicas deben protegerse con RLS.

## Arquitectura de carpetas

```text
src/
├── assets/                 # imágenes y logos importados por React
├── components/
│   ├── ui/                 # Button, Card, Modal
│   ├── layout/             # Header, Footer, navegación
│   └── sections/           # Hero, historia, feria, productos
├── features/
│   ├── catalog/            # productos, tarjetas, consultas y tipos
│   ├── contact/            # WhatsApp y contacto
│   └── qr/                 # experiencia de feria mediante QR
├── pages/                  # páginas completas
├── lib/                    # clientes externos, como Supabase
├── config/                 # marca, navegación y configuración
├── hooks/                  # hooks reutilizables
├── styles/                 # estilos globales y tokens de marca
├── App.tsx
└── main.tsx
```

Las consultas a Supabase deben vivir dentro de `features/*/*.service.ts`; los componentes visuales no deben consultar la base de datos directamente.

## Supabase

Modelo inicial recomendado:

- `products`: nombre, slug, descripción, precio, imagen, disponibilidad y categoría.
- `categories`: categorías del catálogo.
- `site_content`: textos editables de la página, si el dueño necesita administrarlos.
- Storage `product-images`: fotografías optimizadas de productos.

Los pedidos se iniciarán por WhatsApp, por lo que no se creará una tabla de órdenes hasta que el negocio necesite un sistema interno de ventas.

## Animaciones y accesibilidad

- Animaciones cortas y sutiles para entrada de secciones, tarjetas y botones.
- Preferir `transform` y `opacity` para mantener buen rendimiento.
- Respetar `prefers-reduced-motion` para usuarios que prefieren menos movimiento.
- Tailwind/CSS será suficiente para hover y transiciones simples; `motion` se reservará para interacciones que realmente lo necesiten.
- No se usarán animaciones automáticas excesivas que distraigan del catálogo.

## Flujo de trabajo Git

```bash
git status
git add .
git commit -m "tipo: descripción breve"
git push
```

Tipos sugeridos: `feat`, `fix`, `style`, `docs`, `refactor`, `chore`.

## Roadmap

1. Completar la base React y el sistema visual de la marca.
2. Crear la página principal y las secciones de historia, feria y contacto.
3. Construir el catálogo con datos locales.
4. Conectar el catálogo con Supabase y Storage.
5. Agregar QR, mensajes de WhatsApp y analítica básica.
6. Probar en móvil, optimizar imágenes y desplegar.

## Identidad visual

- Cacao: `#542D1C`
- Dorado: `#E5B651`
- Crema: `#FFF8ED`
- Verde natural: `#3E6B45`

La interfaz debe mantener una sensación artesanal, cálida, natural y elegante.
