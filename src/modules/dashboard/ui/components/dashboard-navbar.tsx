"use client"

import { SidebarTrigger } from "@/components/ui/sidebar";
import DashboardCommand from "./dashboard-command";

const DashboardNavbar = () => {


  return (
    <nav className="flex px-4 gap-x-2 items-center py-3 border-b bg-background">
      <SidebarTrigger />
      <DashboardCommand />
    </nav>
  );
};

export default DashboardNavbar;
