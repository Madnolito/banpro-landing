import { useEffect, useRef, useState } from 'react';

import { AnimatePresence, motion } from 'framer-motion';
import { useLocale, useTranslations } from 'next-intl';
import Image from 'next/image';
import { useRouter } from 'next/router';

import clsx from 'clsx';

import { WFButton } from './WFButton';

const NAV_LINKS = [
  { href: '#nosotros', key: 'about' },
  { href: '#factoring', key: 'factoring' },
  { href: '#requisitosparaoperar', key: 'requirements' },
  { href: '#sucursales', key: 'branches' },
  { href: '#contacto', key: 'contact' },
];

const EASE = [0.22, 1, 0.36, 1] as const;

function LangToggle({ locale, onSwitch }: Readonly<{ locale: string; onSwitch: () => void; layoutId: string }>) {
  return (
    <button
      onClick={onSwitch}
      aria-label="Cambiar idioma"
      className="flex items-center rounded-full border border-gray-200 bg-gray-100 p-[3px] shadow-inner"
    >
      {(['es', 'en'] as const).map((lang) => (
        <span
          key={lang}
          className={clsx(
            'rounded-full px-3 py-1 text-[11.5px] font-bold uppercase tracking-widest transition-all duration-200',
            locale === lang
              ? 'bg-brand-primary text-white shadow-md shadow-brand-primary/40'
              : 'text-gray-400 hover:text-gray-600',
          )}
        >
          {lang.toUpperCase()}
        </span>
      ))}
    </button>
  );
}

export function Navbar() {
  const t = useTranslations('nav');
  const locale = useLocale();
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  const [ready, setReady] = useState(false);
  const lastScrollY = useRef(0);
  useEffect(() => { setReady(true); }, []);
  const currentV = ((router.query.v as string) ?? '1') as string;

  const switchMockup = (v: string) => {
    router.push({ pathname: router.pathname, query: { ...router.query, v } }, undefined, { shallow: true, scroll: false });
  };

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 40);
      if (y > lastScrollY.current + 8 && y > 80) {
        setHidden(true);
        setOpen(false);
      } else if (y < lastScrollY.current - 8) {
        setHidden(false);
      }
      lastScrollY.current = y;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const switchLang = () => {
    const next = locale === 'es' ? 'en' : 'es';
    router.push('/', '/', { locale: next });
  };

  const handleNav = (href: string) => {
    setOpen(false);
    setTimeout(() => {
      document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
    }, 250);
  };

  const anim = (delay: number) => ({
    initial: { opacity: 0, y: -10 },
    animate: ready ? { opacity: 1, y: 0 } : { opacity: 0, y: -10 },
    transition: { delay, duration: 0.2, ease: EASE },
  });

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={ready ? { opacity: 1, y: hidden ? '-100%' : 0 } : { opacity: 0, y: -20 }}
      transition={{ duration: 0.2, ease: EASE }}
      className={clsx(
        'fixed inset-x-0 top-0 z-50 transition-all duration-500',
        hidden && 'pointer-events-none',
        scrolled
          ? 'border-b border-gray-200/60 bg-white/[0.97] backdrop-blur-sm shadow-[0_4px_24px_-2px_rgba(0,0,0,0.08),inset_0_-1px_0_rgba(255,255,255,0.9)]'
          : 'border-b border-gray-100/50 bg-white/95 backdrop-blur-sm shadow-[0_1px_8px_rgba(0,0,0,0.04),inset_0_-1px_0_rgba(255,255,255,0.7)]',
      )}
    >
      <div className="container-site flex h-16 items-center justify-between lg:h-[70px]">

        {/* Logo */}
        <motion.a {...anim(0.05)} href="#" className="flex items-center">
          <Image
            src="/logotipo-removebg-preview.png"
            alt="Banpro Factoring"
            width={130}
            height={50}
            className="h-[50px] w-auto object-contain"
            priority
          />
        </motion.a>

        {/* Desktop nav */}
        <nav
          className="hidden items-center gap-0.5 lg:flex"
          onMouseLeave={() => setHoveredLink(null)}
        >
          {NAV_LINKS.map(({ href, key }, i) => (
            <motion.a
              key={href}
              {...anim(0.1 + i * 0.04)}
              href={href}
              onMouseEnter={() => setHoveredLink(href)}
              whileHover={{ scale: 1.06 }}
              transition={{
                default: { delay: 0.1 + i * 0.04, duration: 0.2, ease: EASE },
                scale: { type: 'spring', stiffness: 300, damping: 22 },
              }}
              className="relative px-3.5 pb-2.5 pt-2 text-[11.5px] font-semibold uppercase tracking-wider"
            >
              <motion.span
                className="relative z-10 block"
                animate={{
                  color: hoveredLink === href ? '#F86213' : '#374151',
                }}
                transition={{ duration: 0.18, ease: 'easeOut' }}
              >
                {t(key)}
              </motion.span>
              {hoveredLink === href && (
                <motion.span
                  layoutId="nav-underline"
                  className="absolute bottom-0 left-2 right-2 h-[2px] rounded-full bg-brand-primary"
                  initial={false}
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
            </motion.a>
          ))}
        </nav>

        {/* Desktop right actions */}
        <motion.div {...anim(0.32)} className="hidden items-center gap-3 lg:flex">
          <div className="flex items-center rounded-full border border-dashed border-purple-300 bg-purple-50 p-[3px]">
            {['1', '2', '3'].map((v) => (
              <button
                key={v}
                onClick={() => switchMockup(v)}
                className={clsx(
                  'rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest transition-all duration-200',
                  currentV === v ? 'bg-purple-500 text-white' : 'text-purple-400 hover:text-purple-600',
                )}
              >
                v{v}
              </button>
            ))}
          </div>
          <LangToggle locale={locale} onSwitch={switchLang} layoutId="lang-pill" />
          <WFButton label={t('webfactoring')} />
        </motion.div>

        {/* Hamburger */}
        <motion.button
          {...anim(0.15)}
          onClick={() => setOpen(!open)}
          aria-label="Menú"
          className="relative flex h-9 w-9 items-center justify-center rounded-lg transition-colors hover:bg-gray-100 lg:hidden"
        >
          <span className="flex flex-col gap-[5px]">
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                className={clsx(
                  'block h-[2px] w-5 rounded-full bg-gray-700 transition-all duration-300 origin-center',
                  open && i === 0 && 'translate-y-[7px] rotate-45',
                  open && i === 1 && 'opacity-0 scale-x-0',
                  open && i === 2 && '-translate-y-[7px] -rotate-45',
                )}
              />
            ))}
          </span>
        </motion.button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: EASE }}
            className="overflow-hidden border-t border-gray-100 bg-white lg:hidden"
          >
            <div className="container-site flex flex-col py-4">
              {NAV_LINKS.map(({ href, key }, i) => (
                <motion.button
                  key={href}
                  onClick={() => handleNav(href)}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05, duration: 0.3, ease: EASE }}
                  className="flex items-center justify-between border-b border-gray-50 py-3.5 text-left text-sm font-medium text-gray-700 transition-colors hover:text-brand-primary"
                >
                  {t(key)}
                  <svg className="h-4 w-4 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </motion.button>
              ))}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: NAV_LINKS.length * 0.05 + 0.05, duration: 0.3 }}
                className="flex items-center gap-3 pt-5"
              >
                <LangToggle locale={locale} onSwitch={switchLang} layoutId="lang-pill-mobile" />
                <a
                  href="https://webfactoring2.banpro.cl/index.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary flex-1 py-2 text-center text-xs"
                >
                  {t('webfactoring')}
                </a>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
