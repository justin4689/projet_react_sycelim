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

export type FieldType =
  | "text"
  | "string"
  | "email"
  | "number"
  | "date"
  | "password"
  | "file"
  | "select"
  | "checkbox"
  | "textarea";

export interface BaseConfigFormField {
  name: string;
  label: string;
  type: FieldType;
  required: boolean;
  colSpan: number;
}

export interface SelectConfigFormField extends BaseConfigFormField {
  type: "select";
  options: ConfigFieldOption[];
}

export interface CheckboxConfigFormField extends BaseConfigFormField {
  type: "checkbox";
}

export type ConfigFormField =
  | (BaseConfigFormField & {
      type:
        | "text"
        | "string"
        | "email"
        | "number"
        | "date"
        | "password"
        | "file"
        | "textarea";
    })
  | SelectConfigFormField
  | CheckboxConfigFormField;

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
  buttons: {
    label: { label: string }[];
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


export interface ConfigData {
  form: {
    columns: number;
    fields: Array<{
      name: string;
      label: string;
      type: string;
      required: boolean;
      colSpan?: number;
      options?: Array<{ label: string; value: string }>;
    }>;
  };
  table: {
    columns: Array<{
      name: string;
      label: string;
      sortable: boolean;
    }>;
  };
  buttons?: Array<{ label: string }>;
}

export interface CreateEntityPayload {
  label: string;
  entity: string;
  config: ConfigData;
}