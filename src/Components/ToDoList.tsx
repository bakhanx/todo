import React, { useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { categoryState, categoryType, toDoSelector } from "../atom";
import { CreateToDo } from "./CreateToDo";

const ToDoList = () => {
  const toDos = useRecoilValue(toDoSelector);
  const [category, setCategory] = useRecoilState(categoryState);

  let localCustomCategory: any = [];

  let exitFn = false;

  const localCategoryData = localStorage.getItem("customCategory");
  if (localCategoryData !== null) {
    const parsedToCategoryData = JSON.parse(localCategoryData);
    localCustomCategory = parsedToCategoryData;
    parsedToCategoryData.map((data: any) => {
      const options = document.querySelectorAll("option");
      options.forEach((i) => {
        if (i.value !== data) {
          const select = document.querySelector("select");
          const option = document.createElement("option");
          option.innerHTML = data;
          option.value = data;
          select?.append(option);
        }
      });
    });
  }

  const customCategory = () => {
    exitFn = false;
    const selectInput = document.getElementById(
      "custom-select"
    ) as HTMLInputElement;

    const localCategoryData = localStorage.getItem("customCategory");
    if (localCategoryData !== null) {
      localCustomCategory = localCategoryData;
      JSON.parse(localCategoryData).map((data: any) => {
        if (data === selectInput.value) {
          exitFn = true;
          return;
        }
      });
    }
    if (exitFn) return;

    const select = document.querySelector("select");
    const option = document.createElement("option");
    option.innerHTML = selectInput.value;
    option.value = selectInput.value;
    select?.append(option);

    localStorage.setItem(
      "customCategory",
      JSON.stringify([...localCustomCategory, selectInput.value])
    );

    selectInput.value = "";
  };

  const onInput = (event: React.FormEvent<HTMLSelectElement>) => {
    setCategory(event.currentTarget.value as any);
  };

  const onClick = (event: React.FormEvent<HTMLButtonElement>) => {
    event.preventDefault();
    customCategory();
  };

  return (
    <div>
      <h1>To Dos</h1>
      <form>
        <input id="custom-select" type="text" placeholder="custom type" />
        <button onClick={onClick}>Add</button>
      </form>
      <CreateToDo />
      <hr />

      <select value={category} onInput={onInput}>
        <option value={categoryType.TO_DO}>ToDo</option>
        <option value={categoryType.DOING}>Doing</option>
        <option value={categoryType.DONE}>Done</option>
      </select>
      <hr />
      {toDos.map((atoDo) => (
        <li key={atoDo.id}>{atoDo.text}</li>
      ))}
    </div>
  );
};

export default ToDoList;
