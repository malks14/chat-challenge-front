import { useState } from 'react';
import styled from 'styled-components';
import { IoCheckmarkDoneOutline } from 'react-icons/io5';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { ChatTabProps } from '../../types/chat';
import ConfirmDialog from '../ConfirmDialog';
import ContextMenu from '../ContextMenu';
import ChatTabContextMenu from './ChatTabContextMenu';
import apiClient from '../../utils/client';
import { LoadRemove, LoadStart } from '../Loading';
import { NotificationFailure, NotificationSuccess } from '../Notifications';

const Container = styled.div<{ isSelected: boolean }>`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 0px 6px;
  cursor: pointer;
  user-select: none;
  background: ${(props) => (props.isSelected ? '#36dd81' : '#fff')};
  transition: all 0.2s ease;

  &:first-child .chatInfo {
    border-top: none !important;
  }
  &:hover {
    background-color: #dddddd6e;
  }
  &:hover .dots {
    opacity: 50%;
    cursor: pointer;
  }
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 7px;
  width: 100%;
  justify-content: center;
  align-items: center;
`;

const ChatPhoto = styled.div`
  & .image {
    border-radius: 50%;
    width: 50px;
    height: 50px;
    border: 1px solid #ddd;
  }
`;

const ChatInfo = styled.div`
  display: flex;
  flex-direction: column;
  padding: 4px 0px;
  width: 100%;
  border-top: 1px solid #e9edef;
`;

const ChatInfoWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Name = styled.div`
  font-weight: 700;
  color: #101111;
`;

const LastMessageTime = styled.div`
  font-size: 12px;
  color: #101111;
  opacity: 50%;
  align-self: end;
`;

const ChatPreview = styled.div`
  display: flex;
  flex-direction: row;
  gap: 2px;
  align-items: center;
`;

const MessagePreview = styled.div`
  font-size: 10px;
  opacity: 50%;
  color: #101111;
`;

const ChatTabDots = styled.div`
  color: #101111;
  display: flex;
  align-items: center;
  opacity: 0%;
`;

function ChatTab(chatTabProps: ChatTabProps) {
  const { name, image: photo, chatId, messages, selectedChat, onClick } = chatTabProps;
  console.log(photo);
  
  const [isOpen, setIsOpen] = useState(false);

  const lastMessage = messages[0]
    ? messages.slice(-1)[0].message.slice(0, 55) + '...'
    : 'No hay mensajes.';
  const lastMessageTime = messages[0] ? messages.slice(-1)[0].timeDate.slice(11, 16) + ' p.m.' : '';

  const eraseChat = async () => {
    /* 
      TODO: 
      1. Delete chat
    */
    LoadStart();

    try {
      const deleteChat = apiClient.delete(`/chats/${chatId}`);
      console.log(deleteChat);

      NotificationSuccess('El chat se elimino satisfactoriamente');
    } catch (error) {
      NotificationFailure('Ocurrio un problema. No se pudo eliminar el chat');
    }

    LoadRemove();
  };

  const handleOpenModal = () => {
    setIsOpen(true);
  };
  

  return (
    <ContextMenu menuComponent={<ChatTabContextMenu  />}>
      <Container id="chatTab" isSelected={selectedChat === chatId} onClick={onClick}>
        <Wrapper>
          <ChatPhoto>
            <img src={`${photo}`} alt="ProfilePhoto" className="image" />
          </ChatPhoto>
          <ChatInfo>
            <ChatInfoWrapper>
              <Name>{name}</Name>
              <LastMessageTime>{lastMessageTime}</LastMessageTime>
            </ChatInfoWrapper>
            <ChatPreview>
              <div>
                <IoCheckmarkDoneOutline />
              </div>
              <MessagePreview>{lastMessage}</MessagePreview>
            </ChatPreview>
          </ChatInfo>
        </Wrapper>
        <ChatTabDots className="dots" onClick={handleOpenModal}>
          <BsThreeDotsVertical />
        </ChatTabDots>

        <ConfirmDialog
          title="Eliminar chat"
          text="¿Está seguro que desea borrar la conversación?"
          handleOk={eraseChat}
          handleCancel={setIsOpen}
          isOpen={isOpen}
        />
      </Container>
    </ContextMenu>
  );
}

export default ChatTab;
