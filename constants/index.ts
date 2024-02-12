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
    imgURL: "/assets/icons/star.svg",
    route: "/saved",
    label: "Bookmarks",
  },
  {
    imgURL: "/assets/icons/applied.svg",
    route: "/applied",
    label: "Applied",
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
  {
    imgURL: "/assets/icons/tag.svg",
    route: "/event",
    label: "All Events",
  }, 
  // {
  //   imgURL: "/assets/icons/question.svg",
  //   route: "/ask-question",
  //   label: "Ask a question",
  // },
];
export const BADGE_CRITERIA = {
  QUESTION_COUNT: {
    BRONZE: 10,
    SILVER: 50,
    GOLD: 100,
  },
  ANSWER_COUNT: {
    BRONZE: 10,
    SILVER: 50,
    GOLD: 100,
  },
  QUESTION_UPVOTES: {
    BRONZE: 10,
    SILVER: 50,
    GOLD: 100,
  },
  ANSWER_UPVOTES: {
    BRONZE: 10,
    SILVER: 50,
    GOLD: 100,
  },
  TOTAL_VIEWS: {
    BRONZE: 1000,
    SILVER: 10000,
    GOLD: 100000,
  },
};
