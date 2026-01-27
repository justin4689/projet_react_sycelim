import React from "react";
import { Link } from "react-router-dom";

export interface MenuItemType {
  id: string;
  title: string;
  icon: string;
  children?: {
    label: string;
    href: string;
  }[];
}

interface MenuItemProps {
  item: MenuItemType;
}

const MenuItem: React.FC<MenuItemProps> = ({ item }) => {
  return (
    <li className="side-nav-item">
      <a
        data-bs-toggle="collapse"
        href={`#${item.id}`}
        aria-expanded="false"
        aria-controls={item.id}
        className="side-nav-link"
      >
        <i className={item.icon}></i>
        <span>{item.title}</span>
        {item.children && <span className="menu-arrow"></span>}
      </a>
      {item.children && (
        <div className="collapse" id={item.id}>
          <ul className="side-nav-second-level">
            {item.children.map((child, index) => (
              <li key={index}>
                <Link to={child.href}>{child.label}</Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </li>
  );
};

export default MenuItem;
