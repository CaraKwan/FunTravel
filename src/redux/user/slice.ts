import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface UserState {
  loading: boolean;
  error: string | null;
  token: string | null;
}

const initialState: UserState = {
  loading: false,
  error: null,
  token: null,
};

//async thunk action, automatically generate actions: pending, fulfilled, rejected
export const signIn = createAsyncThunk(
  "user/signIn",
  async (parameters : {
      email: string,
      password: string,
  }, thunkAPI) => {
    const { data } = await axios.post(
      "http://123.56.149.216:8080/auth/login", {
          email: parameters.email,
          password: parameters.password,
      }
    );
    return data.token;
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState,
  //reducer here is reducer + action, each reducer object contains an action and its handle function
  //don't have to manually define actions
  //state is mutable due to immer
  reducers: {
      signOut: (state) => {
          state.token = null;
          state.error = null;
          state.loading = false;
      },
  },
  //have to use extraReducers to handle actions: pending, fulfilled, rejected
  extraReducers: {
    //fetch data start
    [signIn.pending.type]: (state) => {
      state.loading = true;
    },
    //fetch data success
    [signIn.fulfilled.type]: (state, action) => {
      state.loading = false;
      state.token = action.payload;
      state.error = null;
    },
    //fetch data fail
    [signIn.rejected.type]: (
      state,
      action: PayloadAction<string | null>
    ) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});
