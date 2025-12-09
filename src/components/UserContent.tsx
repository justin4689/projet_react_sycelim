import { Link } from "react-router-dom";
import type { FormConfig } from "../types/formConfig";
import Pagination from "./Pagination";
import { useMemo, useState } from "react";
import {
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import type { ColumnDef } from "@tanstack/react-table";

type User = {
  user_id: number;
  user_nom: string;
  user_prenoms: string;
  user_genre: string;
  user_date: string;
  user_login: string;
  user_email: string;
  user_mobile: string;
  user_active: string;
  user_creation: string;
};

export default function UserContent({ config }: { config: FormConfig }) {
  // Données du tableau (pour l'instant statiques)
  const users: User[] = Array.from({ length: 200 }, (_, index) => {
    const id = index + 1;
    return {
      user_id: id,
      user_nom: `Nom ${id}`,
      user_prenoms: `Prénom ${id}`,
      user_genre: id % 2 === 0 ? "Masculin" : "Feminin",
      user_date: `199${id % 10}-0${(id % 9) + 1}-15`,
      user_login: `user${id}`,
      user_email: `user${id}@example.com`,
      user_mobile: `0700000${(id % 1000).toString().padStart(3, "0")}`,
      user_active: id % 3 === 0 ? "Non" : "Oui",
      user_creation: `2024-0${(id % 9) + 1}-01`,
    };
  });

  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredUsers = useMemo(() => {
    if (!searchTerm.trim()) return users;
    const lower = searchTerm.toLowerCase();
    return users.filter((u) =>
      [u.user_nom, u.user_prenoms, u.user_login, u.user_email, u.user_mobile]
        .join(" ")
        .toLowerCase()
        .includes(lower)
    );
  }, [searchTerm, users]);

  const totalPages = Math.ceil(filteredUsers.length / pageSize);

  // Colonnes React Table basées sur la config
  const columns = useMemo<ColumnDef<User>[]>(
    () => [
      ...config.list_case.table.map((field) => ({
        accessorKey: field.nom as keyof User,
        header: field.lbl,
        cell: (info: any) => info.getValue(),
      })),
      {
        id: "actions",
        header: () => <span>Actions</span>,
        cell: ({ row }: any) => {
          const user = row.original as User;
          return (
            <div className="d-flex justify-content-center">
              <button
                onClick={() => handleView(user.user_id)}
                className="action-icon view border-0 bg-transparent"
                title="Voir"
              >
                <i className="mdi mdi-eye"></i>
              </button>
              <button
                onClick={() => handleEdit(user.user_id)}
                className="action-icon edit border-0 bg-transparent"
                title="Modifier"
              >
                <i className="mdi mdi-square-edit-outline"></i>
              </button>
              <button
                onClick={() => handleDelete(user.user_id)}
                className="action-icon delete border-0 bg-transparent"
                title="Supprimer"
              >
                <i className="mdi mdi-delete"></i>
              </button>
            </div>
          );
        },
      },
    ],
    [config]
  );

  // Données paginées pour React Table
  const paginatedUsers = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    return filteredUsers.slice(startIndex, startIndex + pageSize);
  }, [currentPage, pageSize, filteredUsers]);

  const startIndex = (currentPage - 1) * pageSize;

  const table = useReactTable({
    data: paginatedUsers,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    manualPagination: true,
    pageCount: totalPages,
  });

  // Fonction pour gérer les actions
  const handleView = (id: number) => {
    console.log("View item:", id);
    // Implémenter la logique de visualisation
  };

  const handleEdit = (id: number) => {
    console.log("Edit item:", id);
    // Implémenter la logique d'édition
  };

  const handleDelete = (id: number) => {
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
                    <button className="btn btn-outline-primary mx-18">
                      {config.boutons[0].labl}
                    </button>
                  </Link>
                  <button className="btn btn-outline-primary mx-18">
                    {config.boutons[1].labl}
                  </button>
                  <button className="btn btn-outline-primary mx-18">
                    {config.boutons[2].labl}
                  </button>
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
                        <span className="ms-2">entries par pages </span>
                      </div>
                      <div className="d-flex align-items-center">
                        <span className="me-2">Search:</span>
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
                      className="table table-bordered dt-responsive nowrap w-100 mb-0"
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
                                      header.getContext()
                                    )
                                  : header.column.columnDef.header}
                              </th>
                            ))}
                          </tr>
                        ))}
                      </thead>
                      <tbody>
                        {table.getRowModel().rows.map((row) => (
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
                                      cell.getContext()
                                    )
                                  : (cell.getValue() as any)}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    <div className="d-flex justify-content-between align-items-center mt-2">
                      <div className="text-muted ">
                        {filteredUsers.length === 0
                          ? "Showing 0 to 0 of 0 entries"
                          : `Showing ${startIndex + 1} to ${Math.min(
                              startIndex + paginatedUsers.length,
                              filteredUsers.length
                            )} of ${filteredUsers.length} entries`}
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
