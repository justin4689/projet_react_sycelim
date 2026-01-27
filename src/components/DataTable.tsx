import { useEffect, useRef } from "react";
import type { ListField } from "../types/formConfig";

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
};

export default function DataTable<T extends Record<string, any>>({
  id,
  columns,
  data,
  actions,
  actionHeader = "Actions",
  tableClassName = "table table-bordered dt-responsive nowrap w-100 mb-0",
}: DataTableProps<T>) {
  const dtRef = useRef<any>(null);

  useEffect(() => {
    const $ = (window as any).$ || (window as any).jQuery;
    if (!$ || !$.fn || !$.fn.DataTable) {
      console.warn(
        "DataTables non disponible. Vérifie que les scripts DataTables sont bien chargés dans index.html.",
      );
      return;
    }

    const selector = `#${id}`;

    const existing = $.fn.dataTable?.isDataTable?.(selector);
    if (existing) {
      $(selector).DataTable().destroy(true);
    }

    // Délégation d'événements (reste OK après paging/sort/filter)
    const clickHandler = (e: any) => {
      const btn = e.target?.closest?.("button[data-dt-action]");
      if (!btn) return;
      const actionId = btn.getAttribute("data-dt-action");
      if (!actionId) return;

      const dt = dtRef.current;
      if (!dt) return;

      const tr = btn.closest("tr");
      if (!tr) return;

      const rowData = dt.row(tr).data() as T | undefined;
      if (!rowData) return;

      const action = actions?.find((a) => a.id === actionId);
      if (!action) return;
      action.onClick(rowData);
    };

    const t = window.setTimeout(() => {
      const dtColumns: any[] = columns.map((c) => ({
        data: c.nom,
        title: c.lbl,
      }));

      if (actions && actions.length > 0) {
        dtColumns.push({
          data: null,
          title: actionHeader,
          orderable: false,
          searchable: false,
          className: "text-center",
          width: "1%",
          render: () => {
            const html = actions
              .map((a) => {
                const cls = a.className || "border-0 bg-transparent";
                return `
                  <button type="button" class="${cls}" title="${a.title}" data-dt-action="${a.id}">
                    <i class="${a.iconClass}"></i>
                  </button>
                `;
              })
              .join(" ");

            return `<div class="d-flex justify-content-center gap-1">${html}</div>`;
          },
        });
      }

      dtRef.current = $(selector)
        .on("click", "button[data-dt-action]", clickHandler)
        .DataTable({
          data,
          columns: dtColumns,
          pageLength: 10,
          lengthMenu: [10, 25, 50, 100],
          responsive: true,
          destroy: true,
          ordering: true,
          searching: true,
          paging: true,
          info: true,
        });
    }, 0);

    return () => {
      try {
        window.clearTimeout(t);
        $(selector).off("click", "button[data-dt-action]", clickHandler);
        if ($.fn.dataTable?.isDataTable?.(selector))
          $(selector).DataTable().destroy(true);
        dtRef.current = null;
      } catch {
        // ignore
      }
    };
  }, [actionHeader, actions, columns, data, id]);

  return <table id={id} className={tableClassName} />;
}
