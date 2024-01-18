import { Button } from "@/components/ui/button";
import { Card, CardFooter } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import React from "react";
import {
  ThemeSettingDark,
  ThemeSettingLight,
} from "../_components/ThemeSetting";

const Page: React.FC = () => {
  return (
    <Card className="p-6 h-full">
      <div className="md:flex md:flex-row flex flex-col items-start md:justify-between gap-4">
        <div className="w-full">
          <h1 className="text-base leading-9 font-semibold">
            Theme preferences
          </h1>
          <p className=" text-sm leading-6 text-foreground tracking-[-0.35px]">
            Customization according to your preference
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
      <div className="grid gap-4 md:grid-cols-2 max-w-lg">
        <ThemeSettingLight />
        <ThemeSettingDark />
      </div>
    </Card>
  );
};

export default Page;
