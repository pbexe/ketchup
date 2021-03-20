import React from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
`;

const Face = styled.div`
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

export default function Faces({ faces }) {
  // TODO: Remove index from the key
  return (
    <Container>
      {faces.map((face, index) => (
        <Face imageUrl={face.url} amount={17 * index} key={index} />
      ))}
    </Container>
  );
}
