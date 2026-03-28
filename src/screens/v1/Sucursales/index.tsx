import { useState } from 'react';
import { useTranslations } from 'next-intl';
import FadeIn from '@/components/FadeIn';
import ChileMap from './ChileMap';
import { type Sucursal, SUCURSALES, DOTS, SIDEBAR_GROUPS } from './constants';

// ── CityRow ────────────────────────────────────────────
interface CityRowProps {
  city: Sucursal;
  selected: string | null;
  onSelect: (id: string | null) => void;
}

function CityRow({ city, selected, onSelect }: Readonly<CityRowProps>) {
  const isSel = city.id === selected;
  return (
    <div>
      <button
        onClick={() => onSelect(city.id)}
        className={[
          'w-full flex items-center gap-3 rounded-lg px-3 py-2.5 text-left transition-all duration-150',
          isSel
            ? 'bg-brand-primary/10 border border-brand-primary/20'
            : 'border border-transparent hover:bg-white/[0.04]',
        ].join(' ')}
      >
        <span
          className={[
            'h-1.5 w-1.5 shrink-0 rounded-full transition-all duration-200',
            isSel ? 'bg-brand-primary scale-[1.4]' : 'border border-brand-primary/50 bg-transparent',
          ].join(' ')}
        />
        <span className={`flex-1 text-[13px] font-medium transition-colors duration-150 ${isSel ? 'text-white' : 'text-white/55'}`}>
          {city.name}
        </span>
        <svg
          className={`h-3.5 w-3.5 shrink-0 transition-all duration-200 ${isSel ? 'rotate-90 text-brand-primary' : 'text-white/15'}`}
          fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {isSel && (
        <div className="mx-2 mb-1.5 rounded-lg border border-brand-primary/[0.18] bg-brand-primary/[0.06] p-3">
          <div className="flex flex-col gap-2">
            <div className="flex items-start gap-2">
              <PinIcon />
              <span className="text-xs leading-relaxed text-white/55">{city.address}</span>
            </div>
            <div className="flex items-center gap-2">
              <PhoneIcon />
              <a
                href={`tel:${city.phone.replaceAll(' ', '')}`}
                className="text-xs text-white/55 transition-colors hover:text-brand-accent"
              >
                {city.phone}
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ── Sub-components ─────────────────────────────────────
function PinIcon() {
  return (
    <svg className="mt-0.5 h-3.5 w-3.5 shrink-0 text-brand-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a2 2 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg className="h-3.5 w-3.5 shrink-0 text-brand-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.948V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
    </svg>
  );
}

// ── Main component ──────────────────────────────────────
export default function Sucursales() {
  const t = useTranslations('sucursales');
  const [selected, setSelected] = useState<string | null>(null);
  const selectedCity = SUCURSALES.find(s => s.id === selected) ?? null;

  const handleSelect = (id: string | null) =>
    setSelected(prev => (prev === id ? null : id));

  return (
    <section id="sucursales" className="bg-brand-dark py-24 lg:py-32 overflow-hidden">
      <div className="container-site">

        {/* ── Header ─────────────────────────────────── */}
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

        {/* ── Two-column layout ──────────────────────── */}
        <FadeIn delay={0.1}>
          <div className="flex flex-col gap-4 lg:flex-row lg:items-stretch">

            {/* ── MAP (left) ── */}
            <div className="relative lg:flex-1 h-[460px] lg:h-auto">
              <div className="sticky top-24 h-[460px] lg:h-[580px] overflow-hidden rounded-2xl border border-white/[0.06] bg-[#111]">
                {/* Status pill */}
                <div className="absolute top-4 left-4 z-20 flex items-center gap-2 rounded-full border border-white/[0.06] bg-brand-dark/85 px-3 py-1.5 backdrop-blur-md">
                  <span className={`h-1.5 w-1.5 rounded-full transition-colors duration-300 ${selected ? 'bg-brand-primary animate-pulse' : 'bg-white/30'}`} />
                  <span className="text-[11px] font-medium text-white/55">
                    {selectedCity ? selectedCity.name : '17 sucursales'}
                  </span>
                </div>

                {/* Reset button */}
                {selected && (
                  <button
                    onClick={() => setSelected(null)}
                    className="absolute top-4 right-4 z-20 flex items-center gap-1.5 rounded-full border border-white/[0.06] bg-brand-dark/85 px-3 py-1.5 backdrop-blur-md text-[11px] font-medium text-white/40 transition-colors hover:text-white"
                  >
                    <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                    </svg>
                    Ver Chile
                  </button>
                )}

                <ChileMap dots={DOTS} selected={selected} onSelect={handleSelect} />
              </div>
            </div>

            {/* ── SIDEBAR (right) ── */}
            <div className="w-full lg:w-[300px] xl:w-[320px] shrink-0">
              <div className="flex h-full flex-col overflow-hidden rounded-2xl border border-white/[0.06] bg-[#141414] lg:max-h-[580px]">

                {/* Sidebar header */}
                <div className="shrink-0 border-b border-white/[0.05] px-6 py-5">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-brand-accent mb-1.5">
                    Presencia Nacional
                  </p>
                  <p className="text-sm font-semibold text-white/80 leading-snug">
                    Selecciona una sucursal para ver su ubicación en el mapa.
                  </p>
                </div>

                {/* City list — scrollable */}
                <div className="flex-1 overflow-y-auto px-3 py-3"
                  style={{ scrollbarWidth: 'thin', scrollbarColor: 'rgba(255,255,255,0.08) transparent' }}
                >
                  {SIDEBAR_GROUPS.map(({ zone, subGroups }) =>
                    subGroups.map(({ label, cities }) => (
                      <div key={`${zone}-${label}`} className="mb-1">
                        <p className="px-3 pb-1 pt-3 text-[9.5px] font-semibold uppercase tracking-[0.14em] text-white/25">
                          {label}
                        </p>
                        {cities.map(city => (
                          <CityRow key={city.id} city={city} selected={selected} onSelect={handleSelect} />
                        ))}
                      </div>
                    ))
                  )}
                </div>

                {/* Sidebar footer */}
                <div className="shrink-0 border-t border-white/[0.05] px-5 py-4">
                  <a href="#contacto" className="btn-primary block w-full py-2.5 text-center text-sm">
                    {t('cta')}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </FadeIn>

        {/* ── Footer note ────────────────────────────── */}
        <FadeIn delay={0.2}>
          <div className="mt-8 flex flex-col items-start gap-4 rounded-2xl border border-white/10 bg-white/5 p-6 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-white/50">{t('footer_note')}</p>
            <a href="#contacto" className="btn-primary shrink-0 py-2.5 text-sm">{t('cta')}</a>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
