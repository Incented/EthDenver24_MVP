"use client";

import React, { useState, useEffect, ReactNode } from "react";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectLabel,
  SelectValue,
  SelectGroup,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Link, Facebook, Linkedin, Youtube, Instagram } from "lucide-react";
import { useForm } from "react-hook-form";

type socialMediaOption = {
  value: string;
  icon: ReactNode;
  label: string;
};

const socialMediaOptions: socialMediaOption[] = [
  {
    value: "website",
    icon: <Link size={16} className="stroke-foreground" />,
    label: "Website",
  },
  {
    value: "facebook",
    icon: <Facebook size={16} className="stroke-foreground" />,
    label: "Facebook",
  },
  {
    value: "linkedin",
    icon: <Linkedin size={16} className="stroke-foreground" />,
    label: "LinkedIn",
  },
  {
    value: "youtube",
    icon: <Youtube size={16} className="stroke-foreground" />,
    label: "YouTube",
  },
  {
    value: "instagram",
    icon: <Instagram size={16} className="stroke-foreground" />,
    label: "Instagram",
  },
];

const SelectInput = () => {
  const [selectedOption, setSelectedOption] = useState<socialMediaOption>(
    socialMediaOptions[0]
  );

  const { register, setValue, watch } = useForm();

  const selectedValue = watch(selectedOption.value);

  useEffect(() => {
    setValue(selectedOption.value, { shouldValidate: true });
  }, [selectedOption, setValue]);

  return (
    <div className="relative">
      <div className="absolute">
        <Select>
          <SelectTrigger aria-label="Social media" className="pr-2">
            <SelectValue placeholder={selectedOption.icon} />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {socialMediaOptions.map((option) => (
                <SelectItem
                  key={option.value}
                  value={option.value}
                  onSelect={() => setSelectedOption(option)}
                >
                  {option.icon}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <Input
        {...register(selectedOption.value)}
        type="text"
        placeholder={"website link"}
        className="pl-20"
      />
    </div>
  );
};

export default SelectInput;
