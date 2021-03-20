import React from "react";
import Centerer from "./Centerer";
import PropTypes from "prop-types";
import styled from "styled-components";
import { useState } from "react";
import { getTimeLeft } from "../helpers";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import Faces from "./Faces";

const Play = styled.img`
  padding-left: 30px;
  padding-right: 30px;
  cursor: pointer;
`;

const Underline = styled.div`
  border-bottom: 1px solid #ecedf7;
`;

const Input = styled.input`
  border: none;
  background: rgba(0, 0, 0, 0);
  font-weight: 600;
  font-size: 16px;
  outline: none;
  width: 100%;

  &::placeholder {
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
  height: 64px;
`;

const Title = styled.div`
  font-weight: 600;
  margin-right: 30px;
`;

const TimeLeft = styled.div`
  font-weight: 600;
  color: #ff5858;
`;

const TotalTime = styled.div`
  font-size: 13px;
  font-weight: 600;
  color: #afafbe;
  margin-left: 14px;
`;

const StopButton = styled.div`
  background: #ff5858;
  border-radius: 100%;
  height: 37px;
  width: 37px;
  display: flex;
  justify-content: center;
  align-items: center;
  /* padding-right: 1px; */
  color: #a03333;
  transition: all 0.1s;
  cursor: pointer;
  &:hover {
    background: #f15454;
  }
`;

const Info = styled.div`
  display: flex;
  align-items: center;
`;

const Actions = styled.div`
  display: flex;
  align-items: center;
`;

const Select = styled.select`
  background-color: white;
  border: thin solid #ffffff00;
  border-radius: 4px;
  display: inline-block;
  font: inherit;
  line-height: 1.5em;
  padding: 0.5em 3.5em 0.5em 1em;

  margin: 0;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
  -webkit-appearance: none;
  -moz-appearance: none;

  background-image:
    linear-gradient(45deg, transparent 50%, gray 50%),
    linear-gradient(135deg, gray 50%, transparent 50%),
    linear-gradient(to right, #ccc, #ccc);
  background-position:
    calc(100% - 20px) calc(1em + 2px),
    calc(100% - 15px) calc(1em + 2px),
    calc(100% - 2.5em) 0.5em;
  background-size:
    5px 5px,
    5px 5px,
    1px 1.5em;
  background-repeat: no-repeat;

  :focus {
    background-image:
      linear-gradient(45deg, green 50%, transparent 50%),
      linear-gradient(135deg, transparent 50%, green 50%),
      linear-gradient(to right, #ccc, #ccc);
    background-position:
      calc(100% - 15px) 1em,
      calc(100% - 20px) 1em,
      calc(100% - 2.5em) 0.5em;
    background-size:
      5px 5px,
      5px 5px,
      1px 1.5em;
    background-repeat: no-repeat;
    border-color: #ffffff00;
    outline: 0;
  }
`

function TimeBar({ runningTimer, onStart, onEnd }) {
  const [time, setTime] = useState("45");
  const [text, setText] = useState("");

  const [timeLeft, setTimeLeft] = React.useState();

  React.useEffect(() => {
    if (!runningTimer) return;

    const timer = setTimeout(() => {
      setTimeLeft(getTimeLeft(runningTimer.startedAt, runningTimer.length));
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  });

  React.useEffect(() => {
    if (!runningTimer) return;

    setTimeLeft(getTimeLeft(runningTimer.startedAt, runningTimer.length));
  }, [runningTimer]);

  if (timeLeft && timeLeft.minutes == "00" && timeLeft.seconds == "00") {
    runningTimer = undefined;
  }
  return (
    <>
      <Centerer>
        <Flex>
          {!runningTimer && (
            <>
              <Input
                placeholder={"I'm working on..."}
                value={text}
                onChange={(el) => setText(el.target.value)}
              />
              <Select
                value={time}
                onChange={(e) => setTime(event.target.value)}
              >
                <option value="15">15 min</option>
                <option value="25">25 min</option>
                <option value="45">45 min</option>
                <option value="60">60 min</option>
                <option value="90">90 min</option>
              </Select>
              <Play
                src="/images/playButton.svg"
                onClick={() => onStart(time, text)}
              />
            </>
          )}
          {runningTimer && timeLeft && (
            <>
              <Info>
                <Title>{runningTimer.title || "Untitled Room"}</Title>
                <TimeLeft>
                  {timeLeft.minutes}:{timeLeft.seconds}
                </TimeLeft>
                <TotalTime>{runningTimer.length} min</TotalTime>
              </Info>
              <Actions>
                <Faces faces={runningTimer.faces} />
                <StopButton onClick={onEnd}>
                  <FontAwesomeIcon icon={faTimes} />
                </StopButton>
              </Actions>
            </>
          )}
        </Flex>
      </Centerer>
      <Underline />
    </>
  );
}

TimeBar.propTypes = {
  runningTimer: PropTypes.shape({
    title: PropTypes.string,
    startedAt: PropTypes.any,
    length: PropTypes.number,
  }),
};

export default TimeBar;
