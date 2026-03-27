import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';

const EASE = [0.22, 1, 0.36, 1] as const;

const STATS = [
  { value: '24h', key: 'stat1' },
  { value: '17+', key: 'stat2' },
  { value: '100%', key: 'stat3' },
];

const OPERATIONS = [
  { id: 'OP-2847', amount: '$4.200.000', debtor: 'Empresa del Norte S.A.', status: 'Aprobada', color: 'text-brand-accent' },
  { id: 'OP-2846', amount: '$8.750.000', debtor: 'Comercial Centro Ltda.', status: 'Girada', color: 'text-green-400' },
  { id: 'OP-2845', amount: '$1.850.000', debtor: 'Servicios Sur SpA', status: 'Aprobada', color: 'text-brand-accent' },
];

export default function Hero() {
  const t = useTranslations('hero');

  return (
    <section id="hero" className="relative flex min-h-screen items-center overflow-hidden bg-[#08080d]">

      {/* Background gradient mesh */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#08080d] via-[#120600] to-[#08080d]" />

      {/* Glow orbs */}
      <div className="absolute right-[8%] top-[10%] h-[600px] w-[600px] rounded-full bg-brand-primary/10 blur-[130px]" />
      <div className="absolute -bottom-32 left-[3%] h-[400px] w-[400px] rounded-full bg-brand-accent/8 blur-[110px]" />
      <div className="absolute left-[45%] top-[55%] h-[300px] w-[300px] rounded-full bg-brand-secondary/8 blur-[90px]" />

      {/* Dot grid */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1px)',
          backgroundSize: '28px 28px',
        }}
      />

      {/* Diagonal lines top-right */}
      <svg className="absolute right-0 top-0 h-full w-1/2 opacity-[0.025]" preserveAspectRatio="none">
        {[0,1,2,3,4,5,6,7,8,9,10,11].map((i) => (
          <line
            key={i}
            x1={`${i * 10}%`} y1="0%"
            x2={`${i * 10 + 60}%`} y2="100%"
            stroke="white" strokeWidth="1"
          />
        ))}
      </svg>

      <div className="container-site relative z-10 grid grid-cols-1 items-center gap-10 pb-24 pt-28 lg:grid-cols-[1fr_480px] lg:gap-14 lg:pb-28 lg:pt-36 xl:gap-20">

        {/* ── LEFT: Text content ── */}
        <div>

          {/* Eyebrow badge */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.55, ease: EASE }}
            className="mb-6 inline-flex items-center gap-2.5 rounded-full border border-brand-primary/20 bg-brand-primary/8 px-4 py-1.5"
          >
            <span className="relative flex h-2 w-2 shrink-0">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-primary opacity-50" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-brand-primary" />
            </span>
            <span className="text-[11px] font-semibold uppercase tracking-widest text-brand-accent">
              {t('eyebrow')}
            </span>
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.27, duration: 0.65, ease: EASE }}
            className="font-display text-[2.5rem] font-extrabold leading-[1.07] tracking-tight text-white sm:text-5xl lg:text-[3.25rem] xl:text-6xl"
          >
            {t('title_1')}{' '}
            <span className="relative inline-block">
              <span className="relative z-10 text-brand-primary">{t('title_highlight')}</span>
              <span className="absolute -bottom-0.5 left-0 right-0 h-[3px] rounded-full bg-gradient-to-r from-brand-primary to-brand-accent opacity-50 blur-[2px]" />
            </span>{' '}
            <span className="text-white/90">{t('title_2')}</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6, ease: EASE }}
            className="mt-6 max-w-[480px] text-base leading-relaxed text-white/45 sm:text-[1.05rem]"
          >
            {t('subtitle')}
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.52, duration: 0.5, ease: EASE }}
            className="mt-9 flex flex-wrap gap-3"
          >
            <a href="#contacto" className="btn-primary px-7 py-3.5 text-sm">
              {t('cta_contact')}
            </a>
            <a
              href="https://webfactoring2.banpro.cl/index.html"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline px-7 py-3.5 text-sm"
            >
              {t('cta_webfactoring')}
            </a>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.72, duration: 0.7 }}
            className="mt-12 flex flex-wrap gap-10 border-t border-white/[0.07] pt-8"
          >
            {STATS.map(({ value, key }) => (
              <div key={key}>
                <p className="font-display text-2xl font-extrabold text-brand-primary sm:text-3xl">{value}</p>
                <p className="mt-0.5 text-xs tracking-wide text-white/35">{t(key)}</p>
              </div>
            ))}
          </motion.div>
        </div>

        {/* ── RIGHT: Dashboard mockup ── */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45, duration: 0.8, ease: EASE }}
          className="relative hidden lg:block"
        >
          {/* Ambient glow behind card */}
          <div className="absolute -inset-6 rounded-[2rem] bg-brand-primary/5 blur-3xl" />

          {/* Main dashboard card */}
          <div className="relative overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.03] p-5 shadow-2xl backdrop-blur-sm">

            {/* Card top bar */}
            <div className="mb-5 flex items-center justify-between">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-white/25">Web Factoring</p>
                <p className="mt-0.5 text-sm font-semibold text-white/75">Panel de operaciones</p>
              </div>
              <div className="flex items-center gap-1.5 rounded-full border border-green-500/20 bg-green-500/10 px-3 py-1">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-green-400" />
                <span className="text-[10px] font-semibold text-green-400">En línea</span>
              </div>
            </div>

            {/* Credit line */}
            <div className="mb-4 rounded-xl border border-white/[0.06] bg-white/[0.03] p-4">
              <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-white/25">Línea disponible</p>
              <p className="mt-1 font-display text-[1.6rem] font-bold tracking-tight text-white">$45.000.000</p>
              <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-white/[0.08]">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: '62%' }}
                  transition={{ delay: 1.1, duration: 1.4, ease: EASE }}
                  className="h-full rounded-full bg-gradient-to-r from-brand-primary to-brand-accent"
                />
              </div>
              <div className="mt-1.5 flex justify-between">
                <span className="text-[10px] text-white/20">Utilizado $27.900.000</span>
                <span className="text-[10px] font-bold text-brand-accent">62%</span>
              </div>
            </div>

            {/* Operations list */}
            <div>
              <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.15em] text-white/20">Últimas operaciones</p>
              <div className="space-y-2">
                {OPERATIONS.map((op, i) => (
                  <motion.div
                    key={op.id}
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.85 + i * 0.1, duration: 0.4, ease: EASE }}
                    className="flex items-center justify-between rounded-lg border border-white/[0.05] bg-white/[0.02] px-3.5 py-2.5 transition-colors hover:bg-white/[0.04]"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-brand-primary/10">
                        <svg className="h-3.5 w-3.5 text-brand-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-[11px] font-bold text-white/65">{op.id}</p>
                        <p className="text-[10px] text-white/25">{op.debtor}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-[11px] font-bold text-white/75">{op.amount}</p>
                      <p className={`text-[10px] font-semibold ${op.color}`}>{op.status}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Shimmer line at bottom */}
            <div className="mt-4 h-px w-full bg-gradient-to-r from-transparent via-brand-primary/30 to-transparent" />
          </div>

          {/* Floating badge: 24h */}
          <motion.div
            initial={{ opacity: 0, y: 14, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 1.15, duration: 0.5, ease: EASE }}
            className="absolute -bottom-4 -left-8 flex items-center gap-3 rounded-xl border border-white/[0.09] bg-[#0e0e16] px-4 py-3 shadow-2xl"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-primary/15">
              <svg className="h-4 w-4 text-brand-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <div>
              <p className="text-xs font-bold text-white">Apertura en 24 hrs</p>
              <p className="text-[10px] text-white/30">Sin trámites ni burocracia</p>
            </div>
          </motion.div>

          {/* Floating badge: coverage */}
          <motion.div
            initial={{ opacity: 0, y: -14, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 1.3, duration: 0.5, ease: EASE }}
            className="absolute -right-8 -top-4 flex items-center gap-3 rounded-xl border border-white/[0.09] bg-[#0e0e16] px-4 py-3 shadow-2xl"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-primary/15">
              <svg className="h-4 w-4 text-brand-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <div>
              <p className="text-xs font-bold text-white">Chile &amp; Perú</p>
              <p className="text-[10px] text-white/30">17+ sucursales</p>
            </div>
          </motion.div>
        </motion.div>

      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
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
