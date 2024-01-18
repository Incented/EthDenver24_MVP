import { Button } from "@/components/ui/button";
import { Card, CardFooter } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import React from "react";
import WalletSetting from "../_components/WalletSetting";

export default function WalletPage() {
  return (
    <Card className="p-6 h-full">
      <div className="md:flex md:flex-row flex flex-col items-start md:justify-between gap-4">
        <div className="w-full">
          <h1 className="text-base leading-9 font-semibold">Wallet Settings</h1>
          <p className=" text-sm leading-6 text-foreground tracking-[-0.35px]">
            Manage all your connected wallets
          </p>
        </div>
        <CardFooter className="w-full justify-end gap-2 md:mt-3 px-0 py-0">
          <Button
            variant="outline"
            type="submit"
            className="w-full md:w-fit bg-secondary hover:bg-muted border-none"
          >
            Cancel{" "}
          </Button>
          <Button type="submit" className="w-full md:w-fit">
            Save
          </Button>
        </CardFooter>
      </div>

      <Separator className="my-4" />
      <div className="grid gap-6 mb-8 max-w-lg ">
        <WalletSetting
          isConnected
          walletImage="/logos/ico_orange.svg"
          walletName="Metamask"
        />
        <WalletSetting
          isConnected={false}
          walletImage="/logos/ico_orange.svg"
          walletName="Coinbase"
        />
        <WalletSetting
          isConnected={false}
          walletImage="/logos/ico_orange.svg"
          walletName="WalletConnect"
        />
      </div>
    </Card>
  );
}
