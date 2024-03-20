import React, { useState } from "react";
// import { addTodo } from "../../store/todosSlice";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { addTodoAsync } from "../../store/actionCreators";
import Input from "../Input";
import Textarea from "../Textarea";
import Button from "../Button";
import Text from "../Text";

const AddTodo = () => {
  const [todoTitle, setTodoTitle] = useState<string>("");
  const [todoDescription, setTodoDescription] = useState<string>("");
  const [isOpened, setIsOpened] = useState<boolean>(false); // Indicates if this block is expanded

  const dispatch = useAppDispatch();
  const boardId = useAppSelector((state) => state.todosReducer.boardId);

  if (!isOpened)
    return (
      <div
        className=" rounded-lg p-4 m-4 bg-white hover:scale-110 active:scale-90 duration-500"
        onClick={() => setIsOpened(true)}
      >
        <Text type="heading">+</Text>
      </div>
    );

  return (
    <div className=" rounded-lg p-4 m-4 bg-white">
      <Text type="title">Todo title</Text>
      <Input
        value={todoTitle}
        onChange={(e) => setTodoTitle(e.target.value)}
        styleAdd="w-full"
      />
      <Text type="title">Todo description</Text>
      <Textarea
        value={todoDescription}
        onChange={(e) => setTodoDescription(e.target.value)}
      />
      <Button
        onClick={() => {
          dispatch(
            addTodoAsync({
              title: todoTitle,
              description: todoDescription,
              boardId: boardId,
              id: Date.now().toString(),
              status: "todo",
            }),
          );
          setTodoTitle("");
          setTodoDescription("");
          setIsOpened(false);
        }}
        disabled={!todoTitle}
      >
        Add todo
      </Button>
    </div>
  );
};

export default AddTodo;
