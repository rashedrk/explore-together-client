import { baseApi } from '../../api/baseApi';

export const userApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        getAllUsers: build.query({
            query: () => {
                return {
                    url: '/user',
                    method: 'GET',
                };
            },
            providesTags: ["users"],
        }),
        updateUserRoleStatus: build.mutation({
            query: (payload) => ({
                url: `/user/${payload.id}`,
                method: 'PUT',
                data: payload.data,
            }),
            invalidatesTags: ["users"],
        }),
        getProfile: build.query({
            query: () => {
                return {
                    url: '/profile',
                    method: 'GET',
                };
            },
            providesTags: ["profile"],
        }),
        updateProfile: build.mutation({
            query: (data) => ({
                url: `/profile`,
                method: 'PUT',
                data,
            }),
            invalidatesTags: ["profile"],
        }),
    }),
});

export const { useGetAllUsersQuery, useUpdateUserRoleStatusMutation, useGetProfileQuery, useUpdateProfileMutation } = userApi;