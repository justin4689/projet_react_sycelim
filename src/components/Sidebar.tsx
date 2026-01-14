import SidebarHeader from "./SidebarHeader";
import SidebarMenu from "./SidebarMenu";

interface MenuItem {
  id: string;
  title: string;
  icon: string;
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
      children: [{ label: "Utilisateurs", href: "/dashboard" }],
    },

    {
      id: "sidebarsession",
      title: "Sessions",
      icon: "uil-clock",
      children: [
        { label: "Liste des sessions", href: "sessions-list.html" },
        { label: "Créer une session", href: "sessions-create.html" },
        { label: "Historique des sessions", href: "sessions-history.html" },
      ],
    },
    {
      id: "sidebarparametre",
      title: "Paramètres",
      icon: "uil-setting", // ou 'uil-cog' / 'uil-sliders-v-alt'
      children: [
        { label: "Profil", href: "settings-profile.html" },
        { label: "Sécurité", href: "settings-security.html" },
        { label: "Configuration générale", href: "settings-general.html" },
      ],
    },
  ];

  return (
    <div className="leftside-menu">
      <SidebarHeader />
      <SidebarMenu menuItems={menuItems} />
    </div>
  );
}
