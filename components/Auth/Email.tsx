"use client";
import { Anchor } from "@/components/Anchor";
import { classNames } from "@/utils/classNames";
import { useMemo } from "react";
import { useState } from "react";
import { T } from "@/components/ui/Typography";
import { Button } from "../presentational/Button";
import { Label } from "../ui/label";

export const Email = ({
  onSubmit,
  view,
  isLoading,
  successMessage,
  label = "Email address",
  withMaintenanceMode,
  defaultValue,
}: {
  onSubmit: (email: string) => void;
  view: "sign-in" | "sign-up" | "update-email" | "forgot-password";
  isLoading: boolean;
  successMessage?: string | null | undefined;
  label?: string;
  defaultValue?: string;
} & Pick<any, "withMaintenanceMode">) => {
  const [email, setEmail] = useState<string>(defaultValue ?? "");

  const buttonLabelText = useMemo(() => {
    switch (view) {
      case "sign-in":
        return "Login with Magic Link";
      case "sign-up":
        return "Sign up";
      case "update-email":
        return "Update Email";
      case "forgot-password":
        return "Reset password";
    }
  }, [view]);

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        onSubmit(email);
      }}
    >
      <div className="space-y-2">
        <div className="space-y-2">
          <Label htmlFor="email" className="text-muted-foreground">
            {label}
          </Label>
          <div>
            <input
              id={`${view}-email`}
              name="email"
              type="email"
              value={email}
              disabled={isLoading}
              onChange={(event) => setEmail(event.target.value)}
              autoComplete={"email"}
              placeholder="placeholder@email.com"
              required
              className="block w-full appearance-none rounded-md border bg-gray-50/10 dark:bg-gray-800/20 h-10 px-3 py-3 placeholder-muted-foreground shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
            />
          </div>
        </div>
        <div className="flex items-center justify-between">
          {view === "forgot-password" ? (
            <div className="text-sm">
              <Anchor
                href="/login"
                className="font-medium text-blue-600 dark:text-blue-400 hover:text-blue-500"
              >
                Log in instead?
              </Anchor>
            </div>
          ) : null}
        </div>
        <div>
          <Button
            withMaintenanceMode={withMaintenanceMode}
            type="submit"
            className={classNames(
              "flex w-full justify-center rounded-lg border border-transparent py-2 text-white dark:text-white px-4 text-sm font-medium  shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 dark:hover:bg-primary/90 dark:bg-[#F97316]",
              isLoading
                ? "bg-yellow-300 dark:bg-yellow-700 "
                : "bg-black hover:bg-gray-900"
            )}
          >
            {buttonLabelText}
          </Button>
        </div>
        <div>
          {successMessage ? (
            <T.P className="text-green-500 dark:text-green-400 text-center">
              {successMessage}
            </T.P>
          ) : null}
        </div>
      </div>
    </form>
  );
};
