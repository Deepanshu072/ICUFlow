import React from 'react';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3';
import { formatDateToYYYYMMDD2 } from '../../utils/commonUtils';

interface CustomDatePickerProps {
  label: string;
  minDate?: Date;
  maxDate?: Date;
  date?: any;
  setDate?: any;
}

const CustomDatePicker: React.FC<CustomDatePickerProps> = ({ 
  label, 
  minDate = undefined,  // Provide undefined as default
  maxDate = undefined,  // Provide undefined as default
  date,
  setDate
}) => {


  const handleDateChange = (newDate: Date | null) => {
    setDate(formatDateToYYYYMMDD2(newDate));
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DatePicker
        label={label}
        value={date}
        onChange={handleDateChange}
        minDate={minDate}
        maxDate={maxDate}
        slotProps={{
          textField: {
            size: 'small',
          },
        }}
      />
    </LocalizationProvider>
  );
};

export default CustomDatePicker;