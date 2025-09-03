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

export interface FormEditField {
  id: string;
  nom: string;
  chp: string;  // Type de champ (text, date, cmbo, pswd, file, hide)
  stt: string;   // Obligatoire ou non
  nbr: string;   // Nombre de caractères max
  lbl: string;   // Label du champ
  cas: string;   // Casse (maj, min, ufr, ind)
  rly: string;   // En lecture seule ?
  val: string;   // Valeur par défaut
}



export  interface SearchField {
  nom: string;
 
  lbl: string;   
  
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
  search_case: {
    subtitle: string;
    display: 'page' | 'popup';
    uri: string;
    table: SearchField[];
    boutons: ButtonConfig[];
  };

  edit_case: {
    subtitle: string;
    display: 'page' | 'popup';
    uri: string;
    table: FormEditField[];
    autocomp: any[];
    column: string;
    options: Record<string, string[]>;
    boutons: ButtonConfig[];
  };



  list_case : {
    subtitle: string;
    display: 'page' | 'popup';
    uri: string;
    table: FormField[];
    icon_btns: IconButtonConfig[];

  };


  print_case: {
    subtitle: string;
    display: 'page' | 'popup';
    uri: string;
    table: FormField[];
    labels: {
      user_nom: string ;
      user_prenoms:  string ;
      user_genre : string ;
      user_login : string ;
      user_email : string ; 
      user_mobile : string ;
      user_active :  string ; 
      user_creation :  string 

    }
  
  };








  // Ajoutez les autres cas (edit_case, list_case, etc.) de la même manière
}

export interface ButtonConfig {
  type: string;
  labl: string;
  fonc?: string;
}


export interface IconButtonConfig {
  img : string ; 
  tltp: string ; 
  fonc : string ; 
}