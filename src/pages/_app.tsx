import type { AppProps } from 'next/app';

import { NextIntlClientProvider } from 'next-intl';
import Head from 'next/head';
import clsx from 'clsx';

import '@/styles/globals.css';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <NextIntlClientProvider
      locale={pageProps.locale ?? 'es'}
      messages={pageProps.messages ?? {}}
      timeZone="America/Santiago"
    >
      <main className={clsx('flex min-h-full w-full flex-col')}>
        <Component {...pageProps} />
      </main>
    </NextIntlClientProvider>
    </>
  );
}
