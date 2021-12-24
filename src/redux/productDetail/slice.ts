import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface ProductDetailState {
  loading: boolean;
  error: string | null;
  data: any;
}

const initialState: ProductDetailState = {
  loading: true,
  error: null,
  data: null,
};

//async thunk action, automatically generate actions: pending, fulfilled, rejected
export const getProductDetail = createAsyncThunk(
  "productDetail/getProductDetail",
  async (touristRouteId: string, thunkAPI) => {
    const { data } = await axios.get(
      `http://123.56.149.216:8080/api/touristRoutes/${touristRouteId}`
    );
    return data;
  }
);

export const productDetailSlice = createSlice({
  name: "productDetail",
  initialState,
  //reducer here is reducer + action, each reducer object contains an action and its handle function
  //don't have to manually define actions
  //state is mutable due to immer
  reducers: {},
  //have to use extraReducers to handle actions: pending, fulfilled, rejected
  extraReducers: {
    //fetch data start
    [getProductDetail.pending.type]: (state) => {
      state.loading = true;
    },
    //fetch data success
    [getProductDetail.fulfilled.type]: (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.error = null;
    },
    //fetch data fail
    [getProductDetail.rejected.type]: (
      state,
      action: PayloadAction<string | null>
    ) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});
