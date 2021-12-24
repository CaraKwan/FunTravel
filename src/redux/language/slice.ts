import { createSlice } from "@reduxjs/toolkit";
import i18n from "i18next";

interface LanguageState {
  language: "en" | "zh";
  languageList: { name: string; code: string }[];
}

const initialState: LanguageState = {
  language: "zh",
  languageList: [
    { name: "English", code: "en" },
    { name: "中文", code: "zh" },
  ],
};

export const languageSlice = createSlice({
  name: "language",
  initialState,
  //reducer here is reducer + action, each reducer object contains an action and its handle function
  //don't have to manually define actions
  //state is mutable due to immer
  reducers: {
    getLanguage: (state, action) => {
      i18n.changeLanguage(action.payload);
      state.language = action.payload;
    },
  },
});
