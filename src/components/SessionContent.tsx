import { useNavigate } from "react-router-dom";
import DataTable from "./DataTable";
import { sessionConfg } from "@/lib/types/data";
import type { FormConfig } from "@/lib/types/formConfig";

type Session = {
  session_id: number;
  session_device: string;
  session_location: string;
  session_login_time: string;
  session_last_activity: string;
  session_status: string;
};

function SessionContent({ config = sessionConfg }: { config?: FormConfig }) {
  const navigate = useNavigate();

  const sessions: Session[] = Array.from({ length: 200 }, (_, index) => {
    const id = index + 1;
    const hour = (id % 24).toString().padStart(2, "0");
    const minute = ((id * 7) % 60).toString().padStart(2, "0");

    return {
      session_id: id,
      session_device:
        id % 3 === 0 ? `Chrome / Windows (${id})` : `Mobile (${id})`,
      session_location: id % 2 === 0 ? "Abidjan" : "Bouaké",
      session_login_time: `2026-01-${((id % 28) + 1)
        .toString()
        .padStart(2, "0")} ${hour}:${minute}`,
      session_last_activity: `2026-01-${((id % 28) + 1)
        .toString()
        .padStart(2, "0")} ${hour}:${((Number(minute) + 10) % 60)
        .toString()
        .padStart(2, "0")}`,
      session_status: id % 4 === 0 ? "Inactive" : "Active",
    };
  });

  const handleView = (session: Session) => {
    navigate(`/dashboard/session-details/${session.session_id}`);
  };

  const handleTerminate = (session: Session) => {
    console.log("terminate session", session);
  };

  return (
    <div className="">
      <div className="">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <div className="page-title-box">
                <div className="page-title-right">
                  <button
                    className="btn btn-outline-primary mx-12"
                    data-bs-toggle="modal"
                    data-bs-target="#danger-alert-modal"
                  >
                    Nouveau
                  </button>
                  <button className="btn btn-outline-primary mx-12">
                    Lister
                  </button>
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
                              La création de session est actuellement désactivée
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
                <h4 className="page-title">Sessions</h4>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-12">
              <div className="card">
                <div className="card-body py-3 px-0 overflow-hidden">
                  <h4 className="header-title m-0 ps-3">
                    {config.list_case.subtitle}
                  </h4>
                  <hr />
                  <DataTable<Session>
                    id="basic-datatable"
                    columns={config.list_case.table}
                    data={sessions}
                    actions={[
                      {
                        id: "view",
                        title: "Afficher",
                        iconClass: "mdi mdi-eye",
                        className: "action-icon view border-0 bg-transparent",
                        onClick: (s) => handleView(s),
                      },
                      {
                        id: "delete",
                        title: "Terminer",
                        iconClass: "mdi mdi-delete",
                        className: "action-icon delete border-0 bg-transparent",
                        onClick: (s) => handleTerminate(s),
                      },
                    ]}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SessionContent;
