"use client";
import { useState } from "react";
import { classNames } from "@/utils/classNames";
import { T } from "@/components/ui/Typography";
import { Button } from "../presentational/Button";
import { Label } from "../ui/label";

export const Password = ({
  onSubmit,
  isLoading,
  successMessage,
  label = "Password",
  buttonLabel = "Update",
  withMaintenanceMode,
}: {
  onSubmit: (password: string) => void;
  isLoading: boolean;
  successMessage?: string;
  label?: string;
  buttonLabel?: string;
} & Pick<any, "withMaintenanceMode">) => {
  const [password, setPassword] = useState<string>("");

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        onSubmit(password);
      }}
    >
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email" className="text-muted-foreground">
            {label}
          </Label>
          <div>
            <input
              id="password"
              name="password"
              type="password"
              value={password}
              disabled={isLoading}
              onChange={(event) => setPassword(event.target.value)}
              autoComplete="email"
              required
              className="block w-full appearance-none rounded-md border bg-gray-50/10 dark:bg-gray-800/20 h-10 px-3 py-3 placeholder-muted-foreground shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
            />
          </div>
        </div>
        <div>
          {isLoading ? (
            <Button
              withMaintenanceMode={withMaintenanceMode}
              disabled
              type="submit"
              className={classNames(
                "flex w-full justify-center rounded-lg border border-transparent py-3 text-white dark:text-black px-4 text-sm font-medium  shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2",
                isLoading
                  ? "bg-yellow-300 dark:bg-yellow-700 "
                  : "bg-black dark:bg-white hover:bg-gray-900 dark:hover:bg-gray-100  "
              )}
            >
              Loading...
            </Button>
          ) : (
            <Button
              withMaintenanceMode={withMaintenanceMode}
              type="submit"
              className={classNames(
                "flex w-full justify-center rounded-lg border border-transparent py-2 text-white dark:text-black px-4 text-sm font-medium  shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2",
                isLoading
                  ? "bg-yellow-300 dark:bg-yellow-700 "
                  : "bg-black dark:bg-white hover:bg-gray-900 dark:hover:bg-gray-100  "
              )}
            >
              {buttonLabel}
            </Button>
          )}
        </div>
        <div>
          {successMessage ? (
            <T.P className="text-sm text-green-500 dark:text-green-400 text-center">
              {successMessage}
            </T.P>
          ) : null}
        </div>
      </div>
    </form>
  );
};
