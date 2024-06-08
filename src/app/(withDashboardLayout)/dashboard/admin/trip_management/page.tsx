"use client";
import { useGetAllTripsQuery, useUpdateTripMutation } from "@/redux/features/trip/tripApi";
import { Box, IconButton, Pagination, Typography } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useState } from "react";
import BorderColorOutlinedIcon from "@mui/icons-material/BorderColorOutlined";
import DeleteIcon from "@mui/icons-material/Delete";
import dayjs from "dayjs";
import Image from "next/image";
import EditTripModal from "./components/EditTripModal/EditTripModal";
import { TTrip } from "@/types/trip";
import Loader from "@/components/shared/Loader/Loader";
const TripManagementPage = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedTrip, setSelectedTrip] = useState(null);

  const [updateTrip] = useUpdateTripMutation();
  const { data, isLoading } = useGetAllTripsQuery(undefined);
  //   console.log(data);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(3);

  const meta = data?.meta;

  let pageCount: number;

  if (meta?.total) {
    pageCount = Math.ceil(meta.total / limit);
  }

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const handleRemove = (id: string) => {
    updateTrip({
      id,
      data: {
        status: 'deactivated',
      }
    })
  }

  const columns: GridColDef[] = [
    // {
    //   field: "photos",
    //   headerName: "Photo",
    //   flex: 1,
    //   renderCell: ({ row }) => {
    //     return (
    //       <Image src={row?.photos?.[0]} alt="photo" height={50} width={50} />
    //     );
    //   },
    // },
    { field: "destination", headerName: "Destination", flex: 1 },
    {
      field: "startDate",
      headerName: "Date",
      flex: 1,
      renderCell: ({ row }) => {
        return dayjs(row.startDate).format("DD/MM/YYYY");
      },
    },
    {
      field: "endDate",
      headerName: "End Date",
      flex: 1,
      renderCell: ({ row }) => {
        return dayjs(row.endDate).format("DD/MM/YYYY");
      },
    },
    { field: "budget", headerName: "Budget", flex: 1 },
    { field: "type", headerName: "Type", flex: 1 },
    {
      field: "action",
      headerName: "Action",
      flex: 1,
      headerAlign: "center",
      align: "center",
      renderCell: ({ row }) => {
        return (
          <>
            <IconButton aria-label="delete" onClick={() => {
              setIsModalOpen(true)
              setSelectedTrip(row)
              }}>
              <BorderColorOutlinedIcon color="primary" />
            </IconButton>
            <IconButton aria-label="delete" onClick={() => handleRemove(row.id)}>
              <DeleteIcon sx={{ color: "red" }} />
            </IconButton>
          </>
        );
      },
    },
  ];

  return (
    <>
    <EditTripModal trip={selectedTrip} open={isModalOpen} setOpen={setIsModalOpen}/>
      {isLoading ? (
        <Loader/>
      ) : (
        <DataGrid
          rows={data?.data}
          columns={columns}
          hideFooterPagination
          disableColumnMenu
          disableColumnSorting
          slots={{
            footer: () => {
              return (
                <Box
                  sx={{
                    my: 2,
                    display: "flex",
                    justifyContent: "right",
                  }}
                >
                  <Pagination
                    color="primary"
                    count={pageCount}
                    page={page}
                    onChange={handleChange}
                  />
                </Box>
              );
            },
          }}
        />
      )}
    </>
  );
};

export default TripManagementPage;
