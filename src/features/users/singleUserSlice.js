import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getSingleUserService } from "../../services/UserServices/getSingleUserService";

const initialState = {
  user: null,
  isLoading: false,
};
const getSingleUser = createAsyncThunk(
  "user/getSingleUser",
  async (userId, { rejectWithValue }) => {

    try {
      let {
        data: { user },
      } = await getSingleUserService(userId);
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
      state.isloading = true;
    },
    [getSingleUser.fulfilled]: (state, action) => {
      state.isloading = false;
      state.user = action.payload;
      // console.log(action.payload);
    },
    [getSingleUser.rejected]: (state) => {
      state.isloading = false;
    },
  },
});

const singleUserReducer = singleUserSlice.reducer;
export { singleUserReducer, getSingleUser };
