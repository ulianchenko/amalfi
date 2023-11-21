import EditIcon from '@mui/icons-material/Edit';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { Collapse, IconButton, TableCell, TableRow } from '@mui/material';
// import React, { useEffect, useState } from 'react';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getBookingsByRoomId } from '../../../../../store/bookings';
import Chip from '../../../../common/Chip/Chip';
import Tooltip from '../../../../common/Tooltip';
import RoomEditModal from '../../../modals/RoomEditModal';
import BookingTable from '../BookingTable/BookingTable';

const RoomsListTableRow = ({ row }) => {
  const [open, setOpen] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const bookings = useSelector(getBookingsByRoomId(row._id));

  // useEffect(() => {
  //   if (bookings.length === 0) {
  //     setOpen(false);
  //   }
  // }, [bookings]);

  return (
    <>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell component='th' scope='row'>
          <Link to={`/rooms/${row._id}`}>{row.roomNumber}</Link>
        </TableCell>
        <TableCell>{row.type}</TableCell>
        <TableCell align='right'>{row.rate}</TableCell>
        <TableCell align='right'>{row.price}&#x20AC;</TableCell>
        <TableCell align='right'>
          {bookings.length > 0 ? (
            <>
              <Chip
                label='Booked'
                color='error'
                onMouseDown={e => {
                  e.stopPropagation();
                }}
                onDelete={() => setOpen(!open)}
                deleteIcon={
                  <Tooltip title='Details' disableInteractive>
                    <IconButton aria-label='expand row' size='small'>
                      {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                  </Tooltip>
                }
              />
            </>
          ) : (
            <Chip label='Free' color='success' />
          )}
        </TableCell>
        <TableCell align='right'>
          <Tooltip title='Edit room' disableInteractive={true}>
            <IconButton aria-label='expand row' size='small' color='primary' onClick={() => setShowEditModal(true)}>
              <EditIcon />
            </IconButton>
          </Tooltip>
        </TableCell>
      </TableRow>

      <TableRow>
        <TableCell style={{ padding: 0 }} colSpan={6}>
          <Collapse in={open} timeout='auto' unmountOnExit>
            <BookingTable bookings={bookings} roomNumber={row.roomNumber} />
          </Collapse>
        </TableCell>
      </TableRow>
      {showEditModal && <RoomEditModal open={showEditModal} onClose={() => setShowEditModal(false)} roomId={row._id} />}
    </>
  );
};

export default RoomsListTableRow;
