import { useState } from 'react';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';

import FadeIn from '@/components/FadeIn';
import CheckCircleIcon from '@/assets/icons/check-circle.svg';
import EnvelopeIcon from '@/assets/icons/envelope.svg';
import MapPinIcon from '@/assets/icons/map-pin.svg';
import PhoneIcon from '@/assets/icons/phone.svg';
import FacebookIcon from '@/assets/icons/facebook.svg';
import LinkedInIcon from '@/assets/icons/linkedin.svg';
import WhatsappIcon from '@/assets/icons/whatsapp.svg';

interface FormState {
  nombre: string;
  razonSocial: string;
  rut: string;
  telefono: string;
  email: string;
  mensaje: string;
}

const INITIAL: FormState = { nombre: '', razonSocial: '', rut: '', telefono: '', email: '', mensaje: '' };
const REQUIRED_FIELDS = ['nombre', 'rut', 'telefono', 'email'];

const CONTACT_ITEMS = [
  { Icon: MapPinIcon, field: 'address' },
  { Icon: PhoneIcon, field: 'phone' },
  { Icon: EnvelopeIcon, field: 'email' },
] as const;

const SOCIAL_LINKS = [
  { Icon: FacebookIcon, href: 'https://www.facebook.com/Banpro-Factoring-102869578093765', label: 'Facebook' },
  { Icon: LinkedInIcon, href: 'https://www.linkedin.com/company/banprofactoring/', label: 'LinkedIn' },
  { Icon: WhatsappIcon, href: 'https://wa.me/56989225230', label: 'WhatsApp' },
];

const INPUT_CLASS =
  'w-full rounded-lg border border-neutral-200 bg-neutral-50 px-4 py-2.5 text-sm text-gray-900 outline-none transition-all focus:border-brand-primary focus:bg-white focus:ring-2 focus:ring-brand-primary/15';

export default function Contacto() {
  const t = useTranslations('contacto');
  const [form, setForm] = useState<FormState>(INITIAL);
  const [sent, setSent] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: connect to pages/api/contact.ts → Resend / Mailchimp
    setSent(true);
  };

  return (
    <section id="contacto" className="relative overflow-hidden bg-brand-light py-24 lg:py-32">
      <div className="container-site">
        <div className="grid items-start gap-14 lg:grid-cols-[1fr_1.1fr] lg:gap-16">

          {/* ── Info column ── */}
          <div className="lg:pt-2">
            <FadeIn>
              <span className="section-label">{t('label')}</span>
            </FadeIn>

            <FadeIn delay={0.1}>
              <h2 className="mt-4 font-display text-4xl font-bold leading-tight text-brand-dark lg:text-5xl">
                {t('title')}
              </h2>
            </FadeIn>

            <FadeIn delay={0.2}>
              <p className="mt-4 text-base leading-relaxed text-gray-600">{t('description')}</p>
            </FadeIn>

            <FadeIn delay={0.25}>
              <div className="my-8 h-px w-12 bg-brand-primary" />
            </FadeIn>

            {/* Contact items */}
            <div className="flex flex-col gap-5">
              {CONTACT_ITEMS.map(({ Icon, field }, i) => (
                <FadeIn key={field} delay={0.3 + i * 0.1} dir="left">
                  <div className="flex items-center gap-4">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-primary/10 text-brand-primary ring-1 ring-brand-primary/20">
                      <Icon className="h-6 w-6" />
                    </div>
                    <div>
                      <p className="text-[11px] font-bold uppercase tracking-widest text-gray-400">
                        {t(`${field}_label`)}
                      </p>
                      <p className="mt-0.5 text-sm font-medium text-brand-dark">{t(`${field}_value`)}</p>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>

            {/* Social links */}
            <FadeIn delay={0.65}>
              <p className="mt-10 text-[11px] font-bold uppercase tracking-widest text-gray-400">
                {t('social_label')}
              </p>
              <div className="mt-3 flex items-center gap-3">
                {SOCIAL_LINKS.map(({ Icon, href, label }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-brand-primary/25 text-brand-primary transition-all duration-200 hover:bg-brand-primary hover:text-white hover:border-brand-primary"
                  >
                    <Icon className="h-[18px] w-[18px]" />
                  </a>
                ))}
              </div>
            </FadeIn>
          </div>

          {/* ── Form card ── */}
          <FadeIn delay={0.2} dir="right">
            <div className="overflow-hidden rounded-2xl bg-white shadow-xl shadow-brand-primary/10">
              {/* Orange accent bar */}
              <div className="h-1 bg-gradient-to-r from-brand-primary to-brand-accent" />

              <div className="p-8 lg:p-10">
                {sent ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center justify-center gap-5 py-16 text-center"
                  >
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-brand-primary/10 text-brand-primary">
                      <CheckCircleIcon className="h-8 w-8" />
                    </div>
                    <div>
                      <h3 className="font-display text-xl font-bold text-gray-900">{t('success_title')}</h3>
                      <p className="mt-1.5 text-sm text-gray-500">{t('success_desc')}</p>
                    </div>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <div className="grid gap-4 sm:grid-cols-2">
                      {(['nombre', 'razonSocial', 'rut', 'telefono'] as const).map((field) => (
                        <div key={field}>
                          <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-gray-400">
                            {t(`field_${field}`)}
                            {REQUIRED_FIELDS.includes(field) && (
                              <span className="ml-1 text-brand-primary">*</span>
                            )}
                          </label>
                          <input
                            type="text"
                            name={field}
                            value={form[field]}
                            onChange={handleChange}
                            required={REQUIRED_FIELDS.includes(field)}
                            className={INPUT_CLASS}
                          />
                        </div>
                      ))}
                    </div>

                    <div>
                      <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-gray-400">
                        {t('field_email')} <span className="text-brand-primary">*</span>
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        required
                        className={INPUT_CLASS}
                      />
                    </div>

                    <div>
                      <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-gray-400">
                        {t('field_mensaje')}
                      </label>
                      <textarea
                        name="mensaje"
                        value={form.mensaje}
                        onChange={handleChange}
                        rows={4}
                        className={`${INPUT_CLASS} resize-none`}
                      />
                    </div>

                    <button type="submit" className="btn-primary mt-1 w-full justify-center py-3.5">
                      {t('submit')}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </FadeIn>

        </div>
      </div>
    </section>
  );
}
