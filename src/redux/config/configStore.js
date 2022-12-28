import { configureStore } from "@reduxjs/toolkit";
import commentList from "../modules/commentList";
import todoList from "../modules/todoList";

import todoUser from "../modules/todoUser";

// modules 모음

const store = configureStore({
  reducer: { commentList, todoList, todoUser },
  devTools: process.env.NODE_ENV === "production",
});

export default store;
