import { CARD_VIEW_VERTICAL_LAYOUT_COOKIE_KEY } from "@/constants";
import { CardVerticalLayoutProvider } from "@/contexts/CardVerticalLayoutContext";
import PrivyProviderWrapper from "@/providers/privy-provider-wrapper";
import "@/styles/globals.css";
import { config } from "@/wallet/config";
import { ContextProvider } from "@/wallet/context";
import type { Metadata } from "next";
import { cookies, headers } from "next/headers";
import { cookieToInitialState } from 'wagmi';
import { AppProviders } from "./AppProviders";


export const metadata: Metadata = {
  icons: {
    icon: "/images/ico_orange.svg",
  },
  title: "Incented Protocol",
  description:
    "A protocol for autonomous task creation, prioritization, validation, and incentivization to supercharge contribution across the Web3 ecosystem and beyond.",
};

function getCardLayout() {
  const cookieStore = cookies();
  const cookieValue = cookieStore.get(
    CARD_VIEW_VERTICAL_LAYOUT_COOKIE_KEY
  )?.value;
  if (cookieValue) {
    return cookieValue === "true";
  }
  return true;
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cardLayoutVertical = getCardLayout();
  const initialState = cookieToInitialState(config, headers().get('cookie'))
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="text-foreground bg-background">
        <ContextProvider initialState={initialState}>
          <CardVerticalLayoutProvider initialValue={cardLayoutVertical}>
            <PrivyProviderWrapper>
              <AppProviders>{children}</AppProviders>
            </PrivyProviderWrapper>
          </CardVerticalLayoutProvider>
        </ContextProvider>
      </body>
    </html>
  );
}
