import React from "react";
import styled from "styled-components";
import moment from "moment";
import Faces from "./Faces";
import { getTimeLeft } from "../helpers";

const Card = styled.div`
  border-radius: 12px;
  display: inline-block;
  box-shadow: 0px 0px 19px #00000012;
  padding: 1.5rem;
  height: 138px;
  width: 300px;
  margin: 13px;
`;

const TimeContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const TimeLeftContainer = styled.div`
  display: flex;
`;

const Time = styled.div`
  font-size: 18px;
  font-weight: 700;
`;

const LeftText = styled.div`
  font-weight: 700;
  color: #afafbe;
  font-size: 14px;
  margin-left: 8px;
`;

const TotalTime = styled.div`
  font-weight: 700;
  color: #afafbe;
  font-size: 14px;
`;

const StartedAgo = styled.div`
  font-weight: 400;
  color: #afafbe;
  font-size: 12px;
  margin-top: 5px;
`;

const Title = styled.div`
  font-weight: 500;
  font-size: 20px;
  margin-top: 6px;
  margin-bottom: 19px;
`;

const Actions = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 40px;
`;

const Button = styled.div`
  background: #7ad143;
  border-radius: 8px;
  padding: 9px 25px;
  height: 17px;
  color: white;
  font-size: 14px;
  transition: all 0.2s;
  cursor: pointer;
  &:hover {
    background: #71c13e;
    box-shadow: 0px 4px 6px #00000021;
  }
`;

export default function Room({
  id,
  title,
  length,
  startedAt,
  faces,
  onJoin,
  canJoin,
}) {
  const [time, setTime] = React.useState(getTimeLeft(startedAt, length));
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setTime(getTimeLeft(startedAt, length));
    }, 1000);

    return () => clearTimeout(timer);
  });

  return (
    <Card>
      <TimeContainer>
        <TimeLeftContainer>
          <Time>
            {time.minutes}:{time.seconds}
          </Time>
          <LeftText>mins left</LeftText>
        </TimeLeftContainer>
        <TotalTime>{length} min</TotalTime>
      </TimeContainer>
      <StartedAgo>Started {moment(startedAt).fromNow()}</StartedAgo>
      <Title>{title || "Untitled Room"}</Title>
      <Actions>
        <Faces faces={faces} />
        {canJoin && <Button onClick={() => onJoin(id)}>Join Now</Button>}
      </Actions>
    </Card>
  );
}
