import React, { useState, useMemo, useEffect } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Box,
  Typography,
  TablePagination,
  TableSortLabel,
  IconButton,
  Tooltip,
  SelectChangeEvent,
} from '@mui/material';
import { Refresh as RefreshIcon } from '@mui/icons-material';
import { PatientsData } from './StayDetailTabScreen';
import CustomDatePicker from '../atoms/DatePicker';
import { formatDateToYYYYMMDD, parseDate } from '../../utils/commonUtils';

interface TableProps {
      data: PatientsData[];
      type: string;
      date: any;
      setType: any;
      setDate: any;
      patientType?: string;
      dateRange?: {
        start_time: string;
        end_time: string;
      };
}


// Type for sort direction
type Order = 'asc' | 'desc';

const DataTable: React.FC<TableProps> = ({ data, type, date, setType, setDate, patientType, dateRange }) => {
  // State management
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState('');
  const [orderBy, setOrderBy] = useState<keyof PatientsData>('index');
  const [order, setOrder] = useState<Order>('asc');
  const [menuItems, setMenuItems] = useState<string[]>(patientType === 'neurology' ? ['GCS', 'Pupil', 'Strength', 'Orientation', 'Motor'] : patientType === 'ventilation' ? ['setting', 'observation'] : []);

  // Handle sort
  const handleRequestSort = (property: keyof PatientsData) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  // Filter and sort data
  const filteredAndSortedData = useMemo(() => {
    return data
      .filter((row) => {
        const matchesSearch = Object.values(row)
          .join(' ')
          .toLowerCase()
          .includes(searchTerm.toLowerCase());
        return matchesSearch;
      })
      .sort((a, b) => {
        const aValue = a[orderBy];
        const bValue = b[orderBy];
        
        if (aValue === null) return order === 'asc' ? -1 : 1;
        if (bValue === null) return order === 'asc' ? 1 : -1;
        
        if (typeof aValue === 'string' && typeof bValue === 'string') {
          return order === 'asc' 
            ? aValue.localeCompare(bValue)
            : bValue.localeCompare(aValue);
        }
        
        return order === 'asc'
          ? (aValue < bValue ? -1 : 1)
          : (bValue < aValue ? -1 : 1);
      });
  }, [data, searchTerm, orderBy, order]);

  // Pagination handlers
  const handleChangePage = (_: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Reset filters
  const handleReset = () => {
    setSearchTerm('');
    setType('all');
    setPage(0);
  };

  // Format date for display
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  useEffect(() => {
    setMenuItems(patientType === 'neurology' ? ['GCS', 'Pupil', 'Strength', 'Orientation', 'Motor'] : patientType === 'ventilation' ? ['setting', 'observation'] : []);
  },[patientType]);

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden', p: 3 }}>
      <Box sx={{ mb: 3 }}>
        
        {/* Filters Section */}
        <Box sx={{ 
          display: 'flex', 
          gap: 2, 
          flexDirection: { xs: 'column', sm: 'row' },
          alignItems: { xs: 'stretch', sm: 'center' },
          mb: 2 
        }}>
          <TextField
            label="Search"
            variant="outlined"
            size="small"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            sx={{ flexGrow: 1 }}
          />
          
          {patientType !== 'labs' &&
          <FormControl size="small" sx={{ minWidth: 150 }}>
            <InputLabel>Category</InputLabel>
            <Select
              value={type ? type : 'all'}
              label="Category"
              onChange={(e: SelectChangeEvent) => setType(e.target.value)}
            >
              <MenuItem value="all">All Categories</MenuItem>
              {menuItems.map((item) => (
                <MenuItem value={item}>{item}</MenuItem>
              ))}
            </Select>
          </FormControl> }

              {dateRange && dateRange.start_time && dateRange.end_time &&
          <CustomDatePicker label='Select date' minDate={parseDate(formatDateToYYYYMMDD(dateRange?.start_time))} maxDate={parseDate(formatDateToYYYYMMDD(dateRange?.end_time))} date={date} setDate={setDate} />
              }

          <Tooltip title="Reset Filters">
            <IconButton onClick={handleReset} color="primary">
              <RefreshIcon />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>

      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {Object.keys(data[0]).map((key) => (
                <TableCell
                  key={key}
                  sortDirection={orderBy === key ? order : false}
                >
                  <TableSortLabel
                    active={orderBy === key}
                    direction={orderBy === key ? order : 'asc'}
                    onClick={() => handleRequestSort(key as keyof PatientsData)}
                  >
                    {key.charAt(0).toUpperCase() + key.slice(1).replace('_', ' ')}
                  </TableSortLabel>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredAndSortedData
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => (
                <TableRow hover key={row.index}>
                  <TableCell>{row.index}</TableCell>
                  <TableCell>{row.subject_id}</TableCell>
                  <TableCell>{row.stay_id}</TableCell>
                  <TableCell>{formatDate(row.charttime)}</TableCell>
                  <TableCell>{row.value}</TableCell>
                  <TableCell>{row.valuenum}</TableCell>
                  <TableCell>{row.valueuom}</TableCell>
                  <TableCell>{row.label}</TableCell>
                  <TableCell>{row.param_type}</TableCell>
                  <TableCell>{row.param_category}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={filteredAndSortedData.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
};

export default DataTable;