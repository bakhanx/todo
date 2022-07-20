import { useForm } from "react-hook-form";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { categoryState, toDoState } from "../atom";

interface IForm {
  todo: string;
}

export const CreateToDo = () => {
  const setToDos = useSetRecoilState(toDoState);
  const category = useRecoilValue(categoryState);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<IForm>();

  const handleValid = ({ todo }: IForm) => {
    console.log(todo);

    setValue("todo", "");
    setToDos((prev) => [
      { text: todo, id: Date.now(), category },
      ...prev,
    ]);
  };

  return (
    <form onSubmit={handleSubmit(handleValid)}>
      <input
        {...register("todo", {
          required: "Write!",
          minLength: {
            value: 5,
            message: "least write 5 word",
          },
        })}
        type="text"
        placeholder="write a to do"
      />
      <button>Add</button>
      <div>{errors?.todo?.message}</div>
    </form>
  );
};
