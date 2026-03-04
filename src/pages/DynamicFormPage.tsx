import DynamicForm from "../components/DynamicForm";

 
 function DynamicFormPage ({ onSubmit, initialData}: any) {


    return (
        <DynamicForm  onSubmit={onSubmit} initialData={initialData} />
    )
}

export default DynamicFormPage