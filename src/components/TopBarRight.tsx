import { useCallback, useEffect, useState } from "react";

const TopBarRight = () => {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    const html = document.documentElement;
    const current = html.getAttribute("data-bs-theme");
    if (current === "dark" || current === "light") {
      setTheme(current);
    }
  }, []);

  const handleToggleTheme = useCallback(() => {
    const html = document.documentElement;
    const current =
      html.getAttribute("data-bs-theme") === "dark" ? "dark" : "light";
    const next: "light" | "dark" = current === "light" ? "dark" : "light";

    html.setAttribute("data-bs-theme", next);
    setTheme(next);

    try {
      const raw = sessionStorage.getItem("__HYPER_CONFIG__");
      if (raw) {
        const cfg = JSON.parse(raw);
        cfg.theme = next;
        sessionStorage.setItem("__HYPER_CONFIG__", JSON.stringify(cfg));
      }
    } catch {
      // ignore
    }
  }, []);

  return (
    <ul className="topbar-menu d-flex align-items-center gap-3">
      {/* Search Dropdown for Mobile */}
      <li className="dropdown d-lg-none">
        <a
          className="nav-link dropdown-toggle arrow-none"
          data-bs-toggle="dropdown"
          href="#"
          role="button"
          aria-haspopup="false"
          aria-expanded="false"
        >
          <i className="ri-search-line font-22"></i>
        </a>
        <div className="dropdown-menu dropdown-menu-animated dropdown-lg p-0">
          <form className="p-3">
            <input
              type="search"
              className="form-control"
              placeholder="Search ..."
              aria-label="Recipient's username"
            />
          </form>
        </div>
      </li>

      {/* Language Dropdown */}
      <li className="dropdown">
        <a
          className="nav-link dropdown-toggle arrow-none"
          data-bs-toggle="dropdown"
          href="#"
          role="button"
          aria-haspopup="false"
          aria-expanded="false"
        >
          <img
            src="/assets/images/flags/us.jpg"
            alt="user-image"
            className="me-0 me-sm-1"
            height="12"
          />
          <span className="align-middle d-none d-lg-inline-block">English</span>{" "}
          <i className="mdi mdi-chevron-down d-none d-sm-inline-block align-middle"></i>
        </a>
        <div className="dropdown-menu dropdown-menu-end dropdown-menu-animated">
          {["germany", "italy", "spain", "russia"].map((country) => (
            <a key={country} href="#" className="dropdown-item">
              <img
                src={`assets/images/flags/${country}.jpg`}
                alt="user-image"
                className="me-1"
                height="12"
              />
              <span className="align-middle">
                {country.charAt(0).toUpperCase() + country.slice(1)}
              </span>
            </a>
          ))}
        </div>
      </li>

      {/* Notification Dropdown */}
      <li className="dropdown notification-list">
        <a
          className="nav-link dropdown-toggle arrow-none"
          data-bs-toggle="dropdown"
          href="#"
          role="button"
          aria-haspopup="false"
          aria-expanded="false"
        >
          <i className="ri-notification-3-line font-22"></i>
          <span className="noti-icon-badge"></span>
        </a>
        <div className="dropdown-menu dropdown-menu-end dropdown-menu-animated dropdown-lg py-0">
          <div className="p-2 border-top-0 border-start-0 border-end-0 border-dashed border">
            <div className="row align-items-center">
              <div className="col">
                <h6 className="m-0 font-16 fw-semibold">Notification</h6>
              </div>
              <div className="col-auto">
                <a href="#" className="text-dark text-decoration-underline">
                  <small>Clear All</small>
                </a>
              </div>
            </div>
          </div>
          <div className="px-2" style={{ maxHeight: "300px" }} data-simplebar>
            {/* Notification items would go here */}
            <div className="text-center py-3">
              <i className="mdi mdi-dots-circle mdi-spin text-muted h3 mt-0"></i>
            </div>
          </div>
          <a
            href="#"
            className="dropdown-item text-center text-primary notify-item border-top py-2"
          >
            View All
          </a>
        </div>
      </li>

      {/* Apps Dropdown */}
      <li className="dropdown d-none d-sm-inline-block">
        <a
          className="nav-link dropdown-toggle arrow-none"
          data-bs-toggle="dropdown"
          href="#"
          role="button"
          aria-haspopup="false"
          aria-expanded="false"
        >
          <i className="ri-apps-2-line font-22"></i>
        </a>
        <div className="dropdown-menu dropdown-menu-end dropdown-menu-animated dropdown-lg p-0">
          <div className="p-2">
            <div className="row g-2">
              {[
                "slack",
                "github",
                "dribbble",
                "bitbucket",
                "dropbox",
                "g-suite",
              ].map((app) => (
                <div key={app} className="col-4 text-center">
                  <a className="dropdown-icon-item d-block p-2" href="#">
                    <img
                      src={`/assets/images/brands/${app}.png`}
                      alt={app}
                      className="img-fluid"
                    />
                    <div className="mt-1">
                      {app.charAt(0).toUpperCase() + app.slice(1)}
                    </div>
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
      </li>

      {/* Settings Button */}
      <li className="d-none d-sm-inline-block">
        <a
          className="nav-link"
          data-bs-toggle="offcanvas"
          href="#theme-settings-offcanvas"
        >
          <i className="ri-settings-3-line font-22"></i>
        </a>
      </li>

      {/* Dark/Light Mode Toggle */}
      <li className="d-none d-sm-inline-block">
        <div
          className="nav-link"
          id="light-dark-mode"
          role="button"
          onClick={handleToggleTheme}
        >
          <i
            className={
              theme === "dark" ? "ri-sun-line font-22" : "ri-moon-line font-22"
            }
          ></i>
        </div>
      </li>

      {/* Fullscreen Toggle */}
      <li className="d-none d-md-inline-block">
        <a className="nav-link" href="#" data-toggle="fullscreen">
          <i className="ri-fullscreen-line font-22"></i>
        </a>
      </li>

      {/* User Profile Dropdown */}
      <li className="dropdown">
        <a
          className="nav-link dropdown-toggle arrow-none nav-user px-2"
          data-bs-toggle="dropdown"
          href="#"
          role="button"
          aria-haspopup="false"
          aria-expanded="false"
        >
          <span className="account-user-avatar">
            <img
              src="/assets/images/users/avatar-1.jpg"
              alt="user-image"
              width="32"
              className="rounded-circle"
            />
          </span>
          <span className="d-lg-flex flex-column gap-1 d-none">
            <h5 className="my-0">Dominic Keller</h5>
            <h6 className="my-0 fw-normal">Founder</h6>
          </span>
        </a>
        <div className="dropdown-menu dropdown-menu-end dropdown-menu-animated profile-dropdown">
          <div className="dropdown-header noti-title">
            <h6 className="text-overflow m-0">Welcome !</h6>
          </div>
          {[
            { icon: "user-smile-line", text: "My Account" },
            { icon: "user-settings-line", text: "Settings" },
            { icon: "lifebuoy-line", text: "Support" },
            { icon: "lock-line", text: "Lock Screen" },
            { icon: "login-circle-line", text: "Logout" },
          ].map((item, index) => (
            <a key={index} href="#" className="dropdown-item">
              <i className={`ri-${item.icon} font-16 me-1`}></i>
              <span>{item.text}</span>
            </a>
          ))}
        </div>
      </li>
    </ul>
  );
};

export default TopBarRight;
