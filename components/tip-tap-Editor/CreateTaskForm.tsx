"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { FC } from "react";
import EditorTopBar from "./Toolbar";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Label } from "@/components/ui/label";
import { createFormSchema } from "./CreateFormSchema";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "../ui/button";
import TipTap from "./TipTap";

interface CreateTaskFormProps {}

const CreateTaskForm: FC<CreateTaskFormProps> = ({}) => {
  const form = useForm<z.infer<typeof createFormSchema>>({
    resolver: zodResolver(createFormSchema),
    mode: "onChange",
    defaultValues: {
      // community: "",
      // taskTitle: "",
      taskDescription: "",
      taskType: "",
      reward: "",
      effort: "",
      image: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof createFormSchema>) => {
    console.log(values);
  };

  const isLoading = form.formState.isSubmitting;

  const editor = useEditor({
    extensions: [StarterKit],
    content: "<p>Hello World! 🌎️</p>",
  });

  return (
    <div className="mx-8 mt-10">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="community"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Community</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl className="">
                    <SelectTrigger className="w-[180px]">
                      <SelectValue
                        placeholder="Community"
                        defaultValue={field.value}
                      />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="Bunan Fund">Bunan Fund </SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
                <FormMessage className="text-red-400" />
              </FormItem>
            )}
          />
          <FormField
            name="taskTitle"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl className="">
                  <Input {...field} placeholder="Task title" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="taskDescription"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl className="">
                  <TipTap description={field.name} onChange={field.onChange} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit">Submit</Button>
        </form>
      </Form>
      {/* <EditorContent editor={editor} /> */}
    </div>
  );
};

export default CreateTaskForm;
