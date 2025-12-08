import {useState } from 'react'
import {Link }from 'react-router-dom'

export default function Login() {

   const [showPassord , setShowPassword] = useState(false)
  return (
    <div className="authentication-bg position-relative min-vh-100 d-flex align-items-center">
      <div className="position-absolute start-0 end-0 bottom-0 w-100 h-100">
        <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 800 800">
          <g fillOpacity="0.22">
            <circle style={{ fill: "rgba(var(--ct-primary-rgb), 0.1)" }} cx="400" cy="400" r="600" />
            <circle style={{ fill: "rgba(var(--ct-primary-rgb), 0.2)" }} cx="400" cy="400" r="500" />
            <circle style={{ fill: "rgba(var(--ct-primary-rgb), 0.3)" }} cx="400" cy="400" r="300" />
            <circle style={{ fill: "rgba(var(--ct-primary-rgb), 0.4)" }} cx="400" cy="400" r="200" />
            <circle style={{ fill: "rgba(var(--ct-primary-rgb), 0.5)" }} cx="400" cy="400" r="100" />
          </g>
        </svg>
      </div>

      <div className="account-pages pt-2 pt-sm-5 pb-4 pb-sm-5 position-relative flex-grow-1">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-xxl-4 col-lg-5">
              <div className="card">
                <div className="card-header py-4 text-center bg-primary">
                  <a href="index.html">
                    <span><img src="assets/images/logo.png" alt="logo" height="22" /></span>
                  </a>
                </div>

                <div className="card-body p-4">
                  <div className="text-center w-75 m-auto">
                    <h4 className="text-dark-50 text-center pb-0 fw-bold">Sign In</h4>
                    <p className="text-muted mb-4">Enter your email address and password to access admin panel.</p>
                  </div>

                  <form action="#">
                    <div className="mb-3">
                      <label htmlFor="emailaddress" className="form-label">Email address</label>
                      <input className="form-control" type="email" id="emailaddress" required placeholder="Enter your email" />
                    </div>

                    <div className="mb-3">
                      <a href="pages-recoverpw.html" className="text-muted float-end"><small>Forgot your password?</small></a>
                      <label htmlFor="password" className="form-label">Password</label>
                      <div className="input-group input-group-merge">
                        <input type= {showPassord ? "text":"password"} id="password" className="form-control" placeholder="Enter your password" />
                        <div className="input-group-text" data-password="false" onClick={() => setShowPassword(!showPassord)}>
                          <span className= {showPassord ? "password-eye mdi mdi-eye-off":"password-eye mdi mdi-eye"}></span>
                        </div>
                      </div>
                    </div>

                    <div className="mb-3">
                      <div className="form-check">
                        <input type="checkbox" className="form-check-input" id="checkbox-signin" defaultChecked />
                        <label className="form-check-label" htmlFor="checkbox-signin">Remember me</label>
                      </div>
                    </div>

                    <div className="mb-3 mb-0 text-center">
                      <Link to="/dashboard">
                      <button className="btn btn-primary" type="submit"> Log In </button>
                      </Link>
                    </div>
                  </form>
                </div>
              </div>

              <div className="row mt-3">
                <div className="col-12 text-center">
                  <p className="text-muted">Don't have an account?
                    <a href="pages-register.html" className="text-muted ms-1"><b>Sign Up</b></a>
                  </p>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
