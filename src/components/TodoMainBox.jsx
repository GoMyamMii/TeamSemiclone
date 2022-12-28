import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import Button from "./Button";
import styled from "styled-components";
import { __editodoList, __deleteTodoList } from "../redux/modules/todoUser";

function TodoMainBox({ user, todoListTitle, todoListPw, id }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [todoPassword, setTodoPassword] = useState("");
  const [todonewTitle, setTodonewTitle] = useState("");
  const [userEdit, setUserEdit] = useState(false);

  const handleOnClickDetailButton = (id) => {
    navigate(`/TodoList/${id}`);
  };

  const getPassword = (event) => {
    setTodoPassword(event.target.value);
  };
  const newtitleInput = (event) => {
    setTodonewTitle(event.target.value);
  };
  //비밀번호가 일치하지 않으면 alert창 !
  const passwordSwitch = (id) => {
    if (todoPassword === todoListPw) {
      dispatch(__deleteTodoList(id));
    } else {
      alert("비밀번호가 일치하지 않습니다.");
    }
  };
  const editTitleSwitch = () => {
    if (!userEdit) {
      if (todoPassword === todoListPw) {
        setUserEdit(true);
      } else {
        alert("비밀번호가 일치하지 않습니다.");
      }
    }
  };
  const handleUpdateSubmit = (id, todoListTitle) => {
    if (todonewTitle !== "") {
      //console.log({ id, todoListTitle, todonewTitle });
      setUserEdit(false);
      dispatch(__editodoList({ id, todoListTitle }));
    } else {
      alert("수정값을 입력하세요");
    }
  };

  return (
    <TodoUserList>
      {/* todolist */}
      {userEdit ? (
        <div>
          <PasswordInput value={todonewTitle} onChange={newtitleInput} />
        </div>
      ) : (
        <H4title>{todoListTitle}</H4title>
      )}
      <TodoListUserText>{user}</TodoListUserText>
      <div>
        <PasswordInput
          onChange={getPassword}
          value={todoPassword}
          type="text"
          placeholder="등록한 비밀번호를 입력하세요"
        />
        {userEdit ? (
          <Button
            onClick={() => handleUpdateSubmit(id, todonewTitle)}
            height={"50px"}
            width={"100px"}
            mr={"10px"}
            borderRadius={"40px"}
          >
            저장
          </Button>
        ) : (
          <Button
            onClick={() => editTitleSwitch(id)}
            height={"50px"}
            width={"100px"}
            mr={"10px"}
            borderRadius={"40px"}
          >
            수정
          </Button>
        )}
        <Button
          onClick={() => passwordSwitch(id)}
          height={"50px"}
          width={"100px"}
          mr={"10px"}
          borderRadius={"40px"}
        >
          삭제
        </Button>
        {/* 상세보기로 해당 id 이동*/}
        <Button
          onClick={() => {
            handleOnClickDetailButton(id);
          }}
          height={"50px"}
          width={"100px"}
          borderRadius={"40px"}
        >
          상세보기
        </Button>
      </div>
    </TodoUserList>
  );
}
export default TodoMainBox;
//text
const H4title = styled.h4`
  margin: 15px 0;
  padding-left: 20px;
  font-size: 44px;
  color: #343a40;
`;
//user
const TodoListUserText = styled.p`
  color: #a3a3a3;
  font-size: 24px;
  padding-left: 20px;
  font-weight: bold;
`;
//passwordinput
const PasswordInput = styled.input`
  padding: 12px 24px;
  border-radius: 5px;
  border: 1px solid #dee2e6;
  width: 40%;
  height: 70px;
  font-size: 20px;
  outline: none;
  font-size: 18px;
  box-sizing: border-box;
  margin: 5px 10px;
`;
const TodoUserList = styled.div`
  width: 1000px;
  margin: 30px auto;
  padding: 30px;
  background: white;
  border-radius: 16px;
  box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.04);
`;
