import React, { useState } from "react";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { Draggable } from "react-beautiful-dnd";
import { useAppDispatch } from "../../hooks/redux";
import { deleteTodoAsync, editTodoAsync } from "../../store/actionCreators";
import Input from "../Input";
import Textarea from "../Textarea";
import Button from "../Button";
import Text from "../Text";

interface TodoProps {
  id: string;
  title: string;
  description: string;
  status: "todo" | "in-progress" | "done";
  index: number;
}

const Todo = ({ id, title, description, status, index }: TodoProps) => {
  const [editMode, setEditMode] = useState(false);
  const [todoTitle, setTodoTitle] = useState(title);
  const [todoDescription, setTodoDescription] = useState(description);

  const dispatch = useAppDispatch();

  return (
    <Draggable draggableId={id.toString()} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className="p-4 m-4 rounded-lg bg-white hover:scale-105 active:scale-100 duration-500"
        >
          {editMode ? (
            <>
              <Input
                value={todoTitle}
                onChange={(e) => setTodoTitle(e.target.value)}
                styleAdd="w-full"
              />
              <Textarea
                value={todoDescription}
                onChange={(e) => setTodoDescription(e.target.value)}
              />
              <Button
                onClick={() => {
                  dispatch(
                    editTodoAsync({
                      id,
                      title: todoTitle,
                      description: todoDescription,
                      status,
                    }),
                  );
                  setEditMode(false);
                }}
                disabled={!todoTitle}
              >
                Edit todo
              </Button>
            </>
          ) : (
            <>
              <Text type="title">{title}</Text>
              <Text type="text">{description}</Text>
            </>
          )}
          <div className="flex justify-end">
            <EditOutlined
              className="m-1"
              onClick={() => setEditMode((mode) => !mode)}
            />
            <DeleteOutlined
              className="m-1"
              onClick={() => dispatch(deleteTodoAsync(id, status))}
            />
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default Todo;
