import SidebarHeader from "./SidebarHeader";
import SidebarMenu from "./SidebarMenu";
import type { MenuItemType } from "./MenuItem";

export default function Sidebar() {
  const menuItems: MenuItemType[] = [
    {
      id: "sidebarTasks",
      title: "Administration",
      icon: "uil-building",
      name: "user",
      type: "dynamic",
      children: [{ label: "Liste des Utilisateurs", href: "/dashboard/users" }],
    },

    {
      id: "sidebarsession",
      title: "Sessions",
      icon: "uil-clock",
      name: "sessions",
      type: "dynamic",
      children: [{ label: "Liste des sessions", href: "/dashboard/sessions" }],
    },

    {
      id: "sidebarconfig",
      title: "Configuration",
      icon: "uil-cog",
      name: "configurations",
      type: "static",
      href: "/dashboard/configurations",
    },
  ];

  return (
    <div className="leftside-menu">
      <SidebarHeader />
      <SidebarMenu menuItems={menuItems} />
    </div>
  );
}
