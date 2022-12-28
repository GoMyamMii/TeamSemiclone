import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { nanoid } from "nanoid";

const initialState = {
  todoList: [
    { id: nanoid(), todoListTitle: "test", user: "test2", todoListPw: "123" },
  ],
  isLoading: false,
  error: null,
};

// Get Thunk
export const __getTodoList = createAsyncThunk(
  "todoList/__getTodoList",
  async (payload, thunkAPI) => {
    try {
      //response요청으로 서버 데이터 가져오기.
      const res = await axios.get("http://localhost:3001/todoList");
      return thunkAPI.fulfillWithValue(res.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// Post Thunk
export const __postTodoList = createAsyncThunk(
  "todoList/__postTodoList",
  async ([todoListTitle, user, todoListPw], thunkAPI) => {
    try {
      //payload에 post에 필요한 객체 넣기. input파일의 newTodo를 post thunk에 추가한다.
      await axios.post("http://localhost:3001/todoList", {
        id: nanoid(),
        todoListTitle,
        user,
        todoListPw,
      });
      //res로 todoList의 데이터를 다시 불러온다.
      const res = await axios.get("http://localhost:3001/todoList");
      return thunkAPI.fulfillWithValue(res.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// edit Thunk
export const __editodoList = createAsyncThunk(
  `todoList/__editodoList`,
  async ({ id, todoListTitle }, thunkAPI) => {
    try {
      //patch에 필요한 id값과 title값을 payload에 불러오기
      await axios.patch(`http://localhost:3001/todoList/${id}`, {
        todoListTitle,
      }); //얘도 수정하면 다시 get한다.
      const res = await axios.get("http://localhost:3001/todoList");
      return thunkAPI.fulfillWithValue(res.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
//delete Thunk
export const __deleteTodoList = createAsyncThunk(
  `todoList/__deleteTodoList`,
  async (id, thunkAPI) => {
    try {
      await axios.delete(`http://localhost:3001/todoList/${id}`);
      const res = await axios.get("http://localhost:3001/todoList");
      return thunkAPI.fulfillWithValue(res.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
const todoList = createSlice({
  name: "todoList",
  initialState,
  reducers: {},
  extraReducers: {
    // ---------------------------------------getTodo
    [__getTodoList.pending]: (state) => {
      state.isLoading = true;
    },
    [__getTodoList.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.todoList = action.payload;
    },
    [__getTodoList.rejected]: (state, action) => {
      state.isLoading = false;
      state.todoList = action.payload;
    },
    // ------------------------------------------postTodo
    [__postTodoList.pending]: (state) => {
      state.isLoading = true;
    },
    [__postTodoList.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.todoList = action.payload;
    },
    [__postTodoList.rejected]: (state, action) => {
      state.isLoading = false;
      state.todoList = action.payload;
    },
    // --------------patch(edit)
    [__editodoList.pending]: (state) => {
      state.isLoading = true;
    },
    [__editodoList.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.todoList = action.payload;
    },
    [__editodoList.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    // --------------delete
    [__deleteTodoList.pending]: (state) => {
      state.isLoading = true;
    },
    [__deleteTodoList.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.todoList = action.payload;
    },
    [__deleteTodoList.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

const { reducer } = todoList;
export default reducer;
