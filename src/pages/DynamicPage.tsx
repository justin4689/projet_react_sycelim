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
    return <div className="text-muted">Chargement...</div>;
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
