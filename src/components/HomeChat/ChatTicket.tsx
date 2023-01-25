import React from 'react';
import { TicketData } from '../../types/chat';
import styled from 'styled-components';

const Container = styled.div`
  position: absolute;
  left: 3%;
  top: 40%;
  z-index: 100;
  display: grid;
  place-items: center;
  justify-content: space-between;
  background-color: #fff;

  @media (min-width: 376px) {
    left: 8%;
  }
  @media (min-width: 426px) {
    left: 27%;
  }
  @media (min-width: 769px) {
    left: 36%;
  }
  @media (min-width: 1025px) {
    left: 40%;
  }
`;

const TicketContainer = styled.div`
  display: flex;
  justify-content: space-around;
  width: 350px;
  min-height: 130px;
  &::before {
    content: '';
    width: 24px;
    height: 15px;
    background: #fff;
    border-radius: 0 0 12rem 12rem;
    position: absolute;
    top: 0px;
    left: 230px;
  }
  &::after {
    content: '';
    width: 24px;
    height: 15px;
    background: #fff;
    border-radius: 12rem 12rem 0 0;
    position: absolute;
    top: 115px;
    left: 230px;
  }
`;

const TicketLeft = styled.div`
  border-right: 3px dashed #fff;
  flex: 0.7;
  height: 100%;
  width: 90%;
`;

const TicketRight = styled.div`
  flex: 0.3;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const TicketInfo = styled.div`
  display: flex;

  p + p {
    margin-left: 0.5rem;
    border-left: 2px solid #fff;
    padding-left: 0.5rem;
  }
`;

const ChatTicket = (chatTicketProps: TicketData) => {
  const { title, description, brand, tag, id, priority, status, date } = chatTicketProps;

  let truncatedDescription = description.substring(0, 30) + '...';

  const dateFormat = () => `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`;

  return (
    <Container>
      <TicketContainer style={{ backgroundColor: status === 0 ? '#00DB77' : '#DB060F' }}>
        <TicketLeft>
          <h3>{title}</h3>
          <p>{truncatedDescription}</p>
          <TicketInfo>
            <p>{brand}</p>
            <p>{tag}</p>
          </TicketInfo>
        </TicketLeft>
        <TicketRight>
          <p>{dateFormat()}</p>
          <p>{priority === 0 ? 'ALTA' : 'BAJA'}</p>
          <p>#{id}</p>
        </TicketRight>
      </TicketContainer>
    </Container>
  );
};

export default ChatTicket;
