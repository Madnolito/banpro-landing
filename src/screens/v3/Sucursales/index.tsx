import { useTranslations } from 'next-intl';

import FadeIn from '@/components/FadeIn';

const SUCURSALES = [
  'Iquique', 'Antofagasta', 'Copiapó', 'Vallenar', 'La Serena', 'Ovalle',
  'Los Andes', 'Santiago', 'Talca', 'Chillán', 'Los Ángeles', 'Concepción',
  'Temuco', 'Osorno', 'Puerto Montt', 'Puerto Natales', 'Punta Arenas',
];

export default function Sucursales() {
  const t = useTranslations('sucursales');

  return (
    <section id="sucursales" className="bg-brand-dark py-24 lg:py-32">
      <div className="container-site">
        <div className="mb-14 max-w-2xl">
          <FadeIn>
            <span className="section-label text-brand-accent">{t('label')}</span>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h2 className="section-title mt-3 text-white">{t('title')}</h2>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="section-subtitle text-white/50">{t('description')}</p>
          </FadeIn>
        </div>

        <div className="grid gap-10 lg:grid-cols-3 lg:gap-16">
          {/* Visual strip — desktop only */}
          <FadeIn dir="left" className="hidden lg:block">
            <div className="relative flex flex-col items-center">
              <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-gradient-to-b from-brand-primary via-brand-accent to-brand-secondary" />
              {SUCURSALES.map((city, i) => (
                <div
                  key={city}
                  className="relative z-10 flex w-full items-center gap-4 py-2"
                  style={{ justifyContent: i % 2 === 0 ? 'flex-start' : 'flex-end' }}
                >
                  {i % 2 === 0 ? (
                    <>
                      <span className="rounded-lg bg-white/5 px-3 py-1 text-xs font-medium text-white/70">{city}</span>
                      <span className="h-2.5 w-2.5 rounded-full border-2 border-brand-primary bg-brand-dark" />
                    </>
                  ) : (
                    <>
                      <span className="h-2.5 w-2.5 rounded-full border-2 border-brand-accent bg-brand-dark" />
                      <span className="rounded-lg bg-white/5 px-3 py-1 text-xs font-medium text-white/70">{city}</span>
                    </>
                  )}
                </div>
              ))}
            </div>
          </FadeIn>

          {/* Grid cards */}
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:col-span-2">
            {SUCURSALES.map((city, i) => (
              <FadeIn key={city} delay={i * 0.04}>
                <div className="group rounded-xl border border-white/5 bg-white/5 px-4 py-3 transition-all duration-200 hover:border-brand-primary/40 hover:bg-brand-primary/10">
                  <div className="flex items-center gap-2.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-brand-primary transition-all duration-200 group-hover:scale-125" />
                    <span className="text-sm font-medium text-white/80 transition-colors duration-200 group-hover:text-white">
                      {city}
                    </span>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>

        <FadeIn delay={0.3}>
          <div className="mt-12 flex flex-col items-start gap-4 rounded-2xl border border-white/10 bg-white/5 p-6 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-white/50">{t('footer_note')}</p>
            <a href="#contacto" className="btn-primary shrink-0 py-2.5 text-sm">
              {t('cta')}
            </a>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
