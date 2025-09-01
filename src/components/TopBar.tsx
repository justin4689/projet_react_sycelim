export default function TopBar() {
  return (
    <div className="navbar-custom">
      <div className="topbar container-fluid">
        <div className="d-flex align-items-center gap-lg-2 gap-1">

          <div className="logo-topbar">
            {/* Logo light */}
            <a href="index.html" className="logo-light">
              <span className="logo-lg">
                <img src="assets/images/logo.png" alt="logo" />
              </span>
              <span className="logo-sm">
                <img src="assets/images/logo-sm.png" alt="small logo" />
              </span>
            </a>

            {/* Logo Dark */}
            <a href="index.html" className="logo-dark">
              <span className="logo-lg">
                <img src="assets/images/logo-dark.png" alt="dark logo" />
              </span>
              <span className="logo-sm">
                <img src="assets/images/logo-dark-sm.png" alt="small logo" />
              </span>
            </a>
          </div>

          {/* Sidebar Menu Toggle Button */}
          <button className="button-toggle-menu">
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

        <ul className="topbar-menu d-flex align-items-center gap-3">
          <li className="dropdown d-lg-none">
            <a className="nav-link dropdown-toggle arrow-none" data-bs-toggle="dropdown" href="#" role="button" aria-haspopup="false" aria-expanded="false">
              <i className="ri-search-line font-22"></i>
            </a>
            <div className="dropdown-menu dropdown-menu-animated dropdown-lg p-0">
              <form className="p-3">
                <input type="search" className="form-control" placeholder="Search ..." aria-label="Recipient's username" />
              </form>
            </div>
          </li>

          <li className="dropdown">
            <a className="nav-link dropdown-toggle arrow-none" data-bs-toggle="dropdown" href="#" role="button" aria-haspopup="false" aria-expanded="false">
              <img src="assets/images/flags/us.jpg" alt="user-image" className="me-0 me-sm-1" height="12" />
              <span className="align-middle d-none d-lg-inline-block">English</span> <i className="mdi mdi-chevron-down d-none d-sm-inline-block align-middle"></i>
            </a>
            <div className="dropdown-menu dropdown-menu-end dropdown-menu-animated">
              <a href="javascript:void(0);" className="dropdown-item">
                <img src="assets/images/flags/germany.jpg" alt="user-image" className="me-1" height="12" /> <span className="align-middle">German</span>
              </a>
              <a href="javascript:void(0);" className="dropdown-item">
                <img src="assets/images/flags/italy.jpg" alt="user-image" className="me-1" height="12" /> <span className="align-middle">Italian</span>
              </a>
              <a href="javascript:void(0);" className="dropdown-item">
                <img src="assets/images/flags/spain.jpg" alt="user-image" className="me-1" height="12" /> <span className="align-middle">Spanish</span>
              </a>
              <a href="javascript:void(0);" className="dropdown-item">
                <img src="assets/images/flags/russia.jpg" alt="user-image" className="me-1" height="12" /> <span className="align-middle">Russian</span>
              </a>
            </div>
          </li>

          <li className="dropdown notification-list">
            <a className="nav-link dropdown-toggle arrow-none" data-bs-toggle="dropdown" href="#" role="button" aria-haspopup="false" aria-expanded="false">
              <i className="ri-notification-3-line font-22"></i>
              <span className="noti-icon-badge"></span>
            </a>
            <div className="dropdown-menu dropdown-menu-end dropdown-menu-animated dropdown-lg py-0">
              <div className="p-2 border-top-0 border-start-0 border-end-0 border-dashed border">
                <div className="row align-items-center">
                  <div className="col">
                    <h6 className="m-0 font-16 fw-semibold"> Notification</h6>
                  </div>
                  <div className="col-auto">
                    <a href="javascript: void(0);" className="text-dark text-decoration-underline">
                      <small>Clear All</small>
                    </a>
                  </div>
                </div>
              </div>

              <div className="px-2" style={{ maxHeight: '300px' }} data-simplebar>
                <h5 className="text-muted font-12 text-uppercase mt-2">Today</h5>

                <a href="javascript:void(0);" className="dropdown-item p-0 notify-item card unread-noti shadow-none mb-1">
                  <div className="card-body">
                    <span className="float-end noti-close-btn text-muted"><i className="mdi mdi-close"></i></span>
                    <div className="d-flex align-items-center">
                      <div className="flex-shrink-0">
                        <div className="notify-icon bg-primary">
                          <i className="ri-chat-quote-line font-18"></i>
                        </div>
                      </div>
                      <div className="flex-grow-1 text-truncate ms-2">
                        <h5 className="noti-item-title fw-semibold font-14">Datacorp <small className="fw-normal text-muted ms-1">1 min ago</small></h5>
                        <small className="noti-item-subtitle text-muted">Caleb Flakelar commented on Admin</small>
                      </div>
                    </div>
                  </div>
                </a>

                <a href="javascript:void(0);" className="dropdown-item p-0 notify-item card read-noti shadow-none mb-2">
                  <div className="card-body">
                    <span className="float-end noti-close-btn text-muted"><i className="mdi mdi-close"></i></span>
                    <div className="d-flex align-items-center">
                      <div className="flex-shrink-0">
                        <div className="notify-icon bg-info">
                          <i className="ri-user-add-line font-18"></i>
                        </div>
                      </div>
                      <div className="flex-grow-1 text-truncate ms-2">
                        <h5 className="noti-item-title fw-semibold font-14">Admin <small className="fw-normal text-muted ms-1">1 hours ago</small></h5>
                        <small className="noti-item-subtitle text-muted">New user registered</small>
                      </div>
                    </div>
                  </div>
                </a>

                <h5 className="text-muted font-12 text-uppercase mt-0">Yesterday</h5>

                <a href="javascript:void(0);" className="dropdown-item p-0 notify-item card read-noti shadow-none mb-2">
                  <div className="card-body">
                    <span className="float-end noti-close-btn text-muted"><i className="mdi mdi-close"></i></span>
                    <div className="d-flex align-items-center">
                      <div className="flex-shrink-0">
                        <div className="notify-icon">
                          <img src="assets/images/users/avatar-2.jpg" className="img-fluid rounded-circle" alt="" />
                        </div>
                      </div>
                      <div className="flex-grow-1 text-truncate ms-2">
                        <h5 className="noti-item-title fw-semibold font-14">Cristina Pride <small className="fw-normal text-muted ms-1">1 day ago</small></h5>
                        <small className="noti-item-subtitle text-muted">Hi, How are you? What about our next meeting</small>
                      </div>
                    </div>
                  </div>
                </a>

                <h5 className="text-muted font-12 text-uppercase mt-0">02 Jun 2025</h5>

                <a href="javascript:void(0);" className="dropdown-item p-0 notify-item card read-noti shadow-none mb-1">
                  <div className="card-body">
                    <span className="float-end noti-close-btn text-muted"><i className="mdi mdi-close"></i></span>
                    <div className="d-flex align-items-center">
                      <div className="flex-shrink-0">
                        <div className="notify-icon bg-primary">
                          <i className="ri-chat-voice-line font-18"></i>
                        </div>
                      </div>
                      <div className="flex-grow-1 text-truncate ms-2">
                        <h5 className="noti-item-title fw-semibold font-14">Datacorp</h5>
                        <small className="noti-item-subtitle text-muted">Caleb Flakelar commented on Admin</small>
                      </div>
                    </div>
                  </div>
                </a>

                <a href="javascript:void(0);" className="dropdown-item p-0 notify-item card read-noti shadow-none mb-2">
                  <div className="card-body">
                    <span className="float-end noti-close-btn text-muted"><i className="mdi mdi-close"></i></span>
                    <div className="d-flex align-items-center">
                      <div className="flex-shrink-0">
                        <div className="notify-icon">
                          <img src="assets/images/users/avatar-4.jpg" className="img-fluid rounded-circle" alt="" />
                        </div>
                      </div>
                      <div className="flex-grow-1 text-truncate ms-2">
                        <h5 className="noti-item-title fw-semibold font-14">Karen Robinson</h5>
                        <small className="noti-item-subtitle text-muted">Wow ! this admin looks good and awesome design</small>
                      </div>
                    </div>
                  </div>
                </a>

                <div className="text-center">
                  <i className="mdi mdi-dots-circle mdi-spin text-muted h3 mt-0"></i>
                </div>
              </div>

              <a href="javascript:void(0);" className="dropdown-item text-center text-primary notify-item border-top py-2">
                View All
              </a>
            </div>
          </li>

          <li className="dropdown d-none d-sm-inline-block">
            <a className="nav-link dropdown-toggle arrow-none" data-bs-toggle="dropdown" href="#" role="button" aria-haspopup="false" aria-expanded="false">
              <i className="ri-apps-2-line font-22"></i>
            </a>
            <div className="dropdown-menu dropdown-menu-end dropdown-menu-animated dropdown-lg p-0">
              <div className="p-2">
                <div className="row g-0">
                  <div className="col">
                    <a className="dropdown-icon-item" href="#">
                      <img src="assets/images/brands/slack.png" alt="slack" />
                      <span>Slack</span>
                    </a>
                  </div>
                  <div className="col">
                    <a className="dropdown-icon-item" href="#">
                      <img src="assets/images/brands/github.png" alt="Github" />
                      <span>GitHub</span>
                    </a>
                  </div>
                  <div className="col">
                    <a className="dropdown-icon-item" href="#">
                      <img src="assets/images/brands/dribbble.png" alt="dribbble" />
                      <span>Dribbble</span>
                    </a>
                  </div>
                </div>

                <div className="row g-0">
                  <div className="col">
                    <a className="dropdown-icon-item" href="#">
                      <img src="assets/images/brands/bitbucket.png" alt="bitbucket" />
                      <span>Bitbucket</span>
                    </a>
                  </div>
                  <div className="col">
                    <a className="dropdown-icon-item" href="#">
                      <img src="assets/images/brands/dropbox.png" alt="dropbox" />
                      <span>Dropbox</span>
                    </a>
                  </div>
                  <div className="col">
                    <a className="dropdown-icon-item" href="#">
                      <img src="assets/images/brands/g-suite.png" alt="G Suite" />
                      <span>G Suite</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </li>

          <li className="d-none d-sm-inline-block">
            <a className="nav-link" data-bs-toggle="offcanvas" href="#theme-settings-offcanvas">
              <i className="ri-settings-3-line font-22"></i>
            </a>
          </li>

          <li className="d-none d-sm-inline-block">
            <div className="nav-link" id="light-dark-mode">
              <i className="ri-moon-line font-22"></i>
            </div>
          </li>

          <li className="d-none d-md-inline-block">
            <a className="nav-link" href="" data-toggle="fullscreen">
              <i className="ri-fullscreen-line font-22"></i>
            </a>
          </li>

          <li className="dropdown">
            <a className="nav-link dropdown-toggle arrow-none nav-user px-2" data-bs-toggle="dropdown" href="#" role="button" aria-haspopup="false" aria-expanded="false">
              <span className="account-user-avatar">
                <img src="assets/images/users/avatar-1.jpg" alt="user-image" width="32" className="rounded-circle" />
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

              <a href="javascript:void(0);" className="dropdown-item">
                <i className="ri-user-smile-line font-16 me-1"></i>
                <span>My Account</span>
              </a>

              <a href="javascript:void(0);" className="dropdown-item">
                <i className="ri-user-settings-line font-16 me-1"></i>
                <span>Settings</span>
              </a>

              <a href="javascript:void(0);" className="dropdown-item">
                <i className="ri-lifebuoy-line font-16 me-1"></i>
                <span>Support</span>
              </a>

              <a href="javascript:void(0);" className="dropdown-item">
                <i className="ri-lock-line font-16 me-1"></i>
                <span>Lock Screen</span>
              </a>

              <a href="javascript:void(0);" className="dropdown-item">
                <i className="ri-login-circle-line font-16 me-1"></i>
                <span>Logout</span>
              </a>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
}
