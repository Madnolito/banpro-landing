import { useTranslations } from 'next-intl';

import FadeIn from '@/components/FadeIn';

const BENEFITS = [
  { step: '01', titleKey: 'b1_title', descKey: 'b1_desc' },
  { step: '02', titleKey: 'b2_title', descKey: 'b2_desc' },
  { step: '03', titleKey: 'b3_title', descKey: 'b3_desc' },
];

export default function Factoring() {
  const t = useTranslations('factoring');

  return (
    <section id="factoring" className="bg-brand-light py-24 lg:py-32 scroll-mt-20">
      <div className="container-site">
        <div className="grid items-center gap-16 lg:grid-cols-2">
          <div>
            <FadeIn>
              <span className="section-label">{t('label')}</span>
            </FadeIn>
            <FadeIn delay={0.1}>
              <h2 className="section-title mt-3">{t('title')}</h2>
            </FadeIn>
            <FadeIn delay={0.2}>
              <p className="section-subtitle">{t('description')}</p>
            </FadeIn>
            <FadeIn delay={0.3}>
              <a
                href="https://webfactoring2.banpro.cl/index.html"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary mt-8 inline-flex px-8 py-3.5"
              >
                {t('cta')}
              </a>
            </FadeIn>
          </div>

          <div className="flex flex-col gap-6">
            {BENEFITS.map(({ step, titleKey, descKey }, i) => (
              <FadeIn key={step} delay={i * 0.12} dir="right">
                <div className="group flex items-start gap-6 rounded-2xl bg-white p-6 shadow-sm shadow-brand-primary/5 transition-all duration-300 hover:shadow-md hover:shadow-brand-primary/10">
                  <div className="shrink-0">
                    <span className="font-display text-3xl font-extrabold text-brand-primary/20 transition-colors duration-300 group-hover:text-brand-primary/40">
                      {step}
                    </span>
                  </div>
                  <div className="border-l-2 border-brand-primary/20 pl-5 transition-all duration-300 group-hover:border-brand-primary">
                    <h3 className="font-display text-lg font-bold text-gray-900">{t(titleKey)}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-gray-500">{t(descKey)}</p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
