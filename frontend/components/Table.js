import styled from 'styled-components';

const DEFAULT_COLUMN_WIDTH = 200;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  color: #171c3c;
`;

const RowBase = styled.div`
  width: ${(props) => props.width || DEFAULT_COLUMN_WIDTH}px;
  ${(props) => (props.flex ? `flex: ${props.flex};` : '')}
`;

const Header = styled.div`
  display: flex;
  padding: 5px 22px;
`;

const HeaderLabel = styled(RowBase)`
  font-size: 13px;
  font-weight: 600;
  color: #AFAFBE;
`;

const Body = styled.div``;

const Row = styled.div`
  display: flex;
  padding: 11px 22px;
  border-radius: 6px;
  align-items: center;
  cursor: pointer;
  &:hover {
    background: #fafafb;
  }
`;

const RowItem = styled(RowBase)`
  font-weight: 300;
  font-size: 14px;
`;

const Divider = styled.div`
  width: 100%;
  height: 1px;
  background: #ecedf7;
  margin: 13px 0px 32px 0px;
`;

function Table({
    children,
    rows,
    columns,
    onRowClick,
    keyFunction = () => Math.random().toString(),
}) {
    return (
        <Container>
            <Header>
                {columns.map((column) => (
                    <HeaderLabel
                        width={column.width}
                        flex={column.flex}
                        key={column.headerName}
                    >
                        {column.headerName}
                    </HeaderLabel>
                ))}
            </Header>
            <Divider />
            <Body>
                {rows.map((row) => (
                    <Row
                        onClick={() => onRowClick && onRowClick(row)}
                        key={keyFunction(row)}
                    >
                        {columns.map((column) => (
                            <RowItem
                                width={column.width}
                                flex={column.flex}
                                onClick={() => column.onClick && column.onClick(row)}
                                key={`row-${column.headerName}-${keyFunction(row)}`}
                            >
                                {column.field && row[column.field]}
                                {column.component && column.component(row)}
                            </RowItem>
                        ))}
                    </Row>
                ))}
            </Body>
        </Container>
    );
}

export default Table;
