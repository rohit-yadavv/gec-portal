import { SidebarLink } from "@/types";
export const themes = [
  { value: "light", label: "Light", icon: "/assets/icons/sun.svg" },
  { value: "dark", label: "Dark", icon: "/assets/icons/moon.svg" },
  { value: "system", label: "System", icon: "/assets/icons/computer.svg" },
];

export const sidebarLinks: SidebarLink[] = [
  {
    imgURL: "/assets/icons/home.svg",
    route: "/",
    label: "Home", 
  },  
  {
    imgURL: "/assets/icons/tag.svg",
    route: "/gec",
    label: "All GECs",
  },
  {
    imgURL: "/assets/icons/tag.svg",
    route: "/vac",
    label: "All VACs",
  },
  // {
  //   imgURL: "/assets/icons/tag.svg",
  //   route: "/event",
  //   label: "All Events",
  // },  
];
 
export const userSideLinks: SidebarLink[] = [
  {
    imgURL: "/assets/icons/user.svg",
    route: "/details",
    label: "Your Details", 
  }, 
  {
    imgURL: "/assets/icons/star.svg",
    route: "/saved",
    label: "Bookmarks",
  },

]