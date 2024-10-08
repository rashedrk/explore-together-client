import { axiosBaseQuery } from "@/helpers/axios/axiosBaseQuery";
import { createApi } from "@reduxjs/toolkit/query/react";


// Define a service using a base URL and expected endpoints
export const baseApi = createApi({
    reducerPath: "api",
    baseQuery: axiosBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_SERVER_URL as string }),
    endpoints: () => ({}),
    tagTypes: ["trips", "users", "profile", "my_trips"],
});