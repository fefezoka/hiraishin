import '../styles/globals.css';
import type { AppType } from 'next/app';
import { trpc } from '../utils/trpc';
import { Poppins } from 'next/font/google';

const poppins = Poppins({ weight: ['400', '500', '600', '700'], subsets: ['latin'] });

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <div className={poppins.className}>
      <Component {...pageProps} />
    </div>
  );
};
export default trpc.withTRPC(MyApp);
