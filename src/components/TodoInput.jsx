import React, { useRef } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { postTodoList } from "../redux/modules/todoList";
import Button from "./Button";

const TodoInput = () => {
  const dispatch = useDispatch();

  const todoLineRef = useRef();

  const paramId = useParams().id;

  const handleTodoAddClick = () => {
    if (!todoLineRef.current.value) {
      return alert("목표를 적어주세요!");
    }
    dispatch(
      postTodoList({ todoLineValue: todoLineRef.current.value, paramId })
    );
    todoLineRef.current.value = "";
  };

  return (
    <TodoInputContainer>
      <TodoTitleInput ref={todoLineRef} placeholder="목표를 입력하세요." />
      <Button onClick={handleTodoAddClick} height={"30px"} fontSize={"12px"}>
        추가하기
      </Button>
    </TodoInputContainer>
  );
};

const TodoInputContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const TodoTitleInput = styled.input`
  width: 420px;
  height: 30px;
  border-radius: 5px;
  outline: none;
  border: 1px solid #666;
  padding: 0 20px;
  margin-right: 10px;
  font-size: 12px;
`;

export default TodoInput;
