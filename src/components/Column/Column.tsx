import React from "react";
import { Droppable } from "react-beautiful-dnd";
import Todo from "../Todo";
import { TodoInterface } from "../../models/TodoInterface";
import AddTodo from "../AddTodo";
import Text from "../Text";

interface ColumnProps {
  todos: TodoInterface[];
  title: string;
}

const Column = ({ todos, title }: ColumnProps) => {
  return (
    <div>
      <Text type="heading">{title}</Text>
      <Droppable droppableId={title}>
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className="p-2 bg-zinc-200 m-2 rounded-2xl min-h-[70vh]"
          >
            {todos.map((todo, id) => (
              <Todo
                title={todo.title}
                description={todo.description}
                id={todo.id}
                status={todo.status}
                index={id}
                key={todo.id}
              />
            ))}
            {/* {todos.length === 0 && <p className="text-center m-4 text-white">Drag here</p>} */}
            {title === "todo" && <AddTodo />}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default Column;
