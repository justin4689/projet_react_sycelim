import React from "react";
import { Link } from "react-router-dom";

export interface MenuItemType {
  id: string;
  title: string;
  icon: string;
  name?: string;
  href?: string;
  type?: string;
  children?: {
    label: string;
    href: string;
  }[];
}

interface MenuItemProps {
  item: MenuItemType;
}

const MenuItem: React.FC<MenuItemProps> = ({ item }) => {
  const resolvedHref =
    item.href ??
    (item.type === "dynamic" && item.name ? `/dashboard/${item.name}` : "#");

  return (
    <li className="side-nav-item">
      {item.children ? (
        <a
          data-bs-toggle="collapse"
          href={`#${item.id}`}
          aria-expanded="false"
          aria-controls={item.id}
          className="side-nav-link"
        >
          <i className={item.icon}></i>
          <span>{item.title}</span>
          <span className="menu-arrow"></span>
        </a>
      ) : (
        <Link to={resolvedHref} className="side-nav-link">
          <i className={item.icon}></i>
          <span>{item.title}</span>
        </Link>
      )}
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
