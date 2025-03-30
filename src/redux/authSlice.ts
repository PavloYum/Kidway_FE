import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axiosInstance from "../utils/axiosConfig";
import { IAuthResponse, ILoginCredentials, IRegisterCredentials, IUser } from "../types";
import { RootState } from "./store";

interface AuthState {
  user: IUser | null;
  token: string | null;
  status: "idle" | "loading" | "success" | "error";
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  token: localStorage.getItem("token"),
  status: "idle",
  error: null,
};

export const registerUser = createAsyncThunk<
  IAuthResponse,
  IRegisterCredentials,
  { state: RootState }
>("auth/registerUser", async (credentials, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.post("/users/register", credentials);
    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.message || "Registration failed");
  }
});

export const loginUser = createAsyncThunk<
  IAuthResponse,
  ILoginCredentials,
  { state: RootState }
>("auth/loginUser", async (credentials, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.post("/users/login", credentials);
    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.message || "Login failed");
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // Исправлено: убрали символ ⟉
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.status = "idle";
      state.error = null;
      localStorage.removeItem("token");
    },
  },
  extraReducers: (builder) => {
    builder
      // Регистрация
      .addCase(registerUser.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action: PayloadAction<IAuthResponse>) => {
        state.status = "success";
        state.user = action.payload.user;
        state.token = action.payload.token;
        localStorage.setItem("token", action.payload.token);
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.status = "error";
        state.error = action.payload as string;
      })
      // Вход
      .addCase(loginUser.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action: PayloadAction<IAuthResponse>) => {
        state.status = "success";
        state.user = action.payload.user;
        state.token = action.payload.token;
        localStorage.setItem("token", action.payload.token);
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = "error";
        state.error = action.payload as string;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;