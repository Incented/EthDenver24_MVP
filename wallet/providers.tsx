'use client';

import {
    RainbowKitProvider,
    getDefaultConfig,
    getDefaultWallets
} from '@rainbow-me/rainbowkit';
import {
    argentWallet,
    ledgerWallet,
    trustWallet,
} from '@rainbow-me/rainbowkit/wallets';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import * as React from 'react';
import { WagmiProvider } from 'wagmi';
import {
    arbitrum,
    base,
    mainnet,
    optimism,
    polygon,
    sepolia,
    zora,
} from 'wagmi/chains';

const { wallets } = getDefaultWallets();

const arbitrumSepolia = {
    name: 'Arbitrum Sepolia',
    id: 421614,
    nativeCurrency: { name: 'Ethereum', symbol: 'ETH', decimals: 18 },
    rpcUrls: {
        default: { http: ['https://sepolia-rollup.arbitrum.io/rpc'], }
    },
    blockExplorers: {
        default: { name: 'Arbitrum Sepolia Explorer', url: 'https://sepolia.arbiscan.io/' }
    },
};

const config = getDefaultConfig({
    appName: 'Incented',
    projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID!,
    wallets: [
        ...wallets,
        {
            groupName: 'Other',
            wallets: [argentWallet, trustWallet, ledgerWallet],
        },
    ],
    chains: [
        mainnet,
        polygon,
        optimism,
        arbitrum,
        base,
        sepolia,
        zora,
        arbitrumSepolia
    ],
    ssr: true,
});

const queryClient = new QueryClient();

export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <WagmiProvider config={config}>
            <QueryClientProvider client={queryClient}>
                <RainbowKitProvider>{children}</RainbowKitProvider>
            </QueryClientProvider>
        </WagmiProvider>
    );
}
