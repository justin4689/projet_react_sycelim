import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";

const ENTITY_META: Record<
  string,
  { label: string; table: string; formColumns: number }
> = {
  users: { label: "Utilisateurs", table: "users", formColumns: 2 },
  products: { label: "Produits", table: "products", formColumns: 3 },
  orders: { label: "Commandes", table: "orders", formColumns: 2 },
};

type FieldItem = {
  name: string;
  label: string;
  type: string;
  required: boolean;
  colSpan: number;
};

type TableColumnItem = {
  name: string;
  label: string;
  sortable: boolean;
};

type EntityConfig = {
  form: {
    columns: number;
    fields: FieldItem[];
  };
  table: {
    columns: TableColumnItem[];
  };
};

const MOCK_CONFIGS: Record<string, EntityConfig> = {
  users: {
    form: {
      columns: 2,
      fields: [
        {
          name: "user_nom",
          label: "Nom",
          type: "string",
          required: true,
          colSpan: 1,
        },
        {
          name: "user_email",
          label: "Email",
          type: "email",
          required: true,
          colSpan: 2,
        },
      ],
    },
    table: {
      columns: [
        { name: "user_nom", label: "Nom", sortable: true },
        { name: "user_email", label: "Email", sortable: false },
      ],
    },
  },
  products: {
    form: {
      columns: 3,
      fields: [
        {
          name: "title",
          label: "Libellé",
          type: "string",
          required: true,
          colSpan: 2,
        },
        {
          name: "price",
          label: "Prix",
          type: "number",
          required: true,
          colSpan: 1,
        },
      ],
    },
    table: {
      columns: [
        { name: "title", label: "Libellé", sortable: true },
        { name: "price", label: "Prix", sortable: true },
      ],
    },
  },
  orders: {
    form: {
      columns: 2,
      fields: [
        {
          name: "date",
          label: "Date",
          type: "date",
          required: true,
          colSpan: 1,
        },
        {
          name: "status",
          label: "Statut",
          type: "string",
          required: true,
          colSpan: 1,
        },
      ],
    },
    table: {
      columns: [
        { name: "date", label: "Date", sortable: true },
        { name: "status", label: "Statut", sortable: false },
      ],
    },
  },
};

