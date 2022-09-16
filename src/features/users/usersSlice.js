import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAllUsersService } from "../../services/UserServices/getAllUsersService";

const initialState = {
  users: [],
  isloading: false,
};
const getAllUsers = createAsyncThunk("users/getAllUsers", async (_, { rejectWithValue }) => {
  try {
    let {
      data: { users },
    } = await getAllUsersService();
    return users;
  } catch (error) {
    rejectWithValue(error);
  }
});
const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: {
    [getAllUsers.pending]: (state) => {
      state.isloading = true;
    },
    [getAllUsers.fulfilled]: (state, action) => {
      state.isloading = false;
      state.users = action.payload;
    },
    [getAllUsers.rejected]: (state) => {
      state.isloading = false;
    },
  },
});

const usersReducer = usersSlice.reducer;

export { getAllUsers, usersReducer };
