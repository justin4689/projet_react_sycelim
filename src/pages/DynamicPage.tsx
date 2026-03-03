import DynamicContent from "@/components/DynamicContent";
import { sessionConfg, userConfig } from "@/lib/types/data";
import type { FormConfig } from "@/lib/types/formConfig";
import { useLocation, useParams } from "react-router-dom";
import { useConfigByName } from "@/hook/queries/useConfig";

const CONFIG_BY_ENTITY: Record<string, FormConfig> = {
  users: userConfig,
  sessions: sessionConfg,
};

export function DynamicPage() {
  const { entity } = useParams();

  const {
    data: configData,
    isLoading,
    error,
  } = useConfigByName<any>(entity);

   console.log(configData);




  

  const location = useLocation();
  const isCreate = location.pathname.endsWith("/create");

  const config = entity ? CONFIG_BY_ENTITY[entity] : undefined;

  if (!entity) {
    return <div className="text-danger">Entité manquante</div>;
  }

  if (!config) {
    return (
      <div className="text-danger">
        Entité non supportée: <span className="fw-semibold">{entity}</span>
      </div>
    );
  }

  return <DynamicContent entity={entity} config={config} />;
}
