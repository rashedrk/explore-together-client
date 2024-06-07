"use client";
import { useGetAllTripsQuery } from "@/redux/features/trip/tripApi";
import { Box, IconButton, Pagination, Typography } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useState } from "react";
import BorderColorOutlinedIcon from "@mui/icons-material/BorderColorOutlined";
import DeleteIcon from "@mui/icons-material/Delete";
import dayjs from "dayjs";
import Image from "next/image";
const TripManagementPage = () => {
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
            <IconButton aria-label="delete">
              <BorderColorOutlinedIcon color="primary" />
            </IconButton>
            <IconButton aria-label="delete">
              <DeleteIcon sx={{ color: "red" }} />
            </IconButton>
          </>
        );
      },
    },
  ];

  return (
    <>
      {isLoading ? (
        "Loading..."
      ) : (
        <DataGrid
          loading={isLoading}
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
