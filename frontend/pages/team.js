import styled from "styled-components";
import Page from "../components/Page";
import DashboardHeader from "../components/DashboardHeader";
import TimeBar from "../components/TimeBar";
import Centerer from "../components/Centerer";
import Room from "../components/Room";
import Footer from "../components/Footer";
import moment from "moment";
import NoRooms from "../components/NoRooms";
import Table from "../components/Table";

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

const Teams = styled.div`
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

const Flex = styled.div`
  display: flex;

  padding-top: 30px;
  padding-bottom: 30px;
`;

const JustFlex = styled.div`
    display: flex;
`;

const FlexSpaceAround = styled(Flex)`
  justify-content: space-around;
  padding-bottom: 40px;
`

const Padding = styled.div`
    padding-bottom: 30px;
`;

const TimeFrameTitle = styled.div`
  color: #2F2F48;
  font-size: 20px;
  font-weight: 700;
`;

const TimeFrameValue = styled.div`
  color: #AFAFBE;
  font-size: 14px;
  font-weight: 700;
`;

const Name = styled.div`
  color: #2F2F48;
  font-size: 13px;
  font-weight: 600;
`;

const Email = styled.div`
  color: #AFAFBE;
  font-size: 11px;
  font-weight: 600;
`;

const Profile = styled.img`  
  background: url("${(props) => props.imageUrl}");
  width: 30px;
  height: 30px;
  border-radius: 100%;
  border: 5px solid white;
  position: relative;
  left: ${(props) => `-${props.amount}px`};
  &:hover {
    z-index: 1;
  }
`;

const ProfileDetails = styled.div`
  padding-left: 16px;
`;

function TimeFrame({ period, meetings, time }) {
    const hours = Math.floor(time / 60)

    return (
        <div>
            <TimeFrameTitle>{period}</TimeFrameTitle>
            <TimeFrameValue>{meetings} Meeting{meetings === 1 ? '' : 's'}</TimeFrameValue>
            <TimeFrameValue>{hours} Hour{hours === 1 ? '' : 's'}</TimeFrameValue>
        </div>
    )
}

export default function Team() {
    const members = [
        {
            name: 'Alexander Craggs',
            image: '/images/fancyBackground.svg',
            email: 'alex@alexander.com',
            joined: moment().subtract(29, "hours").subtract(12, "seconds"),
        },
        {
            name: 'Alexander Craggs',
            image: '/images/fancyBackground.svg',
            email: 'alex@alexander.com',
            joined: moment().subtract(29, "hours").subtract(12, "seconds"),
        },
        {
            name: 'Alexander Craggs',
            image: '/images/fancyBackground.svg',
            email: 'alex@alexander.com',
            joined: moment().subtract(29, "hours").subtract(12, "seconds"),
        },
        {
            name: 'Alexander Craggs',
            image: '/images/fancyBackground.svg',
            email: 'alex@alexander.com',
            joined: moment().subtract(29, "hours").subtract(12, "seconds"),
        },
        {
            name: 'Alexander Craggs',
            image: '/images/fancyBackground.svg',
            email: 'alex@alexander.com',
            joined: moment().subtract(29, "hours").subtract(12, "seconds"),
        },
    ]

    return (
        <Page>
            <Content>
                <DashboardHeader selected={2} />
                <TimeBar
                    runningTimer={{
                        title: "Daily Standup",
                        startedAt: moment().subtract(29, "minutes"),
                        length: 45,
                    }}
                />

                <Centerer>
                    <Flex>
                        <Teams>Start Hack Team</Teams>
                        <img src="/images/addUser.svg" />
                    </Flex>

                    <FlexSpaceAround>
                        <TimeFrame period="Today" meetings={3} time={35 * 3} />
                        <TimeFrame period="This Week" meetings={6} time={35 * 6} />
                        <TimeFrame period="All Time" meetings={49} time={35 * 49} />
                    </FlexSpaceAround>
                    <Flex>

                    </Flex>
                    <Table
                        rows={members}
                        columns={[
                            {
                                headerName: 'Member',
                                component: (user) => (
                                    <>
                                        <JustFlex>
                                            <Profile src={user.image} />
                                            <ProfileDetails>
                                                <Name>{user.name}</Name>
                                                <Email>{user.email}</Email>
                                            </ProfileDetails>
                                        </JustFlex>
                                    </>
                                ),
                                flex: 1
                            },
                            {
                                headerName: 'Joining Date',
                                component: (user) => (
                                    <div>Joined {user.joined.fromNow()}</div>
                                )
                            }
                        ]}
                    />
                </Centerer>
            </Content>
            <Footer />
        </Page>
    );
}
