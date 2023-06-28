import '../styles/globals.css';
import type { AppType } from 'next/app';
import { trpc } from '../utils/trpc';
import { Poppins } from 'next/font/google';
import { hiraishin } from '@assets';
import { DefaultSeo } from 'next-seo';

const poppins = Poppins({ weight: ['400', '500', '600', '700'], subsets: ['latin'] });

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <main className={poppins.className}>
      <DefaultSeo
        title="Hiraishin"
        openGraph={{
          images: [{ url: hiraishin.src }],
          siteName: 'Hiraishin',
          url: 'https://hiraishin.vercel.app',
          type: 'website',
        }}
        twitter={{ cardType: 'summary_large_image' }}
      />
      <Component {...pageProps} />
    </main>
  );
};
export default trpc.withTRPC(MyApp);
