import { ReactNode } from "react";

export type TabProps = { label: string; href: string };

export type TabsNavigationProps = {
  tabs: Array<TabProps>;
};
