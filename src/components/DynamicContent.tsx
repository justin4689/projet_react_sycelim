import { Link, useNavigate } from "react-router-dom";
import DataTable from "./DataTable";
import TableSkeleton from "./skeleton/TableSkeleton";
import { useState } from "react";
import { useUsersPaginated } from "@/hook/queries";
import type { User } from "@/lib/types/user.types";
import type { ConfigDetailResponse } from "@/lib/types/config.types";
import type { ListField } from "@/lib/types/formConfig";

type ButtonItem = { label: string };

const normalizeButtons = (value: unknown): ButtonItem[] => {
  if (Array.isArray(value)) {
    return value.filter(
      (b): b is ButtonItem =>
        typeof b === "object" && b !== null && "label" in b,
    );
  }

  if (typeof value === "object" && value !== null && "label" in value) {
    const nested = (value as { label?: unknown }).label;
    if (Array.isArray(nested)) {
      return nested.filter(
        (b): b is ButtonItem =>
          typeof b === "object" && b !== null && "label" in b,
      );
    }
  }

  return [];
};

export default function DynamicContent({
  entity,
  configData,
}: {
  entity: string;
  configData: ConfigDetailResponse;
}) {
  const navigate = useNavigate();

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [q, setQ] = useState("");
  const [sortBy, setSortBy] = useState("user_creation");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

  const isUsers = entity === "users";

  const { data, isLoading, error } = isUsers
    ? useUsersPaginated<User>({
        page,
        limit,
        q: q.trim() ? q : undefined,
        sortBy,
        sortOrder,
      })
    : ({ data: undefined, isLoading: false, error: true } as const);

  const users = data?.data ?? [];
  const totalPages = data?.pagination?.totalPages ?? 1;

  const rawColumns = configData?.config?.table?.columns ?? [];
  const columns: ListField[] = rawColumns.map((c) => {
    const nom = c.name === "user_id" ? "__rowNumber" : c.name;
    return {
      nom,
      lbl: c.label,
      pos: "left",
      sortable: c.sortable,
    } as ListField;
  });

  const buttons = normalizeButtons(configData?.config?.buttons);

  // Fonction pour gérer les actions
  const handleView = (id: string) => {
    navigate(`/dashboard/${entity}/${id}`);
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
                  <Link to={`/dashboard/${entity}/create`}>
                    <button className="btn btn-outline-primary mx-12">
                      {buttons?.[0]?.label}
                    </button>
                  </Link>
                  <Link to={`/dashboard/${entity}`}>
                    <button className="btn btn-outline-primary mx-12">
                      {buttons?.[1]?.label}
                    </button>
                  </Link>
                  <button
                    type="button"
                    className="btn btn-outline-primary mx-12"
                    data-bs-toggle="modal"
                    data-bs-target="#staticBackdrop"
                  >
                    {buttons?.[2]?.label}
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
                <h4 className="page-title">
                  {configData?.label ?? configData?.entity ?? ""}
                </h4>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-12">
              <div className="card">
                <div className="card-body py-3 px-0 overflow-hidden">
                  <h4 className="header-title m-0 ps-3">
                    {"Liste des " + configData?.label}{" "}
                  </h4>
                  <hr />
                  {isLoading ? (
                    <TableSkeleton columnsCount={columns.length} />
                  ) : error ? (
                    <div className="px-3 text-danger">
                      Erreur lors du chargement
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
