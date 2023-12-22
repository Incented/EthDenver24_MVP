import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Check } from "lucide-react";
import Image from "next/image";
import { FC } from "react";

interface WalletSettingProps {
  walletImage: string;
  walletName: string;
  isConnected: boolean;
}

const WalletSetting: FC<WalletSettingProps> = ({
  walletImage = "/logos/ico_orange.svg",
  walletName = "Metamask",
  isConnected = true,
}) => {
  return (
    <div className="flex items-center gap-4">
      <Card className="flex-1 px-4 py-2">
        <div className="flex items-center gap-2">
          <Image
            src={walletImage}
            width={20}
            height={20}
            alt="Web there wallet logo"
          />
          <p>{walletName}</p>
          {isConnected && (
            <div className="flex items-center gap-1 ml-auto text-[12px] text-primary">
              <Check size={16} />
              <p>Connected</p>
            </div>
          )}
        </div>
      </Card>
      <Button variant={isConnected ? "destructive" : "default"}>
        {isConnected ? "Disconnect" : "Connect"}
      </Button>
    </div>
  );
};

export default WalletSetting;
