import {
      type UIEvent,
      useCallback,
      useEffect,
      useMemo,
      useRef,
      useState,
} from 'react';
import {
      MaterialReactTable,
      useMaterialReactTable,
      type MRT_ColumnDef,
      type MRT_ColumnFiltersState,
      type MRT_SortingState,
      type MRT_RowVirtualizer,
} from 'material-react-table';

import { Typography } from '@mui/material';
import {
      useInfiniteQuery,
} from '@tanstack/react-query';
import { apiRequest } from '../axiosClient/apiHandler';

// Hardcoded row count to 140, needed from api
type IcuStayApiResponse = {
      data: Array<ICUStay>;
      meta: {
            totalRowCount: number;
      };
};

type ICUStay = {
      subject_id: number;
      hadm_id: number;
      stay_id: number;
      first_careunit: string;
      last_careunit: string;
      intime: string;
      outtime: string;
      los: string;
}

const columns: MRT_ColumnDef<ICUStay>[] = [
      {
            accessorKey: 'subject_id',
            header: 'Subject ID',
            size: 120,
      },
      {
            accessorKey: 'hadm_id',
            header: 'Hadm ID',
            size: 110,
      },
      {
            accessorKey: 'stay_id',
            header: 'Stay ID',
            size: 100,
      },
      {
            accessorKey: 'first_careunit',
            header: 'First Care Unit',
      },
      {
            accessorKey: 'last_careunit',
            header: 'Last Care Unit',
      },
      {
            accessorKey: 'intime',
            header: 'Intime',
      },
      {
            accessorKey: 'Outtime',
            header: 'Outtime',
      },
      {
            accessorKey: 'los',
            header: 'LOS',
      },
];

const fetchSize = 25;

const Dashboard2 = () => {
      const tableContainerRef = useRef<HTMLDivElement>(null); //we can get access to the underlying TableContainer element and react to its scroll events
      const rowVirtualizerInstanceRef = useRef<MRT_RowVirtualizer>(null); //we can get access to the underlying Virtualizer instance and call its scrollToIndex method

      const [columnFilters, setColumnFilters] = useState<MRT_ColumnFiltersState>(
            [],
      );
      const [globalFilter, setGlobalFilter] = useState<string>();
      const [sorting, setSorting] = useState<MRT_SortingState>([]);

      const { data, fetchNextPage, isError, isFetching, isLoading } =
            useInfiniteQuery<IcuStayApiResponse>({
                  queryKey: [
                        'table-data',
                        columnFilters, //refetch when columnFilters changes
                        globalFilter, //refetch when globalFilter changes
                        sorting, //refetch when sorting changes
                  ],
                  queryFn: async ({ pageParam }) => {
                        const url = new URL(
                              'mimic/api/misc/allStays',
                              'https://api-testing.diagna.icu/',
                        );
                        let page = pageParam as number;
                        url.searchParams.set('page_number', `${(page + 1)}`);
                        url.searchParams.set('num_entries', `${fetchSize}`);
                        // url.searchParams.set('filters', JSON.stringify(columnFilters ?? []));
                        // url.searchParams.set('globalFilter', globalFilter ?? '');
                        // url.searchParams.set('sorting', JSON.stringify(sorting ?? []));

                        // const response = await fetch(url.href);
                        const data = await apiRequest(url.href) as IcuStayApiResponse;
                        // const json = (await response.json()) as IcuStayApiResponse;
                        return data;
                        // Make the API request
                        // return data; // Return the response data
                  },
                  initialPageParam: 0,
                  getNextPageParam: (_lastGroup, groups) => groups.length,
                  refetchOnWindowFocus: false,
            });

      const flatData = useMemo(
            () => data?.pages.flatMap((page) => page.data) ?? [],
            [data],
      );

      const totalDBRowCount = 140;
      const totalFetched = flatData.length;

      //called on scroll and possibly on mount to fetch more data as the user scrolls and reaches bottom of table
      const fetchMoreOnBottomReached = useCallback(
            (containerRefElement?: HTMLDivElement | null) => {
                  if (containerRefElement) {
                        const { scrollHeight, scrollTop, clientHeight } = containerRefElement;
                        //once the user has scrolled within 400px of the bottom of the table, fetch more data if we can
                        if (
                              scrollHeight - scrollTop - clientHeight < 400 &&
                              !isFetching &&
                              totalFetched < totalDBRowCount
                        ) {
                              fetchNextPage();
                        }
                  }
            },
            [fetchNextPage, isFetching, totalFetched, totalDBRowCount],
      );

      //scroll to top of table when sorting or filters change
      useEffect(() => {
            //scroll to the top of the table when the sorting changes
            try {
                  rowVirtualizerInstanceRef.current?.scrollToIndex?.(0);
            } catch (error) {
                  console.error(error);
            }
      }, [sorting, columnFilters, globalFilter]);

      //a check on mount to see if the table is already scrolled to the bottom and immediately needs to fetch more data
      useEffect(() => {
            fetchMoreOnBottomReached(tableContainerRef.current);
      }, [fetchMoreOnBottomReached]);

      const table = useMaterialReactTable({
            columns,
            data: flatData,
            enablePagination: false,
            enableRowNumbers: true,
            enableRowVirtualization: true,
            manualFiltering: true,
            manualSorting: true,
            muiTableContainerProps: {
                  ref: tableContainerRef, //get access to the table container element
                  sx: { maxHeight: '600px' }, //give the table a max height
                  onScroll: (event: UIEvent<HTMLDivElement>) =>
                        fetchMoreOnBottomReached(event.target as HTMLDivElement), //add an event listener to the table container element
            },
            muiToolbarAlertBannerProps: isError
                  ? {
                        color: 'error',
                        children: 'Error loading data',
                  }
                  : undefined,
            onColumnFiltersChange: setColumnFilters,
            onGlobalFilterChange: setGlobalFilter,
            onSortingChange: setSorting,
            renderBottomToolbarCustomActions: () => (
                  <Typography>
                        Fetched {totalFetched} of {totalDBRowCount} total rows.
                  </Typography>
            ),
            state: {
                  columnFilters,
                  globalFilter,
                  isLoading,
                  showAlertBanner: isError,
                  showProgressBars: isFetching,
                  sorting,
            },
            rowVirtualizerInstanceRef, //get access to the virtualizer instance
            rowVirtualizerOptions: { overscan: 4 },
      });

      return (
            <div>
                  <h1>Stays Data</h1>
      <MaterialReactTable table={table} />
      </div>);
};

export default Dashboard2;
