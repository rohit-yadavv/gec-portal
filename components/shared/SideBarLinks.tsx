import { sidebarLinks } from "@/constants";
import { TbSmartHome } from "react-icons/tb";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";

const SideBarLinks = () => {
  const pathName = usePathname();

  return (
    <div className="flex flex-1 flex-col gap-6">
      {sidebarLinks.map((item) => {
        const isActive =
          (pathName.includes(item.route) && item.route.length > 1) ||
          pathName === item.route;

        return ( 
          <Link
            key={item.route}
            href={item.route}
            className={`${
              isActive
                ? "primary-gradient rounded-lg text-light-900"
                : "text-dark300_light900"
            } flex items-center justify-start gap-4 bg-transparent p-4`}
          >
            <Image
              src={item.imgURL}
              alt={item.label}
              width={20}
              height={20}
              className={`${isActive ? "" : "invert dark:invert-0"}`}
            />
            <p
              className={`${
                isActive ? "text-[18px] font-bold leading-[140%]" : "text-[18px] font-medium leading-[25.2px]"
              } max-lg:hidden `}
            >
              {item.label}
            </p>
          </Link>
        );
      })}
    </div>
  );
};

export default SideBarLinks;
