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
  ];

  return (
    <div className="leftside-menu">
      <SidebarHeader />
      <SidebarMenu menuItems={menuItems} />
    </div>
  );
}