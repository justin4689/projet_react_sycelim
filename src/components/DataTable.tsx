import { useEffect, useMemo, useState } from "react";
import {
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
  type ColumnDef,
  type SortingState,
} from "@tanstack/react-table";
import type { ListField } from "@/lib/types/formConfig";
import Pagination from "./Pagination";

type DataTableAction<T> = {
  id: string;
  title: string;
  iconClass: string;
  className?: string;
  onClick: (row: T) => void;
};

type DataTableProps<T extends Record<string, any>> = {
  id: string;
  columns: ListField[];
  data: T[];
  actions?: DataTableAction<T>[];
  actionHeader?: string;
  tableClassName?: string;
  actionsSortField?: string;
  serverSide?: boolean;
  page?: number;
  pageSize?: number;
  totalPages?: number;
  onPageChange?: (page: number) => void;
  onPageSizeChange?: (pageSize: number) => void;
  searchTerm?: string;
  onSearchTermChange?: (value: string) => void;
  onSortChange?: (sortBy: string, sortOrder: "asc" | "desc") => void;
};

export default function DataTable<T extends Record<string, any>>({
  id,
  columns,
  data,
  actions,
  actionHeader = "Actions",
  tableClassName = "table table-bordered dt-responsive nowrap w-100 mb-0",
  actionsSortField,
  serverSide = false,
  page,
  pageSize: pageSizeProp,
  totalPages: totalPagesProp,
  onPageChange,
  onPageSizeChange,
  searchTerm: searchTermProp,
  onSearchTermChange,
  onSortChange,
}: DataTableProps<T>) {
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [sorting, setSorting] = useState<SortingState>([]);

  const effectivePageSize = serverSide ? (pageSizeProp ?? 10) : pageSize;
  const effectiveCurrentPage = serverSide ? (page ?? 1) : currentPage;
  const effectiveSearchTerm = serverSide ? (searchTermProp ?? "") : searchTerm;

  const filteredData = useMemo(() => {
    if (serverSide) return data;
    if (!effectiveSearchTerm.trim()) return data;
    const lower = effectiveSearchTerm.toLowerCase();

    return data.filter((row) => {
      const haystack = columns
        .map((c) => {
          const v = row?.[c.nom];
          return v == null ? "" : String(v);
        })
        .join(" ")
        .toLowerCase();
      return haystack.includes(lower);
    });
  }, [columns, data, effectiveSearchTerm, serverSide]);

  const totalPages = serverSide
    ? Math.max(1, totalPagesProp ?? 1)
    : Math.max(1, Math.ceil(filteredData.length / effectivePageSize));
  const safeCurrentPage = Math.min(
    Math.max(effectiveCurrentPage, 1),
    totalPages,
  );

  useEffect(() => {
    if (serverSide) return;
    if (currentPage !== safeCurrentPage) {
      setCurrentPage(safeCurrentPage);
    }
  }, [currentPage, safeCurrentPage, serverSide]);

  const paginatedData = useMemo(() => {
    if (serverSide) return filteredData;
    const startIndex = (safeCurrentPage - 1) * effectivePageSize;
    return filteredData.slice(startIndex, startIndex + effectivePageSize);
  }, [effectivePageSize, filteredData, safeCurrentPage, serverSide]);

  const startIndex = (safeCurrentPage - 1) * effectivePageSize;

  const tanstackColumns = useMemo<ColumnDef<T>[]>(() => {
    const base: ColumnDef<T>[] = columns.map((c) => {
      if (c.nom === "__rowNumber") {
        return {
          id: "__rowNumber",
          header: c.lbl,
          enableSorting: false,
          cell: ({ row }) => String(startIndex + row.index + 1),
        };
      }

      return {
        accessorKey: c.nom,
        header: c.lbl,
        cell: (info) => {
          const v = info.getValue();
          return v == null ? "" : String(v);
        },
      };
    });

    if (actions && actions.length > 0) {
      const sortField = actionsSortField ?? columns?.[0]?.nom;

      base.push({
        id: "actions",
        header: () => <span>{actionHeader}</span>,
        accessorFn: sortField ? (row) => row?.[sortField] : undefined,
        enableSorting: Boolean(sortField),
        sortingFn: "alphanumeric",
        cell: ({ row }) => (
          <div className="d-flex justify-content-center">
            {actions.map((a) => (
              <button
                key={a.id}
                type="button"
                onClick={() => a.onClick(row.original)}
                className={a.className || "border-0 bg-transparent"}
                title={a.title}
              >
                <i className={a.iconClass} />
              </button>
            ))}
          </div>
        ),
      });
    }

    return base;
  }, [actionHeader, actions, actionsSortField, columns, startIndex]);

  const table = useReactTable({
    data: paginatedData,
    columns: tanstackColumns,
    state: { sorting },
    onSortingChange: (updater) => {
      setSorting(updater);
      if (!onSortChange) return;

      const next = typeof updater === "function" ? updater(sorting) : updater;
      const first = next?.[0];
      if (!first?.id) return;

      onSortChange(first.id, first.desc ? "desc" : "asc");
    },
    manualSorting: serverSide,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: serverSide ? undefined : getSortedRowModel(),
  });

  return (
    <div className="card-body pb-0 pt-1">
      <div className="d-flex justify-content-between align-items-center mb-2">
        <div className="d-flex align-items-center">
          <select
            className="form-select form-select-sm"
            style={{ width: "auto" }}
            value={effectivePageSize}
            onChange={(e) => {
              const next = Number(e.target.value);
              if (serverSide) {
                onPageSizeChange?.(next);
                onPageChange?.(1);
              } else {
                setPageSize(next);
                setCurrentPage(1);
              }
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
            value={effectiveSearchTerm}
            onChange={(e) => {
              const next = e.target.value;
              if (serverSide) {
                onSearchTermChange?.(next);
                onPageChange?.(1);
              } else {
                setSearchTerm(next);
                setCurrentPage(1);
              }
            }}
          />
        </div>
      </div>

      <div className="table-responsive">
        <table id={id} className={tableClassName}>
          <thead className="table-light">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  const canSort = header.column.getCanSort();
                  const sortDir = header.column.getIsSorted();
                  const sortIconClass =
                    sortDir === "asc"
                      ? "uil uil-angle-up"
                      : sortDir === "desc"
                        ? "uil uil-angle-down"
                        : "uil uil-sort";

                  return (
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
                      {header.isPlaceholder ? null : (
                        <div
                          role={canSort ? "button" : undefined}
                          tabIndex={canSort ? 0 : undefined}
                          className={
                            canSort
                              ? "d-flex align-items-center justify-content-between user-select-none"
                              : undefined
                          }
                          style={canSort ? { cursor: "pointer" } : undefined}
                          onClick={
                            canSort
                              ? header.column.getToggleSortingHandler()
                              : undefined
                          }
                          onKeyDown={
                            canSort
                              ? (e) => {
                                  if (e.key === "Enter" || e.key === " ") {
                                    e.preventDefault();
                                    header.column.toggleSorting();
                                  }
                                }
                              : undefined
                          }
                        >
                          <span>
                            {header.column.columnDef.header instanceof Function
                              ? header.column.columnDef.header(
                                  header.getContext(),
                                )
                              : header.column.columnDef.header}
                          </span>
                          {canSort ? (
                            <span
                              className={`ms-2 ${sortDir ? "" : "text-muted"}`}
                            >
                              <i className={sortIconClass + " text-muted"} />
                            </span>
                          ) : null}
                        </div>
                      )}
                    </th>
                  );
                })}
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
                        cell.column.id === "actions" ? "text-center" : undefined
                      }
                    >
                      {typeof cell.column.columnDef.cell === "function"
                        ? cell.column.columnDef.cell(cell.getContext())
                        : (cell.getValue() as any)}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="d-flex justify-content-between align-items-center mt-2">
        <div className="text-muted ">
          {filteredData.length === 0
            ? "Affichage de 0 à 0 sur 0 éléments"
            : `Affichage de ${startIndex + 1} à ${Math.min(
                startIndex + paginatedData.length,
                filteredData.length,
              )} sur ${filteredData.length} éléments`}
        </div>
        <Pagination
          currentPage={safeCurrentPage}
          totalPages={totalPages}
          onPageChange={(p) => {
            if (serverSide) {
              onPageChange?.(p);
            } else {
              setCurrentPage(p);
            }
          }}
        />
      </div>
    </div>
  );
}
