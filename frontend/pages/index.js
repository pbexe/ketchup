import React from "react";
import Centerer from "../components/Centerer";
import Page from "../components/Page";
import SplashHeader from "../components/SplashHeader";
import styled from "styled-components";
import Footer from "../components/Footer";

const FancySection = styled.div`
  position: relative;
`;

const FancyBackground = styled.div`
  width: 100%;
  height: 70vh;
  background: url(/images/fancyBackground.svg);
  background-size: cover;
  background-position: center;
`;

const FancyContent = styled.div`
  left: 50%;
  transform: translate(-50%, 0%);
  position: absolute;
  top: 112px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.div`
  font-weight: 700;
  font-size: 60px;
`;

const SubTitle = styled.div`
  font-weight: 700;
  color: #afafbe;
  font-size: 29px;
`;

const FancyTimer = styled.img`
  margin-top: 64px;
`;

const InfoSection = styled(Page)`
  background: #fcfcfd;
  min-height: 500px;
  display: flex;
  justify-content: center;
`;

const InfoCenterer = styled(Centerer)`
  display: flex;
  align-items: center;
`;

const InfoContainer = styled.div`
  padding-right: 128px;
`;

const InfoTitle = styled.div`
  font-size: 31px;
  font-weight: 600;
`;

const InfoText = styled.div`
  margin-top: 18px;
  font-weight: 300;
`;

const InfoImage = styled.img``;

export default function Home() {
  return (
    <Page>
      <SplashHeader selected={1} />
      <FancySection>
        <FancyBackground />
        <FancyContent>
          <Title>Pomodoro, Together</Title>
          <SubTitle>Collaborative Time Tracking</SubTitle>
          <FancyTimer src={"/images/fancyTimer.svg"} />
        </FancyContent>
      </FancySection>
      <InfoSection>
        <InfoCenterer>
          <InfoContainer>
            <InfoTitle>Ketchup at the right time</InfoTitle>
            <InfoText>
              Team timers keep your team on the same page, taking breaks at the
              same time and making sure everyone is in sync - just like it is in
              the office.
            </InfoText>
          </InfoContainer>
          <InfoImage src={"/images/cardGraphic.svg"} />
        </InfoCenterer>
      </InfoSection>
      <Footer />
    </Page>
  );
}
