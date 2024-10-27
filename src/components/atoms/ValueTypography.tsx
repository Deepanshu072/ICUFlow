import { styled } from '@mui/material/styles';
import { Typography } from '@mui/material';

const ValueTypography = styled(Typography)(({ theme }) => ({
      fontSize: '14px',
      color: theme.palette.text.primary,
      marginBottom: '1px'
    }));

    export default ValueTypography;