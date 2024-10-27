import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { ICUStay } from '../components/organisms/Dashboard';

interface Column {
      id: 'subject_id' | 'hadm_id' | 'stay_id' | 'first_careunit' | 'last_careunit' | 'intime' | 'outtime' | 'los';
      label: string;
      minWidth?: number;
      align?: 'right';
      format?: (value: number) => string;
    }

const columns: readonly Column[] = [
      { id: 'subject_id', label: 'subject_id', minWidth: 170 },
      { id: 'hadm_id', label: 'hadm_id', minWidth: 100 },
      { id: 'stay_id', label: 'stay_id', minWidth: 170 },
      { id: 'first_careunit', label: 'first_careunit', minWidth: 100 },
      { id: 'last_careunit', label: 'last_careunit', minWidth: 170 },
      { id: 'intime', label: 'intime', minWidth: 100 },
      { id: 'outtime', label: 'outtime', minWidth: 170 },
      { id: 'los', label: 'los', minWidth: 100 },
    ];

    interface MainTableProps {
      data: ICUStay[];
    }
    

const MainTable: React.FC<MainTableProps> = ({ data }) => {

      const [page, setPage] = React.useState(0);
      const [rowsPerPage, setRowsPerPage] = React.useState(10);
    
      const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
      };
    
      const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
      };
    return (
      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.stay_id}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format && typeof value === 'number'
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      {/* <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      /> */}
    </Paper>
    );
};

export default MainTable;