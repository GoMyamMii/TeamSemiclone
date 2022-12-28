import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import TodoMainBox from "./TodoMainBox";
import TodoListInput from "./TodoListInput";
import { __getTodoList } from "../redux/modules/todoUser";

function Main() {
  const todos = useSelector((state) => state.todoUser.todoList);
  const dispatch = useDispatch();
  const [toggleModal, setToggleModal] = useState(false);
  useEffect(() => {
    dispatch(__getTodoList());
  }, [dispatch]);

  return (
    <StyledListBox>
      <CreateButton onClick={() => setToggleModal(true)}>
        투두리스트 생성
      </CreateButton>
      <Modal className={toggleModal ? "block" : null}>
        <Content>
          <Close onClick={() => setToggleModal(false)} />
          <TodoListInput />
        </Content>
        <Backdrop onClick={() => setToggleModal(false)} />
      </Modal>
      {todos.map((item) => (
        <div key={item.id}>
          {/* password confirm */}
          <TodoMainBox
            id={item.id}
            todoListTitle={item.todoListTitle}
            user={item.user}
            todoListPw={item.todoListPw}
          />
        </div>
      ))}
    </StyledListBox>
  );
}

export default Main;
const StyledListBox = styled.div`
  background: #f8f9fa;
  margin: 0;
  padding: 0;
`;
//modal style
const Modal = styled.div`
  display: none;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  align-items: center;
  justify-content: center;
  z-index: 999;
  &.block {
    display: flex;
  }
`;
const Content = styled.div`
  width: 800px;
  height: 500px;

  position: relative;
  background: white;
  border-radius: 16px;
  box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.04);

  margin: 0 auto;
  margin-top: 96px;
  margin-bottom: 32px;
  display: flex;
  flex-direction: column;
  z-index: 2;
`;
const Close = styled.div`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  position: absolute;
  top: 10px;
  right: 15px;
`;
const Backdrop = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.3);
  z-index: 1;
`;
//button
const CreateButton = styled.button`
  background: #3d3d3d;
  cursor: pointer;
  width: 160px;
  height: 50px;
  display: block;
  color: white;
  border-radius: 30px;
  border: none;
  outline: none;
  font-size: 16px;
  margin-left: 43%;
`;
