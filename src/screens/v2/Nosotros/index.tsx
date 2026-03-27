import { useTranslations } from 'next-intl';

import FadeIn from '@/components/FadeIn';

const VALUES = [
  { icon: '⚡', titleKey: 'v1_title', descKey: 'v1_desc' },
  { icon: '🤝', titleKey: 'v2_title', descKey: 'v2_desc' },
  { icon: '🔍', titleKey: 'v3_title', descKey: 'v3_desc' },
];

const DIRECTORIO = [
  { name: 'José Tomás Covarrubias Valenzuela', role: 'Presidente' },
  { name: 'Rafael Covarrubias Valenzuela', role: '' },
  { name: 'Norberto Marambio Díaz', role: '' },
  { name: 'Maria Jose Vicuña Fernandez', role: '' },
  { name: 'José Tomás Vicuña Fernandez', role: '' },
];

export default function Nosotros() {
  const t = useTranslations('nosotros');

  return (
    <section id="nosotros" className="bg-white py-24 lg:py-32">
      <div className="container-site">
        <div className="mb-16 max-w-2xl">
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

        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="flex flex-col gap-5">
            {VALUES.map(({ icon, titleKey, descKey }, i) => (
              <FadeIn key={titleKey} delay={i * 0.12} dir="left">
                <div className="group flex items-start gap-5 rounded-2xl border border-neutral-100 bg-neutral-50 p-6 transition-all duration-300 hover:border-brand-primary/20 hover:bg-brand-light hover:shadow-sm">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-brand-primary/10 text-2xl transition-all duration-300 group-hover:bg-brand-primary/20">
                    {icon}
                  </div>
                  <div>
                    <h3 className="font-display text-lg font-bold text-gray-900">{t(titleKey)}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-gray-500">{t(descKey)}</p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>

          <FadeIn delay={0.15} dir="right">
            <div className="rounded-2xl bg-brand-dark p-8 text-white">
              <p className="section-label mb-6 text-brand-accent">{t('board_label')}</p>
              <ul className="flex flex-col divide-y divide-white/10">
                {DIRECTORIO.map(({ name, role }) => (
                  <li key={name} className="flex items-center justify-between py-4">
                    <span className="text-sm font-medium text-white/90">{name}</span>
                    {role && (
                      <span className="ml-4 shrink-0 rounded-full bg-brand-primary/20 px-3 py-0.5 text-xs font-semibold text-brand-accent">
                        {role}
                      </span>
                    )}
                  </li>
                ))}
              </ul>
              <a href="#contacto" className="btn-primary mt-8 w-full justify-center py-3 text-sm">
                {t('cta')}
              </a>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
