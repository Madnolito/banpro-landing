import { useEffect, useRef, useState } from 'react';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';

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
      className="group relative rounded-2xl border border-orange-100/80 bg-white/75 p-5 shadow-xl shadow-orange-200/40 backdrop-blur-md"
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
          <rect x={1} y={1} width={size.w - 2} height={size.h - 2} rx={rx} fill="none" stroke="#F86213" strokeWidth="1" opacity="0.20" />
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

const CARD_ICONS = [
  <svg key="exp" viewBox="0 0 24 24" fill="none" className="h-5 w-5" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M16.5 18.75h-9m9 0a3 3 0 013 3h-15a3 3 0 013-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 01-.982-3.172M9.497 14.25a7.454 7.454 0 00.981-3.172M5.25 4.236c-.982.143-1.954.317-2.916.52A6.003 6.003 0 007.73 9.728M5.25 4.236V4.5c0 2.108.966 3.99 2.48 5.228M5.25 4.236V2.721C7.456 2.41 9.71 2.25 12 2.25c2.291 0 4.545.16 6.75.47v1.516M7.73 9.728a6.726 6.726 0 002.748 1.35m8.272-6.842V4.5c0 2.108-.966 3.99-2.48 5.228m2.48-5.492a46.32 46.32 0 012.916.52 6.003 6.003 0 01-5.395 4.972m0 0a6.726 6.726 0 01-2.749 1.35m0 0a6.772 6.772 0 01-3.044 0" /></svg>,
  <svg key="comp" viewBox="0 0 24 24" fill="none" className="h-5 w-5" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" /></svg>,
  <svg key="time" viewBox="0 0 24 24" fill="none" className="h-5 w-5" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
  <svg key="conf" viewBox="0 0 24 24" fill="none" className="h-5 w-5" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" /></svg>,
];

