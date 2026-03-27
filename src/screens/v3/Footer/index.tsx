import { useTranslations } from 'next-intl';
import Image from 'next/image';

const NAV_LINKS = [
  { href: '#nosotros', key: 'about' },
  { href: '#factoring', key: 'factoring' },
  { href: '#requisitosparaoperar', key: 'requirements' },
  { href: '#sucursales', key: 'branches' },
  { href: '#contacto', key: 'contact' },
];

const SOCIAL = [
  { href: 'https://www.facebook.com/Banpro-Factoring-102869578093765', label: 'FB' },
  { href: 'https://www.linkedin.com/company/banprofactoring/', label: 'LI' },
  { href: 'https://wa.me/56989225230', label: 'WA' },
];

export default function Footer() {
  const t = useTranslations('footer');
  const tNav = useTranslations('nav');

  return (
    <footer className="bg-brand-dark text-white">
      <div className="container-site py-16">
        <div className="grid gap-10 lg:grid-cols-4">
          {/* Logo + tagline */}
          <div className="lg:col-span-1">
            <Image
              src="/logotipo.png"
              alt="Banpro Factoring"
              width={120}
              height={44}
              className="h-10 w-auto object-contain brightness-0 invert"
            />
            <p className="mt-4 text-sm leading-relaxed text-white/40">{t('tagline')}</p>
            <div className="mt-6 flex gap-3">
              {SOCIAL.map(({ href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-xs font-bold text-white/50 transition-all hover:border-brand-primary hover:bg-brand-primary hover:text-white"
                >
                  {label}
                </a>
              ))}
            </div>
          </div>

          {/* Nav */}
          <div>
            <p className="mb-5 text-xs font-bold uppercase tracking-widest text-white/30">{t('nav_title')}</p>
            <ul className="flex flex-col gap-3">
              {NAV_LINKS.map(({ href, key }) => (
                <li key={href}>
                  <a href={href} className="text-sm text-white/60 transition-colors hover:text-brand-primary">
                    {tNav(key)}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Chile */}
          <div>
            <p className="mb-5 text-xs font-bold uppercase tracking-widest text-white/30">Chile</p>
            <address className="not-italic">
              <p className="text-sm text-white/60">Av. Apoquindo 5550, Of 601-B</p>
              <p className="text-sm text-white/60">Santiago – Chile</p>
              <a href="mailto:contacto@banpro.cl" className="mt-3 block text-sm text-white/60 transition-colors hover:text-brand-primary">
                contacto@banpro.cl
              </a>
              <a href="tel:+56227605600" className="mt-1 block text-sm text-white/60 transition-colors hover:text-brand-primary">
                +56 2 27605600
              </a>
            </address>
          </div>

          {/* Perú */}
          <div>
            <p className="mb-5 text-xs font-bold uppercase tracking-widest text-white/30">Perú</p>
            <address className="not-italic">
              <p className="text-sm text-white/60">BANPRO PERU S.A.C</p>
              <p className="text-sm text-white/60">Av. Javier Prado Este 492, Of. 603</p>
              <p className="text-sm text-white/60">San Isidro, Lima – Perú</p>
              <a
                href="https://banpro.com.pe"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-flex items-center gap-1 text-sm text-brand-accent transition-colors hover:text-brand-primary"
              >
                banpro.com.pe →
              </a>
            </address>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 sm:flex-row">
          <p className="text-xs text-white/30">
            © {new Date().getFullYear()} Banpro Factoring S.A. {t('rights')}
          </p>
          <a
            href="https://canal-denuncias.cl/denuncia/Banpro/Banpro"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-white/30 transition-colors hover:text-white/60"
          >
            {t('complaints')}
          </a>
        </div>
      </div>
    </footer>
  );
}
