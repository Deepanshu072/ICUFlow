import { Box, styled } from "@mui/material";

const StyledBox = styled(Box)(({ theme }) => ({
      padding: theme.spacing(2),
      backgroundColor: theme.palette.background.paper,
      borderRadius: theme.shape.borderRadius,
      boxShadow: theme.shadows[1],
      '&:hover': {
        boxShadow: theme.shadows[3],
        transition: 'box-shadow 0.3s ease-in-out'
      }
    }));

    export default StyledBox;