export default function HeroV3() {
  const t = useTranslations('hero');

  const STATS = [
    { value: 15, suffix: '',  label: t('stat1_label') },
    { value: 10, suffix: '',  label: t('stat2_label') },
    { value: 4,  suffix: 'h', label: t('stat3_label') },
  ];

  const CARDS = [
    { label: t('card1_label'), value: 15,   suffix: t('card1_suffix'), sub: t('card1_sub'), speed: 9,  startFraction: 0,    clockwise: true,  icon: CARD_ICONS[0] },
    { label: t('card2_label'), value: 5000, suffix: '+',               sub: t('card2_sub'), speed: 12, startFraction: 0.5,  clockwise: false, icon: CARD_ICONS[1] },
    { label: t('card3_label'), value: 3,    suffix: '.2h',             sub: t('card3_sub'), speed: 10, startFraction: 0.25, clockwise: true,  icon: CARD_ICONS[2] },
    { label: t('card4_label'), value: 100,  suffix: '%',               sub: t('card4_sub'), speed: 14, startFraction: 0.75, clockwise: false, icon: CARD_ICONS[3] },
  ];

  return (
    <section
      id="hero"
      className="relative flex min-h-screen items-center overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #C44208 0%, #E85510 12%, #F86213 30%, #FF7A30 52%, #FF9A5C 72%, #FFBA88 88%, #FFD0A8 100%)',
      }}
    >

      {/* ── Radial warmth orbs ── */}
      <motion.div
        className="absolute rounded-full blur-[160px]"
        style={{ width: 800, height: 800, right: '-15%', top: '-18%', background: 'radial-gradient(circle, #F86213cc 0%, #FF8C4280 40%, transparent 70%)' }}
        animate={{ x: [0, 40, -20, 0], y: [0, -30, 40, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute rounded-full blur-[120px]"
        style={{ width: 520, height: 520, left: '-6%', bottom: '-12%', background: 'radial-gradient(circle, #FFB07A60 0%, #FFD4B040 50%, transparent 75%)' }}
        animate={{ x: [0, -20, 30, 0], y: [0, 30, -20, 0] }}
        transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
      />
      <motion.div
        className="absolute rounded-full blur-[90px]"
        style={{ width: 360, height: 360, left: '38%', top: '45%', background: 'radial-gradient(circle, #FF8C4230 0%, transparent 70%)' }}
        animate={{ x: [0, 30, -10, 0], y: [0, -20, 15, 0] }}
        transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
      />

      {/* ── Floating particles ── */}
      {PARTICLES.map((p) => <Particle key={`${p.x}-${p.y}`} {...p} />)}

      {/* ── Fine grid ── */}
      <div
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(180,70,0,0.35) 1px, transparent 1px), linear-gradient(90deg, rgba(180,70,0,0.35) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }}
      />

      {/* ── Diagonal accent lines ── */}
      <div className="absolute left-0 top-0 h-px w-[40%] origin-left rotate-[30deg] bg-gradient-to-r from-white/60 to-transparent" />
      <div className="absolute bottom-0 right-0 h-px w-[35%] origin-right -rotate-[25deg] bg-gradient-to-l from-brand-primary/40 to-transparent" />

      <div className="container-site relative z-10 grid grid-cols-1 items-center gap-10 pb-24 pt-28 lg:grid-cols-[1fr_460px] lg:gap-14 lg:pb-28 lg:pt-36 xl:gap-20">

        {/* ── LEFT ── */}
        <div>

          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1, duration: 0.55, ease: EASE }}
            className="mb-7 inline-flex items-center gap-2.5 rounded-full border border-white/50 bg-white/40 px-4 py-1.5 shadow-sm backdrop-blur-sm"
          >
            <span className="relative flex h-2 w-2 shrink-0">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-80" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-white" />
            </span>
            <span className="text-[11px] font-semibold uppercase tracking-widest text-white/90">
              {t('eyebrow')}
            </span>
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.27, duration: 0.65, ease: EASE }}
            className="font-display text-[2.5rem] font-extrabold leading-[1.07] tracking-tight sm:text-5xl lg:text-[3.25rem] xl:text-6xl"
          >
            <span className="text-white drop-shadow-sm">{t('title_line1')}</span>{' '}
            <span className="text-gray-800 drop-shadow-sm">{t('title_line2')}</span>
            <br />
            <span className="text-white drop-shadow-sm">{t('title_line3')}</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.62, duration: 0.6, ease: EASE }}
            className="mt-6 max-w-[460px] text-base leading-relaxed text-gray-700/80"
          >
            {t('subtitle')}
          </motion.p>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.75, duration: 0.5, ease: EASE }}
            className="mt-9"
          >
            <a
              href="#contacto"
              className="inline-flex items-center gap-2.5 rounded-xl bg-white px-7 py-3.5 text-sm font-bold text-brand-primary shadow-xl shadow-black/15 transition-all duration-200 hover:bg-orange-50 hover:shadow-2xl hover:shadow-black/20"
            >
              <span className="relative mr-1 flex h-2 w-2 shrink-0">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-primary opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-brand-primary" />
              </span>
              {t('cta')}
            </a>
          </motion.div>

          {/* Bottom stats with count-up */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.7 }}
            className="mt-12 flex flex-wrap gap-10 border-t border-white/40 pt-8"
          >
            {STATS.map(({ value, suffix, label }, i) => (
              <div key={label}>
                <p className="font-display text-2xl font-extrabold text-gray-900 sm:text-3xl drop-shadow-sm">
                  <CountUp to={value} suffix={suffix} delay={1 + i * 0.15} />
                </p>
                <p className="mt-0.5 text-xs tracking-wide text-gray-600/70">{label}</p>
              </div>
            ))}
          </motion.div>
        </div>

        {/* ── RIGHT: animated-border cards grid ── */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8, ease: EASE }}
          className="relative grid grid-cols-2 gap-3"
        >
          <div className="pointer-events-none absolute -inset-8 rounded-[3rem] bg-white/20 blur-3xl" />

          {CARDS.map((card, i) => (
            <GlowCard key={card.label} delay={0.55 + i * 0.1} speed={card.speed} startFraction={card.startFraction} clockwise={card.clockwise}>
              <div className="mb-3 flex items-start justify-between">
                <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-gray-400">{card.label}</p>
                <motion.span
                  className="text-brand-primary"
                  animate={{ scale: [1, 1.18, 1] }}
                  transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.4, ease: 'easeInOut' }}
                >
                  {card.icon}
                </motion.span>
              </div>
              <p className="font-display text-[1.75rem] font-extrabold tracking-tight text-gray-900">
                <CountUp to={card.value} suffix={card.suffix} delay={0.7 + i * 0.15} />
              </p>
              <p className="mt-1 text-[11px] font-semibold text-brand-primary/80">{card.sub}</p>
            </GlowCard>
          ))}

          <div className="col-span-2 mt-1 h-px w-full bg-gradient-to-r from-transparent via-white/60 to-transparent" />
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
          className="flex h-9 w-5 items-start justify-center rounded-full border border-white/50 bg-white/20 pt-1.5 backdrop-blur-sm"
        >
          <div className="h-1.5 w-0.5 rounded-full bg-white/80" />
        </motion.div>
      </motion.div>

    </section>
  );
}
