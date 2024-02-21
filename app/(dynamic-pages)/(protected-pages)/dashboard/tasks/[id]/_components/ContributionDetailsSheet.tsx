"use client";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ChangeEvent, FC, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import Image from "next/image";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { File, MoreVertical } from "lucide-react";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import ContributionDiscussion from "./ContributionDiscussion";

interface ContributionDetailsSheetProps {}

const formSchema = z.object({
  description: z.string().min(5, {
    message: "Description must be at least 5 characters.",
  }),
  carrotAmount: z.string().min(5, {
    message: "Provide a valid Amount.",
  }),
  stakeFor: z.string().min(5, {
    message: "Select a Stake.",
  }),
  image: z.string().optional(),
  attchament: z.string().optional(),
});

const ContributionDetailsSheet: FC<ContributionDetailsSheetProps> = ({}) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      description: "",
      carrotAmount: "",
      image: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  const [files, setFiles] = useState<File[]>([]);

  const handleImage = (
    e: ChangeEvent<HTMLInputElement>,
    fieldChange: (value: string) => void
  ) => {
    e.preventDefault();
    const fileReader = new FileReader();

    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setFiles(Array.from(e.target.files));

      if (!file.type.includes("image")) return;

      fileReader.onload = async (event) => {
        const imageDataUrl = event.target?.result?.toString() || "";
        fieldChange(imageDataUrl);
      };

      fileReader.readAsDataURL(file);
    }
  };
  return (
    <Sheet>
      <SheetTrigger>
        <Button variant="outline" size="sm" className="text-foreground">
          View Details
        </Button>
      </SheetTrigger>
      <SheetContent className="overflow-scroll">
        <SheetHeader>
          <SheetTitle className="mb-4 text-start">
            Contribution Details
          </SheetTitle>
          <div className="flex items-center gap-1">
            <Avatar>
              <AvatarImage
                src="/assets/avatar_1.jpg"
                className="object-cover w-8 h-8 rounded-full"
              />
            </Avatar>
            <p className="text-xs">Ryan Franci</p>
          </div>
        </SheetHeader>
        <h1 className="text-sm">Solution</h1>
        <p className="text-xs text-muted-foreground">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Itaque
          inventore quidem amet perspiciatis at voluptatum alias reprehenderit?
          Officia tempore sed optio deserunt ipsam minima dolores, doloribus
          quod dolor! Provident, odit. Eligendi enim impedit
        </p>
        <h1 className="mt-4 mb-2 text-sm">Photos</h1>

        <Carousel
          opts={{
            align: "center",
          }}
          className="w-full"
        >
          <CarouselContent className="w-full">
            {Array.from({ length: 5 }).map((_, index) => (
              <CarouselItem key={index} className="basis-1/3">
                <div className="w-[100px]">
                  <Image
                    width={200}
                    height={200}
                    src="/assets/avatar_1.jpg"
                    alt=""
                    className="w-full h-full rounded-md"
                  />
                  <p className="mt-1 text-xs ">it looks good</p>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="flex items-center justify-end gap-3 mt-8">
            <CarouselPrevious className="" />
            <CarouselNext className="" />
          </div>
        </Carousel>
        <div className="mt-4">
          <h4 className="mb-2 text-sm font-medium ">Attachment files</h4>
          <div className="flex items-center gap-1 px-2 py-2.5 border rounded-md w-fit">
            <File size={16} />
            <samp className="text-xs">datalist.pdf</samp>
            <MoreVertical size={16} className="ml-2" />
          </div>
        </div>

        <Card className="p-3 my-4">
          <p className="mb-2 text-sm">Submit your validation</p>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <div className="flex items-center gap-2">
                <FormField
                  control={form.control}
                  name="carrotAmount"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Amount of carrots</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="stakeFor"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-background">.</FormLabel>
                      <FormControl>
                        <Select {...field}>
                          <SelectTrigger className="w-[150px]">
                            <SelectValue placeholder="Stake for" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="light">Light</SelectItem>
                            <SelectItem value="dark">Dark</SelectItem>
                            <SelectItem value="system">System</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-muted-foreground">
                      Description
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        {...field}
                        placeholder="Write your description here"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="attchament"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-muted-foreground">
                      Attachment
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Describe your solution here"
                        type="file"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button className="" size="sm" type="submit">
                Submit
              </Button>
            </form>
          </Form>
        </Card>
        <div className="space-y-3">
          <ContributionDiscussion
            details="Building bridges between communities, fostering innovation, and empowering individuals to reach their full potential. Together, we strive to create a brighter future where every voice is heard, every dream is nurtured, and every opportunity is embraced."
            contributionCarrots={20}
            contributorId="23"
            contributorImage="/assets/avatar_1.jpg"
            contributorName="Jeph chisom"
          />
          <ContributionDiscussion
            details="Building bridges between communities, fostering innovation, and empowering individuals to reach their full potential. Together, we strive to create a brighter future where every voice is heard, every dream is nurtured, and every opportunity is embraced."
            contributionCarrots={20}
            contributorId="23"
            contributorImage="/assets/avatar_1.jpg"
            contributorName="Jeph chisom"
          />
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default ContributionDetailsSheet;
