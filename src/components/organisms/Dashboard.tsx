import { FC, useEffect, useState } from 'react';
import { apiRequest } from '../../axiosClient/apiHandler';
import { Box, TextField, Typography } from '@mui/material';
import InfiniteScroll from 'react-infinite-scroll-component';
import Grid from '@mui/material/Grid2';
import { useNavigate } from 'react-router-dom';
import ICUStayCard from '../molecules/StayDetailCard';
import { useDebounce } from '../../Hooks/CustomDebounce';
import ProgressBar from '../atoms/ProgressBar';
import CustomBox from '../atoms/CustomBoxComponent';

export interface ICUStay {
      subject_id: number;
      hadm_id: number;
      stay_id: number;
      first_careunit: string;
      last_careunit: string;
      intime: string;
      outtime: string;
      los: string;
}

const Dashboard: FC = () => {
      const [icuStayData, setIcuStayData] = useState<ICUStay[]>([]);
      const [filteredData, setFilteredData] = useState<ICUStay[]>([]);
      const [pageNo, setPageNo] = useState(1);
      const [hasMore, setHasMore] = useState(true);
      const [searchTerm, setSearchTerm] = useState('');
      const [isLoading, setIsLoading] = useState(false);

      const navigate = useNavigate();
      const debouncedSearchTerm = useDebounce(searchTerm, 500);

      const fetchIcuStayData = async (page: number) => {
            const response = await apiRequest(`/misc/allStays?page_number=${page}&num_entries=20`);
            return response.data;
      };

      const handleSearch = (term: string) => {
            if (term) {
                  // Filter data based on stay_id or subject_id matching the term
                  const filtered = icuStayData.filter(
                        (item) =>
                              item.stay_id.toString().includes(term) ||
                              item.subject_id.toString().includes(term)
                  );
                  setFilteredData(filtered);
            } else {
                  // If term is empty, show all data
                  setFilteredData(icuStayData);
            }
      };

      useEffect(() => {
            // Call handleSearch after debounced searchTerm changes
            handleSearch(debouncedSearchTerm);
      }, [debouncedSearchTerm, icuStayData]);

      const loadMoreData = async () => {
            setIsLoading(true);
            const newIcuStayData = await fetchIcuStayData(pageNo);
            if (newIcuStayData.length < 20) {
                  setHasMore(false);
            }

            // Append new data to icuStayData
            const updatedIcuStayData = [...icuStayData, ...newIcuStayData];
            setIcuStayData(updatedIcuStayData);

            // Update filteredData based on current search term across stay_id or subject_id
            setFilteredData(
                  debouncedSearchTerm
                        ? updatedIcuStayData.filter(
                              (item) =>
                                    item.stay_id.toString().includes(debouncedSearchTerm) ||
                                    item.subject_id.toString().includes(debouncedSearchTerm)
                        )
                        : updatedIcuStayData
            );

            setPageNo((prev) => prev + 1);
            setIsLoading(false);
      };

      const handleClick = (id: number) => {
            navigate(`/staydetails/${id}`);
      };

      useEffect(() => {
            loadMoreData();
      }, []);

      return (
            <Box>
                  <Typography variant="h3" sx={{ marginTop: '1rem', marginLeft: 4, marginRight: 4, fontFamily: 'Averta, sans-serif' }}>
                        All Stay Details
                  </Typography>
                  
                  <InfiniteScroll
                        dataLength={filteredData.length}
                        next={loadMoreData}
                        hasMore={hasMore}
                        loader={
                              <ProgressBar />
                        }
                        endMessage={<CustomBox text="End of data..." />}
                  >
                        <Box sx={{
                              display: 'flex',
                              gap: 2,
                              flexDirection: { xs: 'column', sm: 'row' },
                              alignItems: { xs: 'stretch', sm: 'center' },
                              mb: 2,
                              margin: 4,
                        }}>
                              <TextField
                                    label="Search by stay ID or subject ID"
                                    variant="outlined"
                                    size="small"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    sx={{ flexGrow: 1 }}
                              />

                        </Box>

                        {isLoading && filteredData.length === 0 ?
                              <ProgressBar />
                              :
                              filteredData.length > 0 ?
                                    <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3, lg: 4 }} margin={{ xs: 0, sm: 2, md: 3, lg: 4 }}>
                                          {filteredData.map((icuStay) => (
                                                <ICUStayCard key={icuStay.stay_id} icuStay={icuStay} handleClick={handleClick} />
                                          ))}
                                    </Grid>
                                    :
                                    <CustomBox text="No Data Found" />
                        }
                  </InfiniteScroll>

            </Box>
      );
};

export default Dashboard;
