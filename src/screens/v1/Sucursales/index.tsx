import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import FadeIn from '@/components/FadeIn';
import CountryMap, { type Dot } from './CountryMap';
import { type Sucursal, SUCURSALES_CL, SUCURSALES_PE, DOTS_CL, DOTS_PE, SIDEBAR_GROUPS_CL, SIDEBAR_GROUPS_PE, type ZoneGroup } from './constants';

type Country = 'CL' | 'PE';

const COUNTRY_CONFIG: Record<Country, {
  sucursales: Sucursal[];
  dots: Dot[];
  sidebarGroups: ZoneGroup[];
  mapUrl: string;
  name: string;
  sidebarLabel: string;
  sidebarHint: string;
  resetLabel: string;
  mobileBaseScale: number;
}> = {
  CL: {
    sucursales: SUCURSALES_CL,
    dots: DOTS_CL,
    sidebarGroups: SIDEBAR_GROUPS_CL,
    mapUrl: '/chile-map.svg',
    name: 'Chile',
    sidebarLabel: 'Presencia Nacional',
    sidebarHint: 'Selecciona una sucursal para ver su ubicación en el mapa.',
    resetLabel: 'Ver Chile',
    mobileBaseScale: 1.6,
  },
  PE: {
    sucursales: SUCURSALES_PE,
    dots: DOTS_PE,
    sidebarGroups: SIDEBAR_GROUPS_PE,
    mapUrl: '/pe.svg',
    name: 'Perú',
    sidebarLabel: 'Presencia Nacional',
    sidebarHint: 'Selecciona una sucursal para ver su ubicación en el mapa.',
    resetLabel: 'Ver Perú',
    mobileBaseScale: 1.3,
  },
};

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

// ── Country tab button ─────────────────────────────────
interface TabProps {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}

function CountryTab({ active, onClick, children }: TabProps) {
  return (
    <button
      onClick={onClick}
      className={[
        'rounded-lg px-6 py-2.5 text-sm font-semibold transition-all duration-200',
        active
          ? 'bg-brand-primary/15 border border-brand-primary/20 text-white'
          : 'border border-transparent text-white/40 hover:text-white/70',
      ].join(' ')}
    >
      {children}
    </button>
  );
}

// ── Main component ──────────────────────────────────────
export default function Sucursales() {
  const t = useTranslations('sucursales');
  const [country, setCountry] = useState<Country>('CL');
  const [selectedCL, setSelectedCL] = useState<string | null>(null);
  const [selectedPE, setSelectedPE] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 1023px)');
    setIsMobile(mq.matches);
    const fn = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener('change', fn);
    return () => mq.removeEventListener('change', fn);
  }, []);

  const selected    = country === 'CL' ? selectedCL : selectedPE;
  const handleSelect = (id: string | null) => {
    if (country === 'CL') setSelectedCL(prev => prev === id ? null : id);
    else setSelectedPE(prev => prev === id ? null : id);
  };

  const { sucursales, dots, sidebarGroups, mapUrl, name: countryName, sidebarLabel, sidebarHint, resetLabel, mobileBaseScale } = COUNTRY_CONFIG[country];
  const selectedCity = sucursales.find(s => s.id === selected) ?? null;

  return (
    <section id="sucursales" className="bg-[#292524] py-24 lg:py-32 overflow-hidden scroll-mt-20">
      <div className="container-site">

        {/* ── Header ─────────────────────────────────── */}
        <div className="mb-10 max-w-2xl">
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

        {/* ── Country tabs ───────────────────────────── */}
        <FadeIn delay={0.05}>
          <div className="mb-8 inline-flex rounded-xl border border-white/[0.06] bg-[#141414] p-1 gap-1">
            <CountryTab active={country === 'CL'} onClick={() => setCountry('CL')}>Chile</CountryTab>
            <CountryTab active={country === 'PE'} onClick={() => setCountry('PE')}>Perú</CountryTab>
          </div>
        </FadeIn>

        {/* ── Two-column layout ──────────────────────── */}
        <FadeIn delay={0.1}>
          <div className="flex flex-col gap-4 lg:flex-row lg:items-stretch">

            {/* ── MAP (left) ── */}
            <div className="relative lg:flex-1 h-[300px] lg:h-auto">
              <div className="sticky top-24 h-[300px] lg:h-[580px] overflow-hidden rounded-2xl border border-white/[0.06] bg-[#111]">
                {/* Status pill */}
                <div className="absolute top-4 left-4 z-20 flex items-center gap-2 rounded-full border border-white/[0.06] bg-[#292524]/85 px-3 py-1.5 backdrop-blur-md">
                  <span className={`h-1.5 w-1.5 rounded-full transition-colors duration-300 ${selected ? 'bg-brand-primary animate-pulse' : 'bg-white/30'}`} />
                  <span className="text-[11px] font-medium text-white/55">
                    {selectedCity ? selectedCity.name : `${sucursales.length} sucursales`}
                  </span>
                </div>

                {/* Reset button */}
                {selected && (
                  <button
                    onClick={() => handleSelect(null)}
                    className="absolute top-4 right-4 z-20 flex items-center gap-1.5 rounded-full border border-white/[0.06] bg-[#292524]/85 px-3 py-1.5 backdrop-blur-md text-[11px] font-medium text-white/40 transition-colors hover:text-white"
                  >
                    <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                    </svg>
                    {resetLabel}
                  </button>
                )}

                <CountryMap key={country} dots={dots} selected={selected} onSelect={handleSelect} mapUrl={mapUrl} baseScale={isMobile ? mobileBaseScale : 1} />
              </div>
            </div>

            {/* ── SIDEBAR (right) ── */}
            <div className="w-full lg:w-[300px] xl:w-[320px] shrink-0">
              <div className="flex h-full flex-col overflow-hidden rounded-2xl border border-white/[0.06] bg-[#141414] max-h-[220px] lg:max-h-[580px]">

                {/* Sidebar header */}
                <div className="shrink-0 border-b border-white/[0.05] px-6 py-5">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-brand-accent mb-1.5">
                    {sidebarLabel}
                  </p>
                  <p className="text-sm font-semibold text-white/80 leading-snug">
                    {sidebarHint}
                  </p>
                </div>

                {/* City list — scrollable */}
                <div className="flex-1 overflow-y-auto px-3 py-3"
                  style={{ scrollbarWidth: 'thin', scrollbarColor: 'rgba(255,255,255,0.08) transparent' }}
                >
                  {sidebarGroups.map(({ zone, subGroups }) =>
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

              </div>
            </div>
          </div>
        </FadeIn>

        {/* ── Footer note ────────────────────────────── */}
        <FadeIn delay={0.2}>
          <div className="mt-8 flex flex-col items-start gap-4 rounded-2xl border border-white/10 bg-white/5 p-6 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-white/50">{t('footer_note', { country: countryName })}</p>
            <a href="#contacto" className="btn-primary shrink-0 py-2.5 text-sm">{t('cta')}</a>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
