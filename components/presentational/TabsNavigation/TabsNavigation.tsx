import { Tab } from "./Tab";
import { TabsNavigationProps } from "./types";

export const TabsNavigation = ({ tabs }: TabsNavigationProps) => {
  return (
    <div className="flex rounded-lg md:flex-col flex-row gap-6 p-6 md:w-[280px] w-full overflow-x-auto overflow-y-hidden md:overflow-x-hidden bg-secondary h-fit md:h-fit">
      {tabs.map((tab) => {
        return <Tab key={tab.href} {...tab} />;
      })}
    </div>
  );
};
