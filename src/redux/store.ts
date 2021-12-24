import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { languageSlice } from "./language/slice";
import { productDetailSlice } from "./productDetail/slice";
import { recommendProductsSlice } from "./recommendProducts/slice";
import { productSearchSlice } from "./productSearch/slice";
import { userSlice } from "./user/slice";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { shoppingCartSlice } from "./shoppingCart/slice";
import { orderSlice } from "./order/slice";

const persistConfig = {
    key: "root", 
    storage,   //local storage
    whitelist: ["user"]  //store those in the list, all others will not be stored
}

const rootReducer = combineReducers({
  language: languageSlice.reducer,
  recommendProducts: recommendProductsSlice.reducer,
  productDetail: productDetailSlice.reducer,
  productSearch: productSearchSlice.reducer,
  user: userSlice.reducer,
  shoppingCart: shoppingCartSlice.reducer,
  order: orderSlice.reducer,
});

//persisted reducer
const persistdReducer = persistReducer(persistConfig, rootReducer);

// const store = createStore(rootReducer, applyMiddleware(thunk));
// use configureStore instead of createStore to support createAsyncThunk
const store = configureStore({
  reducer: persistdReducer,
  devTools: true,
});

//persisted store
const persistor = persistStore(store);

//the root type of state
export type RootState = ReturnType<typeof store.getState>;

export default { store, persistor };
