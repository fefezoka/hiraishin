import '../styles/globals.css';
import type { AppType } from 'next/app';
import { trpc } from '@/utils/trpc';
import { Poppins } from 'next/font/google';
import { hiraishin } from '@/assets';
import { DefaultSeo } from 'next-seo';
import Link from 'next/link';

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
      <Link href={'/'}>
        <h1 className="text-center text-5xl md:text-7xl mt-6 mb-4 font-bold text-transparent w-fit m-auto bg-clip-text bg-gradient-to-r from-slate-100 to-slate-400">
          HIRAISHIN
        </h1>
      </Link>

      <Component {...pageProps} />
    </main>
  );
};
export default trpc.withTRPC(MyApp);
