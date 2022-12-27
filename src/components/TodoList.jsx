import React, { useEffect } from "react";
import CommentBox from "./CommentBox";
import TodoInput from "./TodoInput";
import Todo from "./Todo";
import { useDispatch, useSelector } from "react-redux";
import { getTodoList } from "../redux/modules/todoList";

const TodoList = () => {
  const todoState = useSelector((state) => state.todoList);
  const dispatch = useDispatch();

  useEffect(() => {
    todoState.todoListData.length === 0 && dispatch(getTodoList());
  }, []);

  return (
    <>
      <TodoInput />
      {todoState.todoListData.map((item) => (
        <Todo
          todoTitle={item.todoTitle}
          id={item.id}
          isDone={item.isDone}
          key={item.id}
        />
      ))}
      <CommentBox />
    </>
  );
};

export default TodoList;
