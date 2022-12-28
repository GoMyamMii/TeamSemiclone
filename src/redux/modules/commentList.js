import { createAsyncThunk, createSlice, nanoid } from "@reduxjs/toolkit";
import axios from "axios";

const name = "commentList";

//////////////////////////////////////////////////////////////////////////////////////////

export const getCommentList = createAsyncThunk(
  `${name}/getCommentList`,
  async (_, thunkAPI) => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_API}/comments`);
      return thunkAPI.fulfillWithValue(res.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const postCommentList = createAsyncThunk(
  `${name}/postCommentList`,
  async ([comment, commenter, commentPw, todoId], thunkAPI) => {
    try {
      await axios.post(`${process.env.REACT_APP_API}/comments`, {
        comment,
        commenter,
        commentPw,
        id: nanoid(),
        todoId,
      });
      const res = await axios.get(`${process.env.REACT_APP_API}/comments`);
      return thunkAPI.fulfillWithValue(res.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const deleteCommentList = createAsyncThunk(
  `${name}/deleteCommentList`,
  async (id, thunkAPI) => {
    try {
      await axios.delete(`${process.env.REACT_APP_API}/comments/${id}`);

      const res = await axios.get(`${process.env.REACT_APP_API}/comments`);
      return thunkAPI.fulfillWithValue(res.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const editCommentList = createAsyncThunk(
  `${name}/editCommentList`,
  async ([id, comment], thunkAPI) => {
    try {
      await axios.patch(`${process.env.REACT_APP_API}/comments/${id}`, {
        comment,
      });
      const res = await axios.get(`${process.env.REACT_APP_API}/comments`);
      return thunkAPI.fulfillWithValue(res.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

//////////////////////////////////////////////////////////////////////////////////////////

// getCommentList 의 reducer
const getCommentListRdc = {
  [getCommentList.pending]: (state, _) => {
    state.isLoading = true;
  },
  [getCommentList.fulfilled]: (state, action) => {
    state.commentListData = action.payload;
    state.isLoading = false;
  },
  [getCommentList.rejected]: (state, action) => {
    state.error = action.error;
    state.isLoading = false;
  },
};

// postCommentList 의 reducer
const postCommentListRdc = {
  [postCommentList.pending]: (state, action) => {
    state.isLoading = true;
  },
  [postCommentList.fulfilled]: (state, action) => {
    state.commentListData = action.payload;
    state.isLoading = false;
  },
  [postCommentList.rejected]: (state, action) => {
    state.error = action.error;
    state.isLoading = false;
  },
};

// deleteCommentList 의 reducer
const deleteCommentListRdc = {
  [deleteCommentList.pending]: (state, action) => {
    state.isLoading = true;
  },
  [deleteCommentList.fulfilled]: (state, action) => {
    state.commentListData = action.payload;
    state.isLoading = false;
  },
  [deleteCommentList.rejected]: (state, action) => {
    state.error = action.error;
    state.isLoading = false;
  },
};

// editCommentList 의 reducer
const editCommentListRdc = {
  [editCommentList.pending]: (state, action) => {
    state.isLoading = true;
  },
  [editCommentList.fulfilled]: (state, action) => {
    state.commentListData = action.payload;
    state.isLoading = false;
  },
  [editCommentList.rejected]: (state, action) => {
    state.error = action.error;
    state.isLoading = false;
  },
};

//////////////////////////////////////////////////////////////////////////////////////////

// 이 자식이 reducer 그 자체 (그런데 action creator를 곁들인..)
const commentList = createSlice({
  name,
  initialState: {
    commentListData: [],
    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: {
    ...getCommentListRdc,
    ...postCommentListRdc,
    ...deleteCommentListRdc,
    ...editCommentListRdc,
  },
});

//////////////////////////////////////////////////////////////////////////////////////////

// slice 는 reducer + action creator 인데
// 위에 createSlice 로 만든 녀석이 가지고 있는 reducers 와 extraReducers 일 것이다. (추측)
const { reducer } = commentList;

// configStore 에서 todoList로 불러온 녀석이 나야..
export default reducer;
