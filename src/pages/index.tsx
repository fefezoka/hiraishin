import { gragasCaipira } from '@/assets';
import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="max-w-[768px] font-medium m-auto px-3 py-6">
      <div className="grid grid-cols-3 gap-2 relative">
        <Link href={'/lol'}>
          <div className="w-full h-44 relative">
            <Image
              src={gragasCaipira.src}
              alt=""
              className="h-full w-full opacity-50 rounded-lg overflow-hidden"
              width={52}
              height={52}
            ></Image>
            <h2 className="absolute top-0 m-2 left-0">League of Legends</h2>
          </div>
        </Link>
        <div className="w-full h-44">
          <Image
            src={gragasCaipira.src}
            alt=""
            className="h-full w-full"
            width={52}
            height={52}
          ></Image>
        </div>
        <div className="w-full h-44">
          <Image
            src={gragasCaipira.src}
            alt=""
            className="h-full w-full"
            width={52}
            height={52}
          ></Image>
        </div>
      </div>
    </div>
  );
}
