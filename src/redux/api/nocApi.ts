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
    createNOC: build.mutation<any, INOC>({
      query: (data) => ({
        url: '/noc/create-noc',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: [tagTypes.noc],
    }),

    // Get All NOCs
    getAllNOCs: build.query<any, void>({
      query: () => ({
        url: '/noc',
        method: 'GET',
      }),
      providesTags: [tagTypes.noc],
    }),

    // Get Single NOC
    getNOCById: build.query<any, string>({
      query: (id) => ({
        url: `/noc/${id}`,
        method: 'GET',
      }),
      providesTags: [tagTypes.noc],
    }),

    // Update NOC
    updateNOC: build.mutation<any, { id: string; data: Partial<INOC> }>({
      query: ({ id, data }) => ({
        url: `/noc/${id}`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: [tagTypes.noc],
    }),

    // Delete NOC (Soft Delete)
    deleteNOC: build.mutation<any, string>({
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