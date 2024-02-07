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
import { Progress } from "@/components/ui/Progress";
import { useEffect } from "react";
import { rolesAndPermissions } from "./createCommunityData";
import { toast } from "sonner";

export default function UserRolesAndPermissionsForm({
  initialFormValues,
  onFormSubmit,
  moveToPrevStep,
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
      <div className="flex flex-col w-full gap-4 p-6 border border-b-0 rounded-b-none rounded-lg md:md:h-[640px] 2xl:h-[760px] lg:">
        <div className="flex flex-col lg:flex-row items-center justify-between border-b w-full">
          <div className="flex flex-col w-full  pb-4 lg:col-span-2">
            <p className="text-base font-semibold leading-9 text-foreground">
              User Roles and Permissions
            </p>
            <p className="text-sm leading-6">
              Assign roles and define permissions within the community.
            </p>
          </div>
          <div className="flex flex-col pt-[10px] md:justify-between w-full pb-4 lg:pb-0 lg:w-[160px]">
            <div className="flex justify-between text-sm text-muted-foreground">
              <p>Step 5/6</p> <p>80%</p>
            </div>
            <div className="py-1.5">
              <Progress value={80} className="w-full h-2" />
            </div>
          </div>
        </div>

        {/* <div className="grid grid-cols-5 gap-4"> */}
        <div className="w-full overflow-auto">
          <Table className="w-full ">
            <TableHeader>
              <TableRow className="border-none">
                <TableHead className="pl-0 w-full sm:w-auto font-normal">
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
                  <TableCell className="pl-0 whitespace-nowrap text-sm leading-[14px] lg:whitespace-normal">
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
      <div className=" flex w-full p-6 py-4 pb-6 rounded-lg rounded-t-none border">
        <div className="mx-auto flex gap-2 justify-start">
          <Button
            variant="outline"
            className="w-[100px]"
            onClick={moveToPrevStep}
            type="button"
            disabled={!moveToPrevStep}
          >
            Back
          </Button>{" "}
          <Button type="submit" className="w-[100px]">
            Next
          </Button>
        </div>
      </div>
    </form>
  );
}
