import '../styles/globals.css';
import type { AppType } from 'next/app';
import { trpc } from '@/utils/trpc';
import { Poppins } from 'next/font/google';
import { hiraishin } from '@/assets';
import { DefaultSeo } from 'next-seo';
import Typewritter from 'typewriter-effect';

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
      <h1 className="text-center text-5xl md:text-6xl mt-5 mb-4 font-bold text-transparent w-fit m-auto bg-clip-text bg-gradient-to-r from-slate-100 to-slate-400">
        HIRAISHIN
        <Typewritter
          onInit={(typewritter) => {
            typewritter
              .typeString('UM CLÃ')
              .deleteAll()
              .typeString('UMA TRIBO')
              .deleteAll()
              .typeString('UMA NAÇÃO')
              .deleteAll()
              .typeString('UMA FAMÍLIA.')
              .start();
          }}
        />
      </h1>
      <Component {...pageProps} />
    </main>
  );
};
export default trpc.withTRPC(MyApp);
