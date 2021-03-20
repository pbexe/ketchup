import styled from "styled-components";

const WelcomeAction = styled.div`
  font-size: 15px;
  font-weight: 600;
  color: #afafbe;
  padding-bottom: 30px;
  margin-top: 10px;

  
`;

const NoRoomsYet = styled.p`
  display: flex;
  justify-content: center;
  color: #FF5858;
  font-size: 12px;
  font-weight: 600;
  margin-bottom: 0px;
`;

const NoRoomsYetSubtitle = styled.p`
  display: flex;
  justify-content: center;
  color: #AFAFBE;
  font-size: 12px;
  font-weight: 600;
  margin-top: 0px;
  padding-bottom: 15px;
`;

const NoRoomsImage = styled.img`
  display: flex;
  justify-content: center;
  margin: 0px auto;
`;

export default function NoRooms() {
  return (
    <>
      <NoRoomsYet>No rooms yet</NoRoomsYet>
      <NoRoomsYetSubtitle>(in the mean time, enjoy this blob)</NoRoomsYetSubtitle>
      <NoRoomsImage src="images/noRoomsBubble.svg" />
    </>
  )
}