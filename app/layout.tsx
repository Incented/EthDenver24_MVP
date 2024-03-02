import { CARD_VIEW_VERTICAL_LAYOUT_COOKIE_KEY } from "@/constants";
import { CardVerticalLayoutProvider } from "@/contexts/CardVerticalLayoutContext";
import PrivyProviderWrapper from "@/providers/privy-provider-wrapper";
import "@/styles/globals.css";
import { Providers } from "@/wallet/providers";
import '@rainbow-me/rainbowkit/styles.css';
import type { Metadata } from "next";
import { cookies } from "next/headers";
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

  return (
    <html lang="en" suppressHydrationWarning>
      <body className="text-foreground bg-background">
        <CardVerticalLayoutProvider initialValue={cardLayoutVertical}>
          <PrivyProviderWrapper>
            <AppProviders><Providers>{children}</Providers></AppProviders>
          </PrivyProviderWrapper>
        </CardVerticalLayoutProvider>
      </body>
    </html>
  );
}
