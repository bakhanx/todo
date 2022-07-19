import React, { useState } from "react";
import { useForm } from "react-hook-form";

interface IForm {
  id: string;
  password: string;
  email: string;
}

const ToDoList = () => {
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<IForm>({
    defaultValues: {
      email: "@naver.com",
    },
  });

  const onValid = (data: any) => {
    console.log(data);
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit(onValid)}
        style={{ display: "flex", flexDirection: "column" }}
      >
        <input
          {...register("id", {
            required: "id is required!",
            minLength: {
              value: 5,
              message: "your password is short",
            },
          })}
          placeholder="ID"
        />
        <span>{errors?.id?.message}</span>
        <input
          {...register("password", {
            required: "password is required",
            minLength: {
              value: 5,
              message: "your password is short",
            },
          })}
          placeholder="Password"
        />
        <span>{errors?.password?.message}</span>
        <input
          {...register("email", {
            required: "Email is required",
            minLength: {
              value: 5,
              message: "your password is short",
            },
            pattern: {
              value: /^[A-Za-z0-9._%+-]+@naver\.com$/,
              message: "Only naver.com",
            },
          })}
          placeholder="Email"
        />
        <span>{errors?.email?.message}</span>
        <button>Add</button>
      </form>
    </div>
  );
};

export default ToDoList;
