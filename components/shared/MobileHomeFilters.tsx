"use client";

import * as React from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { formUrlQuery } from "@/lib/utils";
import { useSearchParams, useRouter } from "next/navigation";
import { HomeFiltersProps } from "@/types/components";

const MobileHomeFilters = ({ filters }: HomeFiltersProps) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const paramFilter = searchParams.get("filter");

  const handleUpdateParams = (value: string) => {
    const newUrl = formUrlQuery({
      params: searchParams.toString(),
      key: "filter",
      value,
    });
    router.push(newUrl, { scroll: false });
  };

  return (         
    <div className='card-wrapper relative hidden max-md:flex'>
      <Select
        onValueChange={handleUpdateParams}
        defaultValue={paramFilter || undefined}
      >
        <SelectTrigger 
          className="min-h-[56px] border bg-light-900 px-5 py-2.5 text-dark-500 dark:bg-dark-100 dark:text-light-900 sm:min-w-[170px]"
        >
          <div className="line-clamp-1 flex-1 text-left">
            <SelectValue placeholder="Select a Filter" />
          </div>
        </SelectTrigger>
        <SelectContent className=" border-none bg-light-900 dark:bg-dark-300">
          <SelectGroup>
            {filters.map((item) => (
              <SelectItem key={item.value} value={item.value} className="cursor-pointer focus:bg-light-800 dark:focus:bg-dark-400">
                {item.name}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};
export default MobileHomeFilters;
