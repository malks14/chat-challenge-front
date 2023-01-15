import * as Menu from '@radix-ui/react-context-menu';
import styled from 'styled-components';

const Container = styled.div`
  background-color: #fff;
  border: 1px solid #eee;
  padding: 5px;
`;

const Item = styled(Menu.Item)`
  color: #000;
  padding: 3px;
  cursor: pointer;
  transition: 0.3s ease;

  &:hover {
    color: #fff;
    background-color: #36dd81;
  }
`;

export default function ChatTabContextMenu() {
  const handleShowOpenTicket = () => {
    // TODO: Show open ticket component.
  };

  const handleShowClosedTicket = () => {
    // TODO: Show closed ticket component.
  };

  return (
    <Container>
      <Item onClick={handleShowOpenTicket}>Ver ticket abierto</Item>
      <Menu.Separator />
      <Item onClick={handleShowClosedTicket}>Ver ticket cerrado</Item>
    </Container>
  );
}
