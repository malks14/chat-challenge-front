import { Modal } from 'react-bootstrap';
import { useState } from 'react';
import FormData from 'form-data';

import { ChatModalProps } from '../../types/chat';
import { NotificationFailure, NotificationSuccess } from '../Notifications';
import { LoadRemove, LoadStart } from '../Loading';
import apiClient from '../../utils/client';

function NewChatModal(chatModalProps: ChatModalProps) {
  const { isOpen, setIsOpen, getChatsData } = chatModalProps;

  const [selectedImage, setSelectedImage] = useState<any | null>(null);
  const [newChatName, setNewChatName] = useState<any | null>();

  const data = new FormData();

  const createChat = async () => {
    data.append('name', newChatName);
    data.append('image', selectedImage);
    /*
        TODO:
        1. Create new chat and
        2. Update chats queue with getChatsData to display it
        3. Close popup with handleClose
    */
   if (newChatName.length === 0) {
    return NotificationFailure("El nombre del chat no puede estar vacio");
   } else if (selectedImage === null) {
    return NotificationFailure("La imagen del chat no puede estar vacia")
   }

   LoadStart();

   try {
    const createChat = apiClient.post("/chats", data, {headers: {'Content-Type': 'multipart/form-data'}});
    console.log(createChat);
    NotificationSuccess("Se ha creado el chat exitosamente")
    getChatsData();
    handleClose()
    
   } catch (error) {
    NotificationFailure("No se pudo crear el chat")
   }
   LoadRemove()
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files != null) {
      setSelectedImage(e.target.files[0]);
    }
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewChatName(e.target.value);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <Modal className="text-chatter-black" show={isOpen} centered>
      <Modal.Header className="justify-content-center">
        <Modal.Title>Agregar Nuevo Chat</Modal.Title>
      </Modal.Header>

      <Modal.Body className="justify-content-center text-center">
        <input
          type="text"
          placeholder="Ingrese Nombre y Apellido"
          className="form-control mb-3"
          onChange={handleNameChange}
        />
        <input
          type="file"
          placeholder="Subir foto de perfil"
          className="form-control"
          onChange={handleImageChange}
        />
      </Modal.Body>

      <Modal.Footer className="justify-content-center">
        <button className="btn btn-green bg-chatter-blue text-white px-4" onClick={createChat}>
          Agregar
        </button>
        <button className="btn btn-secondary px-4" onClick={handleClose}>
          Cerrar
        </button>
      </Modal.Footer>
    </Modal>
  );
}

export default NewChatModal;
