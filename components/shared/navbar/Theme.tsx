"use client";
import { useTheme } from "@/context/ThemeProvider";
import Image from "next/image";
import { themes } from "@/constants";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Theme = () => {
  const { mode, setMode } = useTheme();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        {mode === "light" ? (
          <Image
            className="active-theme cursor-pointer"
            src="/assets/icons/sun.svg"
            alt="sun"
            width={25}
            height={25}
          />
        ) : mode === "dark" ? (
          <Image
            className="active-theme cursor-pointer"
            src="/assets/icons/moon.svg"
            alt="moon"
            width={20}
            height={20}
          />
        ) : (
          <Image
            className="active-theme cursor-pointer"
            src="/assets/icons/computer.svg"
            alt="moon"
            width={25}
            height={25}
          />
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Theme</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {themes.map((item) => (
          <DropdownMenuItem
            className="flex cursor-pointer items-center gap-4 px-2.5 py-2 focus:bg-light-800 dark:focus:bg-[#79767638]"
            key={item.value}
            onClick={() => {
              setMode(item.value);
              if (item.value !== "system") {
                localStorage.theme = item.value;
              } else {
                localStorage.removeItem("theme");
              }
            }}
          >
            <Image
              src={item.icon}
              alt={item.value}
              width={16}
              height={16}
              className={`${mode === item.value && "active-theme"}`}
            />
            <p
              className={` text-light-500 ${
                mode === item.value
                  ? "text-primary-500"
                  : "text-dark-100 dark:text-light-900"
              }`}
            >
              {item.label}
            </p>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
export default Theme;
