
import { TMeta, TQueryParams, TResponseRedux } from '@/types/common';
import { baseApi } from '../../api/baseApi';
import { TTrip } from '@/types/trip';


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
            transformResponse: (response: TResponseRedux<TTrip>) => {
                return response.data;
            },
        }),
        updateTrip: build.mutation({
            query: (payload) => ({
                url: `/trips/${payload.id}`,
                method: 'PUT',
                data: payload.data,
            }),
            invalidatesTags: ["trips", "my_trips"],
        }),
        requestedTrips: build.query({
            query: () => {
                return {
                    url: "/travel-buddies/requested",
                    method: 'GET',
                };
            },
        }),
        myTripPosts: build.query({
            query: () => {
                return {
                    url: "/trips/my",
                    method: 'GET',
                };
            },
            providesTags: ["my_trips"],
        }),
        tripRequest: build.mutation({
            query: (payload) => ({
                url: `/trip/${payload.tripId}/request`,
                method: 'POST',
                data: {
                    userId: payload.userId
                },
            }),
            invalidatesTags: ["my_trips"],
        }),
    }),
});

export const { useGetAllTripsQuery, useGetSingleTripQuery , useUpdateTripMutation, useRequestedTripsQuery , useMyTripPostsQuery, useTripRequestMutation} = tripApi;