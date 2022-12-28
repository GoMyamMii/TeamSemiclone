import React, { useRef } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { postCommentList } from "../redux/modules/commentList";
import Button from "./Button";

const CommentInput = () => {
  const dispatch = useDispatch();

  const paramId = useParams().id;

  const commentLineRef = useRef();
  const commenterRef = useRef();
  const commentPwRef = useRef();

  const handleAddClick = () => {
    if (!commentLineRef.current.value) {
      return alert("댓글을 입력하세요.");
    }
    if (!commenterRef.current.value) {
      return alert("닉네임을 입력하세요");
    }
    if (!commentPwRef.current.value) {
      return alert("비밀번호를 입력하세요");
    }
    dispatch(
      postCommentList([
        commentLineRef.current.value,
        commenterRef.current.value,
        commentPwRef.current.value,
        paramId,
      ])
    );
    commentLineRef.current.value = "";
    commenterRef.current.value = "";
    commentPwRef.current.value = "";
  };

  return (
    <CommentInputContainer>
      <Div>
        <CommentLineInput
          placeholder="댓글을 입력하세요."
          ref={commentLineRef}
        />
        <Div>
          <CommentInfoInput
            placeholder="닉네임을 입력하세요."
            ref={commenterRef}
          />
          <CommentInfoInput
            placeholder="비밀번호를 입력하세요."
            ref={commentPwRef}
            type="password"
          />
        </Div>
      </Div>
      <Button onClick={handleAddClick}>글 작성</Button>
    </CommentInputContainer>
  );
};

const CommentLineInput = styled.textarea`
  width: 600px;
  height: 40px;
  border-radius: 5px;
  outline: none;
  border: none;
  padding: 20px;
  margin-right: 10px;
  margin-bottom: 10px;
  resize: none;
`;

const CommentInputContainer = styled.div`
  margin-bottom: 20px;
  display: flex;
  justify-content: center;
`;

const CommentInfoInput = styled.input`
  width: 160px;
  height: 30px;
  border-radius: 5px;
  outline: none;
  border: none;
  padding: 0 20px;
  margin-right: 10px;
  font-size: 12px;
`;

const Div = styled.div`
  margin: 0px;
  padding: 0px;
`;

export default CommentInput;
