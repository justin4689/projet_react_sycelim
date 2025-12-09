import SidebarHeader from './SidebarHeader';
import SidebarMenu from './SidebarMenu';

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
      id: 'sidebarTasks',
      title: 'Administration',
      icon: 'uil-building',
      children: [
        { label: 'Utilisateur', href: 'data-table.html' },
      ],
    },

      {
      id: 'sidebarsession',
      title: 'Sessions',
  icon: 'uil-clock',        
    },
    {
      id: 'sidebarparametre',
      title: 'Paramètres',
  icon: 'uil-setting',      // ou 'uil-cog' / 'uil-sliders-v-alt'
   
    },
  ];

  return (
    <div className="leftside-menu">
      <SidebarHeader />
      <SidebarMenu menuItems={menuItems} />
    </div>
  );
}