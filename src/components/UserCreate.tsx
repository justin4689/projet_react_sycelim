export default function UserCreate() {
  return (
    <div className="content-page">
      <div className="content">
        {/* Start Content*/}
        <div className="container-fluid">
          {/* page title */}
          <div className="row">
            <div className="col-12">
              <div className="page-title-box">
                <h4 className="page-title">Formulaire</h4>
              </div>
            </div>
          </div>
          {/* end page title */}

          {/* Form Layouts */}
          <div className="row ">
            <div className="col-12">
              <div className="card">
                <div className="card-body py-3 px-0 overflow-hidden">
                  <h4 className="header-title mb-0 px-3">Une colonne</h4>
                  <hr className="hr" />
                  <form>
                    <div className="row">
                      <div className="mb-3 px-4">
                        <label htmlFor="fullname" className="form-label">
                          Full Name
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="fullname"
                          placeholder="Enter your name"
                          required
                        />
                      </div>
                      <div className="mb-3 px-4">
                        <label htmlFor="email" className="form-label">
                          Email address
                        </label>
                        <input
                          type="email"
                          className="form-control"
                          id="email"
                          placeholder="Enter email"
                          required
                        />
                      </div>
                      <div className="mb-3 px-4">
                        <label htmlFor="password" className="form-label">
                          Password
                        </label>
                        <input
                          type="password"
                          className="form-control"
                          id="password"
                          placeholder="Enter password"
                        />
                      </div>
                      <div className="mb-3 px-4">
                        <label htmlFor="birthdate" className="form-label">
                          Birth Date
                        </label>
                        <input
                          type="date"
                          className="form-control"
                          id="birthdate"
                        />
                      </div>
                      <div className="mb-3 px-4">
                        <label htmlFor="birthdate" className="form-label">
                          Profile Picture
                        </label>
                        <input
                          type="file"
                          className="form-control"
                          id="birthdate"
                        />
                      </div>

                      <div className="px-4">
                        <label htmlFor="country2" className="form-label">
                          Country
                        </label>
                        <select className="form-select w-full" id="country2">
                          <option selected>Select a country</option>
                          <option>France</option>
                          <option>United States</option>
                          <option>United Kingdom</option>
                        </select>
                      </div>

                      <hr className="hr-button" />
                      <div className="d-flex justify-content-end px-4">
                        <button type="submit" className="btn btn-primary mx-18">
                          Submit
                        </button>
                      </div>
                    </div>
                  </form>
                </div>{" "}
                {/* end card-body */}
              </div>{" "}
              {/* end card */}
            </div>{" "}
            {/* end col */}
          </div>
          {/* end row */}
        </div>{" "}
        {/* container */}
      </div>{" "}
      {/* content */}
    </div>
  );
}
