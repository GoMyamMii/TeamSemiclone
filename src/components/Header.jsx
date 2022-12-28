import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

function Header() {
  return (
    <StyledHeader>
      <StyledP>
        <Link to="/">Home</Link>
      </StyledP>
      <StyledP>SemiClone;</StyledP>
    </StyledHeader>
  );
}

export default Header;
const StyledHeader = styled.div`
  background: #f8f9fa;
  padding: 20px;
  font-size: 30px;
  font-weight: 700;
  display: flex;
  justify-content: space-between;
`;

const StyledP = styled.p`
  margin: 0;
`;
