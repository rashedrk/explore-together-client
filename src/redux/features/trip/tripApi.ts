
import { TMeta, TQueryParams, TResponseRedux } from '@/types/common';
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
            transformResponse: (response: any) => {
                return {
                    data: response.data,
                    meta: response.meta,
                };
            },
            providesTags: ["trips"],
        }),
        getSingleTrip: build.query({
            query: (id) => {
                return {
                    url: `/trips/${id}`,
                    method: 'GET',
                };
            },
            transformResponse: (response:TResponseRedux<TTrip> ) => {
                return response.data;
            },
        }),
    }),
});

export const { useGetAllTripsQuery, useGetSingleTripQuery } = tripApi;