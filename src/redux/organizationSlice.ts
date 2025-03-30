import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axiosInstance from "../utils/axiosConfig";
import { IOrganization } from "../types";
import { RootState } from "./store";

interface OrganizationState {
  organizations: IOrganization[];
  status: "loading" | "success" | "error";
}

const initialState: OrganizationState = {
  organizations: [],
  status: "loading",
};

export const fetchOrganizations = createAsyncThunk<
  IOrganization[],
  void,
  { state: RootState }
>("organizations/fetchOrganizations", async () => {
  const response = await axiosInstance.get("/organizations");
  return response.data;
});

export const addOrganization = createAsyncThunk<
  IOrganization,
  IOrganization,
  { state: RootState }
>("organizations/addOrganization", async (organization) => {
  const response = await axiosInstance.post("/organizations", organization);
  return response.data;
});

export const editOrganization = createAsyncThunk<
  IOrganization,
  { id: number; organization: IOrganization },
  { state: RootState }
>("organizations/editOrganization", async ({ id, organization }) => {
  const response = await axiosInstance.put(`/organizations/${id}`, organization);
  return response.data;
});

// Исправлено: create购物Thunk заменено на createAsyncThunk
export const deleteOrganization = createAsyncThunk<
  number,
  number,
  { state: RootState }
>("organizations/deleteOrganization", async (id) => {
  await axiosInstance.delete(`/organizations/${id}`);
  return id;
});

const organizationSlice = createSlice({
  name: "organizations",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrganizations.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchOrganizations.fulfilled, (state, action: PayloadAction<IOrganization[]>) => {
        state.organizations = action.payload;
        state.status = "success";
      })
      .addCase(fetchOrganizations.rejected, (state) => {
        state.status = "error";
      })
      .addCase(addOrganization.fulfilled, (state, action: PayloadAction<IOrganization>) => {
        state.organizations.push(action.payload);
      })
      .addCase(editOrganization.fulfilled, (state, action: PayloadAction<IOrganization>) => {
        const index = state.organizations.findIndex((org) => org.id === action.payload.id);
        if (index !== -1) {
          state.organizations[index] = action.payload;
        }
      })
      .addCase(deleteOrganization.fulfilled, (state, action: PayloadAction<number>) => {
        state.organizations = state.organizations.filter((org) => org.id !== action.payload);
      });
  },
});

export default organizationSlice.reducer;