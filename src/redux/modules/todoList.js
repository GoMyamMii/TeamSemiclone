import { createAsyncThunk, createSlice, nanoid } from "@reduxjs/toolkit";
import axios from "axios";

const name = "todoList";

//////////////////////////////////////////////////////////////////////////////////////////

export const getTodoList = createAsyncThunk(
  `${name}/getTodoList`,
  async (_, thunkAPI) => {
    try {
      const res = await axios.get("http://localhost:3001/todos");
      return thunkAPI.fulfillWithValue(res.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const postTodoList = createAsyncThunk(
  `${name}/postTodoList`,
  async (todoTitle, thunkAPI) => {
    try {
      await axios.post("http://localhost:3001/todos", {
        todoTitle,
        id: nanoid(),
        isDone: false,
      });
      const res = await axios.get("http://localhost:3001/todos");
      return thunkAPI.fulfillWithValue(res.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const deleteTodoList = createAsyncThunk(
  `${name}/deleteTodoList`,
  async (id, thunkAPI) => {
    try {
      await axios.delete(`http://localhost:3001/todos/${id}`);

      const res = await axios.get("http://localhost:3001/todos");
      return thunkAPI.fulfillWithValue(res.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const editTodoList = createAsyncThunk(
  `${name}/editTodoList`,
  async ([id, todoTitle], thunkAPI) => {
    try {
      await axios.patch(`http://localhost:3001/todos/${id}`, {
        todoTitle,
      });
      const res = await axios.get("http://localhost:3001/todos");
      return thunkAPI.fulfillWithValue(res.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const toggleTodoList = createAsyncThunk(
  `${name}/toggleTodoList`,
  async ([id, isDone], thunkAPI) => {
    try {
      await axios.patch(`http://localhost:3001/todos/${id}`, {
        isDone,
      });
      const res = await axios.get("http://localhost:3001/todos");
      return thunkAPI.fulfillWithValue(res.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

//////////////////////////////////////////////////////////////////////////////////////////

// getTodoList 의 reducer
const getTodoListRdc = {
  [getTodoList.pending]: (state, _) => {
    state.isLoading = true;
  },
  [getTodoList.fulfilled]: (state, action) => {
    state.todoListData = action.payload;
    state.isLoading = false;
  },
  [getTodoList.rejected]: (state, action) => {
    state.error = action.error;
    state.isLoading = false;
  },
};

// postTodoList 의 reducer
const postTodoListRdc = {
  [postTodoList.pending]: (state, action) => {
    state.isLoading = true;
  },
  [postTodoList.fulfilled]: (state, action) => {
    state.todoListData = action.payload;
    state.isLoading = false;
  },
  [postTodoList.rejected]: (state, action) => {
    state.error = action.error;
    state.isLoading = false;
  },
};

// deleteTodoList 의 reducer
const deleteTodoListRdc = {
  [deleteTodoList.pending]: (state, action) => {
    state.isLoading = true;
  },
  [deleteTodoList.fulfilled]: (state, action) => {
    state.todoListData = action.payload;
    state.isLoading = false;
  },
  [deleteTodoList.rejected]: (state, action) => {
    state.error = action.error;
    state.isLoading = false;
  },
};

// editTodoList 의 reducer
const editTodoListRdc = {
  [editTodoList.pending]: (state, action) => {
    state.isLoading = true;
  },
  [editTodoList.fulfilled]: (state, action) => {
    state.todoListData = action.payload;
    state.isLoading = false;
  },
  [editTodoList.rejected]: (state, action) => {
    state.error = action.error;
    state.isLoading = false;
  },
};

// toggleTodoList 의 reducer
const toggleTodoListRdc = {
  [toggleTodoList.pending]: (state, action) => {
    state.isLoading = true;
  },
  [toggleTodoList.fulfilled]: (state, action) => {
    state.todoListData = action.payload;
    state.isLoading = false;
  },
  [toggleTodoList.rejected]: (state, action) => {
    state.error = action.error;
    state.isLoading = false;
  },
};

//////////////////////////////////////////////////////////////////////////////////////////

// 이 자식이 reducer 그 자체 (그런데 action creator를 곁들인..)
const todoList = createSlice({
  name,
  initialState: {
    todoListData: [],
    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: {
    ...getTodoListRdc,
    ...postTodoListRdc,
    ...deleteTodoListRdc,
    ...editTodoListRdc,
    ...toggleTodoListRdc,
  },
});

//////////////////////////////////////////////////////////////////////////////////////////

// slice 는 reducer + action creator 인데
// 위에 createSlice 로 만든 녀석이 가지고 있는 reducers 와 extraReducers 일 것이다. (추측)
const { reducer } = todoList;

// configStore 에서 todoList로 불러온 녀석이 나야..
export default reducer;
