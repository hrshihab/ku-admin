import { baseApi } from './baseApi';
import { tagTypes } from '../tag-types';

export interface INews {
  title: string;
  description: string;
  image: string;
}

export const newsApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // Create News
    createNews: build.mutation({
      query: (data) => ({
        url: '/news/create-news',
        method: 'POST',
        contentType : 'application/json',
        data,  // Don't stringify, send the data as an object
        
      }),
      invalidatesTags: [tagTypes.news],
    }),

    // Get All News
    getAllNews: build.query({
      query: () => ({
        url: '/news/all-news',
        method: 'GET',
      }),
      providesTags: [tagTypes.news],
    }),

    // Get Single News
    getNewsById: build.query({
      query: (id) => ({
        url: `/news/${id}`,
        method: 'GET',
      }),
      providesTags: [tagTypes.news],
    }),

    // Update News
    updateNews: build.mutation({
      query: ({ id, data }) => ({
        url: `/news/${id}`,
        method: 'PATCH',
        contentType : 'application/json',
        data,  // Don't stringify, send the data as an object
      }),
      invalidatesTags: [tagTypes.news],
    }),

    // Delete News
    deleteNews: build.mutation({
      query: (id) => ({
        url: `/news/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: [tagTypes.news],
    }),
  }),
});

export const {
  useCreateNewsMutation,
  useGetAllNewsQuery,
  useGetNewsByIdQuery,
  useUpdateNewsMutation,
  useDeleteNewsMutation,
} = newsApi; 