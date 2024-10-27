import { Container } from '@mui/material';
import { FC, PropsWithChildren } from 'react';
import Navbar from '../organisms/Navbar';

const Layout: FC<PropsWithChildren> = ({ children }) => {
     return (
          <Container maxWidth="lg" sx={{ pt: 8, pb: 8 }}>
               <Navbar />
               {children}
              
          </Container>
     )
}

export default Layout;