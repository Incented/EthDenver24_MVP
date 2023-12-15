"use client";

import { ReactNode, useCallback, useEffect, useRef, useState } from "react";
import NProgress from "nprogress";
import { usePathname, useSearchParams } from "next/navigation";
import RouterProgressionContext from "@/contexts/RouterProgressionContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import ToasterProvider from "@/providers/ToasterProvider";
import NavigationProgressbar from "@/components/NavigationProgressBar";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { type ThemeProviderProps } from "next-themes/dist/types";

function RouterEventWrapper({ children }: { children: ReactNode }) {
  const onStart = useCallback(() => NProgress.start(), []);
  const onComplete = useCallback(() => NProgress.done(), []);
  const [isChanging, setIsChanging] = useState(false);
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const onCompleteFresh = useRef(onComplete);
  const onStartFresh = useRef(onStart);
  useEffect(() => setIsChanging(false), [pathname, searchParams]);

  useEffect(() => {
    if (isChanging) onStartFresh.current();
    else onCompleteFresh.current();
  }, [isChanging]);

  return (
    <RouterProgressionContext.Provider value={() => setIsChanging(true)}>
      {children}
    </RouterProgressionContext.Provider>
  );
}

// Create a client
const queryClient = new QueryClient();

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <NextThemesProvider attribute="class" defaultTheme="system" enableSystem>
        <RouterEventWrapper>
          <NavigationProgressbar />
          <ToasterProvider />
          {children}
        </RouterEventWrapper>
      </NextThemesProvider>
    </QueryClientProvider>
  );
}
