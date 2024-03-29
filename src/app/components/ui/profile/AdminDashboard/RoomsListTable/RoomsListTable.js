import { TablePagination } from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';
import { usePagination, useSort } from '../../../../../hooks';
import { getRooms, getRoomsLoadingStatus } from '../../../../../store/rooms';
import { Table, TableBody, TableHeader } from '../../../../common/Table';
import RoomsListTableRow from './RoomsListTableRow';

const headCells = [
  {
    id: 'roomNumber',
    numeric: false,
    disablePadding: false,
    label: 'Room number',
  },
  {
    id: 'type',
    numeric: false,
    disablePadding: false,
    label: 'Type',
  },
  {
    id: 'rate',
    numeric: true,
    disablePadding: false,
    label: 'Rating',
  },
  {
    id: 'price',
    numeric: true,
    disablePadding: false,
    label: 'Price per night',
  },
  {
    id: 'bookings',
    numeric: true,
    disablePadding: false,
    label: 'Status',
  },
];

const RoomsListTable = () => {
  const rowsPerPageOptions = [5, 10, 25];
  const rooms = useSelector(getRooms());
  const roomsIsLoading = useSelector(getRoomsLoadingStatus());

  const { sortedItems, sortBy, handleRequestSort } = useSort(rooms || [], { path: 'bookings', order: 'desc' });
  const {
    itemsListCrop: roomsCroppedList,
    currentPage,
    pageSize,
    handleChangePage,
    handleChangePageSize,
  } = usePagination(sortedItems, rowsPerPageOptions[0]);

  return (
    <>
      {!roomsIsLoading && (
        <>
          <Table title='Rooms list'>
            <TableHeader headCells={headCells} sortBy={sortBy} onRequestSort={handleRequestSort} />
            <TableBody itemsCount={sortedItems.length} page={currentPage - 1} rowsPerPage={pageSize}>
              {roomsCroppedList.map(row => (
                <RoomsListTableRow key={row._id} row={row} />
              ))}
            </TableBody>
          </Table>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component='div'
            count={rooms.length}
            rowsPerPage={pageSize}
            page={currentPage - 1}
            onPageChange={(event, value) => handleChangePage(event, value + 1)}
            onRowsPerPageChange={handleChangePageSize}
            labelRowsPerPage='Rooms per page'
          />
        </>
      )}
    </>
  );
};

export default RoomsListTable;