export default function ConfigEntityDetailsPage() {
  const { entity } = useParams();
  const key = (entity ?? "").toLowerCase();
  const meta = ENTITY_META[key];

  const initialConfig = useMemo<EntityConfig | undefined>(
    () => MOCK_CONFIGS[key],
    [key],
  );

  const [entityName, setEntityName] = useState(key);
  const [tableName, setTableName] = useState(meta?.table ?? key);
  const [config, setConfig] = useState<EntityConfig | undefined>(initialConfig);
  const [activeTab, setActiveTab] = useState<"form" | "table">("form");

  const [editingMeta, setEditingMeta] = useState<
    null | "entityName" | "tableName" | "formColumns"
  >(null);
  const [draftEntityName, setDraftEntityName] = useState(key);
  const [draftTableName, setDraftTableName] = useState(meta?.table ?? key);

  const [selectedFormIndex, setSelectedFormIndex] = useState<number>(0);
  const [selectedTableIndex, setSelectedTableIndex] = useState<number>(0);
  const [isDirty, setIsDirty] = useState(false);

  useEffect(() => {
    setEntityName(key);
    setTableName(meta?.table ?? key);
    setDraftEntityName(key);
    setDraftTableName(meta?.table ?? key);
    setConfig(initialConfig);
    setActiveTab("form");
    setSelectedFormIndex(0);
    setSelectedTableIndex(0);
    setIsDirty(false);
  }, [initialConfig, key, meta?.table]);

  const cancelMetaEdit = () => {
    setDraftEntityName(entityName);
    setDraftTableName(tableName);
    setEditingMeta(null);
  };

  const commitEntityName = () => {
    if (draftEntityName !== entityName) {
      setEntityName(draftEntityName);
      setIsDirty(true);
    }
    setEditingMeta(null);
  };

  const commitTableName = () => {
    if (draftTableName !== tableName) {
      setTableName(draftTableName);
      setIsDirty(true);
    }
    setEditingMeta(null);
  };

  const formFields = config?.form.fields ?? [];
  const tableColumns = config?.table.columns ?? [];

  const selectedFormField = formFields[selectedFormIndex];
  const selectedTableColumn = tableColumns[selectedTableIndex];

  const updateConfig = (patch: Partial<EntityConfig>) => {
    setConfig((prev) => {
      if (!prev) return prev;
      return { ...prev, ...patch };
    });
    setIsDirty(true);
  };

  const updateFormField = (patch: Partial<FieldItem>) => {
    setConfig((prev) => {
      if (!prev) return prev;
      const next = [...prev.form.fields];
      const current = next[selectedFormIndex];
      if (!current) return prev;
      next[selectedFormIndex] = { ...current, ...patch };
      return { ...prev, form: { ...prev.form, fields: next } };
    });
    setIsDirty(true);
  };

  const updateTableColumn = (patch: Partial<TableColumnItem>) => {
    setConfig((prev) => {
      if (!prev) return prev;
      const next = [...prev.table.columns];
      const current = next[selectedTableIndex];
      if (!current) return prev;
      next[selectedTableIndex] = { ...current, ...patch };
      return { ...prev, table: { ...prev.table, columns: next } };
    });
    setIsDirty(true);
  };

  const addFormField = () => {
    setConfig((prev) => {
      if (!prev) return prev;
      const next = [
        ...prev.form.fields,
        {
          name: "new_field",
          label: "Nouveau champ",
          type: "string",
          required: false,
          colSpan: 1,
        },
      ];
      return { ...prev, form: { ...prev.form, fields: next } };
    });
    setSelectedFormIndex(formFields.length);
    setActiveTab("form");
    setIsDirty(true);
  };

  const deleteSelectedFormField = () => {
    setConfig((prev) => {
      if (!prev) return prev;
      const next = prev.form.fields.filter(
        (_, idx) => idx !== selectedFormIndex,
      );
      return { ...prev, form: { ...prev.form, fields: next } };
    });
    setSelectedFormIndex((i) => Math.max(0, i - 1));
    setIsDirty(true);
  };

  const addTableColumn = () => {
    setConfig((prev) => {
      if (!prev) return prev;
      const next = [
        ...prev.table.columns,
        {
          name: "new_column",
          label: "Nouvelle colonne",
          sortable: false,
        },
      ];
      return { ...prev, table: { ...prev.table, columns: next } };
    });
    setSelectedTableIndex(tableColumns.length);
    setActiveTab("table");
    setIsDirty(true);
  };

  const deleteSelectedTableColumn = () => {
    setConfig((prev) => {
      if (!prev) return prev;
      const next = prev.table.columns.filter(
        (_, idx) => idx !== selectedTableIndex,
      );
      return { ...prev, table: { ...prev.table, columns: next } };
    });
    setSelectedTableIndex((i) => Math.max(0, i - 1));
    setIsDirty(true);
  };

  return (
    <div className="">
      <div className="">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <div className="page-title-box">
                <div className="page-title-right">
                  <Link to="/dashboard/configurations">
                    <button className="btn btn-outline-primary mx-12">
                      Retour
                    </button>
                  </Link>
                  <button
                    className="btn btn-primary mx-12"
                    disabled={!meta || !isDirty}
                    title={
                      !meta ? "Entité inconnue" : "Sauvegarde API à brancher"
                    }
                  >
                    Enregistrer
                  </button>
                  <button
                    className="btn btn-outline-primary mx-12"
                    disabled={!meta}
                    onClick={addFormField}
                    title="Ajouter un champ au formulaire"
                    type="button"
                  >
                    + Champ
                  </button>
                  <button
                    className="btn btn-outline-primary mx-12"
                    disabled={!meta}
                    onClick={addTableColumn}
                    title="Ajouter une colonne au tableau"
                    type="button"
                  >
                    + Colonne
                  </button>
                </div>
                <h4 className="page-title">Configuration</h4>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-12">
              <div className="card">
                <div className="card-body py-3 px-0 overflow-hidden">
                  <h4 className="header-title m-0 ps-3">Détails entité</h4>
                  <hr />

                  {!meta || !config ? (
                    <div className="px-3 text-danger">
                      Entité inconnue: {entity}
                    </div>
                  ) : (
                    <div className="row gy-3 gx-3 px-3">
                      <div className="col-12 col-md-4">
                        <div className="card my-0 shadow-none border">
                          <div className="card-body">
                            <div className="text-muted">Nom entité</div>
                            {editingMeta === "entityName" ? (
                              <input
                                className="form-control"
                                value={draftEntityName}
                                autoFocus
                                onChange={(e) =>
                                  setDraftEntityName(e.target.value)
                                }
                                onKeyDown={(e) => {
                                  if (e.key === "Enter") commitEntityName();
                                  if (e.key === "Escape") cancelMetaEdit();
                                }}
                                onBlur={commitEntityName}
                              />
                            ) : (
                              <div
                                role="button"
                                tabIndex={0}
                                className="fw-semibold"
                                onClick={() => {
                                  setDraftEntityName(entityName);
                                  setEditingMeta("entityName");
                                }}
                                onKeyDown={(e) => {
                                  if (e.key === "Enter") {
                                    setDraftEntityName(entityName);
                                    setEditingMeta("entityName");
                                  }
                                }}
                              >
                                {entityName || "—"}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="col-12 col-md-4">
                        <div className="card my-0 shadow-none border">
                          <div className="card-body">
                            <div className="text-muted">Table</div>
                            {editingMeta === "tableName" ? (
                              <input
                                className="form-control"
                                value={draftTableName}
                                autoFocus
                                onChange={(e) =>
                                  setDraftTableName(e.target.value)
                                }
                                onKeyDown={(e) => {
                                  if (e.key === "Enter") commitTableName();
                                  if (e.key === "Escape") cancelMetaEdit();
                                }}
                                onBlur={commitTableName}
                              />
                            ) : (
                              <div
                                role="button"
                                tabIndex={0}
                                className="fw-semibold"
                                onClick={() => {
                                  setDraftTableName(tableName);
                                  setEditingMeta("tableName");
                                }}
                                onKeyDown={(e) => {
                                  if (e.key === "Enter") {
                                    setDraftTableName(tableName);
                                    setEditingMeta("tableName");
                                  }
                                }}
                              >
                                {tableName || "—"}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="col-12 col-md-4">
                        <div className="card my-0 shadow-none border">
                          <div className="card-body">
                            <div className="text-muted">
                              Colonnes formulaire
                            </div>
                            {editingMeta === "formColumns" ? (
                              <select
                                className="form-select"
                                value={String(config.form.columns)}
                                autoFocus
                                onChange={(e) =>
                                  updateConfig({
                                    form: {
                                      ...config.form,
                                      columns: Number(e.target.value),
                                    },
                                  })
                                }
                                onBlur={() => setEditingMeta(null)}
                                onKeyDown={(e) => {
                                  if (e.key === "Escape") cancelMetaEdit();
                                  if (e.key === "Enter") setEditingMeta(null);
                                }}
                              >
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                              </select>
                            ) : (
                              <div
                                role="button"
                                tabIndex={0}
                                className="fw-semibold"
                                onClick={() => setEditingMeta("formColumns")}
                                onKeyDown={(e) => {
                                  if (e.key === "Enter")
                                    setEditingMeta("formColumns");
                                }}
                              >
                                {config.form.columns} colonne(s)
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {meta && config && (
                    <>
                      <hr />

                      <div className="px-3">
                        <ul className="nav nav-tabs mb-3">
                          <li className="nav-item">
                            <button
                              type="button"
                              className={`nav-link ${activeTab === "form" ? "active" : ""}`}
                              onClick={() => setActiveTab("form")}
                            >
                              Champs formulaire
                            </button>
                          </li>
                          <li className="nav-item">
                            <button
                              type="button"
                              className={`nav-link ${activeTab === "table" ? "active" : ""}`}
                              onClick={() => setActiveTab("table")}
                            >
                              Colonnes tableau
                            </button>
                          </li>
                        </ul>
                      </div>

                      <div className="row px-3">
                        <div className="col-12 col-xl-5">
                          <div className="card shadow-none border">
                            <div className="card-body">
                              <div className="d-flex justify-content-between align-items-center">
                                <h5 className="m-0">
                                  {activeTab === "form" ? "Champs" : "Colonnes"}
                                </h5>
                                <div className="d-flex align-items-center gap-2">
                                  <span className="text-muted">
                                    {activeTab === "form"
                                      ? `${formFields.length} champ(s)`
                                      : `${tableColumns.length} colonne(s)`}
                                  </span>
                                  <button
                                    type="button"
                                    className="btn btn-sm btn-outline-primary"
                                    onClick={
                                      activeTab === "form"
                                        ? addFormField
                                        : addTableColumn
                                    }
                                  >
                                    + Ajouter
                                  </button>
                                </div>
                              </div>
                              <hr />

                              <div className="list-group">
                                {activeTab === "form"
                                  ? formFields.map((f, idx) => {
                                      const active = idx === selectedFormIndex;
                                      return (
                                        <button
                                          key={`${f.name}-${idx}`}
                                          type="button"
                                          className={`list-group-item list-group-item-action d-flex justify-content-between align-items-start ${
                                            active ? "active" : ""
                                          }`}
                                          onClick={() =>
                                            setSelectedFormIndex(idx)
                                          }
                                        >
                                          <div className="me-2">
                                            <div className="fw-semibold">
                                              {f.label}
                                            </div>
                                            <div
                                              className={
                                                active
                                                  ? "text-white-50"
                                                  : "text-muted"
                                              }
                                            >
                                              {f.name} • {f.type}
                                            </div>
                                          </div>
                                          <div className="text-end">
                                            {f.required ? (
                                              <span
                                                className={`badge ${
                                                  active
                                                    ? "bg-light text-dark"
                                                    : "bg-primary"
                                                }`}
                                              >
                                                requis
                                              </span>
                                            ) : (
                                              <span
                                                className={`badge ${
                                                  active
                                                    ? "bg-light text-dark"
                                                    : "bg-secondary"
                                                }`}
                                              >
                                                optionnel
                                              </span>
                                            )}
                                          </div>
                                        </button>
                                      );
                                    })
                                  : tableColumns.map((c, idx) => {
                                      const active = idx === selectedTableIndex;
                                      return (
                                        <button
                                          key={`${c.name}-${idx}`}
                                          type="button"
                                          className={`list-group-item list-group-item-action d-flex justify-content-between align-items-start ${
                                            active ? "active" : ""
                                          }`}
                                          onClick={() =>
                                            setSelectedTableIndex(idx)
                                          }
                                        >
                                          <div className="me-2">
                                            <div className="fw-semibold">
                                              {c.label}
                                            </div>
                                            <div
                                              className={
                                                active
                                                  ? "text-white-50"
                                                  : "text-muted"
                                              }
                                            >
                                              {c.name}
                                            </div>
                                          </div>
                                          <div className="text-end">
                                            {c.sortable ? (
                                              <span
                                                className={`badge ${
                                                  active
                                                    ? "bg-light text-dark"
                                                    : "bg-primary"
                                                }`}
                                              >
                                                tri
                                              </span>
                                            ) : (
                                              <span
                                                className={`badge ${
                                                  active
                                                    ? "bg-light text-dark"
                                                    : "bg-secondary"
                                                }`}
                                              >
                                                no-tri
                                              </span>
                                            )}
                                          </div>
                                        </button>
                                      );
                                    })}
                              </div>

                              {isDirty && (
                                <div className="mt-3">
                                  <span className="badge bg-warning text-dark">
                                    Modifications non enregistrées
                                  </span>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>

                        <div className="col-12 col-xl-7">
                          <div className="card shadow-none border">
                            <div className="card-body">
                              <div className="d-flex justify-content-between align-items-center">
                                <h5 className="m-0">
                                  {activeTab === "form"
                                    ? "Éditeur du champ"
                                    : "Éditeur de la colonne"}
                                </h5>
                                <span
                                  className="text-muted text-truncate"
                                  style={{ maxWidth: 320 }}
                                >
                                  {activeTab === "form"
                                    ? selectedFormField
                                      ? selectedFormField.name
                                      : "—"
                                    : selectedTableColumn
                                      ? selectedTableColumn.name
                                      : "—"}
                                </span>
                              </div>
                              <hr />

                              {activeTab === "form" ? (
                                !selectedFormField ? (
                                  <div className="text-muted">
                                    Sélectionne un champ à gauche.
                                  </div>
                                ) : (
                                  <div className="row g-3">
                                    <div className="col-12 col-md-6">
                                      <label className="form-label">
                                        Label
                                      </label>
                                      <input
                                        className="form-control"
                                        value={selectedFormField.label}
                                        onChange={(e) =>
                                          updateFormField({
                                            label: e.target.value,
                                          })
                                        }
                                      />
                                    </div>

                                    <div className="col-12 col-md-6">
                                      <label className="form-label">
                                        Nom (clé)
                                      </label>
                                      <input
                                        className="form-control"
                                        value={selectedFormField.name}
                                        onChange={(e) =>
                                          updateFormField({
                                            name: e.target.value,
                                          })
                                        }
                                      />
                                    </div>

                                    <div className="col-12 col-md-6">
                                      <label className="form-label">Type</label>
                                      <select
                                        className="form-select"
                                        value={selectedFormField.type}
                                        onChange={(e) =>
                                          updateFormField({
                                            type: e.target.value,
                                          })
                                        }
                                      >
                                        <option value="string">string</option>
                                        <option value="email">email</option>
                                        <option value="number">number</option>
                                        <option value="date">date</option>
                                        <option value="password">
                                          password
                                        </option>
                                        <option value="file">file</option>
                                      </select>
                                    </div>

                                    <div className="col-12 col-md-3">
                                      <label className="form-label">
                                        Requis
                                      </label>
                                      <select
                                        className="form-select"
                                        value={
                                          selectedFormField.required
                                            ? "true"
                                            : "false"
                                        }
                                        onChange={(e) =>
                                          updateFormField({
                                            required: e.target.value === "true",
                                          })
                                        }
                                      >
                                        <option value="false">Non</option>
                                        <option value="true">Oui</option>
                                      </select>
                                    </div>

                                    <div className="col-12 col-md-3">
                                      <label className="form-label">
                                        ColSpan
                                      </label>
                                      <select
                                        className="form-select"
                                        value={String(
                                          selectedFormField.colSpan,
                                        )}
                                        onChange={(e) =>
                                          updateFormField({
                                            colSpan: Number(e.target.value),
                                          })
                                        }
                                      >
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                        <option value="4">4</option>
                                      </select>
                                    </div>

                                    <div className="col-12 d-flex justify-content-end gap-2">
                                      <button
                                        type="button"
                                        className="btn btn-outline-danger"
                                        disabled={formFields.length === 0}
                                        onClick={deleteSelectedFormField}
                                      >
                                        Supprimer
                                      </button>
                                    </div>
                                  </div>
                                )
                              ) : !selectedTableColumn ? (
                                <div className="text-muted">
                                  Sélectionne une colonne à gauche.
                                </div>
                              ) : (
                                <div className="row g-3">
                                  <div className="col-12 col-md-6">
                                    <label className="form-label">Label</label>
                                    <input
                                      className="form-control"
                                      value={selectedTableColumn.label}
                                      onChange={(e) =>
                                        updateTableColumn({
                                          label: e.target.value,
                                        })
                                      }
                                    />
                                  </div>

                                  <div className="col-12 col-md-6">
                                    <label className="form-label">
                                      Nom (clé)
                                    </label>
                                    <input
                                      className="form-control"
                                      value={selectedTableColumn.name}
                                      onChange={(e) =>
                                        updateTableColumn({
                                          name: e.target.value,
                                        })
                                      }
                                    />
                                  </div>

                                  <div className="col-12 col-md-6">
                                    <label className="form-label">
                                      Tri (sortable)
                                    </label>
                                    <select
                                      className="form-select"
                                      value={
                                        selectedTableColumn.sortable
                                          ? "true"
                                          : "false"
                                      }
                                      onChange={(e) =>
                                        updateTableColumn({
                                          sortable: e.target.value === "true",
                                        })
                                      }
                                    >
                                      <option value="false">Non</option>
                                      <option value="true">Oui</option>
                                    </select>
                                  </div>

                                  <div className="col-12 d-flex justify-content-end gap-2">
                                    <button
                                      type="button"
                                      className="btn btn-outline-danger"
                                      disabled={tableColumns.length === 0}
                                      onClick={deleteSelectedTableColumn}
                                    >
                                      Supprimer
                                    </button>
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </>
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
