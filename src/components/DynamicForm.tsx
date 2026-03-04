import React, { useState, useEffect } from "react";
import type { FormConfig } from "@/lib/types/formConfig";
import { Link, useParams } from "react-router-dom";
import { useConfigByName } from "@/hook/queries/useConfig";
import type {
  ConfigDetailResponse,
  ConfigFormField,
} from "@/lib/types/config.types";

type ButtonItem = { label: string };

const EMPTY_OBJ: Record<string, any> = {};

const shallowEqualRecord = (
  a: Record<string, any>,
  b: Record<string, any>,
): boolean => {
  if (a === b) return true;

  const aKeys = Object.keys(a);
  const bKeys = Object.keys(b);
  if (aKeys.length !== bKeys.length) return false;

  for (const k of aKeys) {
    if (a[k] !== b[k]) return false;
  }

  return true;
};

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

interface DynamicFormProps {
  config?: FormConfig;
  configData?: ConfigDetailResponse;
  onSubmit: (data: Record<string, any>) => void;
  initialData?: Record<string, any>;
}

const DynamicForm: React.FC<DynamicFormProps> = ({
  configData: configDataProp,
  onSubmit,
  initialData,
}) => {
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [columns, setColumns] = useState<number>(3);

  const initialDataSafe = initialData ?? EMPTY_OBJ;

  const { entity } = useParams();
  const {
    data: configDataQuery,
    isLoading,
    error,
  } = useConfigByName<ConfigDetailResponse>(entity);

  const configData = configDataProp ?? configDataQuery;
  const hasApiConfig = Boolean(configData?.config?.form?.fields);

  const apiButtons = normalizeButtons(configData?.config?.buttons);

  useEffect(() => {
    const initialFormData: Record<string, any> = {};

    if (hasApiConfig && configData) {
      (configData.config.form.fields ?? []).forEach((field) => {
        const name = field.name;
        const incoming = initialDataSafe?.[name];
        if (field.type === "checkbox") {
          initialFormData[name] = Boolean(incoming);
        } else {
          initialFormData[name] = incoming ?? "";
        }
      });

      setFormData((prev) =>
        shallowEqualRecord(prev, initialFormData) ? prev : initialFormData,
      );
      const nextColumns = configData.config.form.columns || 1;
      setColumns((prev) => (prev === nextColumns ? prev : nextColumns));
      return;
    }
  }, [configData, hasApiConfig, initialDataSafe]);

  const handleInputChange = (name: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleReset = () => {
    const resetData: Record<string, any> = {};

    if (hasApiConfig && configData) {
      (configData.config.form.fields ?? []).forEach((field) => {
        resetData[field.name] = field.type === "checkbox" ? false : "";
      });
      setFormData(resetData);
      return;
    }

    setFormData(resetData);
  };

  const renderApiField = (field: ConfigFormField) => {
    const value = formData[field.name];
    const required = field.required;

    if (field.type === "select") {
      return (
        <select
          className="form-select"
          id={field.name}
          value={value ?? ""}
          required={required}
          onChange={(e) => handleInputChange(field.name, e.target.value)}
        >
          <option value="">Sélectionnez...</option>
          {(field.options ?? []).map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      );
    }

    if (field.type === "checkbox") {
      return (
        <div className="form-check">
          <input
            type="checkbox"
            className="form-check-input"
            id={field.name}
            checked={Boolean(value)}
            onChange={(e) => handleInputChange(field.name, e.target.checked)}
          />
          <label className="form-check-label" htmlFor={field.name}>
            {field.label}
            {required && <span className="text-danger">*</span>}
          </label>
        </div>
      );
    }

    if (field.type === "textarea") {
      return (
        <textarea
          className="form-control"
          id={field.name}
          placeholder={`Entrer ${field.label}`}
          value={value ?? ""}
          required={required}
          onChange={(e) => handleInputChange(field.name, e.target.value)}
        />
      );
    }

    const inputType =
      field.type === "string"
        ? "text"
        : field.type === "password"
          ? "password"
          : field.type;

    return (
      <input
        type={inputType}
        className="form-control"
        id={field.name}
        placeholder={`Entrer ${field.label}`}
        value={value ?? ""}
        required={required}
        onChange={(e) => handleInputChange(field.name, e.target.value)}
      />
    );
  };

  // Grouper les champs par colonnes

  return (
    <div className="">
      <div className="content">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <div className="page-title-box">
                <div className="page-title-right">
                  <Link to={`/dashboard/${entity}/create`}>
                    <button
                      type="button"
                      className="btn btn-outline-primary mx-12"
                    >
                      {apiButtons?.[0]?.label}
                    </button>
                  </Link>

                  <Link to={`/dashboard/${entity}`}>
                    <button
                      type="button"
                      className="btn btn-outline-primary mx-12"
                    >
                      {apiButtons?.[1]?.label}
                    </button>
                  </Link>
                  <button
                    type="button"
                    className="btn btn-outline-primary mx-12"
                    data-bs-toggle="modal"
                    data-bs-target="#staticBackdrop"
                  >
                    {apiButtons?.[2]?.label}
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
                  {hasApiConfig
                    ? (configData?.label ?? configData?.entity ?? "")
                    : null}
                </h4>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-12">
              <div className="card">
                <div className="card-body py-3 px-0 overflow-hidden">
                  <h4 className="header-title mb-0 px-3">
                    {hasApiConfig ? "Nouveau " + configData?.label : null}
                  </h4>
                  <hr className="hr" />

                  {hasApiConfig && (isLoading || error || !configData) ? (
                    <div className="px-3">
                      {isLoading
                        ? "Chargement..."
                        : error
                          ? "Erreur lors du chargement"
                          : "Configuration introuvable"}
                    </div>
                  ) : null}

                  <form onSubmit={handleSubmit}>
                    {hasApiConfig && configData ? (
                      <div className="row px-3">
                        {(configData.config.form.fields ?? []).map((field) => {
                          const span = Math.max(1, field.colSpan || 1);
                          const col = Math.min(
                            12,
                            Math.max(1, Math.floor((12 / columns) * span)),
                          );

                          if (field.type === "checkbox") {
                            return (
                              <div key={field.name} className={`col-md-${col}`}>
                                {renderApiField(field)}
                              </div>
                            );
                          }

                          return (
                            <div key={field.name} className={`col-md-${col}`}>
                              <div className="mb-3 w-100">
                                <label
                                  htmlFor={field.name}
                                  className="form-label"
                                >
                                  {field.label}
                                  {field.required && (
                                    <span className="text-danger">*</span>
                                  )}
                                </label>
                                <div className="w-100">
                                  {renderApiField(field)}
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    ) : null}

                    <hr className="hr-button" />
                    <div className="d-flex justify-content-end px-4">
                      <button
                        type="reset"
                        className="btn btn-secondary mx-2"
                        onClick={handleReset}
                      >
                        Réinitialiser
                      </button>
                      <button type="submit" className="btn btn-primary mx-2">
                        Valider
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DynamicForm;
