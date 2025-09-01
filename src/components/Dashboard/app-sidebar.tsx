import * as React from "react";
import {
  IconHelp,
  IconLayoutDashboard,
  IconSearch,
  IconSettings,
  IconTimeline,
  IconUserCircle,
} from "@tabler/icons-react";

import { NavMain } from "@/components/Dashboard/nav-main";
import { NavSecondary } from "@/components/Dashboard/nav-secondary";
import { NavUser } from "@/components/Dashboard/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

import Logo from "@/assets/logo_icon.png";

const data = {
  navMain: [
    {
      title: "Dashboard",
      url: "/",
      icon: IconLayoutDashboard,
    },
    {
      title: "Customer",
      url: "/customer",
      icon: IconUserCircle,
    },
    {
      title: "Transaction",
      url: "/transaction",
      icon: IconTimeline,
    },
  ],

  navSecondary: [
    {
      title: "Settings",
      url: "#",
      icon: IconSettings,
    },
    {
      title: "Get Help",
      url: "#",
      icon: IconHelp,
    },
    {
      title: "Search",
      url: "#",
      icon: IconSearch,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <div className="flex gap-3 items-center mb-2">
              <img src={Logo} alt="Logo" className="size-6" color="#fffs" />
              <span className="text-xl font-semibold">Company.</span>
            </div>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>

      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  );
}
