import { baseApi } from './baseApi';
import { tagTypes } from '../tag-types';

export interface INOC {
  title: string;
  description: string;
  image: string;
}

export const nocApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // Create NOC
    createNOC: build.mutation({
      query: (data) => ({
        url: '/noc/create-noc',
        method: 'POST',
        contentType: 'application/json',
         data,
      }),
      invalidatesTags: [tagTypes.noc],
    }),

    // Get All NOCs
    getAllNOCs: build.query({
      query: () => ({
        url: '/noc',
        method: 'GET',
      }),
      providesTags: [tagTypes.noc],
    }),

    // Get Single NOC
    getNOCById: build.query({
      query: (id) => ({
        url: `/noc/${id}`,
        method: 'GET',
      }),
      providesTags: [tagTypes.noc],
    }),

    // Update NOC
    updateNOC: build.mutation({
      query: ({ id, data }) => ({
        url: `/noc/${id}`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: [tagTypes.noc],
    }),

    // Delete NOC (Soft Delete)
    deleteNOC: build.mutation({
      query: (id) => ({
        url: `/noc/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: [tagTypes.noc],
    }),
  }),
});

export const {
  useCreateNOCMutation,
  useGetAllNOCsQuery,
  useGetNOCByIdQuery,
  useUpdateNOCMutation,
  useDeleteNOCMutation,
} = nocApi; 