import { useConfig } from "@/hook/queries/useConfig";
import type { entityConfig, entityConfigData } from "@/lib/types/config.types";
import { Link } from "react-router-dom";

function ConfigContent() {
  const { data, isLoading, error } = useConfig<
    entityConfig[] | entityConfigData
  >();

  const entities: entityConfig[] = Array.isArray(data)
    ? data
    : (data?.data ?? []);

  return (
    <div className="">
      <div className="">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <div className="page-title-box">
                <div className="page-title-right">
                  <Link to="/dashboard/configurations/create">
                    <button className="btn btn-outline-primary mx-12">
                      Créer
                    </button>
                  </Link>

                  <div
                    className="modal fade"
                    id="staticBackdrop"
                    data-bs-backdrop="static"
                    data-bs-keyboard="false"
                    tabIndex={-1}
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

                            <div className=" d-flex gap-3">
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
                                  Device
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
                                  Location
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
                                  Login Time
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
                  <div
                    id="danger-alert-modal"
                    className="modal fade"
                    tabIndex={-1}
                    role="dialog"
                    aria-hidden="true"
                  >
                    <div className="modal-dialog modal-sm modal-dialog-centered">
                      <div className="modal-content modal-filled bg-danger">
                        <div className="modal-body p-4">
                          <div className="text-center">
                            <i className="ri-close-circle-line h1"></i>
                            <h4 className="mt-2">Oh desolé!</h4>
                            <p className="mt-3">
                              La création d'entité est actuellement désactivée
                            </p>
                            <button
                              type="button"
                              className="btn btn-light my-2"
                              data-bs-dismiss="modal"
                            >
                              Continue
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <h4 className="page-title">Configuration</h4>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-12">
              <div className="card">
                <div className="card-body py-3 px-0 overflow-hidden">
                  <h4 className="header-title m-0 ps-3">liste des entités</h4>
                  <hr />

                  {/* <!-- Liste des entités --> */}
                  <div className="row g-3 px-3">
                    {isLoading ? (
                      // Skeleton cards pendant le chargement
                      <>
                        {[...Array(6)].map((_, i) => (
                          <div
                            key={`skeleton-${i}`}
                            className="col-12 col-md-6 col-xl-4"
                          >
                            <div className="card h-100 shadow-sm border">
                              <div className="card-body">
                                <div className="d-flex justify-content-between align-items-start">
                                  <div className="w-75">
                                    <div
                                      className="placeholder placeholder-glow rounded"
                                      style={{ width: "60%", height: "24px" }}
                                    />
                                    <div
                                      className="placeholder placeholder-glow rounded mt-2"
                                      style={{ width: "40%", height: "16px" }}
                                    />
                                  </div>
                                  <div
                                    className="placeholder placeholder-glow rounded"
                                    style={{ width: "32px", height: "32px" }}
                                  />
                                </div>
                                <div
                                  className="placeholder placeholder-glow rounded mt-3"
                                  style={{ width: "50%", height: "16px" }}
                                />
                              </div>
                            </div>
                          </div>
                        ))}
                      </>
                    ) : error ? (
                      <div className="col-12 px-3 text-danger">
                        Erreur lors du chargement des configurations
                      </div>
                    ) : entities.length === 0 ? (
                      <div className="col-12 px-3 text-muted">
                        Aucune entité
                      </div>
                    ) : (
                      entities.map((entity) => (
                        <div
                          key={entity.id}
                          className="col-12 col-md-6 col-xl-4"
                        >
                          <Link
                            to={`/dashboard/configurations/${entity.id}`}
                            className="text-decoration-none"
                          >
                            <div className="card h-100 shadow-sm border">
                              <div className="card-body">
                                <div className="d-flex justify-content-between align-items-start">
                                  <div>
                                    <h4 className="mt-0 mb-1">
                                      {entity.entity}
                                    </h4>
                                    <div className="text-muted">
                                      Table : {entity.entity}
                                    </div>
                                  </div>
                                  <div className="text-primary">
                                    <i className="uil uil-users-alt" />
                                  </div>
                                </div>
                                <div className="mt-2 text-muted">
                                  {entity.formColumns} colonnes formulaire
                                </div>
                              </div>
                            </div>
                          </Link>
                        </div>
                      ))
                    )}
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

export default ConfigContent;
