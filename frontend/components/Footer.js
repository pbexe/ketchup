import React from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  justify-content: center;
  padding: 19px;
  border-top: 1px solid #ecedf7;
`;

const Logo = styled.img`
  height: 27px;
  margin: 0px 43px;
`;

const Link = styled.div`
  color: #c8c8d2;
  font-size: 15px;
  font-weight: 300;
`;

export default function Footer() {
  return (
    <Container>
      <Link>Contact us</Link>
      <Logo src={"/images/greyLogo.svg"} />
      <Link>Privacy Policy</Link>
    </Container>
  );
}
