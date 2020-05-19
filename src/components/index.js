import styled from "styled-components";

export const Label = styled.p`
  text-align: center;
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Input = styled.input`
  width: 20rem;
  padding: 0.5rem;
  border: 1px solid #333;
  font-size: 16px;
`;

export const TextArea = styled.textarea`
  width: 20rem;
  padding: 0.5rem;
  border: 1px solid #333;
  min-height: 5rem;
  text-align: left;
  font-size: 16px;
`;

export const ErrorLabel = styled.div`
  margin-top: 1rem;
  color: red;
  text-align: center;
  max-width: 20rem;
  word-break: break-word;
`;

export const Log = styled.p`
  margin-top: 0.5rem;
  text-align: left;
  max-width: 20rem;
  word-break: break-word;
`;

export const Button = styled.div`
  background-color: #467eef;
  padding: 0.5rem;
  display: block;
  margin-top: 1rem;
  min-width: 5rem;
  text-align: center;
  cursor: pointer;
  color: #fff;

  &:hover {
    background-color: #fff;
    border: 1px solid #333;
    color: #000;
    border-bottom-width: 3px;
  }
`;
