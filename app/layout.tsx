import { AppProviders } from "./AppProviders";
import type { Metadata } from "next";
import "@/styles/globals.css";
import PrivyProviderWrapper from "@/providers/privy-provider-wrapper";

export const metadata: Metadata = {
  icons: {
    icon: "/images/ico_orange.svg",
  },
  title: "Incented Protocol",
  description:
    "A protocol for autonomous task creation, prioritization, validation, and incentivization to supercharge contribution across the Web3 ecosystem and beyond.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="text-foreground bg-background">
        <PrivyProviderWrapper>
          <AppProviders>{children}</AppProviders>
        </PrivyProviderWrapper>
      </body>
    </html>
  );
}
