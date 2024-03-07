"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { formUrlQuery } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { Badge } from "../ui/badge"; 
import { HomeFiltersProps } from "@/types/components";

const HomeFilters = ({ filters }:HomeFiltersProps) => {
  const searchParams = useSearchParams();
  const [active, setActive] = useState("");
  const router = useRouter();

  const handleTypeClick = (item: string) => {
    if (active === item) {
      setActive("");
      const newUrl = formUrlQuery({
        params: searchParams.toString(),
        key: "filter",
        value: null,
      });
      router.push(newUrl, { scroll: false });
    } else {
      setActive(item);
      const newUrl = formUrlQuery({
        // we are passing search params as we want more than 1 type of filters so means query-string will add filter after existing not only this one
        params: searchParams.toString(),
        key: "filter",
        value: item.toLowerCase(),
      });
      router.push(newUrl, { scroll: false });
    }
  };

  return (
    <div className="mt-10 hidden flex-wrap gap-3 md:flex">
      {filters?.map((item) => (
        <TooltipProvider key={item.value}>
          <Tooltip>
            <TooltipTrigger>
              <Badge
                className={`px-6 py-3 text-sm font-normal capitalize shadow-none ${
                  active === item.value
                    ? "bg-primary-100 text-primary-500 hover:bg-primary-100  dark:bg-dark-200 dark:text-primary-500 dark:hover:bg-dark-200"
                    : "bg-light-800 text-light-500 hover:bg-primary-100 dark:bg-[#212734] dark:text-light-500 dark:hover:bg-dark-200"
                }`}
                onClick={() => handleTypeClick(item.value)}
              >
                {item.name}
              </Badge>
            </TooltipTrigger>
            <TooltipContent>
              <p>{item.desc}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      ))}
    </div>
  );
};

export default HomeFilters;
