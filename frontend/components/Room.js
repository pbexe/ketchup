import styled from "styled-components";

const Card = styled.div`
  border-radius: 15px;
  display: inline-block;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);

  padding: 1.5rem;

  height: 150px;
  width: 300px;
`;

export default function Room({ title, start, length }) {
  return (
    <Card>
      {title} {start} {length}
    </Card>
  );
}
