import styled from "styled-components";
import Page from "../components/Page";
import SplashHeader from "../components/SplashHeader";
import TimeBar from "../components/TimeBar";
import Centerer from "../components/Centerer";
import Room from "../components/Room";
import Footer from "../components/Footer";
import Link from "next/link";

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
  font-size: 14;
  font-weight: 600;
  color: #afafbe;
  padding-bottom: 30px;
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

const StyledLink = styled.a`
    color: #ff5858;
    text-decoration: none;
    font-weight: 600;
`;

const Effective = styled.p`
  font-weight: bold;
`;

const Title = styled.div`
  padding-top: 30px;
  color: #2f2f48;
  font-size: 24px;
  font-weight: 600;
`;

export default function Privacy() {
    return (
        <Page>
            <Content>
                <SplashHeader />
                <Centerer>
                    <Title>Privacy Policy</Title>
                    <p>Your privacy is important to us. It is Ketchups policy to respect your privacy regarding any information we may collect from you across our website, <StyledLink href="https://ketchup.sh">https://ketchup.sh</StyledLink>, and other sites we own and operate.</p>
                    <p>We only ask for your personal information when it is required to maintain the stability of our service, primarily in anti-abuse measures.</p>
                    <p>We only retain collected information for as long as necessary to provide you with your requested service. What data we store, we’ll protect within commercially acceptable means to prevent loss and theft, as well as unauthorised access, disclosure, copying, use or modification.</p>
                    <p>Our website may link to external sites that are not operated by us. Please be aware that we have no control over the content and practices of these sites, and cannot accept responsibility or liability for their respective privacy policies.</p>
                    <p>You are free to refuse our request for your personal information, with the understanding that we may be unable to provide you with some of your desired services.</p>
                    <p>Your continued use of our website will be regarded as acceptance of our practices around privacy and personal information. If you have any questions about how we handle user data and personal information, feel free to <Link href="/contact"><StyledLink>contact us</StyledLink></Link>.</p>
                    <Effective>This policy is effective as of 20th March 2021</Effective>
                </Centerer>
            </Content>
            <Footer />
        </Page>
    );
}
