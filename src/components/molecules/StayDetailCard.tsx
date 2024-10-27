import { Button } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { ICUStay } from '../organisms/Dashboard';
import { FC } from 'react';
import LabelTypography from '../atoms/LabelTypography';
import ValueTypography from '../atoms/ValueTypography';
import InfoRow from '../atoms/InfoRow';
import StyledBox from '../atoms/StyledBox';

interface ICUStayCardProps {
      icuStay: ICUStay;
      handleClick: (id: number) => void;
}
const ICUStayCard: FC<ICUStayCardProps> = ({ icuStay, handleClick }) => {

      return (
            <Grid size={{ xs: 12, md: 6 }}>
               
                  <StyledBox>
        <InfoRow>
          <LabelTypography>Subject ID:</LabelTypography>
          <ValueTypography>{icuStay.subject_id}</ValueTypography>
        </InfoRow>

        <InfoRow>
          <LabelTypography>Hadm ID:</LabelTypography>
          <ValueTypography>{icuStay.hadm_id}</ValueTypography>
        </InfoRow>

        <InfoRow>
          <LabelTypography>Stay ID:</LabelTypography>
          <ValueTypography>{icuStay.stay_id}</ValueTypography>
        </InfoRow>

        <InfoRow>
          <LabelTypography>First Care Unit:</LabelTypography>
          <ValueTypography>{icuStay.first_careunit}</ValueTypography>
        </InfoRow>

        <InfoRow>
          <LabelTypography>Last Care Unit:</LabelTypography>
          <ValueTypography>{icuStay.last_careunit}</ValueTypography>
        </InfoRow>

        <InfoRow>
          <LabelTypography>Intime:</LabelTypography>
          <ValueTypography>{icuStay.intime}</ValueTypography>
        </InfoRow>

        <InfoRow>
          <LabelTypography>Outtime:</LabelTypography>
          <ValueTypography>{icuStay.outtime}</ValueTypography>
        </InfoRow>

        <InfoRow>
          <LabelTypography>Length of Stay:</LabelTypography>
          <ValueTypography>{icuStay.los} days</ValueTypography>
        </InfoRow>

        <Button 
          variant="contained" 
          color="primary" 
          onClick={() => handleClick(icuStay.stay_id)}
          fullWidth
        >
          View Details
        </Button>
      </StyledBox>
                        
     
            </Grid>
      );

}

export default ICUStayCard;