"use client";
import { MaintenanceModeContext } from "@/contexts/MaintenanceModeContext";
import { WrenchIcon } from "lucide-react";
import { useContext } from "react";
export function MaintenanceModeBanner() {
  const isAppInMaintenanceMode = useContext(MaintenanceModeContext);

  if (!isAppInMaintenanceMode) {
    return null;
  }
  return (
    <div className="flex items-center justify-center flex-auto flex-grow-0 p-3 px-10 space-x-4 text-lg text-center text-white bg-purple-500 select-none">
      <WrenchIcon className="text-white" />
      <span className="font-[600]">
        The App is currently in maintenance mode and is read-only. Please check
        back later.
      </span>
      <WrenchIcon className="text-white" />
    </div>
  );
}
