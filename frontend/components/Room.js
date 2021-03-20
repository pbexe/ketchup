import styled from "styled-components";

const Card = styled.div`
  border-radius: 15px;
  display: inline-block;
  box-shadow: 0px 0px 19px #00000012;
  padding: 1.5rem;
  height: 150px;
  width: 300px;
  margin: 13px;
`;

const TimeContainer = styled.div``;

const TimeLeftContainer = styled.div``;

const Time = styled.div``;

const LeftText = styled.div``;

const TotalTime = styled.div``;

export default function Room({ title, minsLeft, totalMins }) {
  return (
    <Card>
      <TimeContainer>
        <TimeLeftContainer>
          <Time>{minsLeft}</Time>
          <LeftText>mins left</LeftText>
        </TimeLeftContainer>
        <TotalTime>{totalMins} min</TotalTime>
      </TimeContainer>
    </Card>
  );
}
