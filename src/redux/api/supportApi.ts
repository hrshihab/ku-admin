import { baseApi } from './baseApi';
import { tagTypes } from '../tag-types';

export interface ISupport {
  title: string;
  description: string;
  image: string;
}

export const supportApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // Create Support
    createSupport: build.mutation({
      query: (data) => ({
        url: '/support/create-support',
        method: 'POST',
        contentType: 'application/json',
         data,

      }),
      invalidatesTags: [tagTypes.support],
    }),

    // Get All Supports
    getAllSupports: build.query({
      query: () => ({
        url: '/support',
        method: 'GET',
      }),
      providesTags: [tagTypes.support],
    }),

    // Get Single Support
    getSupportById: build.query({
      query: (id) => ({
        url: `/support/${id}`,
        method: 'GET',
      }),
      providesTags: [tagTypes.support],
    }),

    // Update Support
    updateSupport: build.mutation({
      query: ({ id, data }) => ({
        url: `/support/${id}`,
        method: 'PATCH',
        contentType: 'application/json',
        data,
      }),
      invalidatesTags: [tagTypes.support],
    }),

    // Delete Support (Soft Delete)
    deleteSupport: build.mutation({
      query: (id) => ({
        url: `/support/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: [tagTypes.support],
    }),
  }),
});

export const {
  useCreateSupportMutation,
  useGetAllSupportsQuery,
  useGetSupportByIdQuery,
  useUpdateSupportMutation,
  useDeleteSupportMutation,
} = supportApi; 