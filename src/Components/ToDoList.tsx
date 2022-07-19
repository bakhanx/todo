import React, { useState } from "react";

const ToDoList = () => {
  const [toDoValue, setToDoValue] = useState("");
  const onChange = (event:React.FormEvent<HTMLInputElement>)=>{
    const {currentTarget :{value}} = event;
    setToDoValue(value);

  }
  const onSubmit = (event:React.FormEvent<HTMLFormElement>)=>{
    event.preventDefault();
    console.log(toDoValue);

  }
  return (
    <div>
      <form onSubmit={onSubmit}>
        <input onChange={onChange} placeholder="write a to do"></input>
        <button>Add</button>
      </form>
    </div>
  );
};

export default ToDoList;
