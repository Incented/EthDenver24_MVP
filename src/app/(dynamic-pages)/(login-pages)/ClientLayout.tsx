'use client';

import { MaintenanceModeBanner } from '@/components/presentational/tailwind/MaintenanceModeBanner';
import { ReactNode, useEffect } from 'react';
import Image from 'next/image';
import LoginHeader from 'public/images/coder.jpg';
import LogoLoginLight from 'public/logos/ico.svg';
import LogoLoginDark from 'public/logos/ico.svg';
import { T } from '@/components/ui/Typography';

export function ClientLayout({ children }: { children: ReactNode }) {
  return (
    <div
      className="grid h-full dark:bg-gray-900/20"
      style={{
        gridTemplateRows: '1fr 1fr',
      }}
    >
      <div className="row-auto">
        <MaintenanceModeBanner />
      </div>

      <div
        className="grid"
        style={{
          gridTemplateColumns: '1fr 1fr',
        }}
      >
        <div className="text-center flex flex-col items-center justify-center space-y-8 h-screen">
          <div>{children}</div>
        </div>
        {/* <div className="h-screen">
          <Image
            width={1000}
            height={1500}
            src={LoginHeader}
            alt="Login Header"
            className="h-full object-cover w-full"
          />
        </div> */}
        <div className="relative p-3">
          {/* Background Overlay */}

          {/* Blue Background Image */}
          <div
            className="gap-10 bg-cover flex flex-col justify-between rounded-xl w-full dark:bg-gray-800 bg-gray-100 bg-opacity-90 h-full px-10 pt-10 pb-10"
            // style={{ backgroundImage: `url(${LoginBackgroundLight.src})` }}
          >
            <div className="ml-6 space-y-8">
              <div className="relative flex items-center space-x-2">
                <Image
                  width={40}
                  src={LogoLoginLight}
                  alt="Logo Login"
                  className="w-[64px] -ml-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
                />
                <Image
                  width={40}
                  src={LogoLoginDark}
                  alt="Logo Login"
                  className="dark:invert w-[64px] -ml-4 -left-5 absolute rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
                />
                {/* <div
                style={{ backgroundImage: `url(${LogoLoginLight.src})` }}
                className="w-[80] -ml-4"
              /> */}
                <T.P className=" text-2xl font-bold leading-none">Incented</T.P>
              </div>

              <div>
                <Image width="600" src={LoginHeader} alt="Login Header" />
              </div>

              <div className=" w-[640px]">
                <T.H3 className=" tracking-tight">
                  <p className="text-6xl -ml-4 mb-0 leading-none">＂</p>
                  With Incented, BitcoinDAO has experienced growth and engagement never 
                  seen before. It truly puts the A in DAO.
                </T.H3>
                <div className="mt-8 flex justify-between">
                  <T.P>🥕 🥕 🥕 🥕 🥕</T.P>
                  <T.P className="dark:text-gray-100 text-base font-[500]">
                  Satoshi Nakamoto - OG of OGs
                  </T.P>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
