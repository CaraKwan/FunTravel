import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface RecommendProductState {
    productList: any[];
    loading: boolean;
    error: string | null;
  }

  const initialState: RecommendProductState = {
    productList: [],
    loading: true,
    error: null,
  };

  //async thunk action,  automatically generate actions: pending, fulfilled, rejected
export const getRecommendProducts = createAsyncThunk(
    "recommendProducts/getRecommendProducts",
    async (thunkAPI) => {
      const { data } = await axios.get(
        "http://123.56.149.216:8080/api/productCollections"
      );
      return data;
    }
  );


  export const recommendProductsSlice = createSlice({
    name: "recommendProducts",
    initialState,
    //reducer here is reducer + action, each reducer object contains an action and its handle function
    //don't have to manually define actions
    //state is mutable due to immer
    reducers: {},
    //have to use extraReducers to handle actions: pending, fulfilled, rejected
    extraReducers: {
      //fetch data start
      [getRecommendProducts.pending.type]: (state) => {
        state.loading = true;
      },
      //fetch data success
      [getRecommendProducts.fulfilled.type]: (state, action) => {
        state.loading = false;
        state.productList = action.payload;
        state.error = null;
      },
      //fetch data fail
      [getRecommendProducts.rejected.type]: (
        state,
        action: PayloadAction<string | null>
      ) => {
        state.loading = false;
        state.error = action.payload;
      },
    },
  });