import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';

import FadeIn from '@/components/FadeIn';
import BoltIcon from '@/assets/icons/bolt.svg';
import UserGroupIcon from '@/assets/icons/user-group.svg';
import EyeIcon from '@/assets/icons/eye.svg';

const VALUES = [
  { Icon: BoltIcon, titleKey: 'v1_title', descKey: 'v1_desc' },
  { Icon: UserGroupIcon, titleKey: 'v2_title', descKey: 'v2_desc' },
  { Icon: EyeIcon, titleKey: 'v3_title', descKey: 'v3_desc' },
] as const;

const DIRECTORIO = [
  { name: 'José Tomás Covarrubias Valenzuela', initials: 'JTC', role: 'Presidente' },
  { name: 'Rafael Covarrubias Valenzuela', initials: 'RCV', role: '' },
  { name: 'Norberto Marambio Díaz', initials: 'NMD', role: '' },
  { name: 'Maria Jose Vicuña Fernandez', initials: 'MJV', role: '' },
  { name: 'José Tomás Vicuña Fernandez', initials: 'JTV', role: '' },
];

export default function Nosotros() {
  const t = useTranslations('nosotros');

  return (
    <section className="relative overflow-hidden bg-gray-50 py-24 lg:py-32">
      {/* Decorative gradient bleed from the right */}
      <div className="pointer-events-none absolute right-0 top-0 h-full w-1/2 bg-gradient-to-l from-brand-light/50 to-transparent" />

      <div className="container-site relative">
        <div id="nosotros" className="mb-16 max-w-2xl scroll-mt-20">
          <FadeIn>
            <span className="section-label">{t('label')}</span>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h2 className="section-title mt-3">{t('title')}</h2>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="section-subtitle">{t('description')}</p>
          </FadeIn>
        </div>

        <div className="grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
          {/* Values */}
          <div className="grid gap-5" style={{ gridAutoRows: '1fr' }}>
            {VALUES.map(({ Icon, titleKey, descKey }, i) => (
              <FadeIn key={titleKey} delay={i * 0.12} dir="left" className="h-full">
                <motion.div
                  className="relative flex h-full w-full items-center gap-5 overflow-hidden rounded-2xl border border-gray-200 bg-white p-6 shadow-[0_2px_12px_-2px_rgba(0,0,0,0.08)]"
                  initial="rest"
                  whileHover="hover"
                  animate="rest"
                  variants={{ rest: { scale: 1 }, hover: { scale: 1.02 } }}
                  transition={{ duration: 0.2, ease: 'easeOut' }}
                >
                  <motion.div
                    className="absolute left-0 top-0 h-full w-1 rounded-r-full bg-brand-primary"
                    variants={{ rest: { opacity: 0 }, hover: { opacity: 1 } }}
                    transition={{ duration: 0.2 }}
                  />
                  <motion.div
                    className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl"
                    variants={{ rest: { backgroundColor: '#ffedd5', color: '#F86213' }, hover: { backgroundColor: '#F86213', color: '#ffffff' } }}
                    transition={{ duration: 0.2 }}
                  >
                    <Icon className="h-8 w-8" />
                  </motion.div>
                  <div>
                    <h3 className="font-display text-lg font-bold text-gray-900">{t(titleKey)}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-gray-500">{t(descKey)}</p>
                  </div>
                </motion.div>
              </FadeIn>
            ))}
          </div>

          {/* Directorio — dark card */}
          <FadeIn delay={0.15} dir="right">
            <div className="overflow-hidden rounded-2xl border border-orange-100 bg-orange-50/40 p-8 shadow-[0_8px_40px_-8px_rgba(0,0,0,0.10)]">
              {/* Header */}
              <div className="mb-6 flex items-center justify-between">
                <p className="font-display text-lg font-bold text-gray-900">{t('board_label')}</p>
                <span className="rounded-full bg-brand-primary/15 px-3 py-1 text-xs font-bold text-brand-primary">
                  5 miembros
                </span>
              </div>

              {/* List */}
              <div className="flex flex-col divide-y divide-orange-100">
                {DIRECTORIO.map(({ name, initials, role }, i) => (
                  <FadeIn key={name} delay={0.25 + i * 0.07} dir="left">
                    <div className="flex items-center gap-4 py-3.5">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-orange-100 bg-brand-light text-[11px] font-bold text-brand-primary">
                        {initials}
                      </div>
                      <p className="flex-1 text-sm text-gray-700">{name}</p>
                      {role && (
                        <span className="ml-4 shrink-0 rounded-full bg-brand-primary/15 px-3 py-0.5 text-xs font-semibold text-brand-primary">
                          {role}
                        </span>
                      )}
                    </div>
                  </FadeIn>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
