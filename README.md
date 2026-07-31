# Ruiseñor Chocolate — sitio web

Sitio web oficial para presentar la marca, contar su historia, mostrar el catálogo de chocolates y facilitar pedidos por WhatsApp. También incluirá una experiencia mediante código QR para las ferias y eventos.

**Estado:** base técnica en desarrollo.

## Dirección visual actual

La propuesta usa el concepto **“Etiqueta premium de producto”**: la web extiende el lenguaje real del empaque de Ruiseñor con fondos espresso, marfil, dorado, rojo puntual, líneas de etiqueta y fotografías entregadas por la marca. No se usarán ilustraciones inventadas ni componentes genéricos de plantilla.

- Recursos de marca: `src/assets/brand/`.
- Catálogo actual: chocolate y café.
- Mascarillas: recurso pendiente de confirmar antes de publicarlo.
- Precios, fecha de feria, ubicación y número de WhatsApp siguen pendientes de confirmación.

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
- Variables CSS para tokens de marca y estilos especiales.
- `motion` para entradas sutiles respetando `prefers-reduced-motion`.
- `qrcode.react` para el código QR de la feria.
- `@fontsource/cormorant-garamond` y `@fontsource/manrope` para tipografías locales.
- Git y GitHub para control de versiones.
- Despliegue previsto: Netlify.

## Decisión de estilos: Tailwind + tokens de marca

Usaremos Tailwind para construir rápidamente layouts responsive, botones, tarjetas y estados visuales. La identidad de Ruiseñor se conservará mediante tokens propios definidos en `src/index.css` con `@theme`:

- `espresso`: `#100E0D`.
- `cacao`: `#2B1A14`.
- `dorado`: `#C59A3A`.
- `marfil`: `#F1EBE2`.
- `rojo-marca`: `#C9002C`.

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
| `qrcode.react` | QR dinámico para feria y campañas | Ya instalada |
| `recharts` | Gráficas responsive del dashboard privado | `npm install recharts react-is` |
| `@fontsource/cormorant-garamond` | Tipografía editorial de títulos | Ya instalada |
| `@fontsource/manrope` | Tipografía legible para datos y navegación | Ya instalada |

Se agregarán únicamente cuando la funcionalidad lo requiera:

- `@tanstack/react-query`: caché y estados de consultas cuando el catálogo viva en Supabase.
- `react-hook-form` + `zod`: formularios de contacto o panel administrativo.
- `react-router-dom`: cuando existan rutas reales como `/catalogo` y `/producto/:slug`.
- `vitest` + Testing Library: pruebas de componentes y funcionalidades críticas.

No se usará `framer-motion`; el nombre actual del paquete es `motion` y se importa desde `motion/react`.

## Instalación

```bash
npm install
npm install tailwindcss @tailwindcss/vite motion lucide-react qrcode.react recharts react-is @fontsource/cormorant-garamond @fontsource/manrope
npm run dev
```

Comandos de calidad:

```bash
npm run lint
npm run test
npm run build
npm run verify
npm run preview
```

## Despliegue en Netlify y control de calidad

El archivo `netlify.toml` publica `dist` y ejecuta `npm run verify` antes de cada despliegue. Así, Netlify no publica un cambio que no haya pasado lint, pruebas y compilación.

1. Conectar el repositorio a Netlify y usar la configuración detectada del archivo `netlify.toml`.
2. Configurar `VITE_SUPABASE_URL` y `VITE_SUPABASE_PUBLISHABLE_KEY` en **Site configuration > Environment variables**.
3. Activar los **Deploy Previews** para los pull requests; el flujo de GitHub `Validar cambios` repite la misma verificación en cada PR y en `main`.
4. En GitHub, marcar `Lint, pruebas y compilación` como comprobación requerida antes de fusionar a `main`.

La redirección de Netlify conserva rutas directas como `/admin/analytics` para que React pueda mostrar el panel privado después de recargar la página.

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
├── assets/
│   └── brand/              # logo y fotografías reales entregadas por la marca
├── components/
│   ├── ui/                 # BrandLogo, SectionKicker, Reveal
│   ├── layout/             # Header y Footer
│   └── sections/           # Hero, líneas, catálogo, historia, feria, redes, contacto
├── features/
│   ├── catalog/            # datos y ProductCard
│   ├── contact/            # WhatsAppButton
│   └── qr/                 # QrExperience
├── pages/                  # HomePage y futuras páginas
├── lib/                    # clientes externos, como Supabase
├── config/                 # marca, navegación y configuración
├── hooks/                  # hooks reutilizables
├── styles/                 # estilos globales y tokens de marca
├── App.tsx
└── main.tsx
```

`App.tsx` solo compone la aplicación. Las secciones viven en `components/sections`, los datos del catálogo en `features/catalog` y las integraciones en `features`. Las consultas a Supabase deben vivir dentro de `features/*/*.service.ts`; los componentes visuales no deben consultar la base de datos directamente.

## Supabase

La primera integración de Supabase se limitará a la campaña de la feria y a sus métricas. El catálogo seguirá siendo local hasta que el negocio confirme que necesita administración.

### Configuración inicial

1. Crear el proyecto `ruisenor-web` en Supabase.
2. Abrir `SQL Editor` y ejecutar `supabase/migrations/001_create_fair_analytics.sql`.
3. En `Project Settings > API`, copiar la URL del proyecto y la clave pública.
4. Guardarlas en `.env` sin subir ese archivo al repositorio:

```env
VITE_SUPABASE_URL=https://tu-proyecto.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=tu-clave-publica
```

La tabla `campaigns` contiene la información editable de cada feria. `analytics_events` guarda visitas del QR, vistas de catálogo y clics hacia TikTok, Facebook y WhatsApp. Las estadísticas no son públicas: los visitantes solo pueden registrar eventos y el panel futuro podrá leerlos mediante un usuario autorizado.

La carga de la campaña y el registro de eventos se coordinan desde `features/analytics/AnalyticsProvider.tsx`. Los datos de `fair.ts` se mantienen como respaldo para que la página siga mostrando contenido si la API no está disponible. El panel privado de analítica se construirá en una fase posterior, sin convertir todavía el catálogo en un administrador.

### Dashboard privado

La ruta `/admin/analytics` muestra las métricas de la campaña y usa un enlace mágico de Supabase Auth. Después de crear el usuario del dueño en `Authentication > Users`, se debe agregar su UUID como administrador:

```sql
insert into public.analytics_admins (user_id)
values ('UUID_DEL_USUARIO')
on conflict (user_id) do nothing;
```

En `Authentication > URL Configuration` se debe permitir la URL local `http://localhost:5173/admin/analytics` y, al publicar, la URL equivalente del dominio real.

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

- Espresso: `#100E0D`
- Cacao: `#2B1A14`
- Dorado: `#C59A3A`
- Marfil: `#F1EBE2`
- Rojo del isotipo: `#C9002C`

La interfaz debe mantener una sensación elegante, intensa, artesanal y coherente con los empaques reales.
