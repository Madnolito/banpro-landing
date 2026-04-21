import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { motion } from 'framer-motion';

const NAV_LINKS = [
  { href: '#nosotros', key: 'about' },
  { href: '#factoring', key: 'factoring' },
  { href: '#requisitosparaoperar', key: 'requirements' },
  { href: '#sucursales', key: 'branches' },
  { href: '#contacto', key: 'contact' },
];

function FacebookIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
      <path d="M12 2C6.5 2 2 6.53 2 12.06 2 17.06 5.66 21.21 10.44 21.96V14.96H7.9v-2.9h2.54V9.85c0-2.51 1.49-3.89 3.78-3.89 1.09 0 2.23.19 2.23.19v2.47h-1.26c-1.24 0-1.63.77-1.63 1.56v1.88h2.78l-.45 2.9h-2.33v7c4.92-.77 8.68-5.01 8.68-9.9C22 6.53 17.5 2 12 2Z" />
    </svg>
  );
}

function LinkedinIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="-143 145 512 512" fill="currentColor" className="h-5 w-5">
      <path d="M113 145c-141.4 0-256 114.6-256 256s114.6 256 256 256 256-114.6 256-256S254.4 145 113 145ZM41.4 508.1H-8.5V348.4h49.9v159.7ZM15.1 328.4h-.4c-18.1 0-29.8-12.2-29.8-27.7 0-15.8 12.1-27.7 30.5-27.7 18.4 0 29.7 11.9 30.1 27.7 0 15.5-11.7 27.7-30.4 27.7ZM241 508.1h-56.6v-82.6c0-21.6-8.8-36.4-28.3-36.4-14.9 0-23.2 10-27 19.6-1.4 3.4-1.2 8.2-1.2 13.1v86.3H71.8s.7-146.4 0-159.7h56.1v25.1c3.3-11 21.2-26.6 49.8-26.6 35.5 0 63.3 23 63.3 72.4v88.8Z" />
    </svg>
  );
}

function WhatsappIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5">
      <path d="M15.821 14.121c-.241.682-1.199 1.246-1.963 1.411-.523.111-1.205.199-3.503-.748-2.581-1.069-6.165-4.878-6.165-7.413 0-1.29.744-2.792 2.045-2.792.626 0 .764.012.97.506.241.582.829 2.016.899 2.163.289.603-.294.956-.717 1.481-.135.158-.288.329-.117.623.17.288.758 1.246 1.622 2.015 1.116.994 2.021 1.312 2.345 1.447.241.1.529.077.705-.111.223-.241.5-.641.782-1.035.199-.282.452-.317.717-.217.179.062 2.454 1.118 2.55 1.287.071.123.071.705-.17 1.387ZM10.002 0h-.005C4.484 0 0 4.485 0 10c0 2.187.705 4.215 1.904 5.861l-1.246 3.716 3.843-1.228C6.082 19.395 7.969 20 10.002 20 15.515 20 20 15.515 20 10S15.515 0 10.002 0Z" />
    </svg>
  );
}

function EmailIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1920 1920" fill="currentColor" className="h-5 w-5">
      <path fillRule="evenodd" d="M1920 428v1190l-464-580-88 71 469 586H84l469-586-88-71L0 1618V428l960 832L1920 428ZM1920 226v53L960 1111 0 279v-53h1920Z" />
    </svg>
  );
}

const SOCIAL = [
  { href: 'https://www.facebook.com/Banpro-Factoring-102869578093765', label: 'Facebook', Icon: FacebookIcon },
  { href: 'https://www.linkedin.com/company/banprofactoring/', label: 'LinkedIn', Icon: LinkedinIcon },
  { href: 'https://wa.me/56989225230', label: 'WhatsApp', Icon: WhatsappIcon },
  { href: 'mailto:contacto@banpro.cl', label: 'Email', Icon: EmailIcon },
];

const EASE = [0.22, 1, 0.36, 1] as const;

const col = (i: number) => ({
  initial: { opacity: 0, y: 32 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.55, delay: i * 0.1, ease: EASE },
});

