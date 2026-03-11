import { useConfigDetail } from "@/hook/queries/useConfig";
import { queryKeys } from "@/hook/queries/keys";
import type {
  ConfigDetailResponse,
  ConfigFieldOption,
  FieldType,
} from "@/lib/types/config.types";
import { configService } from "@/services";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

type FieldItem = {
  name: string;
  label: string;
  type: FieldType;
  required: boolean;
  colSpan: number;
  options?: ConfigFieldOption[];
};

type TableColumnItem = {
  name: string;
  label: string;
  sortable: boolean;
};

type ButtonItem = {
  label: string;
};

type EntityConfig = {
  form: {
    columns: number;
    fields: FieldItem[];
  };
  table: {
    columns: TableColumnItem[];
  };
  buttons?: ButtonItem[];
};

const normalizeButtons = (value: unknown): ButtonItem[] => {
  if (Array.isArray(value)) {
    return value.filter(
      (b): b is ButtonItem =>
        typeof b === "object" && b !== null && "label" in b,
    );
  }

  if (typeof value === "object" && value !== null && "label" in value) {
    const label = (value as { label?: unknown }).label;
    if (typeof label === "string") {
      return [{ label }];
    }
  }

  return [];
};

export default function ConfigEntityDetailsPage() {
  const { id } = useParams();
  const queryClient = useQueryClient();
  const {
    data: configData,
    isLoading,
    error,
  } = useConfigDetail<ConfigDetailResponse>(id);

  const [entityName, setEntityName] = useState("");
  const [tableName, setTableName] = useState("");
  const [config, setConfig] = useState<EntityConfig | undefined>(undefined);
  const [activeTab, setActiveTab] = useState<"form" | "table">("form");

  const [editingMeta, setEditingMeta] = useState<
    null | "entityName" | "tableName" | "formColumns"
  >(null);
  const [draftEntityName, setDraftEntityName] = useState("");
  const [draftTableName, setDraftTableName] = useState("");

  const [selectedFormIndex, setSelectedFormIndex] = useState<number>(0);
  const [selectedTableIndex, setSelectedTableIndex] = useState<number>(0);
  const [isDirty, setIsDirty] = useState(false);

  const [saveError, setSaveError] = useState<string | null>(null);
  const [saveSuccess, setSaveSuccess] = useState<string | null>(null);

  const { mutate: saveConfig, isPending: isSaving } = useMutation({
    mutationFn: async () => {
      if (!configData?._id) {
        throw new Error("Config ID manquant");
      }

      if (!config) {
        throw new Error("Config manquante");
      }

      return configService.updateConfig({
        id: configData._id,
        data: {
          label: entityName,
          entity: tableName,
          config,
        },
      });
    },
    onMutate: () => {
      setSaveError(null);
      setSaveSuccess(null);
    },
    onSuccess: async () => {
      setIsDirty(false);
      setSaveSuccess("Enregistré");

      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: queryKeys.config.detail(configData?._id),
        }),
        queryClient.invalidateQueries({ queryKey: queryKeys.config.all }),
      ]);
    },
    onError: (err) => {
      const message = err instanceof Error ? err.message : "Erreur inconnue";
      setSaveError(message);
    },
  });

  useEffect(() => {
    if (!configData) return;

    const nextEntityName = configData.label ?? configData.entity;
    const nextTableName = configData.entity;

    setEntityName(nextEntityName);
    setTableName(nextTableName);
    setDraftEntityName(nextEntityName);
    setDraftTableName(nextTableName);
    setConfig(configData.config as unknown as EntityConfig);
    setActiveTab("form");
    setSelectedFormIndex(0);
    setSelectedTableIndex(0);
    setIsDirty(false);
  }, [configData]);

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
  const buttons = normalizeButtons(config?.buttons);

  const selectedFormField = formFields[selectedFormIndex];
  const selectedTableColumn = tableColumns[selectedTableIndex];

  const normalizeFieldForType = (field: FieldItem, nextType: FieldType) => {
    if (nextType === "select") {
      const nextOptions: ConfigFieldOption[] =
        field.options && field.options.length > 0
          ? field.options
          : [{ label: "Option 1", value: "option_1" }];

      return {
        ...field,
        type: nextType,
        options: nextOptions,
      };
    }

    if (nextType === "checkbox") {
      return {
        ...field,
        type: nextType,
        options: undefined,
      };
    }

    return {
      ...field,
      type: nextType,
      options: undefined,
    };
  };

  const updateConfig = (patch: Partial<EntityConfig>) => {
    setConfig((prev) => {
      if (!prev) return prev;
      return { ...prev, ...patch };
    });
    setIsDirty(true);
  };

  const addButton = () => {
    setConfig((prev) => {
      if (!prev) return prev;
      const currentButtons = normalizeButtons(prev.buttons);
      const nextButtons = [...currentButtons, { label: "Nouveau bouton" }];
      return { ...prev, buttons: nextButtons };
    });
    setIsDirty(true);
  };

  const updateButtonAt = (index: number, patch: Partial<ButtonItem>) => {
    setConfig((prev) => {
      if (!prev) return prev;
      const current = normalizeButtons(prev.buttons);
      const target = current[index];
      if (!target) return prev;
      const nextButtons = [...current];
      nextButtons[index] = { ...target, ...patch };
      return { ...prev, buttons: nextButtons };
    });
    setIsDirty(true);
  };

  const deleteButtonAt = (index: number) => {
    setConfig((prev) => {
      if (!prev) return prev;
      const current = normalizeButtons(prev.buttons);
      const nextButtons = current.filter((_, idx) => idx !== index);
      return { ...prev, buttons: nextButtons };
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

  const setFormFieldType = (nextType: FieldType) => {
    setConfig((prev) => {
      if (!prev) return prev;
      const next = [...prev.form.fields];
      const current = next[selectedFormIndex];
      if (!current) return prev;
      next[selectedFormIndex] = normalizeFieldForType(current, nextType);
      return { ...prev, form: { ...prev.form, fields: next } };
    });
    setIsDirty(true);
  };

  const updateOptionAt = (
    optionIndex: number,
    patch: Partial<ConfigFieldOption>,
  ) => {
    setConfig((prev) => {
      if (!prev) return prev;
      const nextFields = [...prev.form.fields];
      const current = nextFields[selectedFormIndex];
      if (!current) return prev;
      const currentOptions = current.options ?? [];
      const nextOptions = [...currentOptions];
      const opt = nextOptions[optionIndex];
      if (!opt) return prev;
      nextOptions[optionIndex] = { ...opt, ...patch };
      nextFields[selectedFormIndex] = { ...current, options: nextOptions };
      return { ...prev, form: { ...prev.form, fields: nextFields } };
    });
    setIsDirty(true);
  };

  const addOption = () => {
    setConfig((prev) => {
      if (!prev) return prev;
      const nextFields = [...prev.form.fields];
      const current = nextFields[selectedFormIndex];
      if (!current) return prev;
      const currentOptions = current.options ?? [];
      const nextIndex = currentOptions.length + 1;
      const nextOptions = [
        ...currentOptions,
        { label: `Option ${nextIndex}`, value: `option_${nextIndex}` },
      ];
      nextFields[selectedFormIndex] = { ...current, options: nextOptions };
      return { ...prev, form: { ...prev.form, fields: nextFields } };
    });
    setIsDirty(true);
  };

  const deleteOptionAt = (optionIndex: number) => {
    setConfig((prev) => {
      if (!prev) return prev;
      const nextFields = [...prev.form.fields];
      const current = nextFields[selectedFormIndex];
      if (!current) return prev;
      const currentOptions = current.options ?? [];
      const nextOptions = currentOptions.filter(
        (_, idx) => idx !== optionIndex,
      );
      nextFields[selectedFormIndex] = { ...current, options: nextOptions };
      return { ...prev, form: { ...prev.form, fields: nextFields } };
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
          type: "text" as FieldType,
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
                    disabled={!configData || !isDirty || isSaving}
                    title={
                      !configData
                        ? "Configuration introuvable"
                        : isSaving
                          ? "Enregistrement en cours"
                          : "Enregistrer"
                    }
                    onClick={() => saveConfig()}
                    type="button"
                  >
                    {isSaving ? "Enregistrement..." : "Enregistrer"}
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
                  <div className="d-flex justify-content-between align-items-center">
                    <h4 className="header-title m-0 ps-3">Détails entité</h4>

                    {isDirty && (
                      <div className="pe-3">
                        <span className="badge bg-warning text-dark ">
                          Modifications non enregistrées
                        </span>
                      </div>
                    )}
                  </div>
                  <hr />

                  {isLoading ? (
                    <div className="px-3">
                      {/* Skeleton métadonnées - 4 cartes */}
                      <div className="row gy-3 gx-3">
                        {[...Array(4)].map((_, i) => (
                          <div
                            key={`meta-skel-${i}`}
                            className="col-12 col-md-6"
                          >
                            <div className="card my-0 shadow-none border">
                              <div className="card-body">
                                <div
                                  className="placeholder placeholder-glow rounded"
                                  style={{ width: "40%", height: "14px" }}
                                />
                                <div
                                  className="placeholder placeholder-glow rounded mt-2"
                                  style={{ width: "70%", height: "20px" }}
                                />
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Skeleton onglets */}
                      <div className="mt-4 mb-3">
                        <div className="d-flex gap-3">
                          <div
                            className="placeholder placeholder-glow rounded"
                            style={{ width: "140px", height: "38px" }}
                          />
                          <div
                            className="placeholder placeholder-glow rounded"
                            style={{ width: "140px", height: "38px" }}
                          />
                        </div>
                      </div>

                      {/* Skeleton contenu 2 colonnes */}
                      <div className="row">
                        <div className="col-12 col-xl-5">
                          <div className="card shadow-none border">
                            <div className="card-body">
                              <div className="d-flex justify-content-between align-items-center mb-3">
                                <div
                                  className="placeholder placeholder-glow rounded"
                                  style={{ width: "80px", height: "20px" }}
                                />
                                <div
                                  className="placeholder placeholder-glow rounded"
                                  style={{ width: "100px", height: "30px" }}
                                />
                              </div>
                              <hr />
                              {/* Liste items */}
                              {[...Array(5)].map((_, i) => (
                                <div
                                  key={`list-skel-${i}`}
                                  className="d-flex justify-content-between align-items-center py-2"
                                >
                                  <div className="w-75">
                                    <div
                                      className="placeholder placeholder-glow rounded"
                                      style={{ width: "60%", height: "16px" }}
                                    />
                                    <div
                                      className="placeholder placeholder-glow rounded mt-1"
                                      style={{ width: "40%", height: "12px" }}
                                    />
                                  </div>
                                  <div
                                    className="placeholder placeholder-glow rounded"
                                    style={{ width: "50px", height: "20px" }}
                                  />
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                        <div className="col-12 col-xl-7">
                          <div className="card shadow-none border">
                            <div className="card-body">
                              <div className="d-flex justify-content-between align-items-center mb-3">
                                <div
                                  className="placeholder placeholder-glow rounded"
                                  style={{ width: "120px", height: "20px" }}
                                />
                                <div
                                  className="placeholder placeholder-glow rounded"
                                  style={{ width: "30%", height: "16px" }}
                                />
                              </div>
                              <hr />
                              {/* Formulaire skeleton */}
                              <div className="row g-3">
                                {[...Array(4)].map((_, i) => (
                                  <div
                                    key={`form-skel-${i}`}
                                    className="col-12 col-md-6"
                                  >
                                    <div
                                      className="placeholder placeholder-glow rounded"
                                      style={{ width: "30%", height: "14px" }}
                                    />
                                    <div
                                      className="placeholder placeholder-glow rounded mt-2"
                                      style={{ width: "100%", height: "38px" }}
                                    />
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : error ? (
                    <div className="px-3 text-danger">
                      Erreur lors du chargement de la configuration
                    </div>
                  ) : !configData || !config ? (
                    <div className="px-3 text-danger">
                      Configuration introuvable: {id}
                    </div>
                  ) : (
                    <div className="row gy-3 gx-3 px-3">
                      {saveError && (
                        <div className="col-12">
                          <div className="alert alert-danger mb-0">
                            {saveError}
                          </div>
                        </div>
                      )}
                      {saveSuccess && (
                        <div className="col-12">
                          <div className="alert alert-success mb-0">
                            {saveSuccess}
                          </div>
                        </div>
                      )}
                      <div className="col-12 col-md-6">
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
                      <div className="col-12 col-md-6">
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
                      <div className="col-12 col-md-6">
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
                      <div className="col-12 col-md-6">
                        <div className="card my-0 shadow-none border">
                          <div className="card-body">
                            <div className="text-muted">Boutons</div>
                            <div className="d-flex justify-content-between align-items-center mt-1">
                              <div className="text-muted">
                                {buttons.length} bouton(s)
                              </div>
                              <button
                                type="button"
                                className="btn btn-sm btn-outline-primary"
                                onClick={addButton}
                              >
                                + Ajouter
                              </button>
                            </div>

                            <div className="mt-2 d-grid gap-2">
                              {buttons.length === 0 ? (
                                <div className="text-muted">Aucun bouton.</div>
                              ) : (
                                buttons.map((b, idx) => (
                                  <div
                                    key={`${b.label}-${idx}`}
                                    className="d-flex gap-2"
                                  >
                                    <input
                                      className="form-control"
                                      value={b.label}
                                      onChange={(e) =>
                                        updateButtonAt(idx, {
                                          label: e.target.value,
                                        })
                                      }
                                    />
                                    <button
                                      type="button"
                                      className="btn btn-outline-danger"
                                      onClick={() => deleteButtonAt(idx)}
                                    >
                                      Supprimer
                                    </button>
                                  </div>
                                ))
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {configData && config && (
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
                                          setFormFieldType(
                                            e.target.value as FieldType,
                                          )
                                        }
                                      >
                                        <option value="text">text</option>
                                        <option value="email">email</option>
                                        <option value="number">number</option>
                                        <option value="date">date</option>
                                        <option value="password">
                                          password
                                        </option>
                                        <option value="file">file</option>
                                        <option value="textarea">
                                          textarea
                                        </option>
                                        <option value="select">select</option>
                                        <option value="checkbox">
                                          checkbox
                                        </option>
                                      </select>
                                    </div>

                                    {selectedFormField.type === "select" && (
                                      <div className="col-12">
                                        <div className="d-flex justify-content-between align-items-center">
                                          <label className="form-label m-0">
                                            Options
                                          </label>
                                          <button
                                            type="button"
                                            className="btn btn-sm btn-outline-primary"
                                            onClick={addOption}
                                          >
                                            + Ajouter une option
                                          </button>
                                        </div>

                                        <div className="mt-2 d-grid gap-2">
                                          {(
                                            selectedFormField.options ?? []
                                          ).map((opt, optIdx) => (
                                            <div
                                              key={`${opt.value}-${optIdx}`}
                                              className="row g-2 align-items-end"
                                            >
                                              <div className="col-12 col-md-5">
                                                <label className="form-label">
                                                  Label
                                                </label>
                                                <input
                                                  className="form-control"
                                                  value={opt.label}
                                                  onChange={(e) =>
                                                    updateOptionAt(optIdx, {
                                                      label: e.target.value,
                                                    })
                                                  }
                                                />
                                              </div>
                                              <div className="col-12 col-md-5">
                                                <label className="form-label">
                                                  Value
                                                </label>
                                                <input
                                                  className="form-control"
                                                  value={opt.value}
                                                  onChange={(e) =>
                                                    updateOptionAt(optIdx, {
                                                      value: e.target.value,
                                                    })
                                                  }
                                                />
                                              </div>
                                              <div className="col-12 col-md-2 d-grid">
                                                <button
                                                  type="button"
                                                  className="btn btn-outline-danger"
                                                  onClick={() =>
                                                    deleteOptionAt(optIdx)
                                                  }
                                                >
                                                  Supprimer
                                                </button>
                                              </div>
                                            </div>
                                          ))}

                                          {(selectedFormField.options ?? [])
                                            .length === 0 && (
                                            <div className="text-muted">
                                              Aucune option. Ajoute-en une.
                                            </div>
                                          )}
                                        </div>
                                      </div>
                                    )}

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
