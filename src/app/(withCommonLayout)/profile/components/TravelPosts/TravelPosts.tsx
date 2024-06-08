import Loader from "@/components/shared/Loader/Loader";
import {
  useMyTripPostsQuery,
  useUpdateTripMutation,
} from "@/redux/features/trip/tripApi";
import { Box, IconButton, Tooltip } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import dayjs from "dayjs";
import Image from "next/image";
import { useState } from "react";
import DriveFileRenameOutlineOutlinedIcon from "@mui/icons-material/DriveFileRenameOutlineOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import EditTravelPostModal from "../EditTravelPostModal/EditTravelPostModal";

const TravelPosts = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedTrip, setSelectedTrip] = useState(null);
  const { data, isLoading } = useMyTripPostsQuery(undefined);
  const [updateTrip] = useUpdateTripMutation();

  const handleRemove = (id: string) => {
    updateTrip({
      id,
      data: {
        status: "deactivated",
      },
    });
  };

  const columns: GridColDef[] = [
    {
      field: "photos",
      headerName: "Image",
      flex: 1,
      renderCell: ({ row }) => (
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Image
            src={row?.photos?.[0]}
            height={70}
            width={70}
            alt="destination"
          />
        </Box>
      ),
    },
    { field: "destination", headerName: "Destination", flex: 1 },
    {
      field: "startDate",
      headerName: "Start Date",
      flex: 1,
      renderCell: ({ row }) => dayjs(row.start).format("DD/MM/YYYY"),
    },
    {
      field: "endDate",
      headerName: "End Date",
      flex: 1,
      renderCell: ({ row }) => dayjs(row.endDate).format("DD/MM/YYYY"),
    },
    { field: "description", headerName: "Description", flex: 2 },
    {
      field: "action",
      headerName: "Action",
      flex: 1,
      headerAlign: "center",
      align: "center",
      renderCell: ({ row }) => {
        return (
          <>
            <>
              <IconButton
                aria-label="delete"
                onClick={() => {
                  setIsModalOpen(true);
                  setSelectedTrip(row);
                }}
              >
                <DriveFileRenameOutlineOutlinedIcon color="primary" />
              </IconButton>
              <IconButton
                aria-label="delete"
                onClick={() => handleRemove(row.id)}
              >
                <DeleteOutlineOutlinedIcon sx={{ color: "red" }} />
              </IconButton>
            </>
          </>
        );
      },
    },
  ];

  return (
    <>
    <EditTravelPostModal trip={selectedTrip} open={isModalOpen} setOpen={setIsModalOpen}/>
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

export default TravelPosts;
