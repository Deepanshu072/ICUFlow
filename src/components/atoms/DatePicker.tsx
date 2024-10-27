import React, { useState, useEffect, useRef } from 'react';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3';
import { formatDateToYYYYMMDD2 } from '../../utils/commonUtils';

interface CustomDatePickerProps {
  label: string;
  minDate?: Date;
  maxDate?: Date;
  date?: any;
  setDate?: any;
  patientType?: string;
}

const CustomDatePicker: React.FC<CustomDatePickerProps> = ({
  label,
  minDate = undefined,
  maxDate = undefined,
  date,
  setDate,
  patientType
}) => {

  const [value, setValue] = useState<Date | null>();

  const handleDateChange = (newDate: Date | null) => {
    setValue(newDate);
    setDate(formatDateToYYYYMMDD2(newDate));
    console.log(formatDateToYYYYMMDD2(newDate), 'date');

  };
  useEffect(() => {
    setValue(null);
  }, [patientType]);

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DatePicker
        label={label}
        value={value}
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