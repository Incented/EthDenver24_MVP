"use client";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { FC } from "react";
import { useTheme } from "next-themes";

interface ThemeSettingProps {}

export const ThemeSettingLight: FC<ThemeSettingProps> = ({}) => {
  const { setTheme } = useTheme();
  return (
    <Card className="bg-white cursor-pointer" onClick={() => setTheme("light")}>
      <div className="flex items-center justify-between p-2">
        <div className="w-8 h-2 bg-primary" />
        <div className="flex gap-1">
          <div className="w-8 h-1 bg-gray-300" />
          <div className="w-8 h-1 bg-gray-300" />
          <div className="w-8 h-1 bg-gray-300" />
        </div>
        <div className="flex items-center gap-1">
          <div className="w-2 h-2 bg-gray-300" />
          <div className="w-2 h-2 bg-gray-300 rounded-full" />
          <div className="w-8 h-2 bg-gray-300" />
        </div>
      </div>
      <Separator className="mb-4" />

      <div className="w-8 h-2 mx-2 bg-gray-300" />
      <div className="flex gap-2">
        <div className="w-full h-8 m-2 bg-gray-300" />
        <div className="w-full h-8 m-2 bg-gray-300" />
        <div className="w-full h-8 m-2 bg-gray-300" />
        <div className="w-full h-8 m-2 bg-gray-300" />
      </div>

      <h1 className="mx-2 my-4 text-black">Light Mode</h1>
    </Card>
  );
};
export const ThemeSettingDark: FC<ThemeSettingProps> = ({}) => {
  const { setTheme } = useTheme();
  return (
    <Card
      className="cursor-pointer bg-primary"
      onClick={() => setTheme("dark")}
    >
      <div className="bg-black">
        <div className="flex items-center justify-between p-2">
          <div className="w-8 h-2 bg-primary" />
          <div className="flex gap-1">
            <div className="w-8 h-1 bg-gray-300" />
            <div className="w-8 h-1 bg-gray-300" />
            <div className="w-8 h-1 bg-gray-300" />
          </div>
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 bg-gray-300" />
            <div className="w-2 h-2 bg-gray-300 rounded-full" />
            <div className="w-8 h-2 bg-gray-300" />
          </div>
        </div>
        <Separator className="mb-4" />

        <div className="w-8 h-2 mx-2 bg-gray-300" />
        <div className="flex gap-2">
          <div className="w-full h-8 m-2 bg-gray-300" />
          <div className="w-full h-8 m-2 bg-gray-300" />
          <div className="w-full h-8 m-2 bg-gray-300" />
          <div className="w-full h-8 m-2 bg-gray-300" />
        </div>
      </div>
      <h1 className="mx-2 my-4">Dark Mode</h1>
    </Card>
  );
};
