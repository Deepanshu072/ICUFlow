import { Box, Typography } from "@mui/material";
import { FC } from "react";

interface CustomBoxProps {
      text: string;
}

const CustomBox:FC<CustomBoxProps> = ({text}) => {
      return (
            <Box sx={{
                  display: 'flex',
                  gap: 2,
                  flexDirection: { xs: 'column', sm: 'row' },
                  justifyContent: { xs: 'stretch', sm: 'center', md: 'center', lg: 'center' },
                  alignItems: { xs: 'stretch', sm: 'center', md: 'center', lg: 'center' },
                  mb: 2,
                  margin: 4,
                  border: '1px solid #ccc',
                  borderRadius: '5px',
                  padding: '10px',
            }}>
                  <Typography variant="h5">{text}</Typography>
            </Box>
      );
};

export default CustomBox;