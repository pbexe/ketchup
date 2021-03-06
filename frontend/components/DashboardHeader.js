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

const Icon = styled.img``;

const Content = styled.div`
  padding: 25px 0px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const MenuGroup = styled.div`
  display: flex;
  position: relative;
`;

const MenuItem = styled.div`
  padding: 0px 19px;
  font-weight: ${(props) => (props.selected ? 500 : 300)};
  font-size: 14px;
  cursor: pointer;
`;

const Underline = styled.div`
  border-bottom: 1px solid #ecedf7;
`;

const MenuLink = styled.a`
  color: inherit;
  text-decoration: inherit;
`;

const LogoutMenu = styled.div`
  position: absolute;
  top: 26px;
  right: 17px;
  background: white;
  padding: 9px 34px;
  font-size: 12px;
  border-radius: 9px;
  box-shadow: 0px 2px 16px #00000021;
  cursor: pointer;
`;

export default function DashboardHeader({ selected, name }) {
  const [showLogout, setShowLogout] = React.useState(false);

  const { keycloak, initialized } = useKeycloak();

  return (
    <>
      <Centerer>
        <Content>
          <MenuGroup>
            <Link href="/">
              <Logo src="/images/redLogo.svg" />
            </Link>
            <MenuItem selected={selected == 1}>
              <Link href="/dashboard">
                <MenuLink>Dashboard</MenuLink>
              </Link>
            </MenuItem>
            <MenuItem selected={selected == 2}>
              <Link href="/team">
                <MenuLink>Team</MenuLink>
              </Link>
            </MenuItem>
          </MenuGroup>
          <MenuGroup>
            <MenuItem onClick={() => setShowLogout(!showLogout)}>
              {name} <Icon src={"/images/downwardsArrow.svg"} />
            </MenuItem>
            {showLogout && (
              <LogoutMenu
                onClick={() => {
                  keycloak.logout();
                }}
              >
                Logout
              </LogoutMenu>
            )}
          </MenuGroup>
        </Content>
      </Centerer>
      <Underline />
    </>
  );
}
