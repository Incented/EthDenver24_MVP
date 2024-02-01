import { Enum } from "@/types";

export const TYPE_OPTIONS: Array<Enum<"community_filter_type">> = [
  "all_communities",
  "my_communities",
  "bookmarked",
];

export const formatFieldValue = (type: string) => {
  // feature_request to Feature request
  return type.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase());
};
