import DataTable from "./DetailsTable";
import { apiRequest } from "../../axiosClient/apiHandler";
import { FC, useEffect, useState } from "react";
import ProgressBar from "../atoms/ProgressBar";
import CustomBox from "../atoms/CustomBoxComponent";

export interface PatientsData {
      index: number;
      subject_id: number;
      stay_id: number;
      charttime: string;
      value: string;
      valuenum: number | null;
      valueuom: string;
      label: string;
      param_type: string;
      param_category: string;
}

interface Props {
      stayId?: string;
      patientType?: string;
}

interface DateRange {
      start_time: string;
      end_time: string;
}

const TabScreen: FC<Props> = ({ stayId, patientType }) => {
      const [type, setType] = useState<string>('');
      const [date, setDate] = useState<Date | null>();
      const [data, setData] = useState<PatientsData[]>([]);
      const [dateRange, setDateRange] = useState<DateRange>({ start_time: '', end_time: '' });
      const [isLoading, setIsLoading] = useState(false);

      const fetchDateRange = async () => {
            let url = `/misc/getDateRange/?stay_id=${stayId}&table_name=${patientType}`;
            const response = await apiRequest(url);
            return setDateRange(response.data);
      };


      const fetchData = async () => {
            let url = `/${patientType}?stay_id=${stayId}`;
            if (type !== '' && type !== 'all') {
                  url += `&type=${type}`;
            }
            if (date) {
                  url += `&date=${date}`;
            }
            const response = await apiRequest(url);
            return response.data;
      };

      const loadMoreData = async () => {
            setIsLoading(true);
            const data = await fetchData();
            setData(data);
            setIsLoading(false);
      };

      useEffect(() => {
            loadMoreData();
            fetchDateRange();
            setDate(null);
            setType('all');
      }, [type, date, patientType]);

      return (
            <div>
                  {isLoading && data.length === 0 ?
                        <ProgressBar />
                        :

                        data && data.length > 0 ?
                              <DataTable dateRange={dateRange} data={data} type={type} date={date} setType={setType} setDate={setDate} patientType={patientType} />
                              :
                              <CustomBox text="No Data Found" />}
            </div>
      );
};

export default TabScreen;