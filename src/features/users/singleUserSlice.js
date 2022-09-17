import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getSingleUserService } from "../../services/UserServices/getSingleUserService";

const initialState = {
  user: null,
  isLoading: false,
};
const getSingleUser = createAsyncThunk(
  "user/getSingleUser",
  async (_id, { rejectWithValue }) => {
    try {
      let {
        data: { user },
      } = await getSingleUserService(_id);
      return user;
    } catch (error) {
      rejectWithValue(error);
    }
  }
);

const singleUserSlice = createSlice({
  name: "singleUser",
  initialState,
  extraReducers: {
    [getSingleUser.pending]: (state) => {
      state.isLoading = true;
    },
    [getSingleUser.fulfilled]: (state, action) => {
      state.isLoading = true;
      state.user = action.payload;
      // console.log(action.payload);
    },
    [getSingleUser.rejected]: (state) => {
      state.isLoading = false;
    },
  },
});

const singleUserReducer = singleUserSlice.reducer;
export { singleUserReducer, getSingleUser };
