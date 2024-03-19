import axios, { AxiosResponse } from "axios";
import CryptoJS from 'crypto-js';
import { AppDispatch } from "./store";
import { TodoInterface } from "../models/TodoInterface";
import {
  addTodo,
  changeTodoStatus,
  deleteTodo,
  editTodo,
  setError,
  setLoading,
  setTodos,
} from "./todosSlice";

export const getTodosAsync =
  (boardId: string) => async (dispatch: AppDispatch) => {
    try {      
      dispatch(setLoading(true));
      const response: AxiosResponse<TodoInterface[]> = await axios.get(
        `http://localhost:7000/api/todos/${CryptoJS.SHA256(boardId).toString()}`
      );
      dispatch(setTodos(response.data));
      dispatch(setLoading(false));
    } catch (error: any) {
      dispatch(setError(error.message));
      dispatch(setLoading(false));
    }
  };

export const addTodoAsync =
  ({ title, description, id, boardId, status }: TodoInterface) =>
  async (dispatch: AppDispatch) => {
    try {
      dispatch(setLoading(true));
      const response:AxiosResponse<TodoInterface> = await axios.post(`http://localhost:7000/api/todos`, {
        title,
        description,
        id,
        boardId: CryptoJS.SHA256(boardId).toString(),
        status,
      } as TodoInterface);
      dispatch(addTodo(response.data));

      dispatch(setLoading(false));
    } catch (error: any) {
      dispatch(setError(error.message));
      dispatch(setLoading(false));
    }
  };

export const editTodoAsync =
  (todo: Partial<TodoInterface>) => async (dispatch: AppDispatch) => {
    try {
      dispatch(setLoading(true));
      const response:AxiosResponse<TodoInterface> = await axios.put(
        `http://localhost:7000/api/todos/${todo.id}`,
        todo
      );
      dispatch(editTodo(response.data));
      dispatch(setLoading(false));
    } catch (error: any) {
      dispatch(setError(error.message));
      dispatch(setLoading(false));
    }
  };

export const deleteTodoAsync =
  (id: string, status: "todo" | "in-progress" | "done") =>
  async (dispatch: AppDispatch) => {
    try {
      dispatch(setLoading(true));
      await axios.delete(`http://localhost:7000/api/todos/${id}`);
      dispatch(deleteTodo({ id, status }));
      dispatch(setLoading(false));
    } catch (error: any) {
      dispatch(setError(error.message));
      dispatch(setLoading(false));
    }
  };

export const changeTodoStatusAsync =
  ({
    id,
    currentStatus,
    newStatus,
    sourceId,
    destinationId,
  }: {
    id: string;
    currentStatus: "todo" | "in-progress" | "done";
    newStatus: "todo" | "in-progress" | "done";
    sourceId: number;
    destinationId: number;
  }) =>
  async (dispatch: AppDispatch) => {
    try {
      dispatch(setLoading(true));
      dispatch(
        changeTodoStatus({
          id,
          currentStatus,
          newStatus,
          sourceId,
          destinationId,
        })
      );

      await axios.put(
        `http://localhost:7000/api/todos/${id}`,
        { status: newStatus }
      );
      dispatch(setLoading(false));
    } catch (error: any) {
      dispatch(
        changeTodoStatus({
          id,
          currentStatus: newStatus,
          newStatus: currentStatus,
          sourceId: destinationId,
          destinationId: sourceId,
        })
      );

      dispatch(setError(error.message));
      dispatch(setLoading(false));
    }
  };
