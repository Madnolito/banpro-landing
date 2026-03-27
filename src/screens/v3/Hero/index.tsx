import { useEffect, useRef, useState } from 'react';

import { motion } from 'framer-motion';

const EASE = [0.22, 1, 0.36, 1] as const;

/* ── Count-up number ── */
function CountUp({ to, suffix = '', delay = 0.9 }: Readonly<{ to: number; suffix?: string; delay?: number }>) {
  const [val, setVal] = useState(0);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      const duration = 1600;
      const start = Date.now();
      const tick = () => {
        const p = Math.min((Date.now() - start) / duration, 1);
        const eased = 1 - Math.pow(1 - p, 3);
        setVal(Math.round(to * eased));
        if (p < 1) rafRef.current = requestAnimationFrame(tick);
      };
      rafRef.current = requestAnimationFrame(tick);
    }, delay * 1000);
    return () => {
      clearTimeout(timer);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [to, delay]);

  return <>{val}{suffix}</>;
}

/* ── Card with SVG stroke-dashoffset border animation ── */
function GlowCard({ children, delay = 0, speed = 5, startFraction = 0, clockwise = true }: Readonly<{ children: React.ReactNode; delay?: number; speed?: number; startFraction?: number; clockwise?: boolean }>) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState({ w: 0, h: 0 });

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const ro = new ResizeObserver(() => {
      setSize({ w: el.offsetWidth, h: el.offsetHeight });
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const rx = 16;
  const perimeter = size.w
    ? 2 * (size.w - 2 * rx) + 2 * (size.h - 2 * rx) + 2 * Math.PI * rx
    : 0;
  const trailLen = perimeter * 0.22;

  return (
    <motion.div
      ref={wrapRef}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.55, ease: EASE }}
      className="group relative rounded-2xl border border-white/[0.06] bg-[#07101E] p-5"
    >
      {perimeter > 0 && (
        <svg
          className="pointer-events-none absolute inset-0"
          width={size.w}
          height={size.h}
          style={{ overflow: 'visible' }}
        >
          <defs>
            <filter id="border-glow-v3">
              <feGaussianBlur stdDeviation="2.5" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          <rect x={1} y={1} width={size.w - 2} height={size.h - 2} rx={rx} fill="none" stroke="#F86213" strokeWidth="1" opacity="0.12" />
          <motion.rect
            x={1} y={1}
            width={size.w - 2} height={size.h - 2}
            rx={rx}
            fill="none"
            stroke="#F86213"
            strokeWidth="1.5"
            filter="url(#border-glow-v3)"
            strokeLinecap="round"
            strokeDasharray={`${trailLen} ${perimeter - trailLen}`}
            animate={{ strokeDashoffset: [-(perimeter * startFraction), -(perimeter * startFraction) + (clockwise ? -perimeter : perimeter)] }}
            transition={{ duration: speed, repeat: Infinity, ease: 'linear', delay }}
          />
        </svg>
      )}
      {children}
    </motion.div>
  );
}

/* ── Floating particle ── */
function Particle({ x, y, size, duration, delay }: Readonly<{ x: number; y: number; size: number; duration: number; delay: number }>) {
  return (
    <motion.div
      className="absolute rounded-full bg-brand-primary/30"
      style={{ left: `${x}%`, top: `${y}%`, width: size, height: size }}
      animate={{ y: [0, -28, 0], opacity: [0.15, 0.55, 0.15] }}
      transition={{ duration, repeat: Infinity, delay, ease: 'easeInOut' }}
    />
  );
}

const PARTICLES = [
  { x: 15, y: 20, size: 3, duration: 5,   delay: 0   },
  { x: 72, y: 15, size: 2, duration: 7,   delay: 1   },
  { x: 85, y: 60, size: 4, duration: 6,   delay: 0.5 },
  { x: 30, y: 75, size: 2, duration: 8,   delay: 2   },
  { x: 55, y: 85, size: 3, duration: 5.5, delay: 1.5 },
  { x: 90, y: 30, size: 2, duration: 9,   delay: 0.8 },
  { x: 8,  y: 50, size: 3, duration: 6.5, delay: 3   },
];

