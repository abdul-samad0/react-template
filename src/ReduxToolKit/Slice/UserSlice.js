import {  createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { authApi } from "../../Apis/authApis";

export const fetchUserDetails = createAsyncThunk("user/fetchUserDetails", async (_, {rejectWithValue}) => {

try {
  try {
    const response = await authApi.userDetails(); 
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data || "Error fetching user details");
  }
} catch (error) {
    console.log("🚀 ~ fetchUserDetails ~ error:", error)
}

}
);

const initialState= {
    user: null,
    loading: false,
    error: null,
  }

// Define userSlice
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserDetails.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUserDetails.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
      })
      .addCase(fetchUserDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

// Export userSlice actions and reducer
export const { logout } = userSlice.actions;
export default userSlice.reducer;
