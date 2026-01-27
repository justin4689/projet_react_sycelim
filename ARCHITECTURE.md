 # Architecture (résumé)
 
 ## Arborescence

 ```text
 projet_react_sycelim/
   public/                # fichiers statiques
   src/
     assets/              # assets importés
     components/          # composants UI
       form/              # champs/éléments de formulaire
     layouts/             # layouts (structure)
     pages/               # pages (routes)
     providers/           # providers React (ex: Auth/Theme/React Query)
     types/               # types TS + configs (FormConfig)
     services/            # appels API (à brancher)
     store/               # état global (réservé)
     context/             # context React (réservé)
     hook/                # hooks custom (réservé)
     App.tsx              # routing
     main.tsx             # bootstrap
   dist/                  # build (généré)
   package.json           # scripts + dépendances
 ```
 
 ## Routing / layout
 
 - **Entrée** : `src/main.tsx` -> `<App />`
 - **Routes** : `src/App.tsx` (React Router)
 - **Dashboard** : `/dashboard` utilise `src/layouts/DashboardLayout.tsx` (`Sidebar` + `TopBar` + `Outlet` + `Footer`)
 
 ## Note
 
 - `src/types/data.ts` contient des configurations (ex: `userConfig`) utilisées par les écrans.
