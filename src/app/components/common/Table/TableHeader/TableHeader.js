import { TableCell, TableHead, TableRow, TableSortLabel } from '@mui/material';
import React from 'react';

function TableHeader({ headCells, sortBy, onRequestSort }) {
  const createSortHandler = (property) => (event) => {
    if (onRequestSort) {
      onRequestSort(event, property);
    }
  };

  return (
    <TableHead>
      <TableRow>
        {headCells.map(headCell => (
          <TableCell
            key={String(headCell.id)}
            align={headCell?.numeric ? 'right' : 'left'}
            padding={headCell?.disablePadding ? 'none' : 'normal'}
            sortDirection={sortBy && sortBy.path === headCell.id ? sortBy.order : false}
          >
            {sortBy && (
              <TableSortLabel
                active={sortBy.path === headCell.id}
                direction={sortBy.path === headCell.id ? sortBy.order : 'asc'}
                onClick={createSortHandler(headCell.id)}
              >
                {headCell.label}
                {sortBy.path === headCell.id ? (
                  <span className='visually-hidden'>
                    {sortBy.order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                  </span>
                ) : null}
              </TableSortLabel>
            )}
            {!sortBy && headCell.label}
          </TableCell>
        ))}
        <TableCell />
      </TableRow>
    </TableHead>
  );
}

export default TableHeader;
