import { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCreateConfig } from "@/hook/mutations/config/useCreateConfig";
import type { ConfigData } from "@/lib/types/config.types";

export default function ConfigEntityCreatePage() {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const createConfig = useCreateConfig();

  const [label, setLabel] = useState("");
  const [entity, setEntity] = useState("");
  const [config, setConfig] = useState<ConfigData | null>(null);
  const [configFileName, setConfigFileName] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [fileError, setFileError] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setFileError(null);
    setConfigFileName(file.name);

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const jsonContent = JSON.parse(event.target?.result as string);
        if (!jsonContent.form || !jsonContent.table) {
          setFileError("Le fichier JSON doit contenir 'form' et 'table'");
          setConfig(null);
          return;
        }
        setConfig(jsonContent);
      } catch {
        setFileError("Fichier JSON invalide");
        setConfig(null);
      }
    };
    reader.readAsText(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!label.trim() || !entity.trim()) {
      setError("Le label et le nom de l'entité sont requis");
      return;
    }

    if (!config) {
      setError("Veuillez charger un fichier de configuration JSON");
      return;
    }

    try {
      await createConfig.mutateAsync({
        label: label.trim(),
        entity: entity.trim().toLowerCase(),
        config,
      });
      navigate("/dashboard/configurations");
    } catch (err: any) {
      setError(err.message || "Erreur lors de la création");
    }
  };

  const clearFile = () => {
    setConfig(null);
    setConfigFileName("");
    setFileError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-12">
          <div className="page-title-box">
            <div className="page-title-right">
              <Link to="/dashboard/configurations">
                <button className="btn btn-outline-primary mx-12" type="button">
                  Retour
                </button>
              </Link>
            </div>
            <h4 className="page-title">Créer une entité</h4>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-12 col-lg-8">
          <div className="card">
            <div className="card-body">
              {error && <div className="alert alert-danger mb-3">{error}</div>}

              <form onSubmit={handleSubmit}>
                <div className="row g-3">
                  <div className="col-12 col-md-6">
                    <label className="form-label">
                      Label <span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      value={label}
                      onChange={(e) => setLabel(e.target.value)}
                      placeholder="Ex: Utilisateurs"
                      required
                    />
                  </div>

                  <div className="col-12 col-md-6">
                    <label className="form-label">
                      Nom de l'entité <span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      value={entity}
                      onChange={(e) =>
                        setEntity(
                          e.target.value.toLowerCase().replace(/\s+/g, "_"),
                        )
                      }
                      placeholder="Ex: users"
                      required
                    />
                 
                  </div>

                  <div className="col-12">
                    <label className="form-label">
                      Configuration (JSON){" "}
                      <span className="text-danger">*</span>
                    </label>
                    <div className="input-group">
                      <input
                        type="file"
                        className="form-control"
                        accept=".json,application/json"
                        onChange={handleFileChange}
                        ref={fileInputRef}
                        style={{ display: configFileName ? "none" : "block" }}
                      />
                      {configFileName && (
                        <>
                          <input
                            type="text"
                            className="form-control"
                            value={configFileName}
                            readOnly
                          />
                          <button
                            type="button"
                            className="btn btn-outline-danger"
                            onClick={clearFile}
                          >
                            <i className="uil uil-times" />
                          </button>
                        </>
                      )}
                    </div>
                    {fileError && (
                      <div className="text-danger mt-1">{fileError}</div>
                    )}
                    {config && (
                      <div className="text-success mt-1">
                        <i className="uil uil-check-circle me-1" />
                        Configuration valide chargée
                      </div>
                    )}
                    <small className="text-muted d-block mt-1">
                      Chargez un fichier JSON contenant la configuration
                      form/table
                    </small>
                  </div>

                  {config && (
                    <div className="col-12">
                      <label className="form-label">
                        Aperçu de la configuration
                      </label>
                      <div className="card bg-light">
                        <div className="card-body">
                          <div className="row">
                            <div className="col-md-6">
                              <h6>Formulaire</h6>
                              <ul className="list-unstyled mb-0">
                                <li>
                                  <small className="text-muted">
                                    Colonnes:{" "}
                                  </small>
                                  <span className="badge bg-primary">
                                    {config.form.columns}
                                  </span>
                                </li>
                                <li>
                                  <small className="text-muted">Champs: </small>
                                  <span className="badge bg-primary">
                                    {config.form.fields.length}
                                  </span>
                                </li>
                              </ul>
                            </div>
                            <div className="col-md-6">
                              <h6>Tableau</h6>
                              <ul className="list-unstyled mb-0">
                                <li>
                                  <small className="text-muted">
                                    Colonnes:{" "}
                                  </small>
                                  <span className="badge bg-primary">
                                    {config.table.columns.length}
                                  </span>
                                </li>
                              </ul>
                            </div>
                          </div>
                          {config.buttons && config.buttons.length > 0 && (
                            <div className="mt-2">
                              <small className="text-muted">Boutons: </small>
                              {config.buttons.map((btn, idx) => (
                                <span
                                  key={idx}
                                  className="badge bg-secondary me-1"
                                >
                                  {btn.label}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="col-12">
                    <hr />
                    <div className="d-flex gap-2">
                      <button
                        type="submit"
                        className="btn btn-primary"
                        disabled={createConfig.isPending || !config}
                      >
                        {createConfig.isPending ? (
                          <>
                            <span
                              className="spinner-border spinner-border-sm me-1"
                              role="status"
                              aria-hidden="true"
                            />
                            Création...
                          </>
                        ) : (
                          "Créer l'entité"
                        )}
                      </button>
                      <Link
                        to="/dashboard/configurations"
                        className="btn btn-outline-secondary"
                      >
                        Annuler
                      </Link>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>

        <div className="col-12 col-lg-4">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Structure JSON attendue</h5>
              <p className="text-muted small">
                Le fichier JSON doit contenir les propriétés suivantes:
              </p>
              <ul className="list-unstyled small">
                <li>
                  <code className="text-primary">form.columns</code> - Nombre de
                  colonnes
                </li>
                <li>
                  <code className="text-primary">form.fields</code> - Tableau
                  des champs
                </li>
                <li>
                  <code className="text-primary">table.columns</code> - Tableau
                  des colonnes
                </li>
                <li>
                  <code className="text-primary">buttons</code> - Boutons
                  (optionnel)
                </li>
              </ul>
              <hr />
              <a
                href="#"
                className="text-primary small"
                onClick={(e) => {
                  e.preventDefault();
                  const sample = {
                    form: {
                      columns: 2,
                      fields: [
                        {
                          name: "nom",
                          label: "Nom",
                          type: "text",
                          required: true,
                          colSpan: 1,
                        },
                      ],
                    },
                    table: {
                      columns: [{ name: "nom", label: "Nom", sortable: true }],
                    },
                    buttons: [{ label: "Nouveau" }],
                  };
                  const blob = new Blob([JSON.stringify(sample, null, 2)], {
                    type: "application/json",
                  });
                  const url = URL.createObjectURL(blob);
                  const a = document.createElement("a");
                  a.href = url;
                  a.download = "exemple-config.json";
                  a.click();
                  URL.revokeObjectURL(url);
                }}
              >
                <i className="uil uil-download-alt me-1" />
                Télécharger un exemple
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
