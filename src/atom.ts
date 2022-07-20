import { atom, selector } from "recoil";

export enum categoryType {
  "TO_DO" = "TO_DO",
  "DOING" = "DOING",
  "DONE" = "DONE"
} 

export interface IToDo {
  text: string;
  id: number;
  category: categoryType
}

export const toDoState = atom<IToDo[]>({
  key: "toDo",
  default: [],
});

export const categoryState = atom<categoryType>({
  key : "category",
  default : categoryType.TO_DO
})

export const toDoSelector = selector({
  key: "toDoSelector",
  get: ({ get }) => {
    const toDos = get(toDoState);
    const category = get(categoryState);
    return toDos.filter(toDo=> toDo.category === category);
  },
});
