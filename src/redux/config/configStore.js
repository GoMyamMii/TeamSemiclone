import { configureStore } from "@reduxjs/toolkit";
import commentList from "../modules/commentList";
import todoList from "../modules/todoList";

// modules 모음

const store = configureStore({ reducer: { commentList, todoList } });

export default store;
