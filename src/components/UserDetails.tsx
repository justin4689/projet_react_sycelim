import { Link, useParams } from "react-router-dom";
import { useUser } from "@/hook/queries";
import type { User } from "@/lib/types/user.types";

export default function UserDetails() {
  const { id } = useParams();
  const { data: user, isLoading, error } = useUser<User>(id);

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-12">
          <div className="page-title-box">
            <div className="page-title-right">
              <Link to="/user-create">
                <a
                  href="formulaire.html"
                  className="btn btn-outline-primary mx-12"
                >
                  Nouveau
                </a>
              </Link>
              <Link to="/dashboard">
                <a className="btn btn-outline-primary mx-12">Lister</a>
              </Link>
              <button
                className="btn btn-outline-primary mx-12"
                data-bs-toggle="modal"
                data-bs-target="#staticBackdrop"
              >
                Rechercher
              </button>

              <div
                className="modal fade"
                id="staticBackdrop"
                data-bs-backdrop="static"
                data-bs-keyboard="false"
                aria-labelledby="staticBackdropLabel"
                aria-hidden="true"
              >
                <div className="modal-dialog modal-dialog-centered">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5 className="modal-title" id="staticBackdropLabel">
                        Rechercher
                      </h5>
                      <button
                        type="button"
                        className="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                      ></button>
                    </div>
                    <form className="" action="#">
                      <div className="modal-body">
                        <div className="mb-3">
                          <input
                            className="form-control"
                            type="email"
                            id="username"
                            required
                            placeholder="Rechercher..."
                          />
                        </div>

                        <div className="d-flex gap-3">
                          <div className="form-check">
                            <input
                              type="checkbox"
                              className="form-check-input"
                              id="customCheck1"
                            />
                            <label
                              className="form-check-label"
                              htmlFor="customCheck1"
                            >
                              name
                            </label>
                          </div>
                          <div className="form-check">
                            <input
                              type="checkbox"
                              className="form-check-input"
                              id="customCheck1"
                            />
                            <label
                              className="form-check-label"
                              htmlFor="customCheck1"
                            >
                              position
                            </label>
                          </div>
                          <div className="form-check">
                            <input
                              type="checkbox"
                              className="form-check-input"
                              id="customCheck1"
                            />
                            <label
                              className="form-check-label"
                              htmlFor="customCheck1"
                            >
                              salary
                            </label>
                          </div>
                        </div>
                      </div>

                      <div className="modal-footer">
                        <button
                          className="btn btn-outline-primary"
                          type="submit"
                          style={{
                            marginRight: "2px",
                            marginBottom: "2px",
                          }}
                        >
                          Rechercher
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
            <h4 className="page-title">Utilisateurs</h4>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card-body py-3 px-0 overflow-hidden">
              <h4 className="header-title m-0 ps-3">Details utilisateurs</h4>
              <hr />

              {isLoading ? (
                <div className="row gy-3 gx-3 px-3">
                  {Array.from({ length: 7 }).map((_, i) => (
                    <div className="col-lg-2" key={i}>
                      <div className="card my-0 shadow-none border">
                        <div className="">
                          <div className="row align-items-center">
                            <div className="col">
                              <h4 className="details-title">
                                <span className="placeholder-glow">
                                  <span className="placeholder col-6" />
                                </span>
                              </h4>
                              <hr className="m-0 hr-dashed" />
                              <p className="details-value my-0">
                                <span className="placeholder-glow">
                                  <span className="placeholder col-10" />
                                </span>
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : error ? (
                <div className="px-3 text-danger">
                  Erreur lors du chargement de l'utilisateur
                </div>
              ) : !user ? (
                <div className="px-3 text-danger">Utilisateur introuvable</div>
              ) : (
                <div className="row gy-3 gx-3 px-3">
                  <div className="col-lg-2">
                    <div className="card my-0 shadow-none border">
                      <div className="">
                        <div className="row align-items-center">
                          <div className="col">
                            <h4 className="details-title">Nom :</h4>
                            <hr className="m-0 hr-dashed" />
                            <p className="details-value my-0">
                              {user.user_nom}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-2">
                    <div className="card my-0 shadow-none border">
                      <div className="">
                        <div className="row align-items-center">
                          <div className="col">
                            <h4 className="details-title">Prénoms :</h4>
                            <hr className="m-0 hr-dashed" />
                            <p className="details-value my-0">
                              {user.user_prenoms}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-2">
                    <div className="card my-0 shadow-none border">
                      <div className="">
                        <div className="row align-items-center">
                          <div className="col">
                            <h4 className="details-title">Login :</h4>
                            <hr className="m-0 hr-dashed" />
                            <p className="details-value my-0">
                              {user.user_login}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-2">
                    <div className="card my-0 shadow-none border">
                      <div className="">
                        <div className="row align-items-center">
                          <div className="col">
                            <h4 className="details-title">Email :</h4>
                            <hr className="m-0 hr-dashed" />
                            <p className="details-value my-0">
                              {user.user_email}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-2">
                    <div className="card my-0 shadow-none border">
                      <div className="">
                        <div className="row align-items-center">
                          <div className="col">
                            <h4 className="details-title">Mobile :</h4>
                            <hr className="m-0 hr-dashed" />
                            <p className="details-value my-0">
                              {user.user_mobile}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-2">
                    <div className="card my-0 shadow-none border">
                      <div className="">
                        <div className="row align-items-center">
                          <div className="col">
                            <h4 className="details-title">Genre :</h4>
                            <hr className="m-0 hr-dashed" />
                            <p className="details-value my-0">
                              {user.user_genre}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-2">
                    <div className="card my-0 shadow-none border">
                      <div className="">
                        <div className="row align-items-center">
                          <div className="col">
                            <h4 className="details-title">Actif :</h4>
                            <hr className="m-0 hr-dashed" />
                            <p className="details-value my-0">
                              {user.user_active ? "Oui" : "Non"}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              <hr />

              <div className="row">
                <div className="col">
                  <div className="tab-content">
                    <div
                      className="tab-pane show active"
                      id="default-tabs-preview "
                    >
                      <ul className="nav nav-tabs mb-3 px-2">
                        <li className="nav-item">
                          <a
                            href="#home"
                            data-bs-toggle="tab"
                            aria-expanded="true"
                            className="nav-link active"
                          >
                            <i className="mdi mdi-home-variant d-md-none d-block"></i>
                            <span className="d-none d-md-block">Home</span>
                          </a>
                        </li>
                        <li className="nav-item">
                          <a
                            href="#profile"
                            data-bs-toggle="tab"
                            aria-expanded="false"
                            className="nav-link"
                          >
                            <i className="mdi mdi-account-circle d-md-none d-block"></i>
                            <span className="d-none d-md-block">Profile</span>
                          </a>
                        </li>
                        <li className="nav-item">
                          <a
                            href="#settings"
                            data-bs-toggle="tab"
                            aria-expanded="false"
                            className="nav-link"
                          >
                            <i className="mdi mdi-settings-outline d-md-none d-block"></i>
                            <span className="d-none d-md-block">Settings</span>
                          </a>
                        </li>
                      </ul>

                      <div className="tab-content px-3">
                        <div className="tab-pane show active" id="home">
                          <p>
                            Food truck quinoa dolor sit amet, consectetuer
                            adipiscing elit. Aenean commodo ligula eget dolor.
                            Aenean massa. Cum sociis natoque penatibus et magnis
                            dis parturient montes, nascetur ridiculus mus. Donec
                            quam felis, ultricies nec, pellentesque eu, pretium
                            quis, sem. Nulla consequat massa quis enim.
                          </p>
                          <p className="mb-0">
                            Donec pede justo, fringilla vel, aliquet nec,
                            vulputate eget, arcu. In enim justo, rhoncus ut,
                            imperdiet a, venenatis vitae, justo. Nullam dictum
                            felis eu pede mollis pretium. Integer tincidunt.Cras
                            dapibus. Vivamus elementum semper nisi. Aenean
                            vulputate eleifend tellus. Aenean leo ligula,
                            porttitor eu, consequat vitae, eleifend ac, enim.
                          </p>
                        </div>
                        <div className="tab-pane" id="profile">
                          <p>
                            Donec pede justo, fringilla vel, aliquet nec,
                            vulputate eget, arcu. In enim justo, rhoncus ut,
                            imperdiet a, venenatis vitae, justo. Nullam dictum
                            felis eu pede mollis pretium. Integer tincidunt.Cras
                            dapibus. Vivamus elementum semper nisi. Aenean
                            vulputate eleifend tellus. Aenean leo ligula,
                            porttitor eu, consequat vitae, eleifend ac, enim.
                          </p>
                          <p className="mb-0">
                            Food truck quinoa dolor sit amet, consectetuer
                            adipiscing elit. Aenean commodo ligula eget dolor.
                            Aenean massa. Cum sociis natoque penatibus et magnis
                            dis parturient montes, nascetur ridiculus mus. Donec
                            quam felis, ultricies nec, pellentesque eu, pretium
                            quis, sem. Nulla consequat massa quis enim.
                          </p>
                        </div>
                        <div className="tab-pane" id="settings">
                          <p>
                            Food truck quinoa dolor sit amet, consectetuer
                            adipiscing elit. Aenean commodo ligula eget dolor.
                            Aenean massa. Cum sociis natoque penatibus et magnis
                            dis parturient montes, nascetur ridiculus mus. Donec
                            quam felis, ultricies nec, pellentesque eu, pretium
                            quis, sem. Nulla consequat massa quis enim.
                          </p>
                          <p className="mb-0">
                            Donec pede justo, fringilla vel, aliquet nec,
                            vulputate eget, arcu. In enim justo, rhoncus ut,
                            imperdiet a, venenatis vitae, justo. Nullam dictum
                            felis eu pede mollis pretium. Integer tincidunt.Cras
                            dapibus. Vivamus elementum semper nisi. Aenean
                            vulputate eleifend tellus. Aenean leo ligula,
                            porttitor eu, consequat vitae, eleifend ac, enim.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
