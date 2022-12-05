import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { TODO } from "./../../contants/externalLinks";
import { IData } from "./../../models/models";

export const getTodo = createAsyncThunk<IData[]>(
  "todos/getTodos",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get<IData[]>(TODO);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);

export const delTodo = createAsyncThunk(
  "todos/delTodos",
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await axios.delete<IData[]>(TODO + "/" + id, {
        method: "DELETE",
      });
      return response;
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);

export const createTodo = createAsyncThunk(
  "todos/createTodo",
  async (todos: IData, { rejectWithValue }) => {
    try {
      const response = await axios.post(TODO, todos);
      console.log(response);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
