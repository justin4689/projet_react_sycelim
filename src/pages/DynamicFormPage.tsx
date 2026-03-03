import DynamicForm from "../components/DynamicForm";

import { userConfig } from "../lib/types/data";
 
 function DynamicFormPage ({config, onSubmit, initialData}: any) {


    return (
        <DynamicForm config={userConfig} onSubmit={onSubmit} initialData={initialData} />
    )
}

export default DynamicFormPage