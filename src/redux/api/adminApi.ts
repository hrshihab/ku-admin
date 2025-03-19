import { baseApi } from "./baseApi";
import { tagTypes } from "../tag-types";

const ADMIN_URL = "/admin";

export const adminApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createAdmin: build.mutation({
      query: (data) => {
        console.log('API call data:', { data });
        return {
          url: "/user/create-admin",
          contentType:"application/json",
          method: "POST",
          data:data
        };
      },
      invalidatesTags: [tagTypes.user],
    }),
    getAllUsers: build.query({
      query: () => ({
        url: ADMIN_URL,
        method: "GET",
      }),
      providesTags: [tagTypes.user],
    }),
    updateUserStatus: build.mutation({
      query: ({ id, body }) => {
        console.log('API call data:', { id, body });
        return {
          url: `/admin/${id}`,
          method: 'PATCH',
          contentType:"application/json",
          body
        };
      },
      invalidatesTags: [tagTypes.user],
    }),
    softDeleteUser: build.mutation({
      query: ({ id }) => ({
        url: `/admin/soft/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: [tagTypes.user],
    }),
  }),
});

export const { useGetAllUsersQuery, useUpdateUserStatusMutation, useCreateAdminMutation, useSoftDeleteUserMutation } = adminApi;