import { Link, useNavigate } from "react-router-dom";
import type { FormConfig } from "@/lib/types/formConfig";
import DataTable from "./DataTable";
import TableSkeleton from "./skeleton/TableSkeleton";
import { useState } from "react";
import { useUsersPaginated } from "@/hook/queries";
import type { User } from "@/lib/types/user.types";

export default function UserContent({ config }: { config: FormConfig }) {
  const navigate = useNavigate();

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [q, setQ] = useState("");
  const [sortBy, setSortBy] = useState("user_creation");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

  const { data, isLoading, error } = useUsersPaginated<User>({
    page,
    limit,
    q: q.trim() ? q : undefined,
    sortBy,
    sortOrder,
  });

  const users = data?.data ?? [];
  const totalPages = data?.pagination?.totalPages ?? 1;

  const columns = config.list_case.table.map((c) =>
    c.nom === "user_id" ? { ...c, nom: "__rowNumber", lbl: "User ID" } : c,
  );

  // Fonction pour gérer les actions
  const handleView = (id: string) => {
    navigate(`/dashboard/user-details/${id}`);
  };

  const handleEdit = (id: string) => {
    console.log("Edit item:", id);
    // Implémenter la logique d'édition
  };

  const handleDelete = (id: string) => {
    console.log("Delete item:", id);
    // Implémenter la logique de suppression
  };

  return (
    <div className="">
      <div className="">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <div className="page-title-box">
                <div className="page-title-right">
                  <Link to="user-create">
                    <button className="btn btn-outline-primary mx-12">
                      {config.boutons[0].labl}
                    </button>
                  </Link>
                  <button className="btn btn-outline-primary mx-12">
                    {config.boutons[1].labl}
                  </button>
                  <button
                    className="btn btn-outline-primary mx-12"
                    data-bs-toggle="modal"
                    data-bs-target="#staticBackdrop"
                  >
                    {config.boutons[2].labl}
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
                <h4 className="page-title">{config.title}</h4>
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
                  {isLoading ? (
                    <TableSkeleton columnsCount={columns.length} />
                  ) : error ? (
                    <div className="px-3 text-danger">
                      Erreur lors du chargement des utilisateurs
                    </div>
                  ) : (
                    <DataTable<User>
                      id="basic-datatable"
                      columns={columns}
                      data={users}
                      serverSide
                      page={page}
                      pageSize={limit}
                      totalPages={totalPages}
                      onPageChange={setPage}
                      onPageSizeChange={setLimit}
                      searchTerm={q}
                      onSearchTermChange={setQ}
                      onSortChange={(nextSortBy, nextSortOrder) => {
                        setSortBy(nextSortBy);
                        setSortOrder(nextSortOrder);
                        setPage(1);
                      }}
                      actions={[
                        {
                          id: "view",
                          title: "Voir",
                          iconClass: "mdi mdi-eye",
                          className: "action-icon view border-0 bg-transparent",
                          onClick: (u) => handleView(u._id),
                        },
                        {
                          id: "edit",
                          title: "Modifier",
                          iconClass: "mdi mdi-square-edit-outline",
                          className: "action-icon edit border-0 bg-transparent",
                          onClick: (u) => handleEdit(u._id),
                        },
                        {
                          id: "delete",
                          title: "Supprimer",
                          iconClass: "mdi mdi-delete",
                          className:
                            "action-icon delete border-0 bg-transparent",
                          onClick: (u) => handleDelete(u._id),
                        },
                      ]}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
