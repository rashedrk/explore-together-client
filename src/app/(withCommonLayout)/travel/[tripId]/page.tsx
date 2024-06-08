"use client";

import Loader from "@/components/shared/Loader/Loader";
import { useGetSingleTripQuery } from "@/redux/features/trip/tripApi";
import {
  Box,
  Button,
  Container,
  List,
  ListItemIcon,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";
import Image from "next/image";
import CheckIcon from "@mui/icons-material/Check";
import dayjs from "dayjs";
import Link from "next/link";

type TParams = {
  params: {
    tripId: string;
  };
};

const TripDetailsPage = ({ params }: TParams) => {
  const id = params?.tripId;
  const { data, isLoading } = useGetSingleTripQuery(id);
  // console.log(data);

  return (
    <Container>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          {/* <Box>
            <Image src={data?.photos?.[0] as string} alt="photo" height={200} width={900} />
          </Box> */}
          <Stack direction="row" justifyContent="center" gap={2}>
            <Image
              src={data?.photos?.[1] as string}
              alt="photo"
              height={100}
              width={300}
            />
            <Image
              src={data?.photos?.[2] as string}
              alt="photo"
              height={100}
              width={300}
            />
            <Image
              src={data?.photos?.[3] as string}
              alt="photo"
              height={100}
              width={300}
            />
          </Stack>

          <Box sx={{ my: 2 }}>
            <Typography variant="h5" mb={1}>
              Description
            </Typography>
            <Typography variant="body1" mb={1}>
              {data?.description}
            </Typography>
          </Box>
          <Box sx={{ my: 2 }}>
            <Typography variant="h5" mb={1}>
              Activities
            </Typography>
            <List>
              {data?.activities.map((activity, index) => (
                <Box key={index} component="span" sx={{ display: "flex" }}>
                  <ListItemIcon>
                    <CheckIcon />
                  </ListItemIcon>
                  <ListItemText primary={activity} />
                </Box>
              ))}
            </List>
          </Box>
          <Box sx={{ my: 2 }}>
            <Typography variant="h5" mb={1}>
              Duration
            </Typography>
            <Typography variant="body1" mb={1}>
              {dayjs(data?.startDate).format("DD/MM/YYYY")} -{" "}
              {dayjs(data?.endDate).format("DD/MM/YYYY")}
            </Typography>
          </Box>
          <Box sx={{ my: 2 }}>
            <Typography variant="h5" mb={1}>
              Destination
            </Typography>
            <Typography variant="body1" mb={1}>
              {data?.destination}
            </Typography>
          </Box>
          <Box sx={{ my: 2 }}>
            <Typography variant="h5" mb={1}>
              Travel Type
            </Typography>
            <Typography variant="body1" mb={1}>
              {data?.type}
            </Typography>
          </Box>
          <Box sx={{ my: 2 }}>
            <Link
              href={{
                pathname: "/travel_request",
                query: {
                  tripId: data?.id,
                  destination: data?.destination,
                  startDate: data?.startDate,
                  endDate: data?.endDate,
                },
              }}
            >
              <Button>Request to Join</Button>
            </Link>
          </Box>
        </>
      )}
    </Container>
  );
};

export default TripDetailsPage;
