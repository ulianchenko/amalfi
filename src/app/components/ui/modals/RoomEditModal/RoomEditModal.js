import { DialogContent } from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';
import { getRoomById } from '../../../../store/rooms';
import Modal from '../../../common/Modal';
import { RoomEditForm } from '../../forms';

const RoomEditModal = ({ open, onClose, roomId }) => {
  const currentRoom = useSelector(getRoomById(roomId));

  return (
    <Modal title='Edit' open={open} onClose={onClose}>
      <DialogContent>
        <h2>Edit room {currentRoom?.roomNumber}</h2>
        <RoomEditForm roomData={currentRoom} onCloseModal={onClose} />
      </DialogContent>
    </Modal>
  );
};

export default React.memo(RoomEditModal);
