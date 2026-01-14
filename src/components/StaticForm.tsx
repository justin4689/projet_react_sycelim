import React from "react";
import { Link } from "react-router-dom";

const StaticForm: React.FC = () => {
  return (
    <div className="content">
      <div className="container-fluid">
        <div className="row">
          <div className="col-12">
            <div className="page-title-box">
              <div className="page-title-right">
                <Link to="/dashboard/user-create">
                  <button className="btn btn-outline-primary mx-12">
                    Nouveau
                  </button>
                </Link>
                <Link to="/dashboard">
                  <button className="btn btn-outline-primary mx-12">
                    Lister
                  </button>
                </Link>
                <button className="btn btn-outline-primary mx-12"
                data-bs-toggle="modal"
                data-bs-target="#staticBackdrop">
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
              <h4 className="page-title">Formulaires</h4>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-12">
            <div className="card mb-3">
              <div className="card-body py-3 px-0 overflow-hidden">
                <h4 className="header-title mb-0 px-3">Formulaire 1 colonne</h4>
                <hr className="hr" />
                <form>
                  <input
                    type="hidden"
                    name="hiddenField"
                    value="valeur_cachee"
                  />
                  <div className="row px-3">
                    <div className="col-md-12">
                      <div className="mb-3 w-100">
                        <label className="form-label">
                          Nom <span className="text-danger">*</span>
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Nom"
                        />
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="mb-3 w-100">
                        <label className="form-label">
                          Prenom <span className="text-danger">*</span>
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Prenom"
                        />
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="mb-3 w-100">
                        <label className="form-label">
                          Date de naissance{" "}
                          <span className="text-danger">*</span>
                        </label>
                        <input type="date" className="form-control" />
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="mb-3 w-100">
                        <label className="form-label">
                          Mot de passe <span className="text-danger">*</span>
                        </label>
                        <input
                          type="password"
                          className="form-control"
                          placeholder="Mot de passe"
                        />
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="mb-3 w-100">
                        <label className="form-label">
                          Confirmer le mot de passe{" "}
                          <span className="text-danger">*</span>
                        </label>
                        <input
                          type="password"
                          className="form-control"
                          placeholder="Mot de passe confirmation"
                        />
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="mb-3 w-100">
                        <label className="form-label">
                          Genre <span className="text-danger">*</span>
                        </label>
                        <select className="form-select">
                          <option value="">Sélectionnez...</option>
                          <option value="opt1">Masculin</option>
                          <option value="opt2">Feminin</option>
                        </select>
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="mb-3 w-100">
                        <label className="form-label">
                          Fichier <span className="text-danger">*</span>
                        </label>
                        <input type="file" className="form-control" />
                      </div>
                    </div>

                    <div className="col-md-12">
                      <div className="mb-3 w-100">
                        <label className="form-label">
                          Activation <span className="text-danger">*</span>
                        </label>
                        <select className="form-select">
                          <option value="">Sélectionnez...</option>
                          <option value="opt1">Oui</option>
                          <option value="opt2">Non</option>
                        </select>
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="mb-3 w-100">
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            id="form1CheckConditions"
                          />
                          <label
                            className="form-check-label"
                            htmlFor="form1CheckConditions"
                          >
                            J'accepte les conditions générales
                          </label>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div
                        className="tab-pane show active"
                        id="custom-switch-preview"
                      >
                        <div className="form-check form-switch">
                          <input
                            type="checkbox"
                            className="form-check-input"
                            id="customSwitch1"
                          />
                          <label
                            className="form-check-label"
                            htmlFor="customSwitch1"
                          >
                            Activer ou désactiver ce commutateur
                          </label>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="mt-3">
                        <div className="form-check">
                          <input
                            type="radio"
                            id="customRadio1"
                            name="customRadio"
                            className="form-check-input"
                          />
                          <label
                            className="form-check-label"
                            htmlFor="customRadio1"
                          >
                            Sélectionner cette option
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                  <hr className="hr-button" />
                  <div className="d-flex justify-content-end px-4">
                    <button type="reset" className="btn btn-secondary mx-2">
                      Réinitialiser
                    </button>
                    <button type="submit" className="btn btn-primary mx-2">
                      Valider
                    </button>
                  </div>
                </form>
              </div>
            </div>

            <div className="card mb-3">
              <div className="card-body py-3 px-0 overflow-hidden">
                <h4 className="header-title mb-0 px-3">
                  Formulaire 2 colonnes
                </h4>
                <hr className="hr" />
                <form>
                  <input
                    type="hidden"
                    name="hiddenField2"
                    value="valeur_cachee"
                  />
                  <div className="row px-3">
                    <div className="col-md-6">
                      <div className="mb-3 w-100">
                        <label className="form-label">
                          Nom <span className="text-danger">*</span>
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Nom"
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="mb-3 w-100">
                        <label className="form-label">
                          Prenom <span className="text-danger">*</span>
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Prenom"
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="mb-3 w-100">
                        <label className="form-label">
                          Date de naissance{" "}
                          <span className="text-danger">*</span>
                        </label>
                        <input type="date" className="form-control" />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="mb-3 w-100">
                        <label className="form-label">
                          Mot de passe <span className="text-danger">*</span>
                        </label>
                        <input
                          type="password"
                          className="form-control"
                          placeholder="Mot de passe"
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="mb-3 w-100">
                        <label className="form-label">
                          Confirmer le mot de passe{" "}
                          <span className="text-danger">*</span>
                        </label>
                        <input
                          type="password"
                          className="form-control"
                          placeholder="Mot de passe confirmation"
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="mb-3 w-100">
                        <label className="form-label">
                          Genre <span className="text-danger">*</span>
                        </label>
                        <select className="form-select">
                          <option value="">Sélectionnez...</option>
                          <option value="opt1">Masculin</option>
                          <option value="opt2">Feminin</option>
                        </select>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="mb-3 w-100">
                        <label className="form-label">
                          Fichier <span className="text-danger">*</span>
                        </label>
                        <input type="file" className="form-control" />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="mb-3 w-100">
                        <label className="form-label">
                          Activation <span className="text-danger">*</span>
                        </label>
                        <select className="form-select">
                          <option value="">Sélectionnez...</option>
                          <option value="opt1">Oui</option>
                          <option value="opt2">Non</option>
                        </select>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="mb-3 w-100">
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            id="form2CheckConditions"
                          />
                          <label
                            className="form-check-label"
                            htmlFor="form2CheckConditions"
                          >
                            J'accepte les conditions générales
                          </label>
                        </div>
                      </div>
                    </div>

                    <div className="col-md-6">
                      <div
                        className="tab-pane show active"
                        id="custom-switch-preview"
                      >
                        <div className="form-check form-switch">
                          <input
                            type="checkbox"
                            className="form-check-input"
                            id="customSwitch1"
                          />
                          <label
                            className="form-check-label"
                            htmlFor="customSwitch1"
                          >
                            Activer ou désactiver ce commutateur
                          </label>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="mt-3">
                        <div className="form-check">
                          <input
                            type="radio"
                            id="customRadio1"
                            name="customRadio"
                            className="form-check-input"
                          />
                          <label
                            className="form-check-label"
                            htmlFor="customRadio1"
                          >
                            Sélectionner cette option
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                  <hr className="hr-button" />
                  <div className="d-flex justify-content-end px-4">
                    <button type="reset" className="btn btn-secondary mx-2">
                      Réinitialiser
                    </button>
                    <button type="submit" className="btn btn-primary mx-2">
                      Valider
                    </button>
                  </div>
                </form>
              </div>
            </div>

            <div className="card mb-3">
              <div className="card-body py-3 px-0 overflow-hidden">
                <h4 className="header-title mb-0 px-3">
                  Formulaire 3 colonnes
                </h4>
                <hr className="hr" />
                <form>
                  <input
                    type="hidden"
                    name="hiddenField3"
                    value="valeur_cachee"
                  />
                  <div className="row px-3">
                    <div className="col-md-4">
                      <div className="mb-3 w-100">
                        <label className="form-label">
                          Nom <span className="text-danger">*</span>
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Nom"
                        />
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="mb-3 w-100">
                        <label className="form-label">
                          Prenom <span className="text-danger">*</span>
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Prenom"
                        />
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="mb-3 w-100">
                        <label className="form-label">
                          Date de naissance{" "}
                          <span className="text-danger">*</span>
                        </label>
                        <input type="date" className="form-control" />
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="mb-3 w-100">
                        <label className="form-label">
                          Mot de passe <span className="text-danger">*</span>
                        </label>
                        <input
                          type="password"
                          className="form-control"
                          placeholder="Mot de passe"
                        />
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="mb-3 w-100">
                        <label className="form-label">
                          Confirmer le mot de passe{" "}
                          <span className="text-danger">*</span>
                        </label>
                        <input
                          type="password"
                          className="form-control"
                          placeholder="Mot de passe confirmation"
                        />
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="mb-3 w-100">
                        <label className="form-label">
                          Genre <span className="text-danger">*</span>
                        </label>
                        <select className="form-select">
                          <option value="">Sélectionnez...</option>
                          <option value="opt1">Masculin</option>
                          <option value="opt2">Feminin</option>
                        </select>
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="mb-3 w-100">
                        <label className="form-label">
                          Fichier <span className="text-danger">*</span>
                        </label>
                        <input type="file" className="form-control" />
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="mb-3 w-100">
                        <label className="form-label">
                          Activation <span className="text-danger">*</span>
                        </label>
                        <select className="form-select">
                          <option value="">Sélectionnez...</option>
                          <option value="opt1">Oui</option>
                          <option value="opt2">Non</option>
                        </select>
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="mb-3 w-100">
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            id="form3CheckConditions"
                          />
                          <label
                            className="form-check-label"
                            htmlFor="form3CheckConditions"
                          >
                            J'accepte les conditions générales
                          </label>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="mb-3 w-100" id="custom-switch-preview">
                        <div className="form-check form-switch">
                          <input
                            type="checkbox"
                            className="form-check-input"
                            id="customSwitch1"
                          />
                          <label
                            className="form-check-label"
                            htmlFor="customSwitch1"
                          >
                            Activer ou désactiver ce commutateur
                          </label>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="mb-3 w-100">
                        <div className="form-check">
                          <input
                            type="radio"
                            id="customRadio1"
                            name="customRadio"
                            className="form-check-input"
                          />
                          <label
                            className="form-check-label"
                            htmlFor="customRadio1"
                          >
                            Sélectionner cette option
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                  <hr className="hr-button" />
                  <div className="d-flex justify-content-end px-4">
                    <button type="reset" className="btn btn-secondary mx-2">
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
  );
};

export default StaticForm;
