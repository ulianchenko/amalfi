import React from 'react';
import { Table, TableBody, TableHeader } from '../../../../common/Table';
import BookingTableRow from './BookingTableRow';

const BookingTable = ({ bookings, roomNumber }) => {
  const headCells = [
    { id: 'bookingId', label: 'ID' },
    { id: 'arrivalDate', label: 'Arrival date' },
    { id: 'departureDate', label: 'Departure date' },
    { id: 'guests', label: 'Guests' },
    { id: 'totalPrice', label: 'Price', numeric: true },
  ];
  return (
    <>
      <h3 style={{ margin: 10 }}>{`Bookings list of room #${roomNumber}`}</h3>
      <Table size='small' aria-label='purchases'>
        <TableHeader headCells={headCells} />
        <TableBody>
          {bookings.map(bookingRow => (
            <BookingTableRow key={bookingRow._id} row={bookingRow} />
          ))}
        </TableBody>
      </Table>
    </>
  );
};

export default BookingTable;
