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
    // {
    //   id: 'sidebarProjects',
    //   title: 'Formulaires',
    //   icon: 'uil-document-layout-center',
    //   children: [
    //     { label: 'Une colonne', href: 'index.html' },
    //     { label: 'Deux colonnes', href: 'two-column.html' },
    //     { label: 'Trois colonnes', href: 'three-column.html' },
    //   ],
    // },
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
      {/* Brand Logo Light */}
      <a href="index.html" className="logo logo-light">
        <span className="logo-lg">
          <img src="assets/images/logo.png" alt="logo"/>
        </span>
        <span className="logo-sm">
          <img src="assets/images/logo-sm.png" alt="small logo"/>
        </span>
      </a>

      {/* Brand Logo Dark */}
      <a href="index.html" className="logo logo-dark">
        <span className="logo-lg">
          <img src="assets/images/logo-dark.png" alt="dark logo" />
        </span>
        <span className="logo-sm">
          <img src="assets/images/logo-dark-sm.png" alt="small logo" />
        </span>
      </a>

      {/* Sidebar Hover Menu Toggle Button */}
      <div className="button-sm-hover" data-bs-toggle="tooltip" data-bs-placement="right" title="Show Full Sidebar">
        <i className="ri-checkbox-blank-circle-line align-middle"></i>
      </div>

      {/* Full Sidebar Menu Close Button */}
      <div className="button-close-fullsidebar">
        <i className="ri-close-fill align-middle"></i>
      </div>

      {/* Sidebar */}
      <div className="h-100" id="leftside-menu-container" data-simplebar>
        {/* Leftbar User */}
        <div className="leftbar-user">
          <a href="pages-profile.html">
            <img src="assets/images/users/avatar-1.jpg" alt="user-image" height="42" className="rounded-circle shadow-sm" />
            <span className="leftbar-user-name mt-2">Dominic Keller</span>
          </a>
        </div>

        {/* Sidemenu */}
        <ul className="side-nav">
          <li className="side-nav-title">Navigation</li>

          {menuItems.map((item) => (
            <li className="side-nav-item" key={item.id}>
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
              {item.children && (
                <div className="collapse" id={item.id}>
                  <ul className="side-nav-second-level">
                    {item.children.map((child, index) => (
                      <li key={index}>
                        <a href={child.href}>{child.label}</a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </li>
          ))}
        </ul>

        <div className="clearfix"></div>
      </div>
    </div>
  );
}