const CARDS = [
  {
    label: 'EXPERIENCIA',
    value: 15,
    suffix: '+ años',
    sub: 'Desde 2009',
    speed: 9, startFraction: 0, clockwise: true,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 18.75h-9m9 0a3 3 0 013 3h-15a3 3 0 013-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 01-.982-3.172M9.497 14.25a7.454 7.454 0 00.981-3.172M5.25 4.236c-.982.143-1.954.317-2.916.52A6.003 6.003 0 007.73 9.728M5.25 4.236V4.5c0 2.108.966 3.99 2.48 5.228M5.25 4.236V2.721C7.456 2.41 9.71 2.25 12 2.25c2.291 0 4.545.16 6.75.47v1.516M7.73 9.728a6.726 6.726 0 002.748 1.35m8.272-6.842V4.5c0 2.108-.966 3.99-2.48 5.228m2.48-5.492a46.32 46.32 0 012.916.52 6.003 6.003 0 01-5.395 4.972m0 0a6.726 6.726 0 01-2.749 1.35m0 0a6.772 6.772 0 01-3.044 0" />
      </svg>
    ),
  },
  {
    label: 'EMPRESAS CONFIARON',
    value: 5000,
    suffix: '+',
    sub: 'Clientes satisfechos',
    speed: 12, startFraction: 0.5, clockwise: false,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
      </svg>
    ),
  },
  {
    label: 'TIEMPO PROMEDIO',
    value: 3,
    suffix: '.2h',
    sub: 'Desde solicitud a giro',
    speed: 10, startFraction: 0.25, clockwise: true,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    label: 'CONFIDENCIALIDAD',
    value: 100,
    suffix: '%',
    sub: 'Sin recesión de cartera',
    speed: 14, startFraction: 0.75, clockwise: false,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
      </svg>
    ),
  },
];

const TITLE_LINES = [
  { text: 'Financiamiento', highlight: false },
  { text: 'Directo.', highlight: true },
  { text: 'Operación Privada.', highlight: false },
];

const STATS = [
  { value: 15, suffix: '', label: 'Años de experiencia' },
  { value: 10, suffix: '', label: 'Sucursales' },
  { value: 4,  suffix: 'h', label: 'Giro de fondos' },
];

