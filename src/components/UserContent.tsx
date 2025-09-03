import { Link } from "react-router-dom";
import type { FormConfig } from '../types/formConfig';



export default function UserContent({ config }: { config: FormConfig }) {
  // Données du tableau
 

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
    <div className="content-page">       
      <div className="content">
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
                        {config.list_case.table.map((item) => (
                          <tr key={item.nom}>
                            <td>2</td>
                            <td>2</td>
                            <td>2</td>
                            <td>2</td>
                            <td>2</td>
                            <td>2</td>
                            <td>2</td>
                            <td>2</td>
                            <td>2</td>
                            <td>2</td>
                           
                           
                            
                            <td className="d-flex justify-content-center">
                              <button 
                                onClick={() => handleView(2)} 
                                className="action-icon view border-0 bg-transparent" 
                                title="Voir"
                              >
                                <i className="mdi mdi-eye"></i>
                              </button>
                              <button 
                                onClick={() => handleEdit(2)}
                                className="action-icon edit border-0 bg-transparent" 
                                title="Modifier"
                              >
                                <i className="mdi mdi-square-edit-outline"></i>
                              </button>
                              <button 
                                onClick={() => handleDelete(2)}
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