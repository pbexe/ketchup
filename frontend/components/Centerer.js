import React from "react";
import styled from "styled-components";

const Container = styled.div`
  width: 70vw;
  max-width: 1200px;
  align-self: center;
`;

export default function Centerer({ children, ...props }) {
  return <Container {...props}>{children}</Container>;
}
