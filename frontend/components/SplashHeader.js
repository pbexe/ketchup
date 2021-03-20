import React from "react";
import styled from "styled-components";
import Centerer from "./Centerer";
import Link from "next/link";
import { useKeycloak } from "@react-keycloak/ssr";

const Logo = styled.img`
  height: 23px;
  margin-right: 102px;

  :hover {
    cursor: pointer;
  }
`;

const Content = styled.div`
  padding: 25px 0px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const MenuGroup = styled.div`
  display: flex;
`;

const MenuItem = styled.div`
  padding: 0px 19px;
  font-weight: ${(props) => (props.selected ? 500 : 300)};
  font-size: 14px;

  :hover {
    cursor: pointer;
  }
`;

const MenuLink = styled.div`
  text-decoration: none;
  color: inherit;
`;

const Signup = styled(MenuItem)`
  font-weight: 600;
  font-size: 14px;
  color: #ff5858;
  text-shadow: 0px 2px 3px #0000001c;
`;

export default function SplashHeader({ selected }) {
  const { keycloak, initialized } = useKeycloak();
  // const { keycloak, initialized } = useKeycloak();

  let account_button;
  if (!!keycloak.authenticated) {
    account_button = (
      <MenuLink onClick={() => keycloak.logout()}>Logout</MenuLink>

    );
  } else {
    // debugger;
    account_button = (
      <MenuLink onClick={() => keycloak.login()}>Login</MenuLink>
    );
  }

  return (
    <Centerer>
      <Content>
        <MenuGroup>
          <Link href="/">
            <Logo src="/images/redLogo.svg" />
          </Link>
          <MenuItem selected={selected == 1}>
            <Link href="/">
              <MenuLink>Who are we?</MenuLink>
            </Link>
          </MenuItem>
          <MenuItem selected={selected == 2}>
            <Link href="/contact">
              <MenuLink>Contact us</MenuLink>
            </Link>
          </MenuItem>
        </MenuGroup>
        <MenuGroup>
          <MenuItem>{account_button}</MenuItem>
          <Signup>
            <Link href="/register">
              <MenuLink>Get Started</MenuLink>
            </Link>
          </Signup>
        </MenuGroup>
      </Content>
    </Centerer>
  );
}
