import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { IUser } from "../types";
import { RootState } from "./store";

interface UserState {
  users: IUser[];
  status: "loading" | "success" | "error";
}

const initialState: UserState = {
  users: [],
  status: "loading",
};

export const fetchUsers = createAsyncThunk<IUser[], void, { state: RootState }>(
  "users/fetchUsers",
  async () => {
    const response = await axios.get("/users");
    return response.data;
  }
);

export const addUser = createAsyncThunk<IUser, IUser, { state: RootState }>(
  "users/addUser",
  async (user) => {
    const response = await axios.post("/users", user);
    return response.data;
  }
);

export const editUser = createAsyncThunk<
  IUser,
  { id: number; user: IUser },
  { state: RootState }
>("users/editUser", async ({ id, user }) => {
  const response = await axios.put(`/users/${id}`, user);
  return response.data;
});

export const deleteUser = createAsyncThunk<number, number, { state: RootState }>(
  "users/deleteUser",
  async (id) => {
    await axios.delete(`/users/${id}`);
    return id;
  }
);

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUsers.fulfilled, (state, action: PayloadAction<IUser[]>) => {
        state.users = action.payload;
        state.status = "success";
      })
      .addCase(fetchUsers.rejected, (state) => {
        state.status = "error";
      })
      .addCase(addUser.fulfilled, (state, action: PayloadAction<IUser>) => {
        state.users.push(action.payload);
      })
      .addCase(editUser.fulfilled, (state, action: PayloadAction<IUser>) => {
        const index = state.users.findIndex((user) => user.id === action.payload.id);
        if (index !== -1) {
          state.users[index] = action.payload;
        }
      })
      .addCase(deleteUser.fulfilled, (state, action: PayloadAction<number>) => {
        state.users = state.users.filter((user) => user.id !== action.payload);
      });
  },
});

export default userSlice.reducer;