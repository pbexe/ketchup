import React from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

export default function Page({ children, ...props }) {
  return <Container {...props}>{children}</Container>;
}
