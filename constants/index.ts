import {
  CubeTransparentIcon,
  UserCircleIcon,
  BookOpenIcon,
  Cog6ToothIcon,
  InboxArrowDownIcon,
  LifebuoyIcon,
  PowerIcon,
} from "@heroicons/react/24/outline";
// nav list component
export const navListItems = [
  {
    label: "Novel",
    icon:   BookOpenIcon, 
    href: "/novel",
  },
];

// profile menu component
export const profileMenuItems = [
  {
    label: "My Profile",
    icon: UserCircleIcon,
  },
  {
    label: "Edit Profile",
    icon: Cog6ToothIcon,
  },
  {
    label: "Inbox",
    icon: InboxArrowDownIcon,
  },
  {
    label: "Help",
    icon: LifebuoyIcon,
  },
  {
    label: "Sign Out",
    icon: PowerIcon,
  },
];
