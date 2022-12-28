import React from "react";
import styled from "styled-components";

const Button = (props) => {
  return (
    <>
      <AlmightyButton
        fontSize={props.fontSize}
        width={props.width}
        height={props.height}
        mr={props.mr}
        backgroundColor={props.backgroundColor}
        color={props.color}
        onClick={props.onClick}
      >
        {props.children}
      </AlmightyButton>
    </>
  );
};

const AlmightyButton = styled.button`
  width: ${(props) => props.width || "120px"};
  height: ${(props) => props.height || "80px"};
  background-color: ${(props) => props.backgroundColor || "#333"};
  color: ${(props) => props.color || "#eee"};
  font-size: ${(props) => props.fontSize || "14px"};
  margin-right: ${(props) => props.mr || "0px"};
  border-radius: 5px;
  cursor: pointer;
`;

export default Button;
