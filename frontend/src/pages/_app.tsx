import '../styles/globals.css';
import '../styles/avatarandcover.css';
import type { AppProps } from 'next/app';
import Head from 'next/head';

import ScrollToTop from '../components/ScrollToTop';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport' content='width=device-width, initial-scale=1" />
        <meta name="theme-color' content='#000000" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
      </Head>

      <ScrollToTop />

      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
