import { DynamicLayoutProviders } from './DynamicLayoutProviders';
import { getIsAppInMaintenanceMode } from '@/data/anon';

// do not cache this layout
export const revalidate = 0;
export const fetchCache = 'only-no-store';
export const dynamic = 'force-dynamic';

export const metadata = {
  icons: {
    icon: '/images/ico_orange.svg',
  },
  title: 'Incented Protocol',
  description:
    'A protocol for autonomous task creation, prioritization, validation, and incentivization to supercharge contribution across the Web3 ecosystem and beyond.',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const isAppInMaintenanceMode = await getIsAppInMaintenanceMode();
  return (
    <DynamicLayoutProviders isAppInMaintenanceMode={isAppInMaintenanceMode}>
      {children}
    </DynamicLayoutProviders>
  );
}
