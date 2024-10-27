import { Box, CircularProgress } from "@mui/material";

const ProgressBar = () => {
      return (
            <Box sx={{ display: 'flex', justifyContent: 'center', margin: 4 }}>
            <CircularProgress />
          </Box>
      );
};

export default ProgressBar;