export default function Footer() {
  const t = useTranslations('footer');
  const tNav = useTranslations('nav');

  return (
    <footer>
      {/* ── Main orange band ── */}
      <div className="relative overflow-hidden bg-brand-primary">

        {/* Ambient glow blobs */}
        <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-16 left-8 h-56 w-56 rounded-full bg-brand-secondary/40 blur-2xl" />

        <div className="container-site relative z-10 pb-14 pt-16">
          <div className="grid gap-12 lg:grid-cols-4">

            {/* Logo + tagline + social */}
            <motion.div className="lg:col-span-1" {...col(0)}>
              <Image
                src="/logotipo_footer.png"
                alt="Banpro Factoring"
                width={180}
                height={65}
                className="h-16 w-auto object-contain"
              />
              <p className="mt-4 text-sm leading-relaxed text-white/80">{t('tagline')}</p>
              <div className="mt-6 flex gap-2.5">
                {SOCIAL.map(({ href, label, Icon }) => (
                  <motion.a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    whileHover={{ scale: 1.12 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur-sm transition-colors hover:bg-white hover:text-brand-primary"
                  >
                    <Icon />
                  </motion.a>
                ))}
              </div>
            </motion.div>

            {/* Nav */}
            <motion.div {...col(1)}>
              <p className="mb-5 text-base font-bold uppercase tracking-widest text-white">{t('nav_title')}</p>
              <ul className="flex flex-col gap-3">
                {NAV_LINKS.map(({ href, key }) => (
                  <li key={href}>
                    <a href={href} className="group flex items-center gap-2 text-base text-white/85 transition-colors hover:text-white">
                      <span className="h-px w-0 bg-white transition-all duration-300 group-hover:w-3" />
                      {tNav(key)}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Chile */}
            <motion.div {...col(2)}>
              <p className="mb-5 text-base font-bold uppercase tracking-widest text-white">Chile</p>
              <address className="not-italic">
                <p className="text-base text-white/85">Av. Apoquindo 5550, Of 601-B</p>
                <p className="text-base text-white/85">Santiago – Chile</p>
                <a href="mailto:contacto@banpro.cl" className="mt-3 block text-base text-white/85 transition-colors hover:text-white hover:underline">
                  contacto@banpro.cl
                </a>
                <a href="tel:+56227605600" className="mt-1 block text-base text-white/85 transition-colors hover:text-white hover:underline">
                  +56 2 27605600
                </a>
              </address>
            </motion.div>

            {/* Perú */}
            <motion.div {...col(3)}>
              <p className="mb-5 text-base font-bold uppercase tracking-widest text-white">Perú</p>
              <address className="not-italic">
                <p className="text-base text-white/85">BANPRO PERU S.A.C</p>
                <p className="text-base text-white/85">Av. Javier Prado Este 492, Of. 603</p>
                <p className="text-base text-white/85">San Isidro, Lima – Perú</p>
                <motion.a
                  href="https://banpro.com.pe"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                  className="group mt-4 inline-flex items-center gap-2 rounded-full border border-white/40 bg-white/10 px-5 py-2.5 text-sm font-semibold text-white backdrop-blur-sm transition-colors duration-300 hover:border-white hover:bg-white hover:text-brand-primary"
                >
                  banpro.com.pe
                  <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                </motion.a>
              </address>
            </motion.div>

          </div>
        </div>
      </div>

      {/* ── Dark bottom bar ── */}
      <div className="bg-brand-dark">
        <div className="container-site flex flex-col items-center justify-between gap-3 py-5 sm:flex-row">
          <p className="text-sm text-white/60">
            © {new Date().getFullYear()} Banpro Factoring S.A. {t('rights')}
          </p>
          <a
            href="https://canal-denuncias.cl/denuncia/Banpro/Banpro"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-white/60 transition-colors hover:text-white/70"
          >
            {t('complaints')}
          </a>
        </div>
      </div>
    </footer>
  );
}
