export interface FormField {
  nom: string;
  chp: string;  // Type de champ (text, date, cmbo, pswd, file, hide)
  stt: string;   // Obligatoire ou non
  nbr: string;   // Nombre de caractères max
  lbl: string;   // Label du champ
  cas: string;   // Casse (maj, min, ufr, ind)
  rly: string;   // En lecture seule ?
  val: string;   // Valeur par défaut
}

export interface FormConfig {
  title: string;
  boutons: ButtonConfig[];
  new_case: {
    subtitle: string;
    display: 'page' | 'popup';
    uri: string;
    table: FormField[];
    autocomp: any[];
    column: string;
    options: Record<string, string[]>;
    boutons: ButtonConfig[];
  };
  // Ajoutez les autres cas (edit_case, list_case, etc.) de la même manière
}

export interface ButtonConfig {
  type: string;
  labl: string;
  fonc?: string;
}
