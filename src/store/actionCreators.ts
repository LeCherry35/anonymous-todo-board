import axios, { AxiosResponse } from "axios";
import CryptoJS from "crypto-js";
import { AppDispatch } from "./store";
import { TodoInterface } from "../models/TodoInterface";
import env from "react-dotenv";

import {
  addTodo,
  changeTodoStatus,
  deleteTodo,
  editTodo,
  setError,
  setLoading,
  setTodos,
} from "./todosSlice";

const API_URL = env.API_URL;

export const getTodosAsync =
  (boardId: string) => async (dispatch: AppDispatch) => {
    try {
      dispatch(setLoading(true));
      dispatch(setTodos([]));
      const response: AxiosResponse<TodoInterface[]> = await axios.get(
        `${API_URL}/todos/${CryptoJS.SHA256(boardId).toString()}`,
      );
      if (response.data.length === 0) {
        dispatch(setError("No board with this Id, add new todo to create one"));
      }
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
      const response: AxiosResponse<TodoInterface> = await axios.post(
        `${API_URL}/todos`,
        {
          title,
          description,
          id,
          boardId: CryptoJS.SHA256(boardId).toString(),
          status,
        } as TodoInterface,
      );
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
      const response: AxiosResponse<TodoInterface> = await axios.put(
        `${API_URL}/todos/${todo.id}`,
        todo,
      );
      dispatch(editTodo(response.data));
      dispatch(setLoading(false));
    } catch (error: any) {
      console.log(error);

      dispatch(setError(error.message));
      dispatch(setLoading(false));
    }
  };

export const deleteTodoAsync =
  (id: string, status: "todo" | "in-progress" | "done") =>
  async (dispatch: AppDispatch) => {
    try {
      dispatch(setLoading(true));
      await axios.delete(`${API_URL}/todos/${id}`);
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
        }),
      );

      await axios.put(`${API_URL}/todos/${id}`, { status: newStatus });
      dispatch(setLoading(false));
    } catch (error: any) {
      // Rollback changes in state if request failed
      dispatch(
        changeTodoStatus({
          id,
          currentStatus: newStatus,
          newStatus: currentStatus,
          sourceId: destinationId,
          destinationId: sourceId,
        }),
      );

      dispatch(setError(error.message));
      dispatch(setLoading(false));
    }
  };
