"use client";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
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
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Plus, Upload } from "lucide-react";

interface AddContributionProps {}

const formSchema = z.object({
  description: z.string().min(5, {
    message: "Description must be at least 5 characters.",
  }),
  link1: z.string().min(5, {
    message: "Provide a valid Link.",
  }),
  link2: z.string().min(5, {
    message: "Provide a valid Link.",
  }),
  link3: z.string().min(5, {
    message: "Provide a valid Link.",
  }),
  image: z.string().optional(),
  attchament: z.string().optional(),
});

const AddContribution: FC<AddContributionProps> = ({}) => {
  const [addedLink, setAddedLink] = useState<any[]>([]);
  const [linkNum, setLinkNum] = useState<number>(2);

  function handleAddLink(link: string) {
    if (addedLink.length === 2) return;
    setLinkNum((pre) => (pre += 1));
    setAddedLink((pre) => [...pre, link]);
  }
  console.log(addedLink);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      description: "",
      link1: "",
      link2: "",
      link3: "",
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
        <Button className="">Contribute</Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle className="text-start">Contribution</SheetTitle>
        </SheetHeader>
        <div className="my-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Solution Description</FormLabel>
                    <FormControl>
                      <Textarea
                        {...field}
                        placeholder="Describe your solution here"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="col-span-2">
                <Label>Upload</Label>
                <Card className="relative mt-1 outline-dashed outline-gray-600">
                  <FormField
                    control={form.control}
                    name="image"
                    render={({ field }) => (
                      <FormItem className="relative">
                        <FormControl className="">
                          <>
                            <div className="flex items-center justify-center w-full h-[200px] mx-auto outline-0">
                              <Input
                                type="file"
                                accept="image/*"
                                placeholder=""
                                className="z-40 w-full h-full p-4 rounded-full opacity-0 cursor-pointer "
                                onChange={(e) => handleImage(e, field.onChange)}
                              />
                              <div
                                className={cn(
                                  "h-full w-full absolute flex justify-center bg-cover bg-center group",
                                  field.value
                                    ? "bg-[rgba(22, 28, 36, 0.64)]"
                                    : "bg-default-100"
                                )}
                                style={{
                                  backgroundImage: `url(${field.value})`,
                                  objectFit: "contain",
                                }}
                              >
                                <div
                                  className={cn(
                                    "flex  justify-center items-center flex-col gap-1 text-default-400",
                                    field.value ? "opacity-0" : "opacity-1"
                                  )}
                                >
                                  <Upload />
                                  <p className="text-tiny">
                                    {field.value
                                      ? "Update Photo"
                                      : "Upload photo"}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </Card>
              </div>
              <FormField
                control={form.control}
                name="attchament"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Attachment</FormLabel>
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
              {addedLink.map((link, i) => (
                <FormField
                  key={i}
                  control={form.control}
                  name={link}
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel>Add Link(s)</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="https://" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              ))}
              <div className="flex gap-2">
                <FormField
                  control={form.control}
                  name="link1"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel>Add Link(s)</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="https://" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  onClick={() => handleAddLink(`link${linkNum}`)}
                  type="button"
                  size="icon"
                  variant="outline"
                  className="mt-8"
                >
                  <Plus />
                </Button>
              </div>
              <Button className="w-full" type="submit">
                Submit
              </Button>
            </form>
          </Form>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default AddContribution;
