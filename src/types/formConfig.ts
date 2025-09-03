// Types de base
export type FieldType = 'text' | 'date' | 'cmbo' | 'pswd' | 'file' | 'hide';
export type DisplayType = 'page' | 'popup';
export type CaseType = 'maj' | 'ufr' | 'ind' | 'min';
export type PositionType = 'left' | 'center' | 'right';

// Interfaces pour les boutons
export interface ButtonConfig {
  type: string;
  labl: string;
  fonc?: string;
}

export interface IconButtonConfig {
  img: string;
  tltp: string;
  fonc: string;
}

// Interfaces pour les champs de formulaire
export interface FormField {
  nom: string;
  chp: FieldType;
  stt: string;
  nbr: string;
  lbl: string;
  cas: CaseType;
  rly: string;
  val: string;
}

export interface SearchField {
  nom: string;
  lbl: string;
}

export interface ListField {
  nom: string;
  pos: PositionType;
  lbl: string;
}

// Interfaces pour chaque section
export interface SearchCase {
  subtitle: string;
  display: DisplayType;
  uri: string;
  table: SearchField[];
  boutons: ButtonConfig[];
}

export interface NewCase {
  subtitle: string;
  display: DisplayType;
  uri: string;
  table: FormField[];
  autocomp: any[];
  column: string;
  options: Record<string, string[]>;
  boutons: ButtonConfig[];
}

export interface EditCase {
  subtitle: string;
  display: DisplayType;
  uri: string;
  table: FormField[];
  autocomp: any[];
  column: string;
  options: Record<string, string[]>;
  boutons: ButtonConfig[];
}

export interface ListCase {
  subtitle: string;
  display: DisplayType;
  uri: string;
  table: ListField[];
  icon_btns: IconButtonConfig[];
}

export interface PrintCase {
  subtitle: string;
  display: DisplayType;
  uri: string;
  labels: Record<string, string>;
}

// Interface principale
export interface FormConfig {
  title: string;
  boutons: ButtonConfig[];
  search_case: SearchCase;
  new_case: NewCase;
  edit_case: EditCase;
  list_case: ListCase;
  print_case: PrintCase;
}