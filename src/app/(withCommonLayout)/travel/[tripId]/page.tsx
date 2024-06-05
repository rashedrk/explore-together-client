"use client"

import { useRouter } from "next/navigation";

type TParams = {
  params: {
    tripId: string;
  };
};

const TripDetailsPage = ({ params }: TParams) => {
  const router = useRouter();
  const id = params?.tripId;
  console.log(id);
  
  return <></>;
};

export default TripDetailsPage;
