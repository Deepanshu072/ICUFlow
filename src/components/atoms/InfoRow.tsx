import { Box, styled } from "@mui/material";


const InfoRow = styled(Box)(({ theme }) => ({
      display: 'flex',
      alignItems: 'center',
      marginBottom: theme.spacing(0.5),
      gap: theme.spacing(1),
    }));

    export default InfoRow;