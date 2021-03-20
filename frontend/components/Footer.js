import React from "react";
import styled from "styled-components";
import Link from 'next/link'

const Container = styled.div`
  display: flex;
  justify-content: center;
  padding: 19px;
  border-top: 1px solid #ecedf7;
`;

const Logo = styled.img`
  height: 27px;
  margin: 0px 43px;

  :hover {
    cursor: pointer;
  }
`;

const StyledLink = styled.a`
  color: #c8c8d2;
  font-size: 15px;
  font-weight: 300;

  :hover {
    cursor: pointer;
  }
`;

export default function Footer() {
  return (
    <Container>
      <Link href="mailto:contact@ketchup.sh"><StyledLink>Contact us</StyledLink></Link>
      <Link href="/"><Logo src={"/images/greyLogo.svg"} /></Link>
      <Link href="/privacy"><StyledLink>Privacy Policy</StyledLink></Link>
    </Container>
  );
}
