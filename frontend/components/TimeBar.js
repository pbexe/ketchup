import Centerer from "./Centerer";
import styled from "styled-components";
import { useState } from "react";

const Play = styled.img`
  padding-left: 30px;
  padding-right: 30px;
`;

const Underline = styled.div`
  border-bottom: 1px solid #ecedf7;
`;

const Input = styled.input`
  padding: 20px 0px 20px 0px;
  border: none;
  background: rgba(0, 0, 0, 0);
  font-weight: 600;
  font-size: 16px;
  outline: none;
  width: 100%;

  ::placeholder,
  ::-webkit-input-placeholder,
  :-ms-input-placeholder {
    color: #cfcfd3;
  }

  ::focus-visible,
  ::-webkit-input-focus-visible,
  :-ms-input-focus-visible {
    border: none;
  }

  flex: 1;
`;

const Flex = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export default function TimeBar() {
  const [time, setTime] = useState("45");

  return (
    <>
      <Centerer>
        <Flex>
          <Input placeholder={"I'm working on..."} />
          <select value={time} onChange={(e) => setTime(event.target.value)}>
            <option value="15">15 min</option>
            <option value="25">25 min</option>
            <option value="45">45 min</option>
            <option value="60">60 min</option>
            <option value="90">90 min</option>
          </select>
          <Play src="/images/playButton.svg" />
        </Flex>
      </Centerer>
      <Underline />
    </>
  );
}
