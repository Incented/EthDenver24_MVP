import { ZodTypeAny, z } from "zod";

export const appAdminOrganizationsFiltersSchema = z.object({
  page: z.coerce.number().int().positive().optional(),
  query: z.string().optional(),
});

export type AppAdminOrganizationsFiltersSchema = z.infer<
  typeof appAdminOrganizationsFiltersSchema
>;

const singleOrArray = <T extends ZodTypeAny>(schema: T) => {
  return z.preprocess((obj) => {
    if (Array.isArray(obj)) {
      return obj;
    } else if (typeof obj === "string") {
      return obj.split(",");
    } else {
      return [];
    }
  }, z.array(schema));
};

export const communityFilterSchema = singleOrArray(
  z.enum(["all_communities", "my_communities", "bookmarked"])
);

export const dropdownFiltersSchema = z.object({
  types: communityFilterSchema.optional(),
});

export type DropdownFiltersSchema = z.infer<typeof dropdownFiltersSchema>;

export const sortSchema = z.enum(["asc", "desc"]).optional();

export const filtersSchema = appAdminOrganizationsFiltersSchema.merge(
  dropdownFiltersSchema
);

export type FiltersSchema = z.infer<typeof filtersSchema>;
