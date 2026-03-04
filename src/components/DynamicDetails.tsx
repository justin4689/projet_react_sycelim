import { Link, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { httpClient } from "@/api/httpClient";
import { useConfigByName } from "@/hook/queries/useConfig";
import type {
  ConfigDetailResponse,
  ConfigFormField,
} from "@/lib/types/config.types";

type EntityRecord = Record<string, any>;

const getFieldDisplayValue = (field: ConfigFormField, row: EntityRecord) => {
  const raw = row?.[field.name];

  if (field.type === "checkbox") {
    return raw ? "Oui" : "Non";
  }

  if (field.type === "select") {
    const opt = (field.options ?? []).find((o) => o.value === raw);
    return opt?.label ?? (raw == null ? "" : String(raw));
  }

  return raw == null ? "" : String(raw);
};

export default function DynamicDetails() {
  const { entity, id } = useParams();

  const {
    data: configData,
    isLoading: isConfigLoading,
    error: configError,
  } = useConfigByName<ConfigDetailResponse>(entity);

  const {
    data: item,
    isLoading: isItemLoading,
    error: itemError,
  } = useQuery({
    queryKey: ["entity", entity, "detail", id],
    queryFn: () => httpClient.get<EntityRecord>(`/${entity}/${id}`),
    enabled: Boolean(entity && id),
  });

  const fields = configData?.config?.form?.fields ?? [];

  const isLoading = isConfigLoading || isItemLoading;
  const error = configError || itemError;

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-12">
          <div className="page-title-box">
            <div className="page-title-right">
              <Link to={`/dashboard/${entity}/create`}>
                <button type="button" className="btn btn-outline-primary mx-12">
                  Nouveau
                </button>
              </Link>
              <Link to={`/dashboard/${entity}`}>
                <button type="button" className="btn btn-outline-primary mx-12">
                  Lister
                </button>
              </Link>
              <button
                type="button"
                className="btn btn-outline-primary mx-12"
                data-bs-toggle="modal"
                data-bs-target="#staticBackdrop"
              >
                Rechercher
              </button>

              <div
                className="modal fade"
                id="staticBackdrop"
                data-bs-backdrop="static"
                data-bs-keyboard="false"
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
                            type="text"
                            id="search"
                            required
                            placeholder="Rechercher..."
                          />
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
            <h4 className="page-title">{configData?.label ?? entity ?? ""}</h4>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card-body py-3 px-0 overflow-hidden">
              <h4 className="header-title m-0 ps-3">Details</h4>
              <hr />

              {isLoading ? (
                <div className="row gy-3 gx-3 px-3">
                  {Array.from({ length: 7 }).map((_, i) => (
                    <div className="col-lg-2" key={i}>
                      <div className="card my-0 shadow-none border">
                        <div className="">
                          <div className="row align-items-center">
                            <div className="col">
                              <h4 className="details-title">
                                <span className="placeholder-glow">
                                  <span className="placeholder col-6" />
                                </span>
                              </h4>
                              <hr className="m-0 hr-dashed" />
                              <p className="details-value my-0">
                                <span className="placeholder-glow">
                                  <span className="placeholder col-10" />
                                </span>
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : error ? (
                <div className="px-3 text-danger">
                  Erreur lors du chargement
                </div>
              ) : !item ? (
                <div className="px-3 text-danger">Element introuvable</div>
              ) : (
                <div className="row gy-3 gx-3 px-3">
                  {fields.map((field) => (
                    <div className="col-lg-2" key={field.name}>
                      <div className="card my-0 shadow-none border">
                        <div className="">
                          <div className="row align-items-center">
                            <div className="col">
                              <h4 className="details-title">{field.label} :</h4>
                              <hr className="m-0 hr-dashed" />
                              <p className="details-value my-0">
                                {getFieldDisplayValue(field, item)}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              <hr />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
