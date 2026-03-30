import { useState } from 'react';

import { AnimatePresence, motion } from 'framer-motion';
import { useTranslations } from 'next-intl';

import FadeIn from '@/components/FadeIn';

const TIPOS = [
  { key: 'persona_natural', labelKey: 'type1', docs: ['doc_rut', 'doc_sii', 'doc_bank', 'doc_resume'] },
  { key: 'srl', labelKey: 'type2', docs: ['doc_rut', 'doc_constitution', 'doc_sii', 'doc_bank', 'doc_resume'] },
  { key: 'sa', labelKey: 'type3', docs: ['doc_rut', 'doc_constitution', 'doc_board', 'doc_sii', 'doc_bank', 'doc_resume'] },
  { key: 'spa', labelKey: 'type4', docs: ['doc_rut', 'doc_constitution', 'doc_sii', 'doc_bank', 'doc_resume'] },
  { key: 'eirl', labelKey: 'type5', docs: ['doc_rut', 'doc_constitution', 'doc_sii', 'doc_bank', 'doc_resume'] },
  { key: 'ley20659', labelKey: 'type6', docs: ['doc_rut', 'doc_ley20659', 'doc_sii', 'doc_bank', 'doc_resume'] },
];

export default function Requisitos() {
  const t = useTranslations('requisitos');
  const [selected, setSelected] = useState(TIPOS[0].key);
  const current = TIPOS.find((item) => item.key === selected)!;

  return (
    <section id="requisitosparaoperar" className="bg-white py-24 lg:py-32">
      <div className="container-site">
        <div className="mb-12 max-w-2xl">
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

        <div className="flex flex-col gap-8 lg:grid lg:grid-cols-3">
          <FadeIn dir="left" className="lg:col-span-1">
            <div className="flex flex-row gap-2 overflow-x-auto pb-2 lg:flex-col lg:overflow-visible lg:pb-0">
              {TIPOS.map(({ key, labelKey }) => (
                <button
                  key={key}
                  onClick={() => setSelected(key)}
                  className={`shrink-0 rounded-xl px-4 py-3 text-left text-sm font-semibold transition-all duration-200 lg:w-full ${
                    selected === key
                      ? 'bg-brand-primary text-white shadow-md shadow-brand-primary/30'
                      : 'bg-neutral-50 text-gray-500 hover:bg-brand-light hover:text-brand-primary'
                  }`}
                >
                  {t(labelKey)}
                </button>
              ))}
            </div>
          </FadeIn>

          <FadeIn dir="right" className="lg:col-span-2">
            <div className="rounded-2xl border border-neutral-100 bg-neutral-50 p-8">
              <AnimatePresence mode="wait">
                <motion.div
                  key={selected}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.25 }}
                >
                  <h3 className="font-display text-xl font-bold text-gray-900">{t(current.labelKey)}</h3>
                  <p className="mt-2 text-sm text-gray-500">{t('approval_note')}</p>
                  <ul className="mt-6 flex flex-col gap-3">
                    {current.docs.map((docKey) => (
                      <li key={docKey} className="flex items-start gap-3">
                        <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-primary/10">
                          <span className="h-2 w-2 rounded-full bg-brand-primary" />
                        </span>
                        <span className="text-sm text-gray-900">{t(docKey)}</span>
                      </li>
                    ))}
                  </ul>
                  <p className="mt-6 rounded-xl bg-brand-light p-4 text-xs text-gray-500">
                    {t('footnote')}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
