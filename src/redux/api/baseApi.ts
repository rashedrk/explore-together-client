import { axiosBaseQuery } from "@/helpers/axios/axiosBaseQuery";
import { createApi } from "@reduxjs/toolkit/query/react";


// Define a service using a base URL and expected endpoints
export const baseApi = createApi({
    reducerPath: "api",
    baseQuery: axiosBaseQuery({ baseUrl: "https://travel-buddy-matching-server.vercel.app/api" }),
    endpoints: () => ({}),
    tagTypes: ["trips", "users", "profile", "my_trips"],
});