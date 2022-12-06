import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { TODO } from "./../../contants/externalLinks";
import { IData } from "./../../models/models";

type incomingPrams = {
  id: string;
  todos: IData;
};

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
      await axios.delete(TODO + "/" + id);
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);

export const createTodo = createAsyncThunk(
  "todos/createTodos",
  async (todos: IData, { rejectWithValue }) => {
    try {
      await axios.post(TODO, todos);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const putTodo = createAsyncThunk(
  "todos/putTodos",
  async (incoming, { rejectWithValue, dispatch }) => {
    try {
      const { id, todos }: incomingPrams | any = incoming;
      const response = await axios.put(TODO + "/" + id, todos);
      dispatch(getTodo());
      console.log(response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
