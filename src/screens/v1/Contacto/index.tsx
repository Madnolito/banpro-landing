import { useState } from 'react';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';

import FadeIn from '@/components/FadeIn';

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
    <section id="contacto" className="bg-brand-light py-24 lg:py-32">
      <div className="container-site">
        <div className="grid gap-14 lg:grid-cols-2 lg:gap-20">
          {/* Info */}
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

            <div className="mt-10 flex flex-col gap-6">
              {(['address', 'phone', 'email'] as const).map((field, i) => (
                <FadeIn key={field} delay={0.25 + i * 0.1} dir="left">
                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-primary/10 text-lg">
                      {field === 'address' ? '📍' : field === 'phone' ? '📞' : '✉️'}
                    </div>
                    <div>
                      <p className="text-xs font-bold uppercase tracking-widest text-gray-500">
                        {t(`${field}_label`)}
                      </p>
                      <p className="mt-0.5 text-sm font-medium text-gray-900">{t(`${field}_value`)}</p>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>

            <FadeIn delay={0.5}>
              <div className="mt-10 flex items-center gap-3">
                {[
                  { href: 'https://www.facebook.com/Banpro-Factoring-102869578093765', label: 'FB' },
                  { href: 'https://www.linkedin.com/company/banprofactoring/', label: 'LI' },
                  { href: 'https://wa.me/56989225230', label: 'WA' },
                ].map(({ href, label }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-brand-primary/20 text-xs font-bold text-brand-primary transition-all hover:bg-brand-primary hover:text-white"
                  >
                    {label}
                  </a>
                ))}
              </div>
            </FadeIn>
          </div>

          {/* Form */}
          <FadeIn delay={0.15} dir="right">
            <div className="rounded-2xl bg-white p-8 shadow-sm shadow-brand-primary/5">
              {sent ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center gap-4 py-16 text-center"
                >
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-brand-primary/10 text-3xl">✅</div>
                  <h3 className="font-display text-xl font-bold text-gray-900">{t('success_title')}</h3>
                  <p className="text-sm text-gray-500">{t('success_desc')}</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    {(['nombre', 'razonSocial', 'rut', 'telefono'] as const).map((field) => (
                      <div key={field}>
                        <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-gray-500">
                          {t(`field_${field}`)}
                          {REQUIRED_FIELDS.includes(field) && <span className="ml-1 text-brand-primary">*</span>}
                        </label>
                        <input
                          type="text"
                          name={field}
                          value={form[field]}
                          onChange={handleChange}
                          required={REQUIRED_FIELDS.includes(field)}
                          className="w-full rounded-lg border border-neutral-200 px-4 py-2.5 text-sm text-gray-900 outline-none transition-all focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20"
                        />
                      </div>
                    ))}
                  </div>

                  <div>
                    <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-gray-500">
                      {t('field_email')} <span className="text-brand-primary">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      required
                      className="w-full rounded-lg border border-neutral-200 px-4 py-2.5 text-sm text-gray-900 outline-none transition-all focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20"
                    />
                  </div>

                  <div>
                    <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-gray-500">
                      {t('field_mensaje')}
                    </label>
                    <textarea
                      name="mensaje"
                      value={form.mensaje}
                      onChange={handleChange}
                      rows={4}
                      className="w-full resize-none rounded-lg border border-neutral-200 px-4 py-2.5 text-sm text-gray-900 outline-none transition-all focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20"
                    />
                  </div>

                  <button type="submit" className="btn-primary mt-2 w-full justify-center py-3.5">
                    {t('submit')}
                  </button>
                </form>
              )}
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
