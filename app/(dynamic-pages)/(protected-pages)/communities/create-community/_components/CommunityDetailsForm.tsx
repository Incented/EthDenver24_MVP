"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import {
  BasicCommunityDetailsSchema,
  basicCommunityDetailsSchema,
} from "./createCommunitySchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { ReactNode } from "react";
import {
  Facebook,
  Instagram,
  Link,
  Linkedin,
  Twitter,
  Youtube,
  Plus,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { z } from "zod";

export default function BasicDetailsForm({
  initialFormValues,
  onFormSubmit,
  moveToPrevStep,
}: FormProps<BasicCommunityDetailsSchema>) {
  type socialMediaOption = {
    id: number;
    value: string;
    icon: ReactNode;
    label: string;
  };

  const socialMediaOptions: socialMediaOption[] = [
    {
      id: 0,
      value: "website",
      icon: <Link size={20} className="pr-2 stroke-foreground" />,
      label: "Website",
    },
    {
      id: 1,
      value: "facebook",
      icon: <Facebook size={20} className="pr-2 stroke-foreground" />,
      label: "Facebook",
    },
    {
      id: 2,
      value: "linkedin",
      icon: <Linkedin size={20} className="pr-2 stroke-foreground" />,
      label: "LinkedIn",
    },
    {
      id: 3,
      value: "youtube",
      icon: <Youtube size={20} className="pr-2 stroke-foreground" />,
      label: "YouTube",
    },
    {
      id: 4,
      value: "instagram",
      icon: <Instagram size={20} className="pr-2 stroke-foreground" />,
      label: "Instagram",
    },
    {
      id: 5,
      value: "twitter",
      icon: <Twitter size={20} className="pr-2 stroke-foreground" />,
      label: "twitter",
    },
  ];

  const defaultSocialLinkType = socialMediaOptions[0].value;

  const {
    register,
    setValue,
    watch,
    handleSubmit,
    getValues,
    reset,
    control,
    formState: { errors },
  } = useForm<BasicCommunityDetailsSchema>({
    resolver: zodResolver(basicCommunityDetailsSchema),
    defaultValues: {
      title: initialFormValues?.title || "",
      description: initialFormValues?.description || "",
      socialLinks: initialFormValues?.socialLinks || [
        {
          type: defaultSocialLinkType as
            | "website"
            | "facebook"
            | "twitter"
            | "linkedin"
            | "instagram"
            | "youtube",
          url: "",
        },
      ],
    },
  });

  const onSubmit: SubmitHandler<BasicCommunityDetailsSchema> = (data) => {
    onFormSubmit(data);
  };

  const addNewSocialLink = () => {
    const currentLinks = getValues("socialLinks") || [];
    if (currentLinks.length < socialMediaOptions.length) {
      const availableOptions = socialMediaOptions.filter(
        (option) => !currentLinks.find((link) => link.type === option.value)
      );

      if (availableOptions.length > 0) {
        const defaultType = availableOptions[0].value;
        setValue("socialLinks", [
          ...currentLinks,
          {
            type: defaultType as
              | "website"
              | "facebook"
              | "twitter"
              | "linkedin"
              | "instagram"
              | "youtube",
            url: "",
          },
        ]);
      } else {
        toast.error("You have reached the maximum number of links.");
      }
    } else {
      toast.error("You have reached the maximum number of links.");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full h-auto">
      <div className="flex flex-col w-full gap-4 border-b-0 rounded-b-none rounded-lg md:h-[600px] 2xl:h-[760px] overflow-hidden">
        <div className="overflow-auto h-fit">
          <div className="w-full overflow-auto">
            <div className="flex flex-col gap-6 mt-2 lg:flex-row">
              <div className="bg-muted w-full lg:w-[228px] h-fit rounded-xl flex flex-col justify-center items-center p-6 px-4">
                <div className="flex items-center justify-center w-24 h-24 p-4 mb-4 rounded-full bg-background">
                  <svg
                    width="40"
                    height="40"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g id="image">
                      <path
                        id="Vector"
                        d="M14 10L11.9427 7.94267C11.6926 7.69271 11.3536 7.55229 11 7.55229C10.6464 7.55229 10.3074 7.69271 10.0573 7.94267L4 14M3.33333 2H12.6667C13.403 2 14 2.59695 14 3.33333V12.6667C14 13.403 13.403 14 12.6667 14H3.33333C2.59695 14 2 13.403 2 12.6667V3.33333C2 2.59695 2.59695 2 3.33333 2ZM7.33333 6C7.33333 6.73638 6.73638 7.33333 6 7.33333C5.26362 7.33333 4.66667 6.73638 4.66667 6C4.66667 5.26362 5.26362 4.66667 6 4.66667C6.73638 4.66667 7.33333 5.26362 7.33333 6Z"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="stroke-border"
                      />
                    </g>
                  </svg>
                </div>
                <p className="mb-2 text-sm leading-6">
                  Edit your community logo
                </p>
                <Button className="px-8">Update</Button>
              </div>
              <div className="space-y-4 w-full lg:w-[300px] pb-[10px]">
                <div className="space-y-2">
                  <Label htmlFor="title">Community Name</Label>
                  <Input
                    {...register("title")}
                    type="text"
                    placeholder="Community Name"
                  />
                  {errors.title?.message && (
                    <p className="text-sm text-red-600 dark:text-red-500">
                      {errors.title?.message}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Community Description</Label>
                  <Textarea
                    {...register("description")}
                    className="h-24"
                    placeholder="Community description"
                  />
                  {errors.description?.message && (
                    <p className="text-sm text-red-600 dark:text-red-500">
                      {errors.description?.message}
                    </p>
                  )}
                </div>
                <p className="text-sm font-medium leading-[14px]">
                  Social Media links
                </p>

                {(watch("socialLinks") ?? []).map((link, index) => (
                  <div key={index} className="relative">
                    <Controller
                      control={control}
                      name={`socialLinks.${index}.type`}
                      render={({ field }) => (
                        <div className="absolute">
                          {" "}
                          <Select
                            value={field.value}
                            onValueChange={(newValue) => {
                              const newLinks = getValues("socialLinks") || [];
                              newLinks[index].type = newValue as
                                | "website"
                                | "facebook"
                                | "twitter"
                                | "linkedin"
                                | "instagram"
                                | "youtube";
                              setValue("socialLinks", newLinks);
                            }}
                          >
                            <SelectTrigger aria-label="Social media">
                              <SelectValue
                                placeholder={
                                  socialMediaOptions.find(
                                    (option) => option.value === field.value
                                  )?.icon || socialMediaOptions[0].icon
                                }
                              />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectGroup>
                                {socialMediaOptions
                                  .filter(
                                    (option) =>
                                      !(watch("socialLinks") ?? []).some(
                                        (link, linkIndex) =>
                                          linkIndex !== index &&
                                          link.type === option.value
                                      )
                                  )
                                  .map((option) => (
                                    <SelectItem
                                      key={option.value}
                                      value={option.value}
                                    >
                                      {option.icon}
                                    </SelectItem>
                                  ))}
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                        </div>
                      )}
                    />
                    <Controller
                      control={control}
                      name={`socialLinks.${index}.url`}
                      render={({ field }) => (
                        <Input
                          {...field}
                          type="text"
                          placeholder="URL"
                          className="pl-20"
                        />
                      )}
                    />
                    {errors.socialLinks && errors.socialLinks[index]?.url && (
                      <p className="text-sm text-red-600 dark:text-red-500">
                        {errors.socialLinks[index]?.url?.message}
                      </p>
                    )}
                  </div>
                ))}
                <Button
                  variant="ghost"
                  className="px-0 py-0 text-primary hover:bg-transparent"
                  onClick={(event) => {
                    event.preventDefault();
                    addNewSocialLink();
                  }}
                >
                  <Plus size={24} className="pr-2" />
                  Add link
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex w-full p-6 py-4 pb-6 border rounded-lg rounded-t-none ">
        <div className="flex justify-start gap-2 mx-auto">
          <Button
            variant="outline"
            onClick={moveToPrevStep}
            className="w-[100px]"
            disabled={!moveToPrevStep}
            type="button"
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

// "use client";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Textarea } from "@/components/ui/textarea";
// import { Controller, SubmitHandler, useForm } from "react-hook-form";
// import {
//   BasicCommunityDetailsSchema,
//   basicCommunityDetailsSchema,
// } from "./createCommunitySchema";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { ReactNode, useEffect, useState } from "react";
// import {
//   Facebook,
//   Instagram,
//   Link,
//   Linkedin,
//   Twitter,
//   Youtube,
//   Plus,
// } from "lucide-react";
// import {
//   Select,
//   SelectContent,
//   SelectGroup,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { toast } from "sonner";

// import { FC } from "react";

// interface CommunityDetailsFormProps {
//   basicDetails: BasicCommunityDetailsSchema | undefined;
//   setBasicDetails: (data: BasicCommunityDetailsSchema) => void;
//   currentStep?: number;
//   setCurrentStep?: (step: number) => void;
// }

// const CommunityDetailsForm: FC<CommunityDetailsFormProps> = ({
//   basicDetails,
//   setBasicDetails,
//   currentStep,
//   setCurrentStep,
// }) => {
//   type socialMediaOption = {
//     id: number;
//     value: string;
//     icon: ReactNode;
//     label: string;
//   };

//   const socialMediaOptions: socialMediaOption[] = [
//     {
//       id: 0,
//       value: "website",
//       icon: <Link size={20} className="pr-2 stroke-foreground" />,
//       label: "Website",
//     },
//     {
//       id: 1,
//       value: "facebook",
//       icon: <Facebook size={20} className="pr-2 stroke-foreground" />,
//       label: "Facebook",
//     },
//     {
//       id: 2,
//       value: "linkedin",
//       icon: <Linkedin size={20} className="pr-2 stroke-foreground" />,
//       label: "LinkedIn",
//     },
//     {
//       id: 3,
//       value: "youtube",
//       icon: <Youtube size={20} className="pr-2 stroke-foreground" />,
//       label: "YouTube",
//     },
//     {
//       id: 4,
//       value: "instagram",
//       icon: <Instagram size={20} className="pr-2 stroke-foreground" />,
//       label: "Instagram",
//     },
//     {
//       id: 5,
//       value: "twitter",
//       icon: <Twitter size={20} className="pr-2 stroke-foreground" />,
//       label: "twitter",
//     },
//   ];

//   const defaultSocialLinkType = socialMediaOptions[0].value;

//   const {
//     register,
//     setValue,
//     watch,
//     handleSubmit,
//     getValues,
//     reset,
//     control,
//     formState: { errors },
//   } = useForm<BasicCommunityDetailsSchema>({
//     resolver: zodResolver(basicCommunityDetailsSchema),
//     defaultValues: {
//       title: basicDetails?.title || "",
//       description: basicDetails?.description || "",
//       // socialLinks: {
//       //   type: basicDetails?.socialLinks?.type || "website",
//       //   url: basicDetails?.socialLinks?.url || "",
//       // },
//       socialLinks: basicDetails?.socialLinks || [
//         {
//           type: defaultSocialLinkType as
//             | "website"
//             | "facebook"
//             | "twitter"
//             | "linkedin"
//             | "instagram"
//             | "youtube",
//           url: "",
//         },
//       ],
//     },
//   });

//   // useEffect(() => {
//   //   const savedBasicDetails = localStorage.getItem("basicDetails");
//   //   if (savedBasicDetails) {
//   //     const parsedDetails = JSON.parse(savedBasicDetails);
//   //     reset(parsedDetails); // This sets the form values to the saved data
//   //   }
//   // }, [reset]);

//   const onSubmit: SubmitHandler<BasicCommunityDetailsSchema> = (data) => {
//     setBasicDetails(data);
//     if (currentStep !== undefined && setCurrentStep !== undefined) {
//       const newStep = currentStep + 1;
//       setCurrentStep(newStep);
//       localStorage.setItem("currentStep", String(newStep));
//       // localStorage.setItem("basicDetails", JSON.stringify(data));
//     }
//   };

//   const [selectedOption, setSelectedOption] = useState<socialMediaOption>(
//     socialMediaOptions[0]
//   );

//   const [socialLinks, setSocialLinks] = useState([
//     { type: "website", url: "" },
//   ]);

//   const addNewSocialLink = () => {
//     const currentLinks = getValues("socialLinks") || [];
//     if (currentLinks.length < socialMediaOptions.length) {
//       const availableOptions = socialMediaOptions.filter(
//         (option) => !currentLinks.find((link) => link.type === option.value)
//       );

//       if (availableOptions.length > 0) {
//         const defaultType = availableOptions[0].value;
//         setValue("socialLinks", [
//           ...currentLinks,
//           {
//             type: defaultType as
//               | "website"
//               | "facebook"
//               | "twitter"
//               | "linkedin"
//               | "instagram"
//               | "youtube",
//             url: "",
//           },
//         ]);
//       } else {
//         toast.error("You have reached the maximum number of links.");
//       }
//     } else {
//       toast.error("You have reached the maximum number of links.");
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit(onSubmit)} className="w-full h-auto">
//       <div className="flex flex-col w-full gap-4 rounded-b-none rounded-lg md:h-[640px] 2xl:h-[760px] overflow-hidden">
//         <div className="overflow-auto h-fit">
//           <div className="w-full overflow-auto">
//             <div className="flex flex-col gap-6 mt-2 lg:flex-row">
//               <div className="bg-muted w-full lg:w-[228px] h-fit rounded-xl flex flex-col justify-center items-center p-6 px-4">
//                 <div className="flex items-center justify-center w-24 h-24 p-4 mb-4 rounded-full bg-background">
//                   <svg
//                     width="40"
//                     height="40"
//                     viewBox="0 0 16 16"
//                     fill="none"
//                     xmlns="http://www.w3.org/2000/svg"
//                   >
//                     <g id="image">
//                       <path
//                         id="Vector"
//                         d="M14 10L11.9427 7.94267C11.6926 7.69271 11.3536 7.55229 11 7.55229C10.6464 7.55229 10.3074 7.69271 10.0573 7.94267L4 14M3.33333 2H12.6667C13.403 2 14 2.59695 14 3.33333V12.6667C14 13.403 13.403 14 12.6667 14H3.33333C2.59695 14 2 13.403 2 12.6667V3.33333C2 2.59695 2.59695 2 3.33333 2ZM7.33333 6C7.33333 6.73638 6.73638 7.33333 6 7.33333C5.26362 7.33333 4.66667 6.73638 4.66667 6C4.66667 5.26362 5.26362 4.66667 6 4.66667C6.73638 4.66667 7.33333 5.26362 7.33333 6Z"
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         className="stroke-border"
//                       />
//                     </g>
//                   </svg>
//                 </div>
//                 <p className="mb-2 text-sm leading-6">
//                   Edit your community logo
//                 </p>
//                 <Button className="px-8">Update</Button>
//               </div>
//               <div className="space-y-4 w-full lg:w-[300px] pb-[10px]">
//                 <div className="space-y-2">
//                   <Label htmlFor="title">Community Name</Label>
//                   <Input
//                     {...register("title")}
//                     type="text"
//                     placeholder="Community Name"
//                     defaultValue={basicDetails?.title || ""}
//                   />
//                   {errors.title?.message && (
//                     <p className="text-sm text-red-600 dark:text-red-500">
//                       {errors.title?.message}
//                     </p>
//                   )}
//                 </div>
//                 <div className="space-y-2">
//                   <Label htmlFor="description">Community Description</Label>
//                   <Textarea
//                     {...register("description")}
//                     className="h-24"
//                     placeholder="Community description"
//                     defaultValue={basicDetails?.description || ""}
//                   />
//                   {errors.description?.message && (
//                     <p className="text-sm text-red-600 dark:text-red-500">
//                       {errors.description?.message}
//                     </p>
//                   )}
//                 </div>
//                 <p className="text-sm font-medium leading-[14px]">
//                   Social Media links
//                 </p>

//                 {/* <div className="relative">
//                   <Controller
//                     control={control}
//                     name="socialLinks"
//                     render={({ field }) => {
//                       return (
//                         <div className="relative">
//                           <div className="absolute">
//                             <Select
//                               value={field.value?.type || ""}
//                               onValueChange={(newValue) => {
//                                 // Assuming you want to update the url inside field.value
//                                 // Update the field with the new object containing the updated url
//                                 field.onChange({
//                                   ...field.value,
//                                   type: newValue,
//                                 });
//                               }}
//                             >
//                               <SelectTrigger
//                                 aria-label="Social media"
//                                 className=""
//                               >
//                                 <SelectValue
//                                   placeholder={selectedOption.icon}
//                                 />
//                               </SelectTrigger>
//                               <SelectContent>
//                                 <SelectGroup>
//                                   {socialMediaOptions.map((option) => (
//                                     <SelectItem
//                                       key={option.value}
//                                       value={option.value}
//                                     >
//                                       {option.icon}
//                                     </SelectItem>
//                                   ))}
//                                 </SelectGroup>
//                               </SelectContent>
//                             </Select>
//                           </div>
//                           <Input
//                             {...register("socialLinks.url")}
//                             type="text"
//                             placeholder={field.value?.type || "Website"}
//                             className="pl-20"
//                             defaultValue={field.value?.url || ""}
//                           />
//                           {errors.socialLinks?.url?.message && (
//                             <p className="text-sm text-red-600 dark:text-red-500">
//                               {errors.socialLinks?.url?.message}
//                             </p>
//                           )}
//                         </div>
//                       );
//                     }}
//                   ></Controller>
//                 </div> */}

//                 {(watch("socialLinks") ?? []).map((link, index) => (
//                   <div key={index} className="relative">
//                     <Controller
//                       control={control}
//                       name={`socialLinks.${index}.type`}
//                       render={({ field }) => (
//                         <div className="absolute">
//                           {" "}
//                           <Select
//                             value={field.value}
//                             onValueChange={(newValue) => {
//                               const newLinks = getValues("socialLinks") || [];
//                               newLinks[index].type = newValue as
//                                 | "website"
//                                 | "facebook"
//                                 | "twitter"
//                                 | "linkedin"
//                                 | "instagram"
//                                 | "youtube";
//                               setValue("socialLinks", newLinks);
//                             }}
//                           >
//                             <SelectTrigger aria-label="Social media">
//                               <SelectValue
//                                 placeholder={
//                                   socialMediaOptions.find(
//                                     (option) => option.value === field.value
//                                   )?.icon || socialMediaOptions[0].icon
//                                 }
//                               />
//                             </SelectTrigger>
//                             <SelectContent>
//                               <SelectGroup>
//                                 {socialMediaOptions
//                                   .filter(
//                                     (option) =>
//                                       !(watch("socialLinks") ?? []).some(
//                                         (link, linkIndex) =>
//                                           linkIndex !== index &&
//                                           link.type === option.value
//                                       )
//                                   )
//                                   .map((option) => (
//                                     <SelectItem
//                                       key={option.value}
//                                       value={option.value}
//                                     >
//                                       {option.icon}
//                                     </SelectItem>
//                                   ))}
//                               </SelectGroup>
//                             </SelectContent>
//                           </Select>
//                         </div>
//                       )}
//                     />
//                     <Controller
//                       control={control}
//                       name={`socialLinks.${index}.url`}
//                       render={({ field }) => (
//                         <Input
//                           {...field}
//                           type="text"
//                           placeholder="URL"
//                           className="pl-20"
//                         />
//                       )}
//                     />
//                     {errors.socialLinks && errors.socialLinks[index]?.url && (
//                       <p className="text-sm text-red-600 dark:text-red-500">
//                         {errors.socialLinks[index]?.url?.message}
//                       </p>
//                     )}
//                   </div>
//                 ))}
//                 <Button
//                   variant="ghost"
//                   className="px-0 py-0 text-primary hover:bg-transparent"
//                   onClick={(event) => {
//                     event.preventDefault();
//                     addNewSocialLink();
//                   }}
//                 >
//                   <Plus size={24} className="pr-2" />
//                   Add link
//                 </Button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//       <div className="flex w-full p-6 py-4 pb-6 border rounded-lg rounded-t-none ">
//         <div className="flex justify-start gap-2 mx-auto">
//           <Button
//             variant="outline"
//             className="w-[100px]"
//             disabled
//             type="button"
//           >
//             Back
//           </Button>{" "}
//           <Button type="submit" className="w-[100px]">
//             Next
//           </Button>
//         </div>
//       </div>
//     </form>
//   );
// };

// export default CommunityDetailsForm;
