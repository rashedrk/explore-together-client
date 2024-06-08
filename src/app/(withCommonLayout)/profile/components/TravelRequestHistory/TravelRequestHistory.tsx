import Loader from "@/components/shared/Loader/Loader";
import { useRequestedTripsQuery } from "@/redux/features/trip/tripApi";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import dayjs from "dayjs";

const TravelRequestHistory = () => {
    const {data, isLoading} = useRequestedTripsQuery(undefined);

    // console.log(data);
    



    const columns: GridColDef[] = [
        { field: "trip.destination", headerName: "Destination", flex: 1, 
            renderCell: ({row}) => row.trip.destination
         },
    
        { field: "trip.startDate", headerName: "Start Date", flex: 1 ,
            renderCell: ({row}) => dayjs(row.trip.startDate).format("DD/MM/YYYY")
        },
        { field: "trip.endDate", headerName: "End Date", flex: 1 ,
            renderCell: ({row}) => dayjs(row.trip.endDate).format("DD/MM/YYYY")
        },
        { field: "status", headerName: "Status", flex: 1 },
       
      ];

    return (
        <>
            {isLoading ? (
        <Loader />
      ) : (
        <DataGrid
          rows={data?.data}
          columns={columns}
          hideFooter
          hideFooterPagination
          disableColumnMenu
          disableColumnSorting
          disableRowSelectionOnClick
        />
      )}
        </>
    );
};

export default TravelRequestHistory;