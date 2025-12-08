import { Link } from 'react-router-dom';

const SidebarHeader = () => {
  return (
    <>
      {/* Brand Logo Light */}
      <Link to="/" className="logo logo-light">
        <span className="logo-lg">
          <img src="/assets/images/logo.png" alt="logo"/>
        </span>
        <span className="logo-sm">
          <img src="/assets/images/logo-sm.png" alt="small logo"/>
        </span>
      </Link>

      {/* Brand Logo Dark */}
      <Link to="/" className="logo logo-dark">
        <span className="logo-lg">
          <img src="/assets/images/logo-dark.png" alt="dark logo" />
        </span>
        <span className="logo-sm">
          <img src="/assets/images/logo-dark-sm.png" alt="small logo" />
        </span>
      </Link>

      {/* Sidebar Hover Menu Toggle Button */}
      <div className="button-sm-hover" data-bs-toggle="tooltip" data-bs-placement="right" title="Show Full Sidebar">
        <i className="ri-checkbox-blank-circle-line align-middle"></i>
      </div>

      {/* Full Sidebar Menu Close Button */}
      <div className="button-close-fullsidebar">
        <i className="ri-close-fill align-middle"></i>
      </div>

      {/* Leftbar User */}
      <div className="leftbar-user">
        <Link to="pages-profile.html">
          <img src="/assets/images/users/avatar-1.jpg" alt="user-image" height="42" className="rounded-circle shadow-sm" />
          <span className="leftbar-user-name mt-2">Dominic Keller</span>
        </Link>
      </div>
    </>
  );
};

export default SidebarHeader;
