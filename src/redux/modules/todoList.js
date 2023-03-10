import { createAsyncThunk, createSlice, nanoid } from "@reduxjs/toolkit";
import axios from "axios";

const name = "todoList";

//////////////////////////////////////////////////////////////////////////////////////////

export const getTodoList = createAsyncThunk(
  `${name}/getTodoList`,
  async (_, thunkAPI) => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_API}/todos`);
      return thunkAPI.fulfillWithValue(res.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const postTodoList = createAsyncThunk(
  `${name}/postTodoList`,
  async ({ todoLineValue, todoId }, thunkAPI) => {
    try {
      await axios.post(`${process.env.REACT_APP_API}/todos`, {
        todoLineValue,
        id: nanoid(),
        isDone: false,
        todoId,
      });
      const res = await axios.get(`${process.env.REACT_APP_API}/todos`);
      return thunkAPI.fulfillWithValue(res.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const deleteTodoItem = createAsyncThunk(
  `${name}/deleteTodoItem`,
  async (id, thunkAPI) => {
    try {
      await axios.delete(`${process.env.REACT_APP_API}/todos/${id}`);

      const res = await axios.get(`${process.env.REACT_APP_API}/todos`);
      return thunkAPI.fulfillWithValue(res.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const editTodoList = createAsyncThunk(
  `${name}/editTodoList`,
  async ([id, todoLineValue], thunkAPI) => {
    try {
      await axios.patch(`${process.env.REACT_APP_API}/todos/${id}`, {
        todoLineValue,
      });
      const res = await axios.get(`${process.env.REACT_APP_API}/todos`);
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
      await axios.patch(`${process.env.REACT_APP_API}/todos/${id}`, {
        isDone,
      });
      const res = await axios.get(`${process.env.REACT_APP_API}/todos`);
      return thunkAPI.fulfillWithValue(res.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

//////////////////////////////////////////////////////////////////////////////////////////

// getTodoList ??? reducer
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

// postTodoList ??? reducer
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

// deleteTodoItem ??? reducer
const deleteTodoItemRdc = {
  [deleteTodoItem.pending]: (state, action) => {
    state.isLoading = true;
  },
  [deleteTodoItem.fulfilled]: (state, action) => {
    state.todoListData = action.payload;
    state.isLoading = false;
  },
  [deleteTodoItem.rejected]: (state, action) => {
    state.error = action.error;
    state.isLoading = false;
  },
};

// editTodoList ??? reducer
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

// toggleTodoList ??? reducer
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

// ??? ????????? reducer ??? ?????? (????????? action creator??? ?????????..)
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
    ...deleteTodoItemRdc,
    ...editTodoListRdc,
    ...toggleTodoListRdc,
  },
});

//////////////////////////////////////////////////////////////////////////////////////////

// slice ??? reducer + action creator ??????
// ?????? createSlice ??? ?????? ????????? ????????? ?????? reducers ??? extraReducers ??? ?????????. (??????)
const { reducer } = todoList;

// configStore ?????? todoList??? ????????? ????????? ??????..
export default reducer;
