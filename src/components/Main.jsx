import React from "react";
import styled from "styled-components";
import Button from "./Button";
import TodoList from "./TodoList";
import TodoListInput from "./TodoListInput";

const Main = () => {
  return (
    <MainContainer>
      <TodoListInput />
      <Button>추가하기</Button>
      <TodoList />
    </MainContainer>
  );
};

const MainContainer = styled.main``;

export default Main;
