import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { __postTodoList } from "../redux/modules/todoUser";
import styled from "styled-components";

function Input({ setToggleModal }) {
  const [todoListTitle, setTodoListTitle] = useState("");
  const [user, setUser] = useState("");
  const [todoListPw, setTodoListPw] = useState("");
  const [todoListPwConf, setTodoListPwConf] = useState("");
  const [type, setType] = useState("password");

  const dispatch = useDispatch();

  // new todolist
  const handleSubmit = (event) => {
    event.preventDefault();
    if (!todoListTitle) {
      return alert("제목을 입력하세요.");
    }
    if (!user) {
      return alert("닉네임을 입력하세요.");
    }
    if (!todoListPw) {
      return alert("비밀번호를 입력하세요.");
    }

    //password
    if (todoListPw !== todoListPwConf) {
      return alert("비밀번호를 확인하세요");
    }
    dispatch(__postTodoList([todoListTitle, user, todoListPw]));

    setToggleModal(false);

    setTodoListTitle("");
    setUser("");
    setTodoListPw("");
    setTodoListPwConf("");
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
          placeholder="제목"
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
