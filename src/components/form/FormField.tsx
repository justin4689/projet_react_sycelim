import React from 'react';
import type { FormField as FormFieldType } from '../../types/formConfig';

interface FormFieldProps {
  field: FormFieldType;
  value: any;
  onChange: (name: string, value: any) => void;
  options?: string[];
}

const FormField: React.FC<FormFieldProps> = ({ field, value, onChange, options = [] }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    onChange(field.nom, e.target.value);
  };

  const renderInput = () => {

   
    switch (field.chp) {
      case 'text':
        return (
          <input
            type="text"
            className="form-control"
            id={field.nom}
            placeholder={`Entrer ${field.lbl}`}
            value={value || ''}
            onChange={handleChange}
            maxLength={field.nbr !== '0' ? parseInt(field.nbr) : undefined}
            required={field.stt === 'obl'}
            readOnly={field.rly === '1'}
          />
        );
      case 'date':
        return (
          <input
            type="date"
            className="form-control"
            id={field.nom}
            placeholder={`Entrer ${field.lbl}`}
            value={value || ''}
            onChange={handleChange}
            required={field.stt === 'obl'}
          />
        );
      case 'pswd':
        return (
          <input
            type="password"
            className="form-control"
            id={field.nom}
            placeholder={`Entrer ${field.lbl}`}
            value={value || ''}
            onChange={handleChange}
            required={field.stt === 'obl'}
          />
        );
      case 'cmbo':
        return (
          <select
            className="form-select"
            id={field.nom}
            value={value || ''}
            onChange={handleChange}
            required={field.stt === 'obl'}
          >
            <option value="">Sélectionnez...</option>
            {options.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>
        );
      case 'file':
        return (
          <input
            type="file"
            className="form-control"
            id={field.nom}
            placeholder={`Entrer ${field.lbl}`}
            onChange={(e) => {
              if (e.target.files && e.target.files[0]) {
                onChange(field.nom, e.target.files[0]);
              }
            }}
            required={field.stt === 'obl'}
          />
        );
      case 'hide':
        return <input type="hidden" id={field.nom} value={value || ''} />;
      default:
        return null;
    }
  };

  if (field.chp === 'hide') {
    return renderInput();
  }

  return (
    <div className="mb-3 w-100">
      <label htmlFor={field.nom} className="form-label">
        {field.lbl}
        {field.stt === 'obl' && <span className="text-danger">*</span>}
      </label>
      <div className="w-100">
        {renderInput()}
      </div>
    </div>
  );
};

export default FormField;
