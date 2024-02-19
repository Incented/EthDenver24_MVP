"use client";

import {
  AdminSettingsSchema,
  adminSettingsSchema,
} from "./createCommunitySchema";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Switch } from "@/components/ui/Switch";
import { rolesAndPermissions } from "./createCommunityData";

function UserRolesAndPermissionsForm({
  initialFormValues,
  onFormSubmit,
  moveToPrevStep,
  withStep = true,
}: FormProps<AdminSettingsSchema>) {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<AdminSettingsSchema>({
    resolver: zodResolver(adminSettingsSchema),
  });

  const onSubmit: SubmitHandler<AdminSettingsSchema> = (data) => {
    onFormSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col w-full gap-4 rounded-b-none rounded-lg md:md:h-[640px]">
        {/* <div className="grid grid-cols-5 gap-4"> */}
        <div className="w-full overflow-auto">
          <Table className="w-full ">
            <TableHeader>
              <TableRow className="border-none">
                <TableHead className="w-full pl-0 font-normal sm:w-auto">
                  Roles and Permissions
                </TableHead>
                <TableHead className="font-normal">Admin</TableHead>
                <TableHead className="font-normal">Members</TableHead>
                <TableHead className="font-normal">Veto Power</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rolesAndPermissions.map((role) => (
                <TableRow className="border-0" key={role.fieldName}>
                  <TableCell className="pl-0 text-sm leading-[14px] whitespace-normal">
                    {role.title}
                  </TableCell>
                  <TableCell>
                    {/* <Switch
                    defaultChecked={role.isValidForAdmin}
                    {...register(role.register_admin as any)}
                  /> */}
                    <Controller
                      control={control}
                      key={role.register_admin}
                      name={role.register_admin as any}
                      render={({ field }) => (
                        <Switch
                          onBlur={field.onBlur}
                          name={field.name}
                          ref={field.ref}
                          defaultChecked={
                            (initialFormValues &&
                              (
                                initialFormValues as {
                                  [key: string]: { isValidForAdmin: boolean };
                                }
                              )[role.fieldName]?.isValidForAdmin) ||
                            false
                          }
                          onCheckedChange={(checked) => field.onChange(checked)}
                        />
                      )}
                    />
                  </TableCell>
                  <TableCell>
                    <Controller
                      control={control}
                      key={role.register_member}
                      name={role.register_member as any}
                      render={({ field }) => (
                        <Switch
                          onBlur={field.onBlur}
                          name={field.name}
                          ref={field.ref}
                          defaultChecked={
                            (initialFormValues &&
                              (
                                initialFormValues as {
                                  [key: string]: { isValidForMembers: boolean };
                                }
                              )[role.fieldName]?.isValidForMembers) ||
                            false
                          }
                          onCheckedChange={(checked) => field.onChange(checked)}
                        />
                      )}
                    />
                  </TableCell>
                  <TableCell>
                    <Controller
                      control={control}
                      key={role.register_veto_power}
                      name={role.register_veto_power as any}
                      render={({ field }) => (
                        <Switch
                          onBlur={field.onBlur}
                          name={field.name}
                          ref={field.ref}
                          defaultChecked={
                            (initialFormValues &&
                              (
                                initialFormValues as {
                                  [key: string]: {
                                    isValidForVetoPower: boolean;
                                  };
                                }
                              )[role.fieldName]?.isValidForVetoPower) ||
                            false
                          }
                          onCheckedChange={(checked) => field.onChange(checked)}
                        />
                      )}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
      <div className="flex w-full p-6 py-4 pb-6 border rounded-lg rounded-t-none ">
        <div className="flex justify-start gap-2 mx-auto">
          <Button
            variant="outline"
            className="w-[100px]"
            onClick={withStep ? moveToPrevStep : () => {}}
            type="button"
          >
            {withStep ? "Back" : "Cancel"}
          </Button>

          <Button type="submit" className="w-[100px]">
            {withStep ? "Next" : "Save"}
          </Button>
        </div>
      </div>
    </form>
  );
}

export default UserRolesAndPermissionsForm;
