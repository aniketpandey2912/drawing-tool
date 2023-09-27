import { configureStore } from "@reduxjs/toolkit";
import MenuReducer from "../components/slice/menuSlice";
import ToolBoxReducer from "../components/slice/toolBoxSlice";

export const store = configureStore({
  reducer: {
    menu: MenuReducer,
    toolbox: ToolBoxReducer,
  },
});
