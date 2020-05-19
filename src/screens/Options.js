import React from "react";
import { Container } from "../components";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Option = styled(Link)`
  color: #467eef;
  padding: 0.5rem;
  margin-bottom: 0.5rem;
  text-decoration: none;
  display: inline-block;
  border: 1px solid #467eef;
`;

export default () => {
  return (
    <Container>
      <Option to="/balance">Check Balance</Option>
      <Option to="/transfer">Transfer</Option>
      <Option to="/contract">Smart Contract</Option>
    </Container>
  );
};
