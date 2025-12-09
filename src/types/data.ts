 import type { FormConfig } from '../types/formConfig';

 export const userConfig: FormConfig = {
  title: "Utilisateurs",
  boutons: [
    { type: "bttn", labl: "Nouveau", fonc: "" },
    { type: "bttn", labl: "Lister", fonc: "" },
    { type: "bttn", labl: "Rechercher", fonc: "" }
  ],

  search_case:
	{
    subtitle:"Recherche",
		display:"popup" as const,
		uri:"/web/users/search",
    table:
		[
			{nom:"user_nom",				lbl:"Nom"			    },
			{nom:"user_prenoms",		lbl:"Prénoms"		    },
			{nom:"user_genre",			lbl:"Genre"			},
			{nom:"user_date",				lbl:"Date naissance"	},
			{nom:"user_login",			lbl:"Login"			},
			{nom:"user_email",			lbl:"E-mail"			},
			{nom:"user_mobile",			lbl:"Mobile"			},
			{nom:"user_active",			lbl:"Activation"		},
			{nom:"user_creation",		lbl:"Date création"	}
		],
    boutons:
     [
            {"type":"rset","labl":"Réinitialiser"},
            {"type":"sbmt","labl":"Valider","fonc":""}
     ]
	},
  new_case: {
    subtitle: "Nouvel utilisateur",
    display: "page" as const,
    uri: "/web/users/add",
    table: [
      {
        nom: "user_nom",
        chp: "text" as const,
        stt: "obl",
        nbr: "40",
        lbl: "Nom",
        cas: "maj",
        rly: "0",
        val: ""
      },
      {
        nom: "user_prenoms",
        chp: "text" as const,
        stt: "obl",
        nbr: "60",
        lbl: "Prénoms",
        cas: "ufr",
        rly: "0",
        val: ""
      },
      {
        nom: "user_genre",
        chp: "cmbo" as const,
        stt: "obl",
        nbr: "0",
        lbl: "Genre",
        cas: "ind",
        rly: "0",
        val: ""
      },
      {
        nom: "user_date",
        chp: "date" as const,
        stt: "obl",
        nbr: "0",
        lbl: "Date naissance",
        cas: "ind",
        rly: "0",
        val: ""
      },
      {
        nom: "user_login",
        chp: "text" as const,
        stt: "obl",
        nbr: "25",
        lbl: "Login",
        cas: "ind",
        rly: "0",
        val: ""
      },
      {
        nom: "user_password",
        chp: "pswd" as const,
        stt: "obl",
        nbr: "0",
        lbl: "Mot de passe",
        cas: "ind",
        rly: "0",
        val: ""
      },
      {
        nom: "user_password2",
        chp: "pswd" as const,
        stt: "obl",
        nbr: "0",
        lbl: "Confirmer le mot de passe",
        cas: "ind",
        rly: "0",
        val: ""
      },
      {
        nom: "user_email",
        chp: "text" as const,
        stt: "obl",
        nbr: "50",
        lbl: "E-mail",
        cas: "min",
        rly: "0",
        val: ""
      },
      {
        nom: "user_mobile",
        chp: "text" as const,
        stt: "obl",
        nbr: "10",
        lbl: "Mobile",
        cas: "ind",
        rly: "0",
        val: ""
      },
      {
        nom: "user_photo",
        chp: "file" as const,
        stt: "obl",
        nbr: "0",
        lbl: "Photo",
        cas: "ind",
        rly: "0",
        val: ""
      },
      {
        nom: "user_active",
        chp: "cmbo" as const,
        stt: "obl",
        nbr: "0",
        lbl: "Activation",
        cas: "ind",
        rly: "0",
        val: ""
      }
    ],
    autocomp: [],
    column: "3",
    options: {
      user_genre: ["Masculin", "Feminin"],
      user_active: ["Oui", "Non"]
    },
    boutons: [
      { type: "rset", labl: "Réinitialiser" },
      { type: "sbmt", labl: "Valider", fonc: "" }
    ]
  },

  edit_case: {
    subtitle: "Modification d'utilisateur",
    display: "page" as const,
    uri: "/web/users/edit",
    table: [
      {
        nom: "user_id",
        chp: "hide" as const,
        stt: "obl",
        nbr: "0",
        lbl: "User ID",
        cas: "ind",
        rly: "1",
        val: ""
      },
      {
        nom: "user_nom",
        chp: "text" as const,
        stt: "obl",
        nbr: "40",
        lbl: "Nom",
        cas: "maj",
        rly: "0",
        val: ""
      },
      {
        nom: "user_prenoms",
        chp: "text" as const,
        stt: "obl",
        nbr: "60",
        lbl: "Prénoms",
        cas: "ufr",
        rly: "0",
        val: ""
      },
      {
        nom: "user_genre",
        chp: "cmbo" as const,
        stt: "obl",
        nbr: "0",
        lbl: "Genre",
        cas: "ind",
        rly: "0",
        val: ""
      },
      {
        nom: "user_date",
        chp: "date" as const,
        stt: "obl",
        nbr: "0",
        lbl: "Date naissance",
        cas: "ind",
        rly: "0",
        val: ""
      },
      {
        nom: "user_login",
        chp: "text" as const,
        stt: "obl",
        nbr: "25",
        lbl: "Login",
        cas: "ind",
        rly: "0",
        val: ""
      },
      {
        nom: "user_password",
        chp: "pswd" as const,
        stt: "obl",
        nbr: "0",
        lbl: "Mot de passe",
        cas: "ind",
        rly: "0",
        val: ""
      },
      {
        nom: "user_password2",
        chp: "pswd" as const,
        stt: "obl",
        nbr: "0",
        lbl: "Confirmer le mot de passe",
        cas: "ind",
        rly: "0",
        val: ""
      },
      {
        nom: "user_email",
        chp: "text" as const,
        stt: "obl",
        nbr: "50",
        lbl: "E-mail",
        cas: "min",
        rly: "0",
        val: ""
      },
      {
        nom: "user_mobile",
        chp: "text" as const,
        stt: "obl",
        nbr: "10",
        lbl: "Mobile",
        cas: "ind",
        rly: "0",
        val: ""
      },
      {
        nom: "user_photo",
        chp: "file" as const,
        stt: "obl",
        nbr: "0",
        lbl: "Photo",
        cas: "ind",
        rly: "0",
        val: ""
      },
      {
        nom: "user_active",
        chp: "cmbo" as const,
        stt: "obl",
        nbr: "0",
        lbl: "Activation",
        cas: "ind",
        rly: "0",
        val: ""
      }
    ],
    autocomp: [],
    column: "3",
    options: {
      user_genre: ["Masculin", "Feminin"],
      user_active: ["Oui", "Non"]
    },
    boutons: [
      { type: "rset", labl: "Réinitialiser" },
      { type: "sbmt", labl: "Valider", fonc: "" }
    ]
  },

  list_case:
  {
  subtitle:"Liste des utilisateurs",
  display:"page",
  uri:"/web/users/list",
  table:
      [
          {nom:"user_id",				pos:"center",			lbl:"User ID"			    },
          {nom:"user_nom",				pos:"left",			lbl:"Nom"				    },
          {nom:"user_prenoms",			pos:"left",		lbl:"Prénoms"			    },
          {nom:"user_genre",			pos:"center",			lbl:"Genre"				},
          {nom:"user_date",				pos:"center",			lbl:"Date naissance"		},
          {nom:"user_login",			pos:"left",			lbl:"Login"				},
          {nom:"user_email",			pos:"left",			lbl:"E-mail"				},
          {nom:"user_mobile",			pos:"center",		lbl:"Mobile"				},
          {nom:"user_active",			pos:"center",			lbl:"Activation"			},
          {nom:"user_creation",		pos:"center",			lbl:"Date création"		}
      ],
      icon_btns:
      [
          {img:"prnt",tltp:"Afficher",fonc:""},
          {img:"edit",tltp:"Modifier",fonc:""},
          {img:"delt",tltp:"Supprimer",fonc:""}
      ]
  },


  print_case:
  {
  subtitle:"Affichage utilisateur",
  display:"page",
  uri:"/web/users/dplay",
  labels:
      {
          user_nom:"Nom",
          user_prenoms:"Prénoms",
          user_genre:"Genre",
          user_date:"Date naissance",
          user_login:"Login",
          user_email:"E-mail",
          user_mobile:"Mobile",
          user_active:"Activation",
          user_creation:"Date création"
      }
  }


};
