import { Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

const LabelTypography = styled(Typography)(({ theme }) => ({
      fontWeight: 600,
      color: theme.palette.text.secondary,
      fontSize: '0.875rem',
      marginBottom: '1px'
    }));

    export default LabelTypography;