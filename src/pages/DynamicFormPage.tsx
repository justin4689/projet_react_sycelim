import DynamicForm from "../components/DynamicForm";

import { userConfig } from "../lib/types/data";
 
 function DynamicFormPage ({ onSubmit, initialData}: any) {


    return (
        <DynamicForm config={userConfig} onSubmit={onSubmit} initialData={initialData} />
    )
}

export default DynamicFormPage