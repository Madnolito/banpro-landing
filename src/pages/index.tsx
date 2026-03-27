import type { GetStaticProps, NextPage } from 'next';

import Head from 'next/head';
import { useRouter } from 'next/router';
import { useTranslations } from 'next-intl';

import { Navbar } from '@/components/layout/Navbar';

import ContactoV1 from '@/screens/v1/Contacto';
import FactoringV1 from '@/screens/v1/Factoring';
import FooterV1 from '@/screens/v1/Footer';
import HeroV1 from '@/screens/v1/Hero';
import NosotrosV1 from '@/screens/v1/Nosotros';
import RequisitosV1 from '@/screens/v1/Requisitos';
import SucursalesV1 from '@/screens/v1/Sucursales';

import ContactoV2 from '@/screens/v2/Contacto';
import FactoringV2 from '@/screens/v2/Factoring';
import FooterV2 from '@/screens/v2/Footer';
import HeroV2 from '@/screens/v2/Hero';
import NosotrosV2 from '@/screens/v2/Nosotros';
import RequisitosV2 from '@/screens/v2/Requisitos';
import SucursalesV2 from '@/screens/v2/Sucursales';

import ContactoV3 from '@/screens/v3/Contacto';
import FactoringV3 from '@/screens/v3/Factoring';
import FooterV3 from '@/screens/v3/Footer';
import HeroV3 from '@/screens/v3/Hero';
import NosotrosV3 from '@/screens/v3/Nosotros';
import RequisitosV3 from '@/screens/v3/Requisitos';
import SucursalesV3 from '@/screens/v3/Sucursales';

const VERSIONS = {
  '1': { Hero: HeroV1, Nosotros: NosotrosV1, Factoring: FactoringV1, Requisitos: RequisitosV1, Sucursales: SucursalesV1, Contacto: ContactoV1, Footer: FooterV1 },
  '2': { Hero: HeroV2, Nosotros: NosotrosV2, Factoring: FactoringV2, Requisitos: RequisitosV2, Sucursales: SucursalesV2, Contacto: ContactoV2, Footer: FooterV2 },
  '3': { Hero: HeroV3, Nosotros: NosotrosV3, Factoring: FactoringV3, Requisitos: RequisitosV3, Sucursales: SucursalesV3, Contacto: ContactoV3, Footer: FooterV3 },
} as const;

const Home: NextPage = () => {
  const t = useTranslations('meta');
  const { query } = useRouter();
  const v = (query.v as string) in VERSIONS ? (query.v as keyof typeof VERSIONS) : '1';
  const { Hero, Nosotros, Factoring, Requisitos, Sucursales, Contacto, Footer } = VERSIONS[v];

  return (
    <>
      <Head>
        <title>{t('title')}</title>
        <meta name="description" content={t('description')} />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar />

      <main>
        <Hero />
        <Nosotros />
        <Factoring />
        <Requisitos />
        <Sucursales />
        <Contacto />
      </main>

      <Footer />
    </>
  );
};

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      locale: locale ?? 'es',
      messages: (await import(`../../locales/${locale ?? 'es'}/common.json`)).default,
    },
  };
};

export default Home;
