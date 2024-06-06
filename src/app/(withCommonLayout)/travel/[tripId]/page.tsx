"use client";

import { useGetSingleTripQuery } from "@/redux/features/trip/tripApi";
import { Box, Container, Stack } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/navigation";

type TParams = {
  params: {
    tripId: string;
  };
};

const TripDetailsPage = ({ params }: TParams) => {
  const router = useRouter();
  const id = params?.tripId;
  const { data, isLoading } = useGetSingleTripQuery(id);
  // console.log(data);

  return (
    <Container>
      {isLoading ? (
        "Loading"
      ) : (
        <>
          {/* <Box>
            <Image src={data?.photos?.[0] as string} alt="photo" height={200} width={900} />
          </Box> */}
          <Stack direction="row" gap={3}>
            <Image src={data?.photos?.[1] as string} alt="photo" height={100} width={400} />
            <Image src={data?.photos?.[2] as string} alt="photo" height={100} width={400} />
            <Image src={data?.photos?.[3] as string} alt="photo" height={100} width={400} />
          </Stack>
        </>
      )}
    </Container>
  );
};

export default TripDetailsPage;
