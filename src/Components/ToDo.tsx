import React from "react";
import { useSetRecoilState } from "recoil";
import { categoryType, IToDo, toDoState } from "../atom";

export const ToDo = ({ text, category, id }: IToDo) => {
  const setToDos = useSetRecoilState(toDoState);

  const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const {
      currentTarget: { name },
    } = event;
    setToDos((oldToDos) => {
      const targetIndex = oldToDos.findIndex((oldToDo) => oldToDo.id === id);
      const oldToDo = oldToDos[targetIndex];
      const newToDo = { text, id, category: name as any};
      console.log(oldToDo);
      console.log(newToDo);
      return [...oldToDos.slice(0,targetIndex),newToDo, ...oldToDos.slice(targetIndex+1)];
    });
    console.log(name);
  };
  return (
    <li>
      <span>{text}</span>
      {category !== categoryType.TO_DO && (
        <button name={categoryType.TO_DO} onClick={onClick}>
          To Do
        </button>
      )}
      {category !== categoryType.DOING && (
        <button name={categoryType.DOING} onClick={onClick}>
          DOING
        </button>
      )}
      {category !== categoryType.DONE && (
        <button name={categoryType.DONE} onClick={onClick}>
          DONE
        </button>
      )}
    </li>
  );
};
