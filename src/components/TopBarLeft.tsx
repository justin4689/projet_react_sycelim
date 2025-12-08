const TopBarLeft = () => {
  const handleToggleSidebar = () => {
    const htmlEl = document.documentElement;
    const current = htmlEl.getAttribute("data-sidenav-size");
    if (current === "condensed") {
      htmlEl.removeAttribute("data-sidenav-size");
    } else {
      htmlEl.setAttribute("data-sidenav-size", "condensed");
    }
  };

  return (
    <div className="d-flex align-items-center gap-lg-2 gap-1">
      <div className="logo-topbar">
        {/* Logo light */}
        <a href="index.html" className="logo-light">
          <span className="logo-lg">
            <img src="/assets/images/logo.png" alt="logo" />
          </span>
          <span className="logo-sm">
            <img src="/assets/images/logo-sm.png" alt="small logo" />
          </span>
        </a>

        {/* Logo Dark */}
        <a href="index.html" className="logo-dark">
          <span className="logo-lg">
            <img src="/assets/images/logo-dark.png" alt="dark logo" />
          </span>
          <span className="logo-sm">
            <img src="/assets/images/logo-dark-sm.png" alt="small logo" />
          </span>
        </a>
      </div>

      {/* Sidebar Menu Toggle Button */}
      <button className="button-toggle-menu" onClick={handleToggleSidebar}>
        <i className="ri-menu-5-line"></i>
      </button>

      {/* Horizontal Menu Toggle Button */}
      <button className="navbar-toggle" data-bs-toggle="collapse" data-bs-target="#topnav-menu-content">
        <div className="lines">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </button>

      <h3>Gestion de facture</h3>
    </div>
  );
};

export default TopBarLeft;
