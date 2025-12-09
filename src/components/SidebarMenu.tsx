import React from 'react';
import MenuItem from './MenuItem';
import type { MenuItemType } from './MenuItem';
    
interface SidebarMenuProps {
  menuItems: MenuItemType[];
}

const SidebarMenu: React.FC<SidebarMenuProps> = ({ menuItems }) => {
  return (
    <div className="h-100" id="leftside-menu-container" data-simplebar>
      <ul className="side-nav">
        <li className="side-nav-title">Menu Navigation</li>
        {menuItems.map((item) => (
          <MenuItem key={item.id} item={item} />
        ))}
      </ul>
      <div className="clearfix"></div>
    </div>
  );
};

export default SidebarMenu;
