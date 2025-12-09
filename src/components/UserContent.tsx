import { Link } from "react-router-dom";
import type { FormConfig } from '../types/formConfig';
import Pagination from "./Pagination";
import { useState } from "react";

export default function UserContent({ config }: { config: FormConfig }) {
  // Données du tableau (pour l'instant statiques)
  const users = Array.from({ length: 200 }, (_, index) => {
    const id = index + 1;
    return {
      user_id: id,
      user_nom: `Nom ${id}`,
      user_prenoms: `Prénom ${id}`,
      user_genre: id % 2 === 0 ? "Masculin" : "Feminin",
      user_date: `199${id % 10}-0${(id % 9) + 1}-15`,
      user_login: `user${id}`,
      user_email: `user${id}@example.com`,
      user_mobile: `0700000${(id % 1000).toString().padStart(3, '0')}`,
      user_active: id % 3 === 0 ? "Non" : "Oui",
      user_creation: `2024-0${(id % 9) + 1}-01`,
    };
  });

  const pageSize = 10 ;
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(users.length / pageSize);

  const startIndex = (currentPage - 1) * pageSize;
  const paginatedUsers = users.slice(startIndex, startIndex + pageSize);

  // Fonction pour gérer les actions
  const handleView = (id: number) => {
    console.log('View item:', id);
    // Implémenter la logique de visualisation
  };

  const handleEdit = (id: number) => {
    console.log('Edit item:', id);
    // Implémenter la logique d'édition
  };

  const handleDelete = (id: number) => {
    console.log('Delete item:', id);
    // Implémenter la logique de suppression
  };

  return (
    <div className="">       
      <div className="">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <div className="page-title-box">
                <div className="page-title-right">
                  
                  <Link to="user-create">
                    <button className="btn btn-outline-primary mx-18">{config.boutons[0].labl}</button>
                  </Link>
                  <button className="btn btn-outline-primary mx-18">{config.boutons[1].labl}</button>
                  <button className="btn btn-outline-primary mx-18">{config.boutons[2].labl}</button>
                </div>
                <h4 className="page-title">{config.title}</h4>
              </div>
            </div>
          </div>
          
          <div className="row">
            <div className="col-12">
              <div className="card">
                <div className="card-body py-3 px-0 overflow-hidden">
                  <h4 className="header-title m-0 ps-3">{config.list_case.subtitle}</h4>
                  <hr />
                  <div className="card-body pb-0 pt-1">
                    <table id="basic-datatable" className="table table-bordered dt-responsive nowrap w-100 mb-0">
                      <thead className="table-light">
                        <tr>
                          {config.list_case.table.map((field) => (
                            <th key={field.nom}>{field.lbl}</th>
                          ))}
                          <th style={{ width: '1%' }} className="text-center">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {paginatedUsers.map((user) => (
                          <tr key={user.user_id}>
                            <td>{user.user_id}</td>
                            <td>{user.user_nom}</td>
                            <td>{user.user_prenoms}</td>
                            <td>{user.user_genre}</td>
                            <td>{user.user_date}</td>
                            <td>{user.user_login}</td>
                            <td>{user.user_email}</td>
                            <td>{user.user_mobile}</td>
                            <td>{user.user_active}</td>
                            <td>{user.user_creation}</td>
                            <td className="d-flex justify-content-center">
                              <button 
                                onClick={() => handleView(user.user_id)} 
                                className="action-icon view border-0 bg-transparent" 
                                title="Voir"
                              >
                                <i className="mdi mdi-eye"></i>
                              </button>
                              <button 
                                onClick={() => handleEdit(user.user_id)}
                                className="action-icon edit border-0 bg-transparent" 
                                title="Modifier"
                              >
                                <i className="mdi mdi-square-edit-outline"></i>
                              </button>
                              <button 
                                onClick={() => handleDelete(user.user_id)}
                                className="action-icon delete border-0 bg-transparent" 
                                title="Supprimer"
                              >
                                <i className="mdi mdi-delete"></i>
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    <div className="d-flex justify-content-between align-items-center mt-2">
                      <div className="text-muted ">
                        {`Showing ${startIndex + 1} to ${Math.min(startIndex + paginatedUsers.length, users.length)} of ${users.length} entries`}
                      </div>
                      <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={(page) => setCurrentPage(page)}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}