import Centerer from "./Centerer";
import PropTypes from "prop-types";
import styled from "styled-components";
import { useState } from "react";
import { getTimeLeft } from "../helpers";

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
  height: 55px;
`;

const Title = styled.div`
  font-weight: 600;
`;

const TimeLeft = styled.div``;

const TotalTime = styled.div``;
function TimeBar({ runningTimer }) {
  const [time, setTime] = useState("45");

  return (
    <>
      <Centerer>
        <Flex>
          {!runningTimer && (
            <>
              <Input placeholder={"I'm working on..."} />
              <select
                value={time}
                onChange={(e) => setTime(event.target.value)}
              >
                <option value="15">15 min</option>
                <option value="25">25 min</option>
                <option value="45">45 min</option>
                <option value="60">60 min</option>
                <option value="90">90 min</option>
              </select>
              <Play src="/images/playButton.svg" />
            </>
          )}
          {runningTimer && (
            <>
              <Title>{runningTimer.title}</Title>
              <TimeLeft>
                {
                  getTimeLeft(runningTimer.startedAt, runningTimer.length)
                    .minutes
                }
                :
                {
                  getTimeLeft(runningTimer.startedAt, runningTimer.length)
                    .seconds
                }
              </TimeLeft>
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
    startedAt: PropTypes.instanceOf(Date),
    length: PropTypes.number,
  }),
};

export default TimeBar;
