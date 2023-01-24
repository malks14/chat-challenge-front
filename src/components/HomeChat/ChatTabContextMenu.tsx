import * as Menu from '@radix-ui/react-context-menu';
import styled from 'styled-components';
import { useAppDispatch } from '../../redux/hooks';
import { setIsOpenModal, setTicketStatus } from '../../redux/chatsSlice';
import { forwardRef } from 'react';

const Container = styled.div`
  background-color: #fff;
  border: 1px solid #eee;
  padding: 5px;
`;

const Item = styled.div`
  color: #000;
  padding: 3px;
  cursor: pointer;
  transition: 0.3s ease;

  &:hover {
    color: #fff;
    background-color: #36dd81;
  }
`;

const ChatTabContextMenu = forwardRef<HTMLDivElement>((props, ref) => {
    const dispatch = useAppDispatch()
  
    const handleShowOpenTicket = () => {
      // TODO: Show open ticket component.
      dispatch(setIsOpenModal(true));
      
      dispatch(setTicketStatus(0))
      
    };
  
    const handleShowClosedTicket = () => {
      // TODO: Show closed ticket component.
      dispatch(setTicketStatus(1))
      dispatch(setIsOpenModal(true))
    };
  
    return (
        <Container>
          <Item ref={ref} {...props} onClick={handleShowOpenTicket}>Ver ticket abierto</Item>
          <Menu.Separator />
          <Item ref={ref} {...props} onClick={handleShowClosedTicket}>Ver ticket cerrado</Item>
        </Container>
    );
  
})


export default ChatTabContextMenu;