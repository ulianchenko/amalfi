import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import { IconButton, TableCell, TableRow } from '@mui/material';
import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { removeBooking } from '../../../../../store/bookings';
import { removeBookingRoom } from '../../../../../store/rooms';
import { getDateDDMMYYYY } from '../../../../../utils/formatDate';
import Tooltip from '../../../../common/Tooltip';
import { getGuestsLabel } from '../../../GuestsCounter/GuestsCounter';

const BookingTableRow = ({ row }) => {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleRemoveBooking = () => {
    dispatch(removeBooking(row._id));
    dispatch(removeBookingRoom({ roomId: row.roomId, _id: row._id || '' }));
  };

  const handleOpenUserPage = (userId) => {
    navigate(`/profile/${userId}`);
  };

  return (
    <TableRow>
      <TableCell component='th' scope='row'>
        {row._id}
      </TableCell>
      <TableCell component='th' scope='row'>
        {getDateDDMMYYYY(row.arrivalDate)}
      </TableCell>
      <TableCell>{getDateDDMMYYYY(row.departureDate)}</TableCell>
      <TableCell>{getGuestsLabel(row.adults, row.children, row.babies)}</TableCell>
      <TableCell align='right'>{row.totalPrice}&#x20AC;</TableCell>
      <TableCell>
        <div className='booking-row__btns'>
          <Tooltip title='User page' disableInteractive={true}>
            <IconButton
              aria-label='expand row'
              size='small'
              color='primary'
              onClick={() => handleOpenUserPage(row.userId || 'not found')}
            >
              <AccountCircleIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title='Cancel booking' disableInteractive={true}>
            <IconButton aria-label='expand row' size='small' color='error' onClick={handleRemoveBooking}>
              <CancelIcon />
            </IconButton>
          </Tooltip>
        </div>
      </TableCell>
    </TableRow>
  );
};

export default BookingTableRow;
