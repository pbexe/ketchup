import styled from "styled-components";
import Page from "../components/Page";
import DashboardHeader from "../components/DashboardHeader";
import TimeBar from "../components/TimeBar";
import Centerer from "../components/Centerer";
import Room from "../components/Room";
import Footer from "../components/Footer";
import moment from "moment";

const Welcome = styled.div`
  font-size: 24px;
  font-weight: 700;
  padding-top: 40px;
`;

const Content = styled(Page)`
  flex-grow: 1;
  height: 100%;
`;

const WelcomeAction = styled.div`
  font-size: 15px;
  font-weight: 600;
  color: #afafbe;
  padding-bottom: 30px;
  margin-top: 10px;
`;

const ActiveRooms = styled.div`
  padding-top: 30px;
  padding-bottom: 30px;
  color: #2f2f48;
  font-size: 24px;
  font-weight: 600;
`;

const Rooms = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const HorizontalRule = styled.hr`
  width: 50%;
  border-top: 1px solid #ecedf7;
  border-bottom: none;
`;

export default function Dashboard() {
  return (
    <Page>
      <Content>
        <DashboardHeader selected={1} />
        <TimeBar
          runningTimer={{
            title: "Daily Standup",
            startedAt: moment().subtract(29, "minutes"),
            length: 45,
          }}
        />
        <Centerer>
          <Welcome>Hey Tom,</Welcome>
          <WelcomeAction>Join a room to get started</WelcomeAction>
          <HorizontalRule />
          <ActiveRooms>Active Rooms</ActiveRooms>
          <Rooms>
            <Room
              title={"Daily Standup"}
              startedAt={moment().subtract(45, "minutes")}
              length={45}
            />
            <Room
              title={"Sprint Retrospective"}
              startedAt={moment().subtract(45, "minutes")}
              length={45}
            />
            <Room
              title={"Work on API"}
              startedAt={moment().subtract(45, "minutes")}
              length={45}
            />
            <Room
              title={"Work on API"}
              startedAt={moment().subtract(45, "minutes")}
              length={45}
            />
            <Room
              title={"Work on API"}
              startedAt={moment().subtract(45, "minutes")}
              length={45}
            />
          </Rooms>
        </Centerer>
      </Content>
      <Footer />
    </Page>
  );
}
