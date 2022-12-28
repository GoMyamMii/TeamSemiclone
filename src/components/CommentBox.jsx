import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { getCommentList } from "../redux/modules/commentList";
import CommentInput from "./CommentInput";
import CommentList from "./CommentList";

const Comment = () => {
  // configStore 의 reducer 안에 있는 녀석들 중 todoList 의 state 뽑아쓰기
  const commentState = useSelector((state) => state.commentList);
  const dispatch = useDispatch();

  const todoId = useParams().id;

  // useEffect 로 처음에 랜더링 할 때 todoState 받아오기
  useEffect(() => {
    commentState.commentListData.length === 0 && dispatch(getCommentList());
  }, []);

  return (
    <CommentContainer>
      <CommentInput />
      {commentState.commentListData
        .filter((commentItem) => commentItem.paramId === todoId)
        .map((item) => (
          <CommentList
            comment={item.comment}
            id={item.id}
            commenter={item.commenter}
            commentPw={item.commentPw}
            key={item.id}
          />
        ))}
    </CommentContainer>
  );
};

const CommentContainer = styled.div`
  background-color: #f0f0f0;
  padding: 40px 0;
  margin-top: 20px;
`;

export default Comment;
