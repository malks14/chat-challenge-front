import React, { useEffect, useState, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSmile, faPaperPlane } from '@fortawesome/free-regular-svg-icons';
import { IoMdSettings } from 'react-icons/io';
import { HiPhoneMissedCall } from 'react-icons/hi';
import apiClient from '../utils/client';
import openSocket from 'socket.io-client';
import empty from '../assets/images/empty.png';
import MyProfile from '../components/MyProfile';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { getUser, setUserData } from '../redux/userSlice';
import { Chat, LogoType } from '../types/chat';
import {
  getChats,
  getIsOpenModal,
  getTicketStatus,
  setChatsData,
  setIsAllowedExpand,
  setIsOpenModal
} from '../redux/chatsSlice';
import ChatHeader from '../components/HomeChat/ChatHeader';
import ConfigDropdown from '../layout/Dropdowns/Config';
import SearchBar from '../components/SearchBar';
import ChatTab from '../components/HomeChat/ChatTab';
import ChatMessages from '../components/HomeChat/ChatMessages';
import { NotificationFailure } from '../components/Notifications';
import { MockTicketData } from '../utils/mockData';
import ChatTicket from '../components/HomeChat/ChatTicket';
import Backdrop from '../components/Backdrop';

function HomeChat() {
  const chatHeaderInitialState: Chat = {
    messages: [],
    messageIdToDisplay: '',
    image: '',
    name: ''
  };

  const [msgEntry, setMsgEntry] = useState<string>('');
  const [selectedChat, setSelectedChat] = useState<string>('');
  const [userChatData, setUserChatData] = useState(chatHeaderInitialState);
  const [configOpen, setConfigOpen] = useState<Boolean>(false);

  const ref = useRef<any>();

  const chats = useAppSelector(getChats);
  const modal = useAppSelector(getIsOpenModal);
  const status = useAppSelector(getTicketStatus);

  const dispatch = useAppDispatch();

  const userData = useAppSelector(getUser);

  const positionRef = useRef<any>();

  const logo = empty as unknown as LogoType;
  console.log(logo);
  

  useEffect(() => {
    /* 
      TODO: 
      1. Get user data 
      2. Get chats data
    */
    try {
      const fetchUserData = async () => {
        const { data } = await apiClient.get('/users');
        dispatch(
          setUserData({
            name: data.name,
            lastName: data.lastName,
            email: data.email,
            photo: data.image,
            userId: data.userId
          })
        );
      };
      fetchUserData();

      const fetchChatData = async () => {
        const {
          data: { chats }
        } = await apiClient.get('/chats');
        dispatch(setChatsData(chats));
      };
      fetchChatData();
    } catch (error) {
      NotificationFailure('No se pudo recuperar la informacion de usuario');
    }
  }, [dispatch]);

  useEffect(() => {
    if (ref.current) {
      ref.current.scrollTop = ref.current.scrollHeight;
      setConfigOpen((isOpen) => isOpen && chats.isAllowedExpand);

      // Update scroll position
      positionRef.current.scrollIntoView();

      /*
        TODO: 
          1. Listen the socket
          2. Get chat data
          3. Set the socket off and return void to prevent useless renders
      */
      // ? se puede agregar algun archivo en util para esto?
      const socket = openSocket('http://localhost:8080', { transports: ['websocket'] });
      socket.on('chats', (data) => {
        if (
          data.action === 'ReceivedNewMessage' ||
          data.action === 'SentNewMessage' ||
          data.action === 'delete' ||
          data.action === 'create'
        ) {
          apiClient
            .get('/chats')
            .then((chats) => {
              dispatch(setChatsData(chats.data.chats));
            })
            .catch(() => NotificationFailure('No se pudieron cargar los chats'));
        }
      });
    }
  }, [chats, dispatch]);

  const handleMsgEntry = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMsgEntry(e.target.value);
  };

  const handleSendMsg = async () => {
    if (msgEntry !== '') {
      setMsgEntry('');
      /*
        TODO:
        1. Send message
      */
      try {
        const sendMessage = await apiClient.post(`/chats/${selectedChat}`, { message: msgEntry });
        console.log(sendMessage);
      } catch (error) {
        NotificationFailure('Error al enviar el mensaje');
      }
    } else {
      /* TODO: 
        1. Show error notification
      */
      NotificationFailure('El mensaje no puede estar vacio');
    }
  };

  const handleChatClick = (chatId: string) => {
    setSelectedChat(chatId);
  };

  const handleEnterPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') handleSendMsg();
  };

  const handleOpenConfig = (e: React.MouseEvent<HTMLDivElement>) => {
    setConfigOpen(!configOpen);
    dispatch(setIsAllowedExpand(true));
    e.stopPropagation();
  };

  const getChatsData = async () => {
    /* TODO: 
      Get all chats data 
    */
    try {
      const fetchedChats = await apiClient.get('/chats');
      dispatch(setChatsData(fetchedChats.data.chats));
    } catch (error) {
      NotificationFailure('No se pudieron cargar los chats');
    }
  };

  const ticket = MockTicketData.filter((ticket) => {
    if (status === ticket.status) {
      return ticket;
    }
    return null;
  });

  const closeModal = () => {
    dispatch(setIsOpenModal(false));
  };
  return (
    <>
      {modal && <Backdrop onClick={closeModal} />}
      {modal
        ? ticket.map((el) => {
            return (
              <div key={el.id}>
                <ChatTicket
                  title={el.title}
                  description={el.description}
                  brand={el.brand}
                  tag={el.tag}
                  priority={el.priority}
                  id={el.id}
                  date={el.date}
                  status={el.status}
                />
              </div>
            );
          })
        : ''}

      <div className="main-wrapper-chat d-flex row flex-grow-1 w-85" data-aos="zoom-in">
        <div className="chat-left-side bg-chats-background d-flex flex-column w-30 p-0">
          <div className="profile-container bg-chatter-green px-3 d-flex justify-content-between align-items-center py-2">
            <MyProfile
              name={userData?.name}
              lastName={userData?.lastName}
              email={userData?.email}
              photo={userData?.photo}
            />
            <div className="position-relative cursor-pointer d-flex">
              <span
                className="iconHover fs-3 align-self-center justify-self-center"
                onClick={handleOpenConfig}
              >
                <IoMdSettings aria-label="Boton de Configuracion" />
              </span>
              <ConfigDropdown isOpen={configOpen} userData={userData} getChatsData={getChatsData} />
            </div>
          </div>

          <SearchBar userId={userData.userId} chatId={selectedChat} />

          <div className="chatsDiv d-flex flex-grow-1 flex-column" ref={ref}>
            <div ref={positionRef} />
            {chats && chats.chats.length > 0 ? (
              chats.chats.map((tab: any, i: any) => (
                <ChatTab
                  key={i}
                  name={tab.name}
                  image={tab.image}
                  chatId={tab.chatId}
                  messages={tab.messages}
                  userData={userData}
                  selectedChat={selectedChat}
                  onClick={() => handleChatClick(tab.chatId)}
                />
              ))
            ) : (
              <div className="text-chatter-black opacity-25 fs-smaller text-center h-100 d-flex justify-content-center align-items-center text-no-selection">
                <div>No hay chats disponibles</div>
              </div>
            )}
          </div>
        </div>

        {selectedChat === '' ? (
          <div className="chat-right-side empty-chats w-70 d-flex flex-column justify-content-center align-items-center align-content-center p-0 position-relative text-no-selection overflow-hidden">
            <img className="opacity-50" src={logo.src} alt="background" />
            <div className="d-flex flex-column align-items-center justify-content-center text-chatter-black opacity-75">
              <div className="fs-3 fw-bold">CHATTER</div>
              <div className="my-1">¡Comunicate con tus amigos sin costo alguno!</div>
              <div className="division-line bg-chatter-black opacity-25 my-3"></div>
              <div className="fs-smaller d-flex justify-content-center align-items-center gap-2">
                <HiPhoneMissedCall />
                Llamadas Deshabilitadas
              </div>
            </div>
            <div className="empty-chat-line" />
          </div>
        ) : (
          <div className="chat-right-side w-70 d-flex flex-column p-0">
            <ChatHeader {...userChatData} />

            <ChatMessages
              chatId={selectedChat}
              chatsData={chats}
              setUserChatData={setUserChatData}
            />

            <div className="d-flex flex-row align-items-center justify-content-center bg-chatter-green px-4 py-2">
              <div className="black-icon cursor-pointer text-chatter-black fs-3 opacity-75">
                <FontAwesomeIcon icon={faSmile} />
              </div>

              <div className="w-100 px-3">
                <input
                  placeholder="Escribe tu mensaje"
                  value={msgEntry}
                  className="user-chat-input px-4 py-4 w-100 bg-white"
                  onChange={handleMsgEntry}
                  onKeyDown={handleEnterPress}
                  disabled={selectedChat ? false : true}
                />
              </div>

              <div
                className="black-icon text-chatter-black fs-3 opacity-75 cursor-pointer"
                onClick={handleSendMsg}
              >
                <FontAwesomeIcon icon={faPaperPlane} />
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
export default HomeChat;
