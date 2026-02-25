import SidebarHeader from "./SidebarHeader";
import SidebarMenu from "./SidebarMenu";

interface MenuItem {
  id: string;
  title: string;
  icon: string;
  href?: string;
  children?: {
    label: string;
    href: string;
  }[];
}

export default function Sidebar() {
  const menuItems: MenuItem[] = [
    {
      id: "sidebarTasks",
      title: "Administration",
      icon: "uil-building",
      children: [{ label: "Liste des Utilisateurs", href: "/dashboard" }],
    },

    {
      id: "sidebarsession",
      title: "Sessions",
      icon: "uil-clock",
      children: [{ label: "Liste des sessions", href: "/dashboard/sessions" }],
    },

     {
      id: "sidebarconfig",
      title: "Configuration",
      icon: "uil-cog",
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
