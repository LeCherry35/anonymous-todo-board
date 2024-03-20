import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TodoInterface } from "../models/TodoInterface";

const initialState: TodosState = {
  todo: [],
  "in-progress": [],
  done: [],
  boardId: "",
  error: null,
  isLoading: false,
};

interface TodosState {
  todo: TodoInterface[];
  "in-progress": TodoInterface[];
  done: TodoInterface[];
  boardId: string;
  error: string | null;
  isLoading: boolean;
}

const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    setBoardId: (state, action: PayloadAction<string>) => {
      state.boardId = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    setTodos: (state, action: PayloadAction<TodoInterface[]>) => {
      state.todo = [];
      state["in-progress"] = [];
      state.done = [];
      action.payload.forEach((todo) => {
        state[todo.status].push(todo);
      });
    },
    addTodo: (state, action: PayloadAction<TodoInterface>) => {
      state.todo.push(action.payload);
    },
    changeTodoStatus: (
      state,
      action: PayloadAction<{
        id: string;
        currentStatus: "todo" | "in-progress" | "done";
        newStatus: "todo" | "in-progress" | "done";
        sourceId: number;
        destinationId: number;
      }>,
    ) => {
      const { currentStatus, newStatus, sourceId, destinationId, id } =
        action.payload;

      const todo = state[currentStatus].find((todo) => todo.id === id);
      if (todo) {
        todo.status = newStatus;
        // To have ability to change order by drag and drop
        state[currentStatus].splice(sourceId, 1);
        state[newStatus].splice(destinationId, 0, todo);
      }
    },
    deleteTodo: (
      state,
      action: PayloadAction<{
        id: string;
        status: "todo" | "in-progress" | "done";
      }>,
    ) => {
      const { status, id } = action.payload;
      const newState = state[status].filter((todo) => todo.id !== id);
      return { ...state, [status]: newState };
    },
    editTodo: (
      state,
      action: PayloadAction<{
        id: string;
        status: "todo" | "in-progress" | "done";
        title?: string;
        description?: string;
      }>,
    ) => {
      const { status, id } = action.payload;
      const todo = state[status].find((todo) => todo.id === id);
      if (todo) {
        if (action.payload.title) todo.title = action.payload.title;
        if (action.payload.description)
          todo.description = action.payload.description;
      }
    },
  },
});

export const {
  addTodo,
  changeTodoStatus,
  deleteTodo,
  editTodo,
  setError,
  setLoading,
  setTodos,
  setBoardId,
} = todosSlice.actions;
export default todosSlice.reducer;
