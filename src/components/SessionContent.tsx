import { Link } from "react-router-dom";
import { useMemo, useState } from "react";
import {
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import type { ColumnDef } from "@tanstack/react-table";
import Pagination from "./Pagination";
import { sessionConfg } from "../types/data";
import type { FormConfig } from "../types/formConfig";

type Session = {
  session_id: number;
  session_device: string;
  session_location: string;
  session_login_time: string;
  session_last_activity: string;
  session_status: string;
};

function SessionContent({ config = sessionConfg }: { config?: FormConfig }) {
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

  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredSessions = useMemo(() => {
    if (!searchTerm.trim()) return sessions;
    const lower = searchTerm.toLowerCase();
    return sessions.filter((s) =>
      [
        s.session_device,
        s.session_location,
        s.session_login_time,
        s.session_last_activity,
        s.session_status,
      ]
        .join(" ")
        .toLowerCase()
        .includes(lower),
    );
  }, [searchTerm, sessions]);

  const totalPages = Math.ceil(filteredSessions.length / pageSize);

  const handleView = (session: Session) => {
    console.log("view session", session);
  };

  const handleTerminate = (session: Session) => {
    console.log("terminate session", session);
  };

  // Colonnes React Table basées sur la config
  const columns = useMemo<ColumnDef<Session>[]>(
    () => [
      ...config.list_case.table.map((field) => ({
        accessorKey: field.nom as keyof Session,
        header: field.lbl,
        cell: (info: any) => info.getValue(),
      })),
      {
        id: "actions",
        header: () => <span>Actions</span>,
        cell: ({ row }: any) => {
          const session = row.original as Session;
          return (
            <div className="d-flex justify-content-center">
              <Link to={`/dashboard/session-details/${session.session_id}`}>
                <button
                  onClick={() => handleView(session)}
                  className="action-icon view border-0 bg-transparent"
                  title="Afficher"
                >
                  <i className="mdi mdi-eye" />
                </button>
              </Link>
              <button
                onClick={() => handleTerminate(session)}
                className="action-icon delete border-0 bg-transparent"
                title="Terminer"
              >
                <i className="mdi mdi-delete" />
              </button>
            </div>
          );
        },
      },
    ],
    [config],
  );

  // Données paginées pour React Table
  const paginatedSessions = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    return filteredSessions.slice(startIndex, startIndex + pageSize);
  }, [currentPage, pageSize, filteredSessions]);

  const startIndex = (currentPage - 1) * pageSize;

  const table = useReactTable({
    data: paginatedSessions,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    manualPagination: true,
    pageCount: totalPages,
  });

  return (
    <div className="">
      <div className="">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <div className="page-title-box">
                <div className="page-title-right">
                  <button className="btn btn-outline-primary mx-12" data-bs-toggle="modal" data-bs-target="#danger-alert-modal">
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
                  <h4 className="header-title m-0 ps-3">Liste de sessions</h4>
                  <hr />
                  <div className="card-body pb-0 pt-1">
                    <div className="d-flex justify-content-between align-items-center mb-2">
                      <div className="d-flex align-items-center">
                        <select
                          className="form-select form-select-sm"
                          style={{ width: "auto" }}
                          value={pageSize}
                          onChange={(e) => {
                            setPageSize(Number(e.target.value));
                            setCurrentPage(1);
                          }}
                        >
                          <option value={10}>10</option>
                          <option value={25}>25</option>
                          <option value={50}>50</option>
                          <option value={100}>100</option>
                        </select>
                        <span className="ms-2">éléments par page</span>
                      </div>
                      <div className="d-flex align-items-center">
                        <span className="me-2">Recherche:</span>
                        <input
                          type="search"
                          className="form-control form-control-sm"
                          style={{ width: "200px" }}
                          value={searchTerm}
                          onChange={(e) => {
                            setSearchTerm(e.target.value);
                            setCurrentPage(1);
                          }}
                        />
                      </div>
                    </div>
                    <table
                      id="basic-datatable"
                      className="table table-bordered  dt-responsive nowrap w-100 mb-0"
                    >
                      <thead className="table-light">
                        {table.getHeaderGroups().map((headerGroup) => (
                          <tr key={headerGroup.id}>
                            {headerGroup.headers.map((header) => (
                              <th
                                key={header.id}
                                style={
                                  header.column.id === "actions"
                                    ? { width: "1%" }
                                    : undefined
                                }
                                className={
                                  header.column.id === "actions"
                                    ? "text-center"
                                    : undefined
                                }
                              >
                                {header.isPlaceholder
                                  ? null
                                  : header.column.columnDef.header instanceof
                                      Function
                                    ? header.column.columnDef.header(
                                        header.getContext(),
                                      )
                                    : header.column.columnDef.header}
                              </th>
                            ))}
                          </tr>
                        ))}
                      </thead>
                      <tbody>
                        {table.getRowModel().rows.length === 0 ? (
                          <tr>
                            <td
                              colSpan={table.getVisibleLeafColumns().length}
                              className="text-start"
                            >
                              Aucun element trouvé
                            </td>
                          </tr>
                        ) : (
                          table.getRowModel().rows.map((row) => (
                            <tr key={row.id}>
                              {row.getVisibleCells().map((cell) => (
                                <td
                                  key={cell.id}
                                  className={
                                    cell.column.id === "actions"
                                      ? "text-center"
                                      : undefined
                                  }
                                >
                                  {typeof cell.column.columnDef.cell ===
                                  "function"
                                    ? cell.column.columnDef.cell(
                                        cell.getContext(),
                                      )
                                    : (cell.getValue() as any)}
                                </td>
                              ))}
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                    <div className="d-flex justify-content-between align-items-center mt-2">
                      <div className="text-muted ">
                        {filteredSessions.length === 0
                          ? "Affichage de 0 à 0 sur 0 éléments"
                          : `Affichage de ${startIndex + 1} à ${Math.min(
                              startIndex + paginatedSessions.length,
                              filteredSessions.length,
                            )} sur ${filteredSessions.length} éléments`}
                      </div>
                      <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={(page) => setCurrentPage(page)}
                      />
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

export default SessionContent;
