import React from "react";

const AddUser = ({onAdd}) =>{

   const handleOnSubmit=(e)=>{
      e.preventDefault();
      onAdd(e.target.title.value,e.target.completed.value);
      e.target.title.value="";
      e.target.completed.value="";
   }

    return(
        <div>
            <form onSubmit={handleOnSubmit}>
                <h3>Add to list</h3>
                <input placeholder="Title" name="title"/>
                <input placeholder="Completed" name="completed"/>
                <button onSubmit={handleOnSubmit}>Add</button>
            </form>
        </div>
    )
}

export default AddUser;