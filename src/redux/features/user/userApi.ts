import { baseApi } from '../../api/baseApi';

export const tripApi = baseApi.injectEndpoints({
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
    }),
});

export const { useGetAllUsersQuery, useUpdateUserRoleStatusMutation } = tripApi;