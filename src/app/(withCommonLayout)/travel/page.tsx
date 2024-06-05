"use client";
import TravelCard from "@/components/TravelCard/TravelCard";
import { useGetAllTripsQuery } from "@/redux/features/trip/tripApi";
import { TQueryParams } from "@/types/common";
import {
  Box,
  CircularProgress,
  Container,
  Grid,
  Pagination,
  Typography,
} from "@mui/material";
import { useState } from "react";

const TravelPage = () => {
  const [page, setPage] = useState(1);
  const [params, setParams] = useState<TQueryParams[]>([]);

  const { data: tripData, isLoading } = useGetAllTripsQuery([
    { name: "page", value: page },
    { name: "limit", value: 10 },
    ...params,
  ]);

  const metaData = tripData?.meta;

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  let pageCount: number = 0;

  if (metaData?.total) {
    pageCount = Math.ceil(metaData.total / 10);
  }

  //   console.log(tripData);

  return (
    <Container
      sx={{
        my: 2,
      }}
    >
      <Typography variant="h5" textAlign="center" mb={2}>
        All Available Trip
      </Typography>

      {isLoading ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: 500,
          }}
        >
          <CircularProgress />
        </Box>
      ) : (
        <Grid container justifyContent="center" spacing={2}>
          {tripData?.data?.map((trip: any) => (
            <Grid item key={trip.id} md={4}>
              <TravelCard trip={trip} />
            </Grid>
          ))}
        </Grid>
      )}

      <Pagination  count={pageCount} page={page} onChange={handleChange}  sx={{
        my: 3
      }}/>
    </Container>
  );
};

export default TravelPage;
