import { gragasCaipira, nicolasJackson } from '@/assets';
import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="max-w-[774px] font-medium m-auto px-3">
      <div className="flex flex-col gap-2 relative">
        <div className="w-full h-40 relative">
          <Link href={'/lol'}>
            <Image
              src={gragasCaipira.src}
              alt=""
              className="h-full object-cover object-top w-full opacity-50 rounded-lg overflow-hidden"
              fill
            ></Image>
            <h2 className="text-lg absolute flex h-full w-full items-center justify-center top-0 left-0">
              League of Legends
            </h2>
          </Link>
        </div>
        <div className="w-full h-40 relative">
          <Link href={'/fifa'}>
            <Image
              src={nicolasJackson.src}
              alt=""
              className="w-full h-full opacity-50 rounded-lg overflow-hidden"
              fill
            ></Image>
            <h2 className="text-lg absolute flex h-full w-full items-center justify-center top-0 left-0">
              FIFA
            </h2>
          </Link>
        </div>
      </div>
    </div>
  );
}
