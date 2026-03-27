import type { AppProps } from 'next/app';

import { NextIntlClientProvider } from 'next-intl';
import clsx from 'clsx';

import '@/styles/globals.css';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <NextIntlClientProvider
      locale={pageProps.locale}
      messages={pageProps.messages}
      timeZone="America/Santiago"
    >
      <main className={clsx('flex min-h-full w-full flex-col')}>
        <Component {...pageProps} />
      </main>
    </NextIntlClientProvider>
  );
}
