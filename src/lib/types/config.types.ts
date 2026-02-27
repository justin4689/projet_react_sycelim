export interface entityConfig {
  id: string;
  label?: string;
  entity: string;
  formColumns: number;
}

export interface entityConfigData {
  data: entityConfig[];
}

export interface ConfigFieldOption {
  label: string;
  value: string;
}

export interface ConfigFormField {
  name: string;
  label: string;
  type: string;
  required: boolean;
  colSpan: number;
  options?: ConfigFieldOption[];
}

export interface ConfigTableColumn {
  name: string;
  label: string;
  sortable: boolean;
}

export interface EntityConfigDetails {
  form: {
    columns: number;
    fields: ConfigFormField[];
  };
  table: {
    columns: ConfigTableColumn[];
  };
}

export interface ConfigDetailResponse {
  _id: string;
  entity: string;
  label: string;
  config: EntityConfigDetails;
  createdAt: string;
  updatedAt: string;
}