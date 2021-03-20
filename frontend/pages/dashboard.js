import styled from "styled-components";
import Page from "../components/Page";
import DashboardHeader from "../components/DashboardHeader";
import TimeBar from "../components/TimeBar";
import Centerer from "../components/Centerer";
import Room from "../components/Room";
import Footer from "../components/Footer";
import moment from "moment";
import NoRooms from "../components/NoRooms";
import {
  createRoom,
  getRooms,
  getUser,
  joinRoom,
  leaveRoom,
} from "../api/rooms";
import React from "react";
import { useKeycloak } from "@react-keycloak/ssr";
import { useRouter } from "next/router";

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
  flex-grow: 1;
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

const FlexActiveRooms = styled.div`
  display: flex;
`;

export default function Dashboard() {
  const { keycloak, initialized } = useKeycloak();
  const [name, setName] = React.useState("");
  const [user, setUser] = React.useState({});
  const [rooms, setRooms] = React.useState([]);

  const router = useRouter();

  React.useEffect(() => {
    if (initialized && !keycloak.authenticated) {
      router.push("/");
    }
    const f = async () => {
      const user = await keycloak.loadUserProfile();
      setName(user.firstName);
      const u = await getUser(keycloak.token);
      setUser(u);
      console.log("u", u);
      const rooms = await getRooms(keycloak.token);
      setRooms(rooms);
    };
    f();
  }, [initialized, keycloak]);

  if (!initialized) {
    return <div>Loading</div>;
  }

  return (
    <Page>
      <Content>
        <DashboardHeader selected={1} name={name} />
        <TimeBar
          runningTimer={
            user.current_room && {
              title: user.current_room.name,
              startedAt: user.current_room.start_time,
              length: user.current_room.duration,
            }
          }
          onStart={async (duration, name) => {
            const newRoom = await createRoom(keycloak.token, name, duration);
            console.log(newRoom);

            // Join the created room
            await joinRoom(keycloak.token, newRoom.uuid);

            const rooms = await getRooms(keycloak.token);
            setRooms(rooms);
          }}
          onEnd={async () => {
            await leaveRoom(keycloak.token);

            const rooms = await getRooms(keycloak.token);
            setRooms(rooms);
          }}
        />
        <Centerer>
          <Welcome>Hey {name},</Welcome>
          <WelcomeAction>Join a room to get started</WelcomeAction>
          <HorizontalRule />
          <FlexActiveRooms>
            <ActiveRooms>Active Rooms</ActiveRooms>
          </FlexActiveRooms>
          <Rooms>
            {rooms.map((room) => (
              <Room
                id={room.id}
                title={room.name}
                length={room.duration}
                startedAt={room.start_time}
                faces={room.users.map((person) => ({
                  url: `https://eu.ui-avatars.com/api/?name=${person.firstName}+${person.lastName}`,
                }))}
                onJoin={async (id) => {
                  await joinRoom(keycloak.token, id);

                  const rooms = await getRooms(keycloak.token);
                  setRooms(rooms);
                }}
              />
            ))}
          </Rooms>
          {rooms.length == 0 && <NoRooms />}
        </Centerer>
      </Content>
      <Footer />
    </Page>
  );
}
