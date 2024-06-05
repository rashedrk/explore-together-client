
import { IMeta, TQueryParams } from '@/types/common';
import { baseApi } from '../../api/baseApi';


export const tripApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        getAllTrips: build.query({
            query: (args) => {
                const params = new URLSearchParams();
                if (args) {
                    args.forEach((item: TQueryParams) => {
                        params.append(item.name, item.value as string)
                    });
                }
                return {
                    url: '/trips',
                    method: 'GET',
                    params: params
                };
            },
            transformResponse: (response:any) => {
                return {
                    data: response.data,
                    meta: response.meta,
                };
            },
            providesTags: ["trips"],
        }),
    }),
});

export const { useGetAllTripsQuery } = tripApi;