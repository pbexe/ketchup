import styled from "styled-components";
import Page from "../components/Page";
import DashboardHeader from "../components/DashboardHeader";
import TimeBar from "../components/TimeBar";
import Centerer from "../components/Centerer";
import Room from "../components/Room";
import Footer from "../components/Footer";

const Welcome = styled.div`
  font-size: 20;
  font-weight: 700;

  padding-top: 40px;
`;

const WelcomeAction = styled.div`
  font-size: 14;
  font-weight: 600;

  color: #afafbe;

  padding-bottom: 30px;
`;

const ActiveRooms = styled.div`
  padding-top: 30px;
  padding-bottom: 30px;

  color: #2f2f48;

  font-size: 20px;
  font-weight: 600;
`;

const HorizontalRule = styled.hr`
  width: 50%;

  border: 1px solid #ecedf7;
`;

export default function Dashboard() {
  return (
    <Page>
      <DashboardHeader selected={1} />
      <TimeBar />
      <Centerer>
        <Welcome>Hey Tom,</Welcome>
        <WelcomeAction>Join a room to get started</WelcomeAction>
        <HorizontalRule />
        <ActiveRooms>Active Rooms</ActiveRooms>
        <Room
          title={"Daily Standup"}
          start={new Date() - 1000 * 60 * 60 * 5}
          length={45}
        />
        <Room
          title={"Sprint Retrospective"}
          start={new Date() - 1000 * 60 * 60 * 5}
          length={45}
        />
        <Room
          title={"Work on API"}
          start={new Date() - 1000 * 60 * 60 * 5}
          length={45}
        />
      </Centerer>
      <Footer />
    </Page>
  );
}
