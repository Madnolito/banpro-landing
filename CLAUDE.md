# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start dev server
npm run build    # Production build
npm run lint     # Run ESLint
```

No test suite configured.

## Architecture

Landing page para **Banpro Factoring S.A.** (empresa chilena de factoring). Next.js 16 con Pages Router, React 19, TypeScript.

### Sistema de versiones / mockups

La página soporta 3 diseños alternativos seleccionables en runtime vía query param `?v=1|2|3`. El switcher vive en la Navbar.

- `src/pages/index.tsx` — importa los 3×7 = 21 componentes de sección y selecciona cuál renderizar según `router.query.v`
- `src/screens/v1|v2|v3/` — cada versión tiene las mismas secciones: `Hero`, `Nosotros`, `Factoring`, `Requisitos`, `Sucursales`, `Contacto`, `Footer`
- `src/screens/` (raíz) — versiones legacy/base sin prefijo de versión, no usadas actualmente en el index

### i18n

- `next-intl` con soporte `es` / `en` (defaultLocale: `es`)
- Traducciones en `locales/es/common.json` y `locales/en/common.json`
- Las claves siguen la estructura: `seccion.clave` (ej: `hero.title_line1`, `nav.about`)
- Las props `locale` y `messages` se cargan vía `getStaticProps` en `pages/index.tsx`
- El config de i18n está en `config-files/i18n.json` (no en la raíz)
- El `next.config.js` también está en `config-files/`, no en la raíz

### Animaciones

- **Framer Motion** es la librería de animaciones — no agregar GSAP ni otras
- `<FadeIn>` (`src/components/FadeIn.tsx`) — componente wrapper con `whileInView`, soporta `dir` (`up|down|left|right`) y `delay`
- `useInView` (`src/hooks/useInView.ts`) — hook con `IntersectionObserver` para animar manualmente cuando no se usa `<FadeIn>`

### Estilos

Tailwind CSS. Clases de componente definidas en `src/styles/globals.css`:

| Clase | Uso |
|---|---|
| `.container-site` | Wrapper de ancho máximo con padding horizontal responsivo |
| `.btn-primary` | Botón naranja principal |
| `.btn-outline` | Botón contorno blanco (sobre fondos oscuros) |
| `.btn-outline-dark` | Botón contorno naranja (sobre fondos claros) |
| `.section-label` | Eyebrow en naranja, uppercase, tracking-widest |
| `.section-title` | Título de sección, fuente display |
| `.section-subtitle` | Subtítulo de sección, gris |

**Colores de marca** (disponibles como `bg-brand-*`, `text-brand-*`):
- `brand-primary`: `#F86213` (naranja principal)
- `brand-secondary`: `#E5580F`
- `brand-accent`: `#FF8C42`
- `brand-light`: `#FFF4EE`
- `brand-dark`: `#1A1A1A`

**Tipografía**: `font-display` → Outfit, `font-sans` → Inter

### Utilidades

- `src/lib/cn.ts` — combina `clsx` + `tailwind-merge`, usar siempre para clases condicionales
- SVGs importados directamente como componentes React (via `@svgr/webpack`)
- Path alias `@/` apunta a `src/`
