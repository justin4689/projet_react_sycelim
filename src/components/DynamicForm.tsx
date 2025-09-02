import React, { useState, useEffect } from 'react';
import type { FormConfig, ButtonConfig } from '../types/formConfig';
import FormField from './form/FormField';

interface DynamicFormProps {
  config: FormConfig;
  onSubmit: (data: Record<string, any>) => void;
  initialData?: Record<string, any>;
}

const DynamicForm: React.FC<DynamicFormProps> = ({ config, onSubmit, initialData = {} }) => {
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [columns, setColumns] = useState<number>(3);
  
  useEffect(() => {
    // Initialiser les données du formulaire
    const initialFormData: Record<string, any> = {};
    config.new_case.table.forEach(field => {
      initialFormData[field.nom] = initialData[field.nom] || field.val || '';
    });
    setFormData(initialFormData);
    
    // Définir le nombre de colonnes
    setColumns(parseInt(config.new_case.column) || 1);
  }, [config, initialData]);

  const handleInputChange = (name: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleReset = () => {
    const resetData: Record<string, any> = {};
    config.new_case.table.forEach(field => {
      resetData[field.nom] = field.val || '';
    });
    setFormData(resetData);
  };

  // Grouper les champs par colonnes
  const getFieldsByColumn = (colIndex: number) => {
    const fields = [];
    const fieldsPerColumn = Math.ceil(config.new_case.table.length / columns);
    const start = colIndex * fieldsPerColumn;
    const end = start + fieldsPerColumn;
    
    for (let i = start; i < end && i < config.new_case.table.length; i++) {
      const field = config.new_case.table[i];
      fields.push(
        <div key={field.nom} className={`col-md-${12 / columns} w-100`}>
          <FormField
            field={field}
            value={formData[field.nom] || ''}
            onChange={handleInputChange}
            options={config.new_case.options[field.nom]}
          />
        </div>
      );
    }
    
    return fields;
  };

  return (
    <div className="content-page">
      <div className="content">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <div className="page-title-box">
                <h4 className="page-title">{config.title}</h4>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-12">
              <div className="card">
                <div className="card-body py-3 px-0 overflow-hidden">
                  <h4 className="header-title mb-0 px-3">{config.new_case.subtitle}</h4>
                  <hr className="hr" />
                  <form onSubmit={handleSubmit}>
                    <div className="row px-3">
                      {Array.from({ length: columns }).map((_, colIndex) => (
                        <div key={colIndex} className={`col-md-${12/columns}`}>
                          {getFieldsByColumn(colIndex)}
                        </div>
                      ))}
                    </div>
                    
                    <hr className="hr-button" />
                    <div className="d-flex justify-content-end px-4">
                      {config.new_case.boutons.map((button: ButtonConfig, index: number) => (
                        <button
                          key={index}
                          type={button.type === 'sbmt' ? 'submit' : 'button'}
                          className={`btn btn-${button.type === 'sbmt' ? 'primary' : 'secondary'} mx-2`}
                          onClick={button.type === 'rset' ? handleReset : undefined}
                        >
                          {button.labl}
                        </button>
                      ))}
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DynamicForm;
