import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import FadeIn from '@/components/FadeIn';
import DocumentArrowUpIcon from '@/assets/icons/document-arrow-up.svg';
import BellAlertIcon from '@/assets/icons/bell-alert.svg';
import ArrowTrendingDownIcon from '@/assets/icons/arrow-trending-down.svg';
import LockClosedIcon from '@/assets/icons/lock-closed.svg';
import BellSlashIcon from '@/assets/icons/bell-slash.svg';
import BuildingLibraryIcon from '@/assets/icons/building-library.svg';

const CON_ITEMS = [
  { label: 'con_item1', Icon: DocumentArrowUpIcon },
  { label: 'con_item2', Icon: BellAlertIcon },
  { label: 'con_item3', Icon: ArrowTrendingDownIcon },
];

const SIN_ITEMS = [
  { label: 'sin_item1', Icon: LockClosedIcon },
  { label: 'sin_item2', Icon: BellSlashIcon },
  { label: 'sin_item3', Icon: BuildingLibraryIcon },
];

export default function Ventajas() {
  const t = useTranslations('ventajas');

  return (
    <section id="ventajas" className="relative overflow-hidden bg-[#3A3633] py-24 lg:py-32 scroll-mt-20">
      {/* Subtle radial glow */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div className="h-[500px] w-[800px] rounded-full bg-brand-primary/8 blur-3xl" />
      </div>

      <div className="container-site relative">
        {/* Header */}
        <div className="mb-16 text-center">
          <FadeIn>
            <span className="section-label">{t('label')}</span>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h2 className="section-title mt-3 text-white">{t('title')}</h2>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="section-subtitle mx-auto mt-4 max-w-lg text-gray-400">{t('subtitle')}</p>
          </FadeIn>
        </div>

        {/* Comparison */}
        <div className="relative flex flex-col items-stretch gap-6 md:flex-row md:items-center">
          {/* CON card */}
          <FadeIn delay={0.1} dir="left" className="flex-1">
            <div className="h-full rounded-2xl border border-white/15 bg-white/[0.08] p-8 backdrop-blur-sm">
              <div className="mb-5 flex items-center gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-red-500/20 text-red-400">
                  <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </div>
                <span className="font-display text-sm font-bold uppercase tracking-widest text-red-400">
                  {t('con_title')}
                </span>
              </div>
              <div className="flex flex-col gap-3">
                {CON_ITEMS.map(({ label, Icon }) => (
                  <div
                    key={label}
                    className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.06] px-4 py-4"
                  >
                    <Icon className="h-6 w-6 shrink-0 text-red-400/70" />
                    <span className="text-sm text-gray-300">{t(label)}</span>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>

          {/* VS badge */}
          <FadeIn delay={0.2} className="flex shrink-0 items-center justify-center md:w-14">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, type: 'spring', stiffness: 300, damping: 20 }}
              className="relative flex h-12 w-12 items-center justify-center rounded-full bg-brand-primary font-display text-sm font-black text-white shadow-[0_0_24px_4px_rgba(248,98,19,0.4)]"
            >
              <motion.span
                className="absolute inset-0 rounded-full bg-brand-primary"
                animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0, 0.5] }}
                transition={{ duration: 2.4, ease: 'easeInOut', repeat: Infinity }}
              />
              VS
            </motion.div>
          </FadeIn>

          {/* SIN card */}
          <FadeIn delay={0.3} dir="right" className="flex-1">
            <motion.div
              animate={{
                y: [0, -6],
                boxShadow: [
                  '0 0 60px -4px rgba(248,98,19,0.45)',
                  '0 0 80px 4px rgba(248,98,19,0.65)',
                ],
              }}
              transition={{ duration: 1.75, ease: 'easeInOut', repeat: Infinity, repeatType: 'mirror' }}
              className="relative h-full rounded-2xl border-2 border-brand-primary bg-white/[0.08] p-8 backdrop-blur-sm ring-1 ring-brand-primary/30 ring-offset-2 ring-offset-transparent"
            >
              {/* BANPRO badge */}
              <div className="absolute -top-4 right-5 rounded-full bg-brand-primary px-4 py-1.5 text-xs font-black uppercase tracking-widest text-white shadow-lg">
                BANPRO
              </div>

              <div className="mb-5 flex items-center gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-green-500/20 text-green-400">
                  <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="font-display text-sm font-bold uppercase tracking-widest text-green-400">
                  {t('sin_title')}
                </span>
              </div>
              <div className="flex flex-col gap-3">
                {SIN_ITEMS.map(({ label, Icon }) => (
                  <div
                    key={label}
                    className="flex items-center gap-3 rounded-xl border border-brand-primary/20 bg-brand-primary/10 px-4 py-4"
                  >
                    <Icon className="h-6 w-6 shrink-0 text-brand-primary" />
                    <span className="text-sm font-medium text-gray-200">{t(label)}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
