import { SidebarLink } from "@/types";

export const themes = [
  { value: "light", label: "Light", icon: "/assets/icons/sun.svg" },
  { value: "dark", label: "Dark", icon: "/assets/icons/moon.svg" },
  { value: "system", label: "System", icon: "/assets/icons/computer.svg" },
];

export const adminSideLinks: SidebarLink[] = [ 
  {
    imgURL: "/assets/icons/star.svg",
    route: "/saved",
    label: "Bookmarks",
  },
  {
    imgURL: "/assets/icons/allforms.svg",
    route: "/all-forms",
    label: "All Forms",
  }, 
  {
    imgURL: "/assets/icons/applied.svg",
    route: "/forms",
    label: "Your Forms",
  }, 

]

export const userSideLinks: SidebarLink[] = [
  {
    imgURL: "/assets/icons/star.svg",
    route: "/saved",
    label: "Bookmarks",
  },
  {
    imgURL: "/assets/icons/allforms.svg",
    route: "/all-forms",
    label: "All Forms",
  }, 
  {
    imgURL: "/assets/icons/applied.svg",
    route: "/applied",
    label: "Applied",
  },

]

export const HomePageFilters = [
  { name: "Newest", value: "newest", desc:"Filter by Newest First" },
  { name: "UG", value: "ug", desc:"show only for ug" },
  { name: "PG", value: "pg", desc:"show only for pg" },
  { name: "GECs", value: "gec" , desc:"show only GECs"},
  { name: "VACs", value: "vac" ,desc:"show only VACs"},
];