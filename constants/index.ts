import { FooterRoutesLink, SidebarLink, TeamDetail } from "@/types";

export const themes = [
  { value: "light", label: "Light", icon: "/assets/icons/sun.svg" },
  { value: "dark", label: "Dark", icon: "/assets/icons/moon.svg" },
  { value: "system", label: "System", icon: "/assets/icons/computer.svg" },
];

export const registerUser: SidebarLink[] = [
  {
    imgURL: "/assets/icons/sign-up.svg",
    route: "/register-users",
    label: "Register Users",
  }
]
export const teacherSideLinks: SidebarLink[] = [
  {
    imgURL: "/assets/icons/your-forms.svg",
    route: "/my-forms",
    label: "My GECs",
  },
  {
    imgURL: "/assets/icons/your-event.svg",
    route: "/my-events",
    label: "My Events",
  },
]

export const adminSideLinks: SidebarLink[] = [
  {
    imgURL: "/assets/icons/sign-up.svg",
    route: "/register-users",
    label: "Register Users",
  },
]

export const userSideLinks: SidebarLink[] = [
  {
    imgURL: "/assets/icons/applied-forms.svg",
    route: "/applied-forms",
    label: "Applied Forms",
  },
  {
    imgURL: "/assets/icons/applied-events.svg",
    route: "/applied-events",
    label: "Applied Events",
  },

]

export const bothAdminUserLinks: SidebarLink[] = [

  {
    imgURL: "/assets/icons/all-forms.svg",
    route: "/all-forms",
    label: "All GECs",
  },
  {
    imgURL: "/assets/icons/all-events.svg",
    route: "/all-events",
    label: "All Events",
  },
]

export const savedLinks: SidebarLink[] = [
  {
    imgURL: "/assets/icons/form-saved.svg",
    route: "/saved-forms",
    label: "Saved GECs",
  },
  {
    imgURL: "/assets/icons/event.svg",
    route: "/saved-events",
    label: "Saved Events",
  },
]

export const HomePageFilters = [
  { name: "All", value: "all", desc: "Show All Forms" },
  { name: "Newest", value: "newest", desc: "Filter by Newest First" },
  { name: "UG", value: "ug", desc: "show only for ug" },
  { name: "PG", value: "pg", desc: "show only for pg" },
  { name: "GECs", value: "gec", desc: "show only GECs" },
  { name: "VACs", value: "vac", desc: "show only VACs" },
];

export const EventPageFilters = [
  { name: "Upcoming", value: "upcoming", desc: "Show Only upcoming events" },
  { name: "Newest", value: "newest", desc: "sort by newest first" },
  { name: "oldest", value: "oldest", desc: "sort by oldest first" },
];

export const footerRoutesLinks: FooterRoutesLink[] = [
  { route: "/all-events", label: "All Events" },
  { route: "/saved-forms", label: "Saved GECs" },
  { route: "/saved-events", label: "Saved Events" },
  { route: "/team", label: "The Team" },
]

export const MentorDetails: TeamDetail[] = [
  { imgUrl: "/assets/images/team/anant.png", name: "Anant Rajee Bara", role: "Mentor", designation:"Asst. Professor" },
]

export const TeamDetails: TeamDetail[] = [
  { imgUrl: "/assets/images/team/rohit.png", name: "Rohit Yadav", role: "Developer", designation:"Student" },
  // { imgUrl: "/assets/images/team/navin.png", name: "Navin", role: "Frontend" },
  // { imgUrl: "/assets/images/team/swati.jpg", name: "Swati", role: "Frontend" },
  // { imgUrl: "/assets/images/team/harshit.png", name: "Harshit", role: "Backend" },
  // { imgUrl: "/assets/images/team/raja.jpg", name: "Raja", role: "UI/UX" },
  // { imgUrl: "/assets/images/team/kirti.jpg", name: "Kirti", role: "UI/UX" },
]
