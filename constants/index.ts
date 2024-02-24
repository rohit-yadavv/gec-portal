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
    imgURL: "/assets/icons/applied.svg",
    route: "/your-forms",
    label: "Your Forms",
  },  
  {
    imgURL: "/assets/icons/applied.svg",
    route: "/your-events",
    label: "Your Events",
  },  
]

export const userSideLinks: SidebarLink[] = [ 
  {
    imgURL: "/assets/icons/star.svg",
    route: "/saved",
    label: "Bookmarks",
  },
  {
    imgURL: "/assets/icons/applied.svg",
    route: "/applied-forms",
    label: "Applied Forms",
  }, 
  {
    imgURL: "/assets/icons/applied.svg",
    route: "/applied-events",
    label: "Applied Events",
  }, 

]

export const bothAdminUserLinks:SidebarLink[]=[

  {
    imgURL: "/assets/icons/allforms.svg",
    route: "/all-forms",
    label: "All Forms",
  }, 
  {
    imgURL: "/assets/icons/event.svg",
    route: "/all-events",
    label: "All Events",
  },


]

export const HomePageFilters = [
  { name: "Newest", value: "newest", desc:"Filter by Newest First" },
  { name: "UG", value: "ug", desc:"show only for ug" },
  { name: "PG", value: "pg", desc:"show only for pg" },
  { name: "GECs", value: "gec" , desc:"show only GECs"},
  { name: "VACs", value: "vac" ,desc:"show only VACs"},
];

export const EventPageFilters = [
  { name: "Upcoming", value: "upcoming", desc:"Show Only upcoming events" },
  { name: "Newest", value: "newest", desc:"sort by newest first" },
  { name: "oldest", value: "oldest", desc:"sort by oldest first" }, 
];