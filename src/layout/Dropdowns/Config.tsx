import { useState } from 'react';
import ConfirmDialog from '../../components/ConfirmDialog';
import NewChatModal from '../../components/HomeChat/NewChatModal';
import { NotificationFailure, NotificationSuccess } from '../../components/Notifications';
import { useAppDispatch } from '../../redux/hooks';
import { setLogoutData } from '../../redux/userSlice';
import { DropDownProps } from '../../types/chat';
import { useRouter } from "next/router";
import apiClient from '../../utils/client';
import { LoadRemove, LoadStart } from '../../components/Loading';

function ConfigDropdown(dropDownProps: DropDownProps) {
  const { getChatsData, userData, isOpen } = dropDownProps;

  const [delDialogIsOpen, setDelDialogIsOpen] = useState(false);
  const [newChatModalIsOpen, setNewChatModalIsOpen] = useState(false);

  const dispatch = useAppDispatch();

  const router = useRouter()

  const handleDeleteUser = () => {
    setDelDialogIsOpen(true);
  };

  const handleNewChatModal = () => {
    setNewChatModalIsOpen(true);
  };

  const handleConfirmDelete = () => {
    LoadStart()
    /* 
      TODO: 
      1. Get current user data 
      2. Delete user 
    */
   try {
    // el usuario puede ser eliminado directamente, ya que conserva el token en el header
    // ? revisar la API de users delete para ver ver como se elimina un usuario
    const deleteUser = apiClient.delete("/users")
    console.log(deleteUser);
    NotificationSuccess("Usuario eliminado con exito")
    dispatch(setLogoutData());
    router.push("/")
   } catch (error) {
    NotificationFailure("No se pudo eliminar el usuario. Intentar mas tarde")
   }
   LoadRemove();
  };

  return (
    <div className={isOpen ? 'configDropdown scale1' : 'configDropdown'}>
      <ul>
        <li onClick={handleNewChatModal}>
          <div>Nuevo chat</div>
        </li>
        <li onClick={handleDeleteUser}>
          <div>Eliminar cuenta</div>
        </li>
      </ul>

      <NewChatModal
        isOpen={newChatModalIsOpen}
        setIsOpen={setNewChatModalIsOpen}
        userData={userData}
        getChatsData={getChatsData}
      />
      <ConfirmDialog
        title="Eliminar Usuario"
        text="¿Está seguro que desea eliminar la cuenta?"
        isOpen={delDialogIsOpen}
        handleCancel={setDelDialogIsOpen}
        handleOk={handleConfirmDelete}
      />
    </div>
  );
}

export default ConfigDropdown;
