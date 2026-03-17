import DynamicContent from "@/components/DynamicContent";
import { useLocation, useParams } from "react-router-dom";
import { useConfigByName } from "@/hook/queries/useConfig";

export function DynamicPage() {
  const { entity } = useParams();

  const { data: configData, isLoading, error } = useConfigByName<any>(entity);

  const location = useLocation();
  const isCreate = location.pathname.endsWith("/create");

  if (!entity) {
    return <div className="text-danger">Entité manquante</div>;
  }

  if (isCreate) {
    return <div className="text-muted">Chargement...</div>;
  }

  if (isLoading) {
    return (
      <div className="container-fluid">
        {/* Skeleton titre page */}
        <div className="row mt-4">
          <div className="col-12">
            <div className="page-title-box">
              <div className="page-title-right">
                <div
                  className="placeholder placeholder-glow rounded"
                  style={{ width: "100px", height: "38px" }}
                />
              </div>
              <div
                className="placeholder placeholder-glow rounded"
                style={{ width: "200px", height: "28px" }}
              />
            </div>
          </div>
        </div>

        {/* Skeleton contenu */}
        <div className="row">
          <div className="col-12">
            <div className="card">
              <div className="card-body">
                {/* Header skeleton */}
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <div
                    className="placeholder placeholder-glow rounded"
                    style={{ width: "150px", height: "24px" }}
                  />
                  <div
                    className="placeholder placeholder-glow rounded"
                    style={{ width: "120px", height: "38px" }}
                  />
                </div>
                <hr />
                {/* Table/List skeleton */}
                <div className="table-responsive">
                  <table className="table">
                    <thead>
                      <tr>
                        {[...Array(5)].map((_, i) => (
                          <th key={`head-${i}`}>
                            <div
                              className="placeholder placeholder-glow rounded"
                              style={{ width: "80%", height: "16px" }}
                            />
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {[...Array(6)].map((_, rowIdx) => (
                        <tr key={`row-${rowIdx}`}>
                          {[...Array(5)].map((_, colIdx) => (
                            <td key={`cell-${rowIdx}-${colIdx}`}>
                              <div
                                className="placeholder placeholder-glow rounded"
                                style={{ width: "70%", height: "14px" }}
                              />
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return <div className="text-danger">Erreur lors du chargement</div>;
  }

  if (!configData) {
    return (
      <div className="text-danger">
        Configuration introuvable: <span className="fw-semibold">{entity}</span>
      </div>
    );
  }

  return <DynamicContent entity={entity} configData={configData} />;
}
