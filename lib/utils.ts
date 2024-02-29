import {
  TaskFileArray,
  filesSchema,
} from "@/app/(dynamic-pages)/(protected-pages)/grant-applications/[id]/_components/GrantApplicationDetail";
import { Table } from "@/types";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { Json } from "./database.types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const errors = {
  add: (error: unknown) => {
    // link to sentry here
    console.error(error);
  },
};

export function parseJsonToStringArray(json: Json): string[] {
  if (typeof json === "string") {
    try {
      const parsed = JSON.parse(json);
      if (
        Array.isArray(parsed) &&
        parsed.every((item) => typeof item === "string")
      ) {
        return parsed;
      }
    } catch (error) {
      console.error("Failed to parse JSON:", error);
    }
  }
  return []; // Return an empty array if parsing fails or if the JSON is not an array of strings
}

export const getGrantProjectBgClass = (grantProjectStatus: string) => {
  switch (grantProjectStatus) {
    case "draft":
      return "bg-muted text-foreground";
    case "new_application":
      return "bg-black text-primary-foreground";
    case "prioritized":
      return "bg-primary text-primary-foreground";
    default:
      return "bg-[#12AAFF]";
  }
};

export const getTaskFeaturedImage = (task: Table<"tasks">) => {
  const imageUrl = "/images/task1.jpeg";
  let files: TaskFileArray = []; // Assuming TaskFileArray is correctly typed
  try {
    const arg =
      typeof task.files === "string" ? JSON.parse(task.files) : task.files;
    files = filesSchema.parse(arg); // This should ensure files is TaskFileArray
  } catch (error) {
    console.log(error);
  }

  let featuredImageUrl = imageUrl;
  // After parsing and validation, we know what `files` is, so we use it directly
  if (files.length > 0 && files[0].url) {
    featuredImageUrl = files[0].url; // Correctly typed access to `url`
  }

  return featuredImageUrl;
};

export const getGrantProjectFeaturedImageUrl = (
  task: Table<"grant_applications">
) => {
  const imageUrl = "/images/task1.jpeg";
  let files: TaskFileArray = []; // Assuming TaskFileArray is correctly typed
  try {
    const arg =
      typeof task.files === "string" ? JSON.parse(task.files) : task.files;
    files = filesSchema.parse(arg); // This should ensure files is TaskFileArray
  } catch (error) {
    console.log(error);
  }

  let featuredImageUrl = imageUrl;
  // After parsing and validation, we know what `files` is, so we use it directly
  if (files.length > 0 && files[0].url) {
    featuredImageUrl = files[0].url; // Correctly typed access to `url`
  }

  return featuredImageUrl;
};
