import { useState } from "react";
import { useParams } from "react-router-dom";
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import { TabContext, TabList, TabPanel } from '@material-ui/lab';
import TabScreen from "../molecules/StayDetailTabScreen";
import { Typography } from "@mui/material";

const StayDetails = () => {

  const stayId = useParams().stayId;

  const [value, setValue] = useState('1');
  const [patientType, setPatientType] = useState<string>('neurology');


  const handleChange = (event: React.ChangeEvent<{}>, newValue: string) => {

    setValue(newValue);
    setPatientType(newValue === '1' ? 'neurology' : newValue === '2' ? 'labs' : 'ventilation');
  };

  console.log(stayId);

  return (
    <div>
      <Typography variant="h3" sx={{ marginTop: '1rem', marginLeft: 4, marginRight: 4, fontFamily: 'Averta, sans-serif' }}>
        Stay Details
      </Typography>
      <Box sx={{ width: '100%', typography: 'body1' }}>
        <TabContext value={value} >
          <Box sx={{ borderBottom: 1, borderColor: 'divider', marginLeft: 4, marginRight: 4 }}>
            <TabList onChange={handleChange} aria-label="lab API tabs example">
              <Tab label="Neurology" value="1" />
              <Tab label="Labs" value="2" />
              <Tab label="Ventilation" value="3" />
            </TabList>
          </Box>
          <TabPanel value={value}>
            <TabScreen stayId={stayId} patientType={patientType} />
          </TabPanel>
        </TabContext>
      </Box>
    </div>
  );
};

export default StayDetails;