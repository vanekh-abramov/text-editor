import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { TODO } from "../../constants/externalLinks";
import { IData } from "./../../models/models";

type incomingPrams = {
  id: string;
  todos: IData;
};

export const getTodo = createAsyncThunk(
  "todos/getTodos",
  async (tag: string | undefined, { rejectWithValue }) => {
    try {
      const response = await axios.get<IData[]>(
        TODO + (tag ? `?tag_like=${tag}` : "/")
      );
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
  async (incoming: incomingPrams, { rejectWithValue, dispatch }) => {
    try {
      const { id, todos } = incoming;
      const response = await axios.patch(TODO + "/" + id, todos);
      dispatch(getTodo());
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