export default function HeroV3() {
  return (
    <section id="hero" className="relative flex min-h-screen items-center overflow-hidden bg-[#04080F]">

      {/* ── Animated drifting orbs ── */}
      <motion.div
        className="absolute rounded-full bg-brand-primary/10 blur-[140px]"
        style={{ width: 700, height: 700, right: '-10%', top: '-10%' }}
        animate={{ x: [0, 40, -20, 0], y: [0, -30, 40, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute rounded-full bg-[#0D2B45]/70 blur-[120px]"
        style={{ width: 500, height: 500, left: '-8%', bottom: '-10%' }}
        animate={{ x: [0, -20, 30, 0], y: [0, 30, -20, 0] }}
        transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
      />
      <motion.div
        className="absolute rounded-full bg-brand-secondary/8 blur-[100px]"
        style={{ width: 350, height: 350, left: '40%', top: '50%' }}
        animate={{ x: [0, 30, -10, 0], y: [0, -20, 15, 0] }}
        transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
      />

      {/* ── Floating particles ── */}
      {PARTICLES.map((p) => <Particle key={`${p.x}-${p.y}`} {...p} />)}

      {/* ── Fine grid ── */}
      <div
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }}
      />

      {/* ── Diagonal accent lines ── */}
      <div className="absolute left-0 top-0 h-px w-[40%] origin-left rotate-[30deg] bg-gradient-to-r from-brand-primary/40 to-transparent" />
      <div className="absolute bottom-0 right-0 h-px w-[35%] origin-right -rotate-[25deg] bg-gradient-to-l from-brand-primary/30 to-transparent" />

      <div className="container-site relative z-10 grid grid-cols-1 items-center gap-10 pb-24 pt-28 lg:grid-cols-[1fr_460px] lg:gap-14 lg:pb-28 lg:pt-36 xl:gap-20">

        {/* ── LEFT ── */}
        <div>

          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1, duration: 0.55, ease: EASE }}
            className="mb-7 inline-flex items-center gap-2.5 rounded-full border border-brand-primary/25 bg-brand-primary/10 px-4 py-1.5"
          >
            <span className="relative flex h-2 w-2 shrink-0">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-primary opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-brand-primary" />
            </span>
            <span className="text-[11px] font-semibold uppercase tracking-widest text-brand-accent">
              Financiamiento directo, sin re-cesión a terceros
            </span>
          </motion.div>

          {/* Title — line-by-line reveal from bottom */}
          <h1 className="font-display text-[2.5rem] font-extrabold leading-[1.07] tracking-tight sm:text-5xl lg:text-[3.25rem] xl:text-6xl">
            {TITLE_LINES.map(({ text, highlight }, i) => (
              <motion.span
                key={text}
                className="block overflow-hidden"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 + i * 0.12 }}
              >
                <motion.span
                  className={`block ${highlight ? 'text-brand-primary' : 'text-white'}`}
                  initial={{ y: '110%' }}
                  animate={{ y: '0%' }}
                  transition={{ delay: 0.2 + i * 0.12, duration: 0.6, ease: EASE }}
                >
                  {text}
                </motion.span>
              </motion.span>
            ))}
          </h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.62, duration: 0.6, ease: EASE }}
            className="mt-6 max-w-[460px] text-base leading-relaxed text-white/45"
          >
            Boutique financiera con más de 15 años transformando facturas en capital de trabajo. Decisión inmediata de riesgo, giro de fondos en un máximo de 4 horas.
          </motion.p>

          {/* CTA with spinning border */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.75, duration: 0.5, ease: EASE }}
            className="mt-9"
          >
            <div className="relative inline-block overflow-hidden rounded-xl p-[1.5px]">
              <motion.div
                className="absolute inset-0 rounded-xl"
                style={{ background: 'conic-gradient(from 0deg, transparent 50%, #F86213, #FF8C42, transparent 100%)' }}
                animate={{ rotate: 360 }}
                transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
              />
              <a
                href="#contacto"
                className="relative flex items-center gap-2.5 rounded-xl bg-brand-primary px-7 py-3.5 text-sm font-bold text-white shadow-lg shadow-brand-primary/30 transition-all duration-200 hover:bg-brand-secondary hover:shadow-xl hover:shadow-brand-primary/40"
              >
                <span className="relative mr-1 flex h-2 w-2 shrink-0">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-60" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-white" />
                </span>
                {'Quiero hablar con un Ejecutivo'}
              </a>
            </div>
          </motion.div>

          {/* Bottom stats with count-up */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.7 }}
            className="mt-12 flex flex-wrap gap-10 border-t border-white/[0.07] pt-8"
          >
            {STATS.map(({ value, suffix, label }, i) => (
              <div key={label}>
                <p className="font-display text-2xl font-extrabold text-brand-primary sm:text-3xl">
                  <CountUp to={value} suffix={suffix} delay={1 + i * 0.15} />
                </p>
                <p className="mt-0.5 text-xs tracking-wide text-white/35">{label}</p>
              </div>
            ))}
          </motion.div>
        </div>

        {/* ── RIGHT: animated-border cards grid ── */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8, ease: EASE }}
          className="relative hidden lg:grid lg:grid-cols-2 lg:gap-3"
        >
          <div className="pointer-events-none absolute -inset-8 rounded-[3rem] bg-brand-primary/5 blur-3xl" />

          {CARDS.map((card, i) => (
            <GlowCard key={card.label} delay={0.55 + i * 0.1} speed={card.speed} startFraction={card.startFraction} clockwise={card.clockwise}>
              <div className="mb-3 flex items-start justify-between">
                <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-white/25">{card.label}</p>
                <motion.span
                  className="text-brand-primary/50"
                  animate={{ scale: [1, 1.18, 1] }}
                  transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.4, ease: 'easeInOut' }}
                >
                  {card.icon}
                </motion.span>
              </div>
              <p className="font-display text-[1.75rem] font-extrabold tracking-tight text-white">
                <CountUp to={card.value} suffix={card.suffix} delay={0.7 + i * 0.15} />
              </p>
              <p className="mt-1 text-[11px] font-semibold text-brand-accent">{card.sub}</p>
            </GlowCard>
          ))}

          <div className="col-span-2 mt-1 h-px w-full bg-gradient-to-r from-transparent via-brand-primary/25 to-transparent" />
        </motion.div>

      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 7, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
          className="flex h-9 w-5 items-start justify-center rounded-full border border-white/10 pt-1.5"
        >
          <div className="h-1.5 w-0.5 rounded-full bg-brand-primary/60" />
        </motion.div>
      </motion.div>

    </section>
  );
}
