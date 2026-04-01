import {
  BarChart3,
  Bike,
  ClipboardList,
  Hammer,
  House,
  LayoutDashboard,
  Settings,
  Smartphone,
  Users,
  Wallet,
} from "lucide-react";
import { UserRole } from "@/generated/prisma";

export type NavigationItem = {
  key: string;
  fallback: string;
  href: string;
  icon: typeof LayoutDashboard;
  adminOnly?: boolean;
};

export const appNavigation: NavigationItem[] = [
  {
    key: "dashboard",
    fallback: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    key: "team",
    fallback: "Team",
    href: "/team",
    icon: Users,
    adminOnly: true,
  },
  {
    key: "bicycles",
    fallback: "Bicycles",
    href: "/bicycles/repairs",
    icon: Bike,
  },
  {
    key: "rentals",
    fallback: "Rentals",
    href: "/bicycles/rentals",
    icon: ClipboardList,
  },
  {
    key: "electronics",
    fallback: "Electronics",
    href: "/electronics/repairs",
    icon: Smartphone,
  },
  {
    key: "carpentry",
    fallback: "Carpentry",
    href: "/carpentry/projects",
    icon: Hammer,
  },
  {
    key: "houseProjects",
    fallback: "House Projects",
    href: "/house-projects",
    icon: House,
  },
  {
    key: "finance",
    fallback: "Finance",
    href: "/finance",
    icon: Wallet,
  },
  {
    key: "reports",
    fallback: "Reports",
    href: "/reports",
    icon: BarChart3,
  },
  {
    key: "settings",
    fallback: "Settings",
    href: "/settings",
    icon: Settings,
  },
];

export function getNavigationForRole(role?: UserRole | null) {
  return appNavigation.filter((item) => !item.adminOnly || role === UserRole.ADMIN);
}
