import React, { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import {
  deleteTodoList,
  editTodoList,
  toggleTodoList,
} from "../redux/modules/todoList";
import Button from "./Button";

const Todo = ({ todoTitle, id, isDone }) => {
  const dispatch = useDispatch();
  const todoTitleRef = useRef();
  const [isEditTodo, setIsEditTodo] = useState(false);

  const handleOnClickEditTodo = () => {
    if (!isEditTodo) {
      setIsEditTodo(true);
    } else {
      dispatch(editTodoList([id, todoTitleRef.current.value]));
      setIsEditTodo(false);

      todoTitleRef.current.value = "";
    }
  };

  const handleOnClickDeleteTodo = () => {
    dispatch(deleteTodoList(id));
  };

  const handleToggleTodo = () => {
    isDone = !isDone;
    dispatch(toggleTodoList([id, isDone]));
  };

  return (
    <TodoContainer>
      <ItemBox>
        <CheckBoxContainer
          type={"checkbox"}
          onChange={handleToggleTodo}
          checked={isDone ? true : false}
        />
        {isEditTodo ? (
          <TodoTitleInput
            ref={todoTitleRef}
            placeholder={"목표를 입력하세요."}
          />
        ) : (
          <H3 isDone={isDone}>{todoTitle}</H3>
        )}
      </ItemBox>
      <ItemBox>
        <Button
          onClick={handleOnClickEditTodo}
          mr={"10px"}
          width={"80px"}
          height={"30px"}
          fontSize={"12px"}
        >
          {isEditTodo ? "완료" : "수정"}
        </Button>
        <Button
          onClick={handleOnClickDeleteTodo}
          width={"80px"}
          height={"30px"}
          fontSize={"12px"}
        >
          삭제
        </Button>
      </ItemBox>
    </TodoContainer>
  );
};

const TodoContainer = styled.div`
  margin: 0 auto;
  width: 780px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const CheckBoxContainer = styled.input`
  margin: 0 10px 0 0;
  width: 30px;
  height: 30px;
`;

const ItemBox = styled.div`
  display: flex;
  align-items: center;
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

const H3 = styled.h3`
  text-decoration: ${(props) => (props.isDone ? "line-through" : "none")};
  text-decoration-thickness: 2px;
`;

export default Todo;
