import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { __postTodoList } from "../redux/modules/todoUser";
import styled from "styled-components";

function Input() {
  const [todoListTitle, setTodoListTitle] = useState("");
  const [user, setUser] = useState("");
  const [todoListPw, setTodoListPw] = useState("");
  const [todoListPwConf, setTodoListPwConf] = useState("");
  const [type, setType] = useState("password");

  const passwordRegEx = /^[A-Za-z0-9]{8,20}$/;
  const dispatch = useDispatch();

  // new todolist
  const handleSubmit = (event) => {
    event.preventDefault();

    //password
    if (todoListPw === todoListPwConf) {
      dispatch(__postTodoList([todoListTitle, user, todoListPw]));
    } else if (todoListPw.match(passwordRegEx) === null) {
      alert("비밀번호 형식을 확인해주세요");
    } else {
      alert("비밀번호틀림");
    }
  };
  //password show hide
  const show = () => {
    type === "password" ? setType("text") : setType("password");
  };

  const titleInput = (event) => {
    setTodoListTitle(event.target.value);
  };
  const userInput = (event) => {
    setUser(event.target.value);
  };
  const userPassWord = (event) => {
    setTodoListPw(event.target.value);
  };
  const userPassWordCon = (event) => {
    setTodoListPwConf(event.target.value);
  };
  return (
    // input todo
    <ModalInputList>
      <form onSubmit={handleSubmit}>
        <PasswordInput
          onChange={titleInput}
          value={todoListTitle}
          type="text"
          placeholder="@@의 투두리스트"
        />
        <PasswordInput
          onChange={userInput}
          value={user}
          type="text"
          placeholder="닉네임"
        />
        <PasswordInput
          onChange={userPassWord}
          value={todoListPw}
          type={type}
          placeholder="비밀번호"
        />
        <div>
          <PasswordInput
            onChange={userPassWordCon}
            value={todoListPwConf}
            type={type}
            placeholder="비밀번호 확인"
          />
          <ShowTheText onClick={show}>SHOW/HIDE</ShowTheText>
        </div>
        <InputSubmitButton type="submit">추가</InputSubmitButton>
      </form>
    </ModalInputList>
  );
}

export default Input;
const ModalInputList = styled.div`
  padding: 20px;
`;
//input
const PasswordInput = styled.input`
  display: flex;
  padding: 12px;
  border-radius: 4px;
  border: 1px solid #757575;
  width: 60%;
  height: 70px;
  font-size: 20px;
  outline: none;
  font-size: 18px;
  box-sizing: border-box;
  margin: 20px auto 0;
`;
//password
const ShowTheText = styled.a`
  font-size: 16px;
  color: #495057;
  margin-left: 150px;
`;
const InputSubmitButton = styled.button`
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
  margin-left: 280px;
`;
