"use client";

import { FC } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { cn } from "@/lib/utils";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Card, CardFooter } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

interface LanguageSettingProps {}
const updateLangSchema = z.object({
  language: z.string(),
  timeZone: z.string(),
});

const LanguageSetting: FC<LanguageSettingProps> = ({}) => {
  const form = useForm<z.infer<typeof updateLangSchema>>({
    resolver: zodResolver(updateLangSchema),
    defaultValues: {
      language: "",
      timeZone: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof updateLangSchema>) => {
    console.log(values);
  };

  const isLoading = form.formState.isSubmitting;
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Card className="p-6">
          <div className="md:flex md:flex-row flex flex-col items-start md:justify-between gap-4">
            <div className="w-full">
              <h1 className="text-base leading-9 font-semibold">Language</h1>
              <p className=" text-sm leading-6 text-foreground tracking-[-0.35px]">
                Manage your language preference
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
          <div className="w-full md:max-w-xs">
            <FormField
              control={form.control}
              name="language"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="mb-6">
                      <Label htmlFor="language">Language</Label>
                      <Select {...field} disabled={isLoading}>
                        <SelectTrigger className="w-full mt-1">
                          <SelectValue placeholder="Select a language" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectItem value="eng">English</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                      <p className="my-2 text-xs text-gray-400">
                        Choose the language you’d like to use
                      </p>

                      <FormMessage />
                    </div>
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="timeZone"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="">
                      <Label htmlFor="language">Time Zone</Label>
                      <Select {...field} disabled={isLoading}>
                        <SelectTrigger className="w-full mt-1">
                          <SelectValue placeholder="Select a time zone" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectItem value="gmt">GMT</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                      <p className="my-2 text-xs text-gray-400">
                        Use your time zone to follow the time on the task
                      </p>

                      <FormMessage />
                    </div>
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
        </Card>
      </form>
    </Form>
  );
};

export default LanguageSetting;
