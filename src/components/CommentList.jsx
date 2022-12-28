import React, { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import {
  deleteCommentList,
  editCommentList,
} from "../redux/modules/commentList";
import Button from "./Button";

const CommentList = ({ comment, id, commenter, commentPw }) => {
  const commentPwCheck = useRef();
  const editComment = useRef();
  const dispatch = useDispatch();
  const [isEdit, setisEdit] = useState(false);

  const handleDeleteClick = () => {
    if (commentPw === commentPwCheck.current.value) {
      dispatch(deleteCommentList(id));
    } else {
      alert("비밀번호가 일치하지 않습니다.");
    }
  };

  const handleEditClick = () => {
    if (!isEdit) {
      if (commentPw === commentPwCheck.current.value) {
        setisEdit(true);
      } else {
        alert("비밀번호가 일치하지 않습니다.");
      }
    } else {
      dispatch(editCommentList([id, editComment.current.value]));
      setisEdit(false);

      commentPwCheck.current.value = "";
    }
  };

  return (
    <CommentListContainer>
      <CommentCard>
        <RelativeDiv>
          {isEdit ? (
            <EditComment ref={editComment} placeholder={"댓글을 입력하세요."} />
          ) : (
            <CommentTitleContainer>{comment}</CommentTitleContainer>
          )}

          <CommenterContainer>{commenter}</CommenterContainer>
          <CommentPwInput ref={commentPwCheck} placeholder={"비밀번호 입력"} />
        </RelativeDiv>
        <Button onClick={handleEditClick}>{isEdit ? "Done" : "Edit"}</Button>
        <Button onClick={handleDeleteClick}>Delete</Button>
      </CommentCard>
    </CommentListContainer>
  );
};

const CommentListContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const CommentCard = styled.div`
  width: 740px;
  background-color: #bbb;
  border-radius: 5px;
  padding: 20px;
  display: flex;
  justify-content: space-between;
  margin: 10px 0;
`;

const CommentTitleContainer = styled.div`
  margin: 0;
  border-radius: 5px;
  width: 480px;
`;

const CommenterContainer = styled.p`
  padding: 0;
  margin-bottom: 0;
  font-size: 12px;
  position: absolute;
  bottom: 0;
`;

const RelativeDiv = styled.div`
  position: relative;
`;

const CommentPwInput = styled.input`
  position: absolute;
  bottom: 0;
  right: 0;
  border-radius: 5px;
  border: none;
  font-size: 12px;
  padding: 5px 10px;
  outline: none;
`;

const EditComment = styled.input`
  width: 460px;
  margin: 0;
  border-radius: 5px;
  padding: 5px 10px;
  outline: none;
  border: none;
`;

export default CommentList;
