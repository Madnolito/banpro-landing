import { useEffect, useRef, useState } from 'react';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';

const EASE = [0.22, 1, 0.36, 1] as const;

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
    return () => { clearTimeout(timer); if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, [to, delay]);
  return <>{val}{suffix}</>;
}

function GlowCard({ children, delay = 0, speed = 5, startFraction = 0, clockwise = true }: Readonly<{ children: React.ReactNode; delay?: number; speed?: number; startFraction?: number; clockwise?: boolean }>) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState({ w: 0, h: 0 });

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const ro = new ResizeObserver(() => setSize({ w: el.offsetWidth, h: el.offsetHeight }));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const rx = 16;
  const perimeter = size.w ? 2 * (size.w - 2 * rx) + 2 * (size.h - 2 * rx) + 2 * Math.PI * rx : 0;
  const trailLen = perimeter * 0.22;

  return (
    <motion.div
      ref={wrapRef}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5, ease: EASE }}
      className="group relative rounded-2xl border border-white/[0.06] bg-[#0d0d14] p-5"
    >
      {perimeter > 0 && (
        <svg className="pointer-events-none absolute inset-0" width={size.w} height={size.h} style={{ overflow: 'visible' }}>
          <defs>
            <filter id="border-glow">
              <feGaussianBlur stdDeviation="2.5" result="blur" />
              <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
          </defs>
          <rect x={1} y={1} width={size.w - 2} height={size.h - 2} rx={rx} fill="none" stroke="#F86213" strokeWidth="1" opacity="0.12" />
          <motion.rect
            x={1} y={1} width={size.w - 2} height={size.h - 2} rx={rx}
            fill="none" stroke="#F86213" strokeWidth="1.5" filter="url(#border-glow)" strokeLinecap="round"
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

const CARD_ICONS = [
  <svg key="exp" viewBox="0 0 24 24" fill="none" className="h-4 w-4" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M16.5 18.75h-9m9 0a3 3 0 013 3h-15a3 3 0 013-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 01-.982-3.172M9.497 14.25a7.454 7.454 0 00.981-3.172M5.25 4.236c-.982.143-1.954.317-2.916.52A6.003 6.003 0 007.73 9.728M5.25 4.236V4.5c0 2.108.966 3.99 2.48 5.228M5.25 4.236V2.721C7.456 2.41 9.71 2.25 12 2.25c2.291 0 4.545.16 6.75.47v1.516M7.73 9.728a6.726 6.726 0 002.748 1.35m8.272-6.842V4.5c0 2.108-.966 3.99-2.48 5.228m2.48-5.492a46.32 46.32 0 012.916.52 6.003 6.003 0 01-5.395 4.972m0 0a6.726 6.726 0 01-2.749 1.35m0 0a6.772 6.772 0 01-3.044 0" /></svg>,
  <svg key="comp" viewBox="0 0 24 24" fill="none" className="h-4 w-4" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0M12 12.75h.008v.008H12v-.008z" /></svg>,
  <svg key="time" viewBox="0 0 24 24" fill="none" className="h-4 w-4" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
  <svg key="conf" viewBox="0 0 24 24" fill="none" className="h-4 w-4" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" /></svg>,
];

export default function Hero() {
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
    <section id="hero" className="relative flex min-h-screen items-center overflow-hidden bg-[#08080d]">

      <div className="absolute inset-0 bg-gradient-to-br from-[#08080d] via-[#120600] to-[#08080d]" />
      <div className="absolute right-[8%] top-[10%] h-[600px] w-[600px] rounded-full bg-brand-primary/10 blur-[130px]" />
      <div className="absolute -bottom-32 left-[3%] h-[400px] w-[400px] rounded-full bg-brand-accent/8 blur-[110px]" />
      <div className="absolute left-[45%] top-[55%] h-[300px] w-[300px] rounded-full bg-brand-secondary/8 blur-[90px]" />
      <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1px)', backgroundSize: '28px 28px' }} />
      <svg className="absolute right-0 top-0 h-full w-1/2 opacity-[0.025]" preserveAspectRatio="none">
        {[0,1,2,3,4,5,6,7,8,9,10,11].map((i) => (
          <line key={i} x1={`${i * 10}%`} y1="0%" x2={`${i * 10 + 60}%`} y2="100%" stroke="white" strokeWidth="1" />
        ))}
      </svg>

      <div className="container-site relative z-10 grid grid-cols-1 items-center gap-10 pb-24 pt-28 lg:grid-cols-[1fr_460px] lg:gap-14 lg:pb-28 lg:pt-36 xl:gap-20">

        <div>
          <motion.div
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.55, ease: EASE }}
            className="mb-6 inline-flex items-center gap-2.5 rounded-full border border-brand-primary/20 bg-brand-primary/8 px-4 py-1.5"
          >
            <span className="relative flex h-2 w-2 shrink-0">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-primary opacity-50" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-brand-primary" />
            </span>
            <span className="text-[11px] font-semibold uppercase tracking-widest text-brand-accent">{t('eyebrow')}</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.27, duration: 0.65, ease: EASE }}
            className="font-display text-[2.5rem] font-extrabold leading-[1.07] tracking-tight text-white sm:text-5xl lg:text-[3.25rem] xl:text-6xl"
          >
            {t('title_line1')}{' '}
            <span className="relative inline-block">
              <span className="relative z-10 text-brand-primary">{t('title_line2')}</span>
              <span className="absolute -bottom-0.5 left-0 right-0 h-[3px] rounded-full bg-gradient-to-r from-brand-primary to-brand-accent opacity-50 blur-[2px]" />
            </span>
            <br />
            <span className="text-white/90">{t('title_line3')}</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6, ease: EASE }}
            className="mt-6 max-w-[480px] text-base leading-relaxed text-white/45 sm:text-[1.05rem]"
          >
            {t('subtitle')}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.52, duration: 0.5, ease: EASE }}
            className="mt-9"
          >
            <a href="#contacto" className="btn-primary px-7 py-3.5 text-sm">{t('cta')}</a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ delay: 0.72, duration: 0.7 }}
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

        <motion.div
          initial={{ opacity: 0, y: 32 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45, duration: 0.8, ease: EASE }}
          className="relative"
        >
          <div className="absolute -inset-6 rounded-[2rem] bg-brand-primary/5 blur-3xl" />
          <div className="relative grid grid-cols-2 gap-3">
            {CARDS.map((card, i) => (
              <GlowCard key={card.label} delay={0.6 + i * 0.1} speed={card.speed} startFraction={card.startFraction} clockwise={card.clockwise}>
                <div className="mb-3 flex items-start justify-between">
                  <p className="text-[10px] font-bold uppercase tracking-[0.13em] text-white/25">{card.label}</p>
                  <motion.span className="text-brand-primary/50" animate={{ scale: [1, 1.18, 1] }} transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.4, ease: 'easeInOut' }}>
                    {card.icon}
                  </motion.span>
                </div>
                <p className="font-display text-2xl font-extrabold tracking-tight text-white">
                  <CountUp to={card.value} suffix={card.suffix} delay={0.7 + i * 0.15} />
                </p>
                <p className="mt-1 text-[11px] font-semibold text-brand-accent">{card.sub}</p>
              </GlowCard>
            ))}
          </div>
          <div className="mt-3 h-px w-full bg-gradient-to-r from-transparent via-brand-primary/20 to-transparent" />
        </motion.div>

      </div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }} className="absolute bottom-8 left-1/2 -translate-x-1/2">
        <motion.div animate={{ y: [0, 7, 0] }} transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }} className="flex h-9 w-5 items-start justify-center rounded-full border border-white/10 pt-1.5">
          <div className="h-1.5 w-0.5 rounded-full bg-brand-primary/60" />
        </motion.div>
      </motion.div>

    </section>
  );
}
