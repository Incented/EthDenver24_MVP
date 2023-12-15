"use client";

import LoginHeader from "public/assets/login-asset-dashboard.png";
import { ReactNode, useEffect } from "react";
import Image from "next/image";
import { MaintenanceModeBanner } from "@/components/presentational/MaintenanceModeBanner";

export function ClientLayout({ children }: { children: ReactNode }) {
  return (
    <div
      className="grid h-full dark:bg-gray-900/20"
      style={{
        gridTemplateRows: "1fr 1fr",
      }}
    >
      <div className="row-auto">
        <MaintenanceModeBanner />
      </div>

      <div
        className="grid"
        style={{
          gridTemplateColumns: "1fr 1fr",
        }}
      >
        <div className="text-center flex flex-col items-center justify-center space-y-8 h-screen">
          <div>{children}</div>
        </div>
        <div className="h-screen">
          <Image
            width={1000}
            height={1500}
            src={LoginHeader}
            alt="Login Header"
            className="h-full object-cover w-full"
          />
        </div>
      </div>
    </div>
  );
}
