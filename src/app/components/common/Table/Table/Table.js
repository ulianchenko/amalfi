import { Table as MuiTable, TableContainer, Toolbar } from '@mui/material';
import React from 'react';

const Table = ({ children, title }) => {
  return (
    <>
      {title && (
        <Toolbar>
          <h2 style={{ flex: '1 1 100%' }}>{title}</h2>
        </Toolbar>
      )}
      <TableContainer>
        <MuiTable sx={{ minWidth: 750 }} aria-labelledby='tableTitle' size='medium'>
          {children}
        </MuiTable>
      </TableContainer>
    </>
  );
};

export default Table;
