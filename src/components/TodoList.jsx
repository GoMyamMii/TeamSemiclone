import React, { useEffect } from "react";
import CommentBox from "./CommentBox";
import TodoInput from "./TodoInput";
import Todo from "./Todo";
import { useDispatch, useSelector } from "react-redux";
import { getTodoList } from "../redux/modules/todoList";
import { useParams } from "react-router-dom";

const TodoList = () => {
  const todoState = useSelector((state) => state.todoList);
  const dispatch = useDispatch();

  const todoId = useParams().id;

  useEffect(() => {
    todoState.todoListData.length === 0 && dispatch(getTodoList());
  }, []);

  return (
    <>
      <TodoInput />
      {todoState.todoListData
        .filter((todoItem) => todoItem.todoId === todoId)
        .map((item) => (
          <Todo
            todoTitle={item.todoLineValue}
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
