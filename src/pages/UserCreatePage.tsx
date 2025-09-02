import React from 'react';
import DynamicForm from '../components/DynamicForm';

// Votre configuration JSON
const userConfig = {
  title: "Utilisateurs",
  boutons: [
    { type: "bttn", labl: "Nouveau", fonc: "" },
    { type: "bttn", labl: "Lister", fonc: "" },
    { type: "bttn", labl: "Rechercher", fonc: "" }
  ],
  new_case: {
    subtitle: "Nouvel utilisateur",
    display: "page" as const,
    uri: "/web/users/add",
    table: [
      {
        nom: "user_nom",
        chp: "text",
        stt: "obl",
        nbr: "40",
        lbl: "Nom",
        cas: "maj",
        rly: "0",
        val: ""
      },
      {
        nom: "user_prenoms",
        chp: "text",
        stt: "obl",
        nbr: "60",
        lbl: "Prénoms",
        cas: "ufr",
        rly: "0",
        val: ""
      },
      {
        nom: "user_genre",
        chp: "cmbo",
        stt: "obl",
        nbr: "0",
        lbl: "Genre",
        cas: "ind",
        rly: "0",
        val: ""
      },
      {
        nom: "user_date",
        chp: "date",
        stt: "obl",
        nbr: "0",
        lbl: "Date naissance",
        cas: "ind",
        rly: "0",
        val: ""
      },
      {
        nom: "user_login",
        chp: "text",
        stt: "obl",
        nbr: "25",
        lbl: "Login",
        cas: "ind",
        rly: "0",
        val: ""
      },
      {
        nom: "user_password",
        chp: "pswd",
        stt: "obl",
        nbr: "0",
        lbl: "Mot de passe",
        cas: "ind",
        rly: "0",
        val: ""
      },
      {
        nom: "user_password2",
        chp: "pswd",
        stt: "obl",
        nbr: "0",
        lbl: "Confirmer le mot de passe",
        cas: "ind",
        rly: "0",
        val: ""
      },
      {
        nom: "user_email",
        chp: "text",
        stt: "obl",
        nbr: "50",
        lbl: "E-mail",
        cas: "min",
        rly: "0",
        val: ""
      },
      {
        nom: "user_mobile",
        chp: "text",
        stt: "obl",
        nbr: "10",
        lbl: "Mobile",
        cas: "ind",
        rly: "0",
        val: ""
      },
      {
        nom: "user_photo",
        chp: "file",
        stt: "obl",
        nbr: "0",
        lbl: "Photo",
        cas: "ind",
        rly: "0",
        val: ""
      },
      {
        nom: "user_active",
        chp: "cmbo",
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
  }
};

const UserCreatePage: React.FC = () => {
  const handleSubmit = (formData: Record<string, any>) => {
    console.log('Données du formulaire soumises:', formData);
    // Ici, vous pouvez envoyer les données à votre API
    // Exemple avec fetch :
    /*
    fetch(userConfig.new_case.uri, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
    .then(response => response.json())
    .then(data => {
      console.log('Succès:', data);
    })
    .catch((error) => {
      console.error('Erreur:', error);
    });
    */
  };

  return (
    <div className="container-fluid">
      <DynamicForm 
        config={userConfig} 
        onSubmit={handleSubmit} 
      />
    </div>
  );
};

export default UserCreatePage;
