import React from "react";
import styled from "styled-components";
import Centerer from "./Centerer";

const Logo = styled.img`
  height: 23px;
  margin-right: 102px;
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
`;

const MenuItem = styled.div`
  padding: 0px 19px;
  font-weight: ${(props) => (props.selected ? 500 : 300)};
  font-size: 14px;
  cursor: pointer;
`;

const Signup = styled(MenuItem)`
  font-weight: 600;
  font-size: 14px;
  color: #ff5858;
  text-shadow: 0px 2px 3px #0000001c;
`;

const Underline = styled.div`
  border-bottom: 1px solid #ecedf7;
`;

export default function DashboardHeader({ selected }) {
  return (
    <>
      <Centerer>
        <Content>
          <MenuGroup>
            <Logo src="/images/redLogo.svg" />
            <MenuItem selected={selected == 1}>Dashboard</MenuItem>
            <MenuItem selected={selected == 2}>Team</MenuItem>
          </MenuGroup>
          <MenuGroup>
            <MenuItem>
              Tom Emmerson <Icon src={"/images/downwardsArrow.svg"} />
            </MenuItem>
          </MenuGroup>
        </Content>
      </Centerer>
      <Underline />
    </>
  );